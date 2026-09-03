/**
 * ════════════════════════════════════════════════════════════════
 *  arabicFunctions.ts
 *  Comprehensive translation dictionaries and transforms that
 *  convert LaTeX function names, variables, and Greek letters
 *  into their Arabic equivalents.
 *
 *  Design notes:
 *   - All keys are LaTeX command names beginning with a backslash,
 *     except for the VARIABLE_MAP which uses single letters.
 *   - Translations never mutate the input. Each function returns
 *     a new string.
 *   - Variable translation uses a single token-aware scan (no regex):
 *     adjacent letters ("ac" in "4ac") are translated independently,
 *     multi-character custom keys win by longest match, and LaTeX
 *     identifiers — command names, \begin{…}/\end{…} environment
 *     names, and dimension units after digits — pass through verbatim.
 * ════════════════════════════════════════════════════════════════
 */

import { collectProtectedRegions, isInsideRegions } from './protectedRegions';

// ═══════════════════════════════════════════════════════════════
//  Function name translation table
// ═══════════════════════════════════════════════════════════════

/**
 * Map of LaTeX command → Arabic operator name.
 * \operatorname* is used for operators with limits (e.g. lim, max, min).
 * \operatorname is used for plain operator names.
 */
export const FUNCTION_MAP: Record<string, string> = {
  // ─── Basic trigonometric ─────────────────────────────────
  '\\sin': '\\operatorname{جا}',
  '\\cos': '\\operatorname{جتا}',
  '\\tan': '\\operatorname{ظا}',
  '\\cot': '\\operatorname{ظتا}',
  '\\sec': '\\operatorname{قا}',
  '\\csc': '\\operatorname{قتا}',

  // ─── Inverse trigonometric ───────────────────────────────
  '\\arcsin': '\\operatorname{جا}^{-1}',
  '\\arccos': '\\operatorname{جتا}^{-1}',
  '\\arctan': '\\operatorname{ظا}^{-1}',
  '\\arccot': '\\operatorname{ظتا}^{-1}',
  '\\arcsec': '\\operatorname{قا}^{-1}',
  '\\arccsc': '\\operatorname{قتا}^{-1}',

  // ─── Hyperbolic ──────────────────────────────────────────
  '\\sinh': '\\operatorname{جـا}',     // جيب زائدي
  '\\cosh': '\\operatorname{جتـا}',    // جيب تمام زائدي
  '\\tanh': '\\operatorname{ظـا}',     // ظل زائدي
  '\\coth': '\\operatorname{ظتـا}',    // ظل تمام زائدي
  '\\sech': '\\operatorname{قـا}',     // قاطع زائدي
  '\\csch': '\\operatorname{قتـا}',    // قاطع تمام زائدي

  // ─── Logarithms & exponentials ───────────────────────────
  '\\ln': '\\operatorname{لو}',
  '\\log': '\\operatorname{لغ}',
  '\\lg': '\\operatorname{لغ}',
  '\\exp': '\\operatorname{هـ}',

  // ─── Limits (kept as \arabiLim; translated separately) ───
  // Named consistently with the \sup / \inf entries (أعلى / أدنى)
  // so the operator vocabulary stays internally coherent.
  '\\liminf': '\\operatorname*{نهـا\\,أدنى}',

  // ─── Maxima / minima ─────────────────────────────────────
  '\\max': '\\operatorname*{أقصى}',
  '\\min': '\\operatorname*{أدنى}',
  '\\sup': '\\operatorname*{حد\\,أعلى}',
  '\\inf': '\\operatorname*{حد\\,أدنى}',

  // ─── Linear algebra ──────────────────────────────────────
  '\\det': '\\operatorname{محدد}',
  '\\dim': '\\operatorname{بعد}',
  '\\ker': '\\operatorname{نواة}',
  '\\rank': '\\operatorname{رتبة}',
  '\\tr': '\\operatorname{أثر}',
  '\\diag': '\\operatorname{قطري}',
  '\\span': '\\operatorname{مدى}',
  '\\null': '\\operatorname{فضاء\\,صفري}',

  // ─── Number theory ───────────────────────────────────────
  '\\gcd': '\\operatorname{ق.م.أ}',
  '\\lcm': '\\operatorname{م.م.أ}',
  '\\mod': '\\operatorname{باقي}',
  '\\bmod': '\\operatorname{باقي}',

  // ─── Combinatorics (التباديل / التوافيق) ───────────────────
  '\perm': '\operatorname{ل}',
  '\comb': '\operatorname{ق}',

  // ─── Probability & statistics ────────────────────────────
  '\\Pr': '\\operatorname{حا}',
  '\\P': '\\operatorname{حا}',

  // ─── Complex & argument ──────────────────────────────────
  '\\arg': '\\operatorname{θ}',
  '\\deg': '\\operatorname{درجة}',
  '\\sgn': '\\operatorname{إشا}',
  '\\Re': '\\operatorname{حق}',
  '\\Im': '\\operatorname{تخ}',
  '\\hom': '\\operatorname{تشا}',
  '\\Hom': '\\operatorname{تشا}',

  // ─── Special operator forms (preserved as-is) ────────────
  // \sum, \prod, \int stay — they are mirrored visually via CSS.
  '\\sum': '\\sum',
  '\\prod': '\\prod',
  '\\coprod': '\\coprod',
  '\\int': '\\int',
  '\\iint': '\\iint',
  '\\iiint': '\\iiint',
  '\\oint': '\\oint',
  '\\partial': '\\partial',
  '\\nabla': '\\nabla',
  '\\infty': '\\infty',
  '\\lim': '\\lim',  // processed via arabiLim pathway
  '\\limsup': '\\operatorname*{نهـا\\,أعلى}',

  // ─── Special marker used internally for limit translation ─
  // \arabiLim is a sentinel that the translator pipeline replaces
  // with the proper \operatorname* form. Users normally do not write this.
  '\\arabiLim': '\\operatorname*{نهـا}',
  // '\\lim': '\\operatorname*{نها}',
};

