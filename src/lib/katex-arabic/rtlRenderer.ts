/**
 * ════════════════════════════════════════════════════════════════
 *  rtlRenderer.ts
 *  The main pipeline that transforms a LaTeX string for Arabic
 *  rendering and builds a KaTeX options object.
 *
 *  Pipeline (run in order — order is significant):
 *    1. Rewrite \lim → \arabiLim (sentinel) so that the function
 *       translator can use \operatorname* with limits.
 *    2. Translate differentials (dx, dy, d\theta, …).
 *    3. Translate function commands (sin → جا, cos → جتا, …).
 *    4. Translate variables (x → س, y → ص, …).
 *    5. Mirror comparison and arrow symbols for RTL.
 *    6. Convert digits to the requested numeral style.
 *
 *  Performance:
 *    - An LRU render cache avoids re-processing identical LaTeX.
 *    - Input length is capped to prevent catastrophic backtracking.
 * ════════════════════════════════════════════════════════════════
 */

import {
  toArabicNumerals,
  formatArabicNumber,
} from './arabicNumerals';
import {
  translateFunctions,
  translateVariables,
  translateDifferentials,
} from './arabicFunctions';
import { applyMirroredSymbols } from './arabicSymbols';
import { collectProtectedRegions, isInsideRegions } from './protectedRegions';
import type {
  ArabicKatexOptions,
  NumeralStyle,
  PartialArabicOptions,
  StructuralClass,
} from './types';

// Re-export types for convenience.
export type { ArabicKatexOptions, NumeralStyle, PartialArabicOptions, StructuralClass } from './types';

// ═══════════════════════════════════════════════════════════════
//  Constants & guards
// ═══════════════════════════════════════════════════════════════

/**
 * Maximum allowed LaTeX input length (characters). Inputs beyond
 * this are truncated to prevent catastrophic regex backtracking and
 * excessive memory use. 20 000 chars is far above any realistic
 * equation (even a page of dense math is a few thousand chars) while
 * still bounding worst-case preprocessing and render cost.
 */
export const MAX_INPUT_LENGTH = 20_000;

/**
 * LRU cache size for rendered HTML. Each entry is keyed by
 * (latex + serialized options). 256 entries is a good balance
 * between hit-rate and memory for interactive editors.
 */
const CACHE_CAPACITY = 256;

// ═══════════════════════════════════════════════════════════════
//  LRU Render Cache
// ═══════════════════════════════════════════════════════════════

/**
 * A minimal, dependency-free LRU cache backed by a Map.
 * Map iteration order in JS is insertion order, so the *first*
 * key is always the least-recently-used.
 */
class LruCache<K, V> {
  private readonly map = new Map<K, V>();
  constructor(private readonly capacity: number) {}