// ═══════════════════════════════════════════════════════════════
//  Variable translation table (single Latin letters → Arabic)
// ═══════════════════════════════════════════════════════════════

/**
 * Standard mapping of Latin letters to their conventional Arabic
 * equivalents in mathematical literature. The uppercase forms follow
 * the same scheme, with a few exceptions (e.g. E → هـ for Euler's
 * constant, I → ت for the imaginary unit).
 */
export const VARIABLE_MAP: Record<string, string> = {
  // ─── Lowercase ───────────────────────────────────────────
  x: 'س',
  y: 'ص',
  z: 'ع',
  a: 'أ',
  b: 'ب',
  c: 'جـ',
  d: 'د',
  e: 'هـ',     // Euler's number
  f: 'ف',
  g: 'ق',
  h: 'ح',
  i: 'ت',     // imaginary unit
  j: 'ج',
  k: 'ك',
  l: 'ل',
  m: 'م',
  n: 'ن',
  o: 'ع',
  p: 'ب',
  q: 'ق',
  r: 'ر',
  s: 'ز',
  t: 'ت',
  u: 'ث',
  v: 'ڤ',
  w: 'و',
  // Lowercase u/v/w mirror the uppercase entries above (U: 'ث',
  // V: 'ڤ', W: 'و') so that both cases share one convention — and so
  // that differentials (du, dv) never leak a Latin letter into the
  // otherwise-Arabic form \text{د}\text{…}.

  // ─── Uppercase ───────────────────────────────────────────
  A: 'أ',
  B: 'ب',
  C: 'جـ',
  D: 'د',
  E: 'هـ',
  F: 'ف',
  G: 'ق',
  H: 'هـ',
  I: 'ت',
  J: 'جـ',
  K: 'ك',
  L: 'ل',
  M: 'م',
  N: 'ن',
  O: 'ع',
  P: 'حا',
  Q: 'ق',
  R: 'ر',
  S: 'ز',
  T: 'ت',
  U: 'ث',
  V: 'ڤ',
  W: 'و',
  X: 'س',
  Y: 'ص',
  Z: 'ز',
};

// ═══════════════════════════════════════════════════════════════
//  Greek letter table (already Unicode; listed for reference)
// ═══════════════════════════════════════════════════════════════

/**
 * KaTeX renders Greek letters as native Unicode, so no translation
 * is required. This table is provided for documentation and
 * for users who want to inspect the supported set.
 */
export const GREEK_MAP: Record<string, string> = {
  '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ',
  '\\epsilon': 'ε', '\\varepsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η',
  '\\theta': 'θ', '\\vartheta': 'ϑ', '\\iota': 'ι', '\\kappa': 'κ',
  '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ',
  '\\pi': 'π', '\\varpi': 'ϖ', '\\rho': 'ρ', '\\varrho': 'ϱ',
  '\\sigma': 'σ', '\\varsigma': 'ς', '\\tau': 'τ', '\\upsilon': 'υ',
  '\\phi': 'φ', '\\varphi': 'ϕ', '\\chi': 'χ', '\\psi': 'ψ', '\\omega': 'ω',
  '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ',
  '\\Xi': 'Ξ', '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Upsilon': 'Υ',
  '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω',
};

// ═══════════════════════════════════════════════════════════════
//  Differential pattern map
// ═══════════════════════════════════════════════════════════════

/**
 * Convert a `dX` differential to Arabic form: `دX` where X is the
 * Arabic variable. e.g. dx → د س, dθ → د θ.
 *
 * Derived directly from VARIABLE_MAP so this exported table can never
 * drift away from the behaviour of translateDifferentials (which reads
 * VARIABLE_MAP at translation time). Single source of truth.
 */
const DIFFERENTIAL_LETTERS = ['x', 'y', 'z', 't', 'r', 'u', 'v', 's', 'A', 'V', 'S'] as const;

export const DIFFERENTIAL_PATTERNS: Record<string, string> = Object.fromEntries(
  DIFFERENTIAL_LETTERS.map((letter) => [
    `d${letter}`,
    `\\text{د}\\text{${VARIABLE_MAP[letter] ?? letter}}`,
  ]),
);

// ═══════════════════════════════════════════════════════════════
//  Internal helpers
// ═══════════════════════════════════════════════════════════════

/**
 * TeX dimension units. A letter run glued directly to a digit run
 * (5pt, 2em, 1.5cm, …) is a size literal — e.g. `\hspace{5pt}` or
 * `\rule{2cm}` — not math content. The set mirrors TEX_UNIT_PATTERN
 * in rtlRenderer.ts so both pipeline layers agree on what a
 * dimension literal is.
 */
const TEX_DIMENSION_UNITS = new Set([
  'pt', 'mm', 'cm', 'in', 'ex', 'em', 'mu', 'px', 'pc',
  'bp', 'dd', 'cc', 'nd', 'nc', 'sp',
]);

/**
 * Return the index one past the `}` that closes the group whose `{`
 * sits at `open`. Escaped braces (`\{`, `\}`) are skipped. If the
 * group is never closed, the end of the string is returned so callers
 * simply copy the remainder verbatim.
 */
function findMatchingBrace(latex: string, open: number): number {
  let depth = 0;
  for (let k = open; k < latex.length; k++) {
    const c = latex[k];
    if (c === '\\') {
      k++; // skip the escaped character after the backslash
      continue;
    }
    if (c === '{') {
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) return k + 1;
    }
  }
  return latex.length;
}

// ═══════════════════════════════════════════════════════════════
//  Public translation functions
// ═══════════════════════════════════════════════════════════════

/**
 * Translate LaTeX function commands (sin, cos, lim, …) to Arabic.
 *
 * Uses a single left-to-right scan of the source so that:
 *   • the longest command wins at every position (\\arcsin before \\sin),
 *   • verbatim regions (\\text{…}, \\operatorname{…}) are never modified,
 *   • offsets stay stable — there is no cascade of in-place edits that
 *     could re-shift later matches.
 *
 * @param latex     LaTeX source.
 * @param customMap User-supplied overrides merged on top of FUNCTION_MAP.
 */