  get(key: K): V | undefined {
    const value = this.map.get(key);
    if (value !== undefined) {
      // Move to end (most-recently-used).
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      // Evict the least-recently-used (first) entry.
      const firstKey = this.map.keys().next().value;
      if (firstKey !== undefined) this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
}

/** Module-level render cache. Exported so the render entry point can reuse it. */
export const renderCache = new LruCache<string, string>(CACHE_CAPACITY);

/**
 * Clear the internal render cache. Useful when options change
 * globally or in tests.
 */
export function clearRenderCache(): void {
  renderCache.clear();
}

/**
 * Build a stable cache key from latex + options.
 * Every field that can affect the rendered output is included so a
 * stale entry can never be served. Record fields are serialized with
 * JSON.stringify (key order is not guaranteed, but two identical
 * option objects built the same way produce identical JSON; callers
 * who mutate key order simply get a cache miss, never a wrong hit).
 */
export function buildCacheKey(latex: string, opts: ArabicKatexOptions): string {
  return [
    latex,
    opts.numerals,
    opts.formatNumbers,
    opts.translateFuncs,
    opts.translateVars,
    opts.translateDiffs,
    JSON.stringify(opts.customFunctionMap),
    JSON.stringify(opts.customVariableMap),
    opts.mirrorSymbols,
    opts.mirrorBigOperators,
    opts.mirrorSqrt,
    opts.mirrorBrackets,
    opts.direction,
    opts.fontFamily,
    opts.displayMode,
    opts.fullArabicMode,
    opts.operatorScale,
    JSON.stringify(opts.macros),
    opts.output,
    String(opts.strict),
    opts.trust,
    opts.minRuleThickness,
  ].join('|');
}

// ═══════════════════════════════════════════════════════════════
//  Default options
// ═══════════════════════════════════════════════════════════════

/**
 * The default configuration. Tweak individual fields by passing
 * an overrides object to the render functions.
 */
export const DEFAULT_OPTIONS: ArabicKatexOptions = {
  // Numerals
  numerals: 'arabic',
  formatNumbers: true,

  // Translation
  translateFuncs: true,
  translateVars: true,
  translateDiffs: true,
  customFunctionMap: {},
  customVariableMap: {},

  // Mirroring
  mirrorSymbols: true,
  mirrorBigOperators: true,
  mirrorSqrt: true,
  mirrorBrackets: true,

  // Rendering
  direction: 'rtl',
  fontFamily: 'Amiri',
  displayMode: false,
  fullArabicMode: true,
  // 1.05 compensates for the x-height difference between Arabic fonts
  // (Amiri et al.) and KaTeX_Main, so Arabic operator names (جا، جتا…)
  // visually match the size of their Latin counterparts out of the box.
  operatorScale: 1.05,

  // KaTeX
  macros: {},
  throwOnError: false,
  output: 'html',
  strict: false,
  trust: false,
  minRuleThickness: 0.04,
};

/**
 * Merge partial user options on top of the defaults.
 * Pure function: safe to call repeatedly.
 */
export function resolveOptions(overrides: PartialArabicOptions = {}): ArabicKatexOptions {
  return { ...DEFAULT_OPTIONS, ...overrides };
}

// ═══════════════════════════════════════════════════════════════
//  LaTeX preprocessing pipeline
// ═══════════════════════════════════════════════════════════════

/**
 * The single entry point for Arabic LaTeX transformation.
 *
 * Returns the transformed LaTeX that can be passed to KaTeX.renderToString.
 * Each pipeline step is gated by an option, so callers can disable
 * any stage they don't need.
 */
export function processArabicLatex(
  latex: string,
  options: PartialArabicOptions = {},
): string {
  const opts = resolveOptions(options);

  // Guard: cap input length to bound worst-case regex cost.
  let processed = latex.length > MAX_INPUT_LENGTH
    ? latex.slice(0, MAX_INPUT_LENGTH)
    : latex;

  // Guard: empty / whitespace-only input short-circuits.
  if (!processed.trim()) return processed;

  // 1. Rewrite \lim to a sentinel so the function translator can produce
  //    \operatorname* form (which preserves limits in display mode).
  if (opts.translateFuncs) {
    processed = processed.replace(/\\lim(?![A-Za-z])/g, '\\arabiLim');
  }

  // 2. Translate differentials before variables. This way "dx" becomes
  //    "\text{د}\text{س}" and the inner "x" is already protected.
  if (opts.translateDiffs) {
    processed = translateDifferentials(processed);
  }

  // 3. Translate function names. This also resolves the \arabiLim
  //    sentinel into the final \operatorname* form.
  if (opts.translateFuncs) {
    processed = translateFunctions(processed, opts.customFunctionMap);
  }

  // 4. Translate variables last so that everything inserted by the
  //    previous steps is already protected.
  if (opts.translateVars) {
    processed = translateVariables(processed, opts.customVariableMap);
  }

  // 5. Mirror comparison/arrow/bracket symbols for RTL. This must run
  //    after function translation so we don't accidentally mirror the
  //    Arabic operator names (e.g. \operatorname{جا} doesn't contain
  //    arrow commands, but the protection is still good to have).
  if (opts.mirrorSymbols) {
    processed = applyMirroredSymbols(processed, true);
  }

  // 6. Convert digits to the requested numeral style. This is purely
  //    a digit substitution, so it runs last.
  if (opts.numerals !== 'latin') {
    processed = convertNumbersInLatex(processed, opts.numerals, opts.formatNumbers);
  }

  return processed;
}

/**
 * TeX dimension units. A digit run glued directly to one of these
 * (5pt, 2em, 10cm, …) is a size literal — e.g. \hspace{5pt} or
 * \rule{2cm} — not math content. Converting it would corrupt the
 * size ("Invalid size" in KaTeX), so those runs are emitted verbatim.
 */
const TEX_UNIT_PATTERN = /^(?:pt|mm|cm|in|ex|em|mu|px|pc|bp|dd|cc|nd|nc|sp)/;

/**
 * Convert Latin digits in a LaTeX string to the requested numeral style.
 *
 * The regex is careful to skip digits that appear inside LaTeX command
 * names (e.g. `\char3`) — though these are exceedingly rare in practice.
 * For better cross-browser support we use a manual scan instead of
 * relying on a lookbehind assertion.
 */
function convertNumbersInLatex(
  latex: string,
  style: NumeralStyle,
  formatSeparators: boolean,
): string {
  // Walk the string and only transform digit runs that are NOT preceded
  // by an alphabetic character (which would mean they are part of a
  // LaTeX command like \char1).
  let result = '';
  let i = 0;
  while (i < latex.length) {
    const ch = latex[i];
    if (ch && /[0-9]/.test(ch)) {
      // Check the character immediately before: if it is a letter,
      // we are inside a command name, so leave the digit alone.
      const prev = i > 0 ? latex[i - 1] : '';
      if (prev && /[A-Za-z]/.test(prev)) {
        result += ch;
      } else {
        // Collect the full digit run (including decimal point / comma).
        let j = i;
        while (j < latex.length) {
          const cj = latex[j];
          if (cj && /[0-9.,]/.test(cj)) {
            j++;
          } else {
            break;
          }
        }
        const run = latex.slice(i, j);

        // A digit run glued directly to a TeX unit is a dimension
        // literal (\hspace{5pt}, \rule{2cm}, …) — emit it verbatim.
        if (TEX_UNIT_PATTERN.test(latex.slice(j, j + 2))) {
          result += run;
          i = j;
          continue;
        }

        result += formatSeparators
          ? formatArabicNumber(run)
          : toArabicNumerals(run, style);
        i = j;
        continue;
      }
    } else {
      result += ch ?? '';
    }
    i++;
  }
  return result;
}

// ═══════════════════════════════════════════════════════════════
//  KaTeX macros & CSS classes
// ═══════════════════════════════════════════════════════════════

/**
 * Build the macro table for KaTeX. Custom user macros are merged on
 * top of the built-in ones.
 */
export function getArabicMacros(
  customMacros: Record<string, string> = {},
): Record<string, string> {
  return {
    // Trigonometric
    '\\جا': '\\operatorname{جا}',
    '\\جتا': '\\operatorname{جتا}',
    '\\ظا': '\\operatorname{ظا}',
    '\\ظتا': '\\operatorname{ظتا}',
    '\\قا': '\\operatorname{قا}',
    '\\قتا': '\\operatorname{قتا}',

    // Logarithms
    '\\لو': '\\operatorname{لو}',
    '\\لغ': '\\operatorname{لغ}',

    // Limits
    '\\نها': '\\operatorname*{نها}',
    '\\نهى': '\\operatorname*{نها}',

    // Max/min
    '\\اقصى': '\\operatorname*{أقصى}',
    '\\ادنى': '\\operatorname*{أدنى}',

    // Combinatorics (التباديل / التوافيق → big ل / big ق)
    '\\تباديل': '\\operatorname{ل}',
    '\\توافيق': '\\operatorname{ق}',

    // Imaginary / constants
    '\\ت': '\\text{ت}',
    '\\هـ': '\\text{هـ}',

    // \pmod keeps its argument: the macro consumes {…} and renders the
    // parenthesized Arabic form — matching LaTeX's own \pmod semantics
    // (KaTeX lets a user macro override the built-in \pmod).
    '\\pmod': '\\,(\\operatorname{باقي}\\,#1)',

    ...customMacros,
  };
}

// ═══════════════════════════════════════════════════════════════
//  Structural detection (piecewise / cases layouts)
// ═══════════════════════════════════════════════════════════════

const CASES_ENV_PATTERN = /\\begin\{(?:cases|dcases)\}/g;
const LEFT_BRACE_PATTERN = /\\left\\\{/g;
const RIGHT_DOT_PATTERN = /\\right\./g;

/**
 * Detect structural features that need dedicated RTL handling.
 *
 * Returns `'has-cases'` for real piecewise definitions —
 * \begin{cases} / \begin{dcases}, or the explicit
 * `\left\{ … \right.` form — and null for everything else
 * (plain math, ordinary matrices, or the word "cases" inside
 * \text{} prose, which is never a layout construct).
 *
 * @param latex LaTeX source (raw or processed — \begin{cases}
 *              survives the Arabic transforms unchanged).
 */
export function detectStructuralClass(latex: string): StructuralClass | null {
  if (!latex) return null;

  const protectedRegions = collectProtectedRegions(latex);
  const occursOutsideProse = (pattern: RegExp): boolean => {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(latex)) !== null) {
      if (!isInsideRegions(m.index, protectedRegions)) return true;
    }
    return false;
  };

  if (occursOutsideProse(CASES_ENV_PATTERN)) return 'has-cases';

  // The \left\{ … \right. pair only counts as piecewise when BOTH
  // halves are present; a lone \left\{ is an ordinary set brace.
  if (
    occursOutsideProse(LEFT_BRACE_PATTERN) &&
    occursOutsideProse(RIGHT_DOT_PATTERN)
  ) {
    return 'has-cases';
  }

  return null;
}

/**
 * Build the list of CSS classes applied to the wrapper span.
 * The "katex-arabic" base class is always present; the rest are
 * toggled by options.
 */
export function buildCssClasses(
  options: PartialArabicOptions,
  structuralClass: StructuralClass | null = null,
): string[] {
  const opts = resolveOptions(options);
  const classes = ['katex-arabic'];

  if (opts.mirrorBigOperators) classes.push('mirror-big-ops');
  if (opts.mirrorSqrt) classes.push('mirror-sqrt');
  if (opts.mirrorBrackets) classes.push('mirror-brackets');
  if (opts.mirrorSymbols) classes.push('mirror-symbols');
  if (opts.fullArabicMode) classes.push('full-rtl-mode');
  if (opts.displayMode) classes.push('is-display');
  else classes.push('is-inline');

  // Structural classes are derived from the LaTeX shape, not from
  // options, and are appended by the render path when detected.
  if (structuralClass) classes.push(structuralClass);

  return classes;
}

/**
 * Get mirror classes without the base class. Useful when the wrapper
 * already has the base class.
 */
export function getMirrorClasses(options: PartialArabicOptions): string {
  return buildCssClasses(options).filter((c) => c !== 'katex-arabic').join(' ');
}

// ═══════════════════════════════════════════════════════════════
//  HTML wrapping
// ═══════════════════════════════════════════════════════════════

/**
 * Build the Arabic-first font stack used by the wrapper and by the
 * runtime DOM styling. Mirrors the fallback tokens defined on
 * `.katex-arabic` in katex-arabic.css, with the caller's preferred
 * family promoted to the front so both layers stay consistent.
 */
export function buildFontStack(preferred: string): string {
  return (
    `'${preferred}', 'Scheherazade New', 'Noto Naskh Arabic', ` +
    `'Cairo', 'Tajawal', 'KaTeX_Main', 'Latin Modern Math', serif`
  );
}

/**
 * Wrap the KaTeX-rendered HTML in a span with the right classes
 * and inline styles for Arabic rendering.
 */
export function wrapWithArabicStyles(
  html: string,
  options: PartialArabicOptions,
  structuralClass: StructuralClass | null = null,
): string {
  const opts = resolveOptions(options);
  const classes = buildCssClasses(opts, structuralClass);

  // Use CSS variables so all sizes/colors are themable. The font stack
  // is set through --ka-font-family (never as a bare font-family) so the
  // inline value extends — rather than silently replacing — the robust
  // Arabic fallback chain declared in katex-arabic.css.
  return (
    `<span class="${classes.join(' ')}" dir="${opts.direction}" ` +
    `style="direction:${opts.direction};--ka-op-scale:${opts.operatorScale};` +
    `--ka-font-family:${buildFontStack(opts.fontFamily)};">${html}</span>`
  );
}