export function translateFunctions(
  latex: string,
  customMap: Record<string, string> = {},
): string {
  const merged = { ...FUNCTION_MAP, ...customMap };
  const protectedRegions = collectProtectedRegions(latex);

  // Match every LaTeX command token. The greedy match ensures \\sinh is
  // taken as a whole rather than as the prefix \\sin plus "h".
  const cmdPattern = /\\[a-zA-Z]+/g;
  let result = '';
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = cmdPattern.exec(latex)) !== null) {
    const command = m[0];
    const end = m.index + command.length;
    // A command is only a real token when it is not the prefix of a
    // longer letter sequence (e.g. `\\sin` inside `\\sinh`).
    const next = latex[end];
    const followedByLetter = !!next && /[A-Za-z]/.test(next);

    const replacement = followedByLetter ? undefined : merged[command];
    if (replacement !== undefined && !isInsideRegions(m.index, protectedRegions)) {
      result += latex.slice(cursor, m.index) + replacement;
      cursor = end;
      continue;
    }
    // No translation: copy this token (and any pending gaps) verbatim.
    result += latex.slice(cursor, end);
    cursor = end;
  }

  result += latex.slice(cursor);
  return result;
}

/**
 * Translate differential patterns like `dx`, `dy`, `d\theta` to their
 * Arabic equivalents.
 */
export function translateDifferentials(latex: string): string {
  let result = latex;

  // Latin-letter differentials: dx, dy, dz, dt, dr, du, dv, ds.
  // Use a non-letter boundary on each side so we don't match `idx` or `dxyz`.
  result = result.replace(
    /\bd([xyztruvs])\b/g,
    (_match, letter: string) => {
      const arabic = VARIABLE_MAP[letter] ?? letter;
      return `\\text{د}\\text{${arabic}}`;
    },
  );

  // Greek-letter differentials: d\theta, d\phi, d\rho, d\alpha, …
  // Covers every lowercase Greek command KaTeX supports, so a
  // differential never leaks through untranslated.
  result = result.replace(
    /d\\(alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|vartheta|theta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|varphi|phi|chi|psi|omega)\b/g,
    (_match, greek: string) => `\\text{د}\\${greek}`,
  );

  // Capital differentials: dA, dV, dS.
  result = result.replace(
    /\bd([AVS])\b/g,
    (_match, letter: string) => {
      const arabic = VARIABLE_MAP[letter] ?? letter;
      return `\\text{د}\\text{${arabic}}`;
    },
  );

  return result;
}

/**
 * Translate standalone Latin variables to their Arabic equivalents.
 *
 * Critical: avoid translating inside LaTeX commands, math text blocks,
 * and \\operatorname names. We pre-compute the "protected" regions once
 * and run a single combined pass so that no offset ever shifts.
 *
 * The scan is token-aware, in this order:
 *   1. `\\command` names are copied verbatim — they are never variables.
 *      The \\begin{…} / \\end{…} environment name (and, for array-style
 *      environments, the column-specification group that follows) is an
 *      identifier too, so it is copied through its closing brace.
 *   2. A letter run glued directly to a preceding digit run is a TeX
 *      dimension unit (5pt, 1.5em, 2cm, …) — a size literal like
 *      `\\hspace{5pt}`, not math content — and is emitted verbatim,
 *      mirroring the units guard in rtlRenderer.ts so the numeral stage
 *      keeps the whole dimension intact.
 *   3. Otherwise the longest key in the merged map wins: adjacent
 *      letters ("ac" in "4ac") still translate independently, while a
 *      multi-character custom key ("ab") beats the single letters
 *      "a" / "b" at the same position.
 */
export function translateVariables(
  latex: string,
  customMap: Record<string, string> = {},
): string {
  const merged = { ...VARIABLE_MAP, ...customMap };
  // Longest first so multi-character custom keys win over the
  // single-letter entries at the same position. Empty keys are dropped:
  // they would match everywhere and never advance the cursor.
  const sortedKeys = Object.keys(merged)
    .filter((key) => key.length > 0)
    .sort((a, b) => b.length - a.length);
  const protectedRegions = collectProtectedRegions(latex);

  let result = '';
  let i = 0;
  while (i < latex.length) {
    const ch = latex[i];

    // ── 1. LaTeX commands: `\name` is never a variable. ──────────
    if (ch === '\\' && i + 1 < latex.length && /[a-zA-Z]/.test(latex[i + 1])) {
      let j = i + 1;
      while (j < latex.length && /[a-zA-Z]/.test(latex[j])) {
        j++;
      }
      const command = latex.slice(i + 1, j);

      // Environment names (\begin{cases}, \end{pmatrix}, …) are
      // identifiers: copy the whole brace group verbatim, otherwise
      // "cases" would turn into Arabic letters and KaTeX would reject
      // the environment name.
      if (command === 'begin' || command === 'end') {
        // KaTeX's lexer skips whitespace between the control word and
        // its argument, so `\begin {cases}` is legal LaTeX too.
        let k = j;
        while (k < latex.length && /\s/.test(latex[k])) {
          k++;
        }
        if (latex[k] === '{') {
          const groupEnd = findMatchingBrace(latex, k);
          result += latex.slice(i, groupEnd);
          i = groupEnd;

          // `\begin{array}`-style environments take a column-spec
          // group ({cc|l}, …) right after the name. That group is an
          // identifier block too, so copy it verbatim when present.
          const envName = latex.slice(k + 1, groupEnd - 1);
          if (
            command === 'begin' &&
            (envName === 'array' || envName === 'darray' || envName === 'subarray')
          ) {
            let s = i;
            while (s < latex.length && /\s/.test(latex[s])) {
              s++;
            }
            if (latex[s] === '{') {
              const specEnd = findMatchingBrace(latex, s);
              result += latex.slice(i, specEnd);
              i = specEnd;
            }
          }
          continue;
        }
      }

      result += latex.slice(i, j);
      i = j;
      continue;
    }

    // ── 2. Dimension units: a letter run glued to a digit run. ──
    if (/[a-zA-Z]/.test(ch) && i > 0 && /[0-9]/.test(latex[i - 1])) {
      let j = i;
      while (j < latex.length && /[a-zA-Z]/.test(latex[j])) {
        j++;
      }
      if (TEX_DIMENSION_UNITS.has(latex.slice(i, j))) {
        result += latex.slice(i, j);
        i = j;
        continue;
      }
    }

    // ── 3. Variable keys, longest first, outside protected regions. ──
    // Adjacent letters (e.g. "ac" in "4ac") are translated
    // independently — the scan walks the *input*, so offsets never
    // shift mid-pass.
    if (!isInsideRegions(i, protectedRegions)) {
      let matched = false;
      for (const key of sortedKeys) {
        if (latex.startsWith(key, i)) {
          result += `\\text{${merged[key] as string}}`;
          i += key.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }

    result += ch;
    i++;
  }
  return result;
}

/**
 * Translate special patterns like differentials (dx, dθ) to Arabic.
 * Kept as a thin wrapper for API compatibility.
 */
export function translateSpecialPatterns(latex: string): string {
  return translateDifferentials(latex);
}

/**
 * Translate everything: differentials, functions, and variables.
 * Each step is independent and may be toggled by the caller.
 */
export function translateAll(
  latex: string,
  options: {
    functions?: boolean;
    variables?: boolean;
    differentials?: boolean;
    customFunctionMap?: Record<string, string>;
    customVariableMap?: Record<string, string>;
  } = {},
): string {
  const {
    functions = true,
    variables = true,
    differentials = true,
    customFunctionMap = {},
    customVariableMap = {},
  } = options;

  let result = latex;

  // Order matters:
  //   1. Differentials — must run before variables, otherwise `dx` becomes
  //      `\text{د}x` and the `x` inside won't be protected.
  //   2. Functions — convert command names to Arabic operators. Limit
  //      commands are routed through a sentinel to preserve limits notation.
  //   3. Variables — single-letter translation, with protection of all
  //      previously-inserted \text{} and \operatorname{} regions.
  if (differentials) {
    result = translateDifferentials(result);
  }
  if (functions) {
    result = translateFunctions(result, customFunctionMap);
  }
  if (variables) {
    result = translateVariables(result, customVariableMap);
  }

  return result;
}
