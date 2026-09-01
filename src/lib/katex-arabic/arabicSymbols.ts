/**
 * ════════════════════════════════════════════════════════════════
 *  arabicSymbols.ts
 *  Symbol mirroring and Unicode math-symbol definitions.
 *
 *  When an equation is rendered in an RTL context, certain symbols
 *  (≤, ≥, ∫, Σ, …) should appear visually mirrored so that the
 *  smaller / open end faces the start of the reading direction.
 *
 *  This module is the *LaTeX-level* mirror. The CSS layer may
 *  additionally apply `transform: scaleX(-1)` to the rendered
 *  DOM nodes for finer-grained control over glyphs that KaTeX
 *  renders directly (√, ∫, Σ, ∏).
 * ════════════════════════════════════════════════════════════════
 */

import { collectProtectedRegions, isInsideRegions } from './protectedRegions';

// ═══════════════════════════════════════════════════════════════
//  Symbol mirroring tables
// ═══════════════════════════════════════════════════════════════

/**
 * Comparison / inequality operators.
 * In an RTL context, a < b is typically read "a smaller than b" so
 * the small end of the symbol should point right (the start side).
 * The mirror of `<` is `>`, of `≤` is `≥`, etc.
 */
const COMPARISON_MIRRORS: Record<string, string> = {
  '<': '>',
  '>': '<',
  '\\lt': '\\gt',
  '\\gt': '\\lt',
  '\\leq': '\\geq',
  '\\geq': '\\leq',
  '\\le': '\\ge',
  '\\ge': '\\le',
  '\\leqslant': '\\geqslant',
  '\\geqslant': '\\leqslant',
  '\\lesssim': '\\gtrsim',
  '\\gtrsim': '\\lesssim',
  '\\ll': '\\gg',
  '\\gg': '\\ll',
  '\\nless': '\\ngtr',
  '\\ngtr': '\\nless',
  '\\nleq': '\\ngeq',
  '\\ngeq': '\\nleq',
  // Double-struck and slanted comparisons (KaTeX-supported pairs).
  '\\leqq': '\\geqq',
  '\\geqq': '\\leqq',
  '\\eqslantless': '\\eqslantgtr',
  '\\eqslantgtr': '\\eqslantless',
  '\\lll': '\\ggg',
  '\\ggg': '\\lll',
  '\\lneq': '\\gneq',
  '\\gneq': '\\lneq',
  // Predecessor / successor relations.
  '\\prec': '\\succ',
  '\\succ': '\\prec',
  '\\preceq': '\\succeq',
  '\\succeq': '\\preceq',
  '\\nprec': '\\nsucc',
  '\\nsucc': '\\nprec',
  '\\npreceq': '\\nsucceq',
  '\\nsucceq': '\\npreceq',
  // Set relations: like the comparisons above, the open end of the
  // relation faces the reading start (right in RTL) after mirroring,
  // so A ⊂ B is read "A contained in B" with B on the left.
  '\\subset': '\\supset',
  '\\supset': '\\subset',
  '\\subseteq': '\\supseteq',
  '\\supseteq': '\\subseteq',
  '\\subsetneq': '\\supsetneq',
  '\\supsetneq': '\\subsetneq',
  // Membership: the element side faces the reading start.
  '\\in': '\\ni',
  '\\ni': '\\in',
  // Triangle relations.
  '\\vartriangleleft': '\\vartriangleright',
  '\\vartriangleright': '\\vartriangleleft',
  '\\trianglelefteq': '\\trianglerighteq',
  '\\trianglerighteq': '\\trianglelefteq',
  // Diagonal strokes.
  '\\diagup': '\\diagdown',
  '\\diagdown': '\\diagup',
};

/**
 * Arrow mirroring. The arrow head should point to the start of the
 * reading direction (right in RTL), so a \rightarrow becomes \leftarrow.
 */
const ARROW_MIRRORS: Record<string, string> = {
  '\\to': '\\gets',
  '\\gets': '\\to',
  '\\rightarrow': '\\leftarrow',
  '\\leftarrow': '\\rightarrow',
  '\\longrightarrow': '\\longleftarrow',
  '\\longleftarrow': '\\longrightarrow',
  '\\Rightarrow': '\\Leftarrow',
  '\\Leftarrow': '\\Rightarrow',
  '\\Longrightarrow': '\\Longleftarrow',
  '\\Longleftarrow': '\\Longrightarrow',
  '\\hookrightarrow': '\\hookleftarrow',
  '\\hookleftarrow': '\\hookrightarrow',
  '\\mapsto': '\\mapsfrom',
  '\\mapsfrom': '\\mapsto',
  '\\rightleftharpoons': '\\leftrightharpoons',
  '\\leftrightharpoons': '\\rightleftharpoons',
  // Diagonal arrows: the head flips between the four quadrants.
  '\\nearrow': '\\nwarrow',
  '\\nwarrow': '\\nearrow',
  '\\searrow': '\\swarrow',
  '\\swarrow': '\\searrow',
  // Harpoons.
  '\\rightharpoonup': '\\leftharpoonup',
  '\\leftharpoonup': '\\rightharpoonup',
  '\\rightharpoondown': '\\leftharpoondown',
  '\\leftharpoondown': '\\rightharpoondown',
  // Long / double / hooked / looped / two-headed variants.
  '\\Rrightarrow': '\\Lleftarrow',
  '\\Lleftarrow': '\\Rrightarrow',
  '\\twoheadrightarrow': '\\twoheadleftarrow',
  '\\twoheadleftarrow': '\\twoheadrightarrow',
  '\\looparrowright': '\\looparrowleft',
  '\\looparrowleft': '\\looparrowright',
};

/**
 * Bracket mirroring. A round opening bracket "(" points away from
 * the direction of writing, so in RTL we swap the LaTeX command
 * forms (\\langle ↔ \\rangle, \\lbrace ↔ \\rbrace, …).
 *
 * NOTE: We intentionally do NOT mirror raw `(`/`)`/`{`/`}`/`[`/`]`
 * characters. Those are part of LaTeX command syntax (e.g. the
 * braces in `\frac{a}{b}`) and swapping them would break the
 * LaTeX structure.
 */
const BRACKET_MIRRORS: Record<string, string> = {
  '\\langle': '\\rangle',
  '\\rangle': '\\langle',
  '\\lceil': '\\rceil',
  '\\rceil': '\\lceil',
  '\\lfloor': '\\rfloor',
  '\\rfloor': '\\lfloor',
  '\\lbrace': '\\rbrace',
  '\\rbrace': '\\lbrace',
  '\\lbrack': '\\rbrack',
  '\\rbrack': '\\lbrack',
};

/**
 * Unicode literal mirrors. Users often type the *characters*
 * (∈, ⊆, →, …) directly instead of the LaTeX commands. KaTeX accepts
 * them, but the command-level tables above never see a command to
 * swap — so the symbol shows up in its Latin orientation. Map the
 * mirrored character pairs explicitly (every pair is an involution).
 */
const UNICODE_SYMBOL_MIRRORS: Record<string, string> = {
  // Membership and subset relations: the open side of the symbol
  // should face the reading start (right) in RTL, like the commands.
  '∈': '∋',
  '∋': '∈',
  '∉': '∌',
  '∌': '∉',
  '⊂': '⊃',
  '⊃': '⊂',
  '⊆': '⊇',
  '⊇': '⊆',
  '⊊': '⊋',
  '⊋': '⊊',
  // Arrows typed as literal characters.
  '←': '→',
  '→': '←',
  '⇐': '⇒',
  '⇒': '⇐',
  '⟵': '⟶',
  '⟶': '⟵',
  '⟸': '⟹',
  '⟹': '⟸',
};

/**
 * Big-operator mirroring. KaTeX renders Σ, ∏, ∫ as native glyphs,
 * so this table is mainly a fallback for users who write the
 * commands as plain text outside LaTeX.
 */
const BIG_OP_MIRRORS: Record<string, string> = {
  '\\sum': '\\sum',         // mirrored via CSS
  '\\prod': '\\prod',       // mirrored via CSS
  '\\int': '\\int',         // mirrored via CSS
  '\\iint': '\\iint',
  '\\iiint': '\\iiint',
  '\\oint': '\\oint',
};

/**
 * Combined mirror map. Each group can be toggled independently.
 */
export const MIRRORED_SYMBOLS: Record<string, string> = {
  ...COMPARISON_MIRRORS,
  ...ARROW_MIRRORS,
  ...BRACKET_MIRRORS,
  ...UNICODE_SYMBOL_MIRRORS,
  ...BIG_OP_MIRRORS,
};

/**
 * Sub-maps exposed for fine-grained control by callers.
 */
export const COMPARISON_SYMBOLS = COMPARISON_MIRRORS;
export const ARROW_SYMBOLS = ARROW_MIRRORS;
export const BRACKET_SYMBOLS = BRACKET_MIRRORS;
export const UNICODE_SYMBOLS = UNICODE_SYMBOL_MIRRORS;

// ═══════════════════════════════════════════════════════════════
//  Arabic mathematical alphabet (Unicode block U+1EE00 – U+1EEFF)
// ═══════════════════════════════════════════════════════════════

/**
 * The Unicode "Arabic Mathematical Alphabet" provides isolated-form
 * Arabic letters optimized for math typesetting. These are *not*
 * connecting forms; they are intended to behave like individual
 * Latin letters inside an equation.
 */
export const ARABIC_MATH_UNICODE: Record<string, string> = {
  alef: '\u{1EE00}',
  ba: '\u{1EE01}',
  jeem: '\u{1EE02}',
  dal: '\u{1EE03}',
  waw: '\u{1EE05}',
  zain: '\u{1EE06}',
  ha: '\u{1EE07}',
  tah: '\u{1EE08}',
  ya: '\u{1EE09}',
  kaf: '\u{1EE0A}',
  lam: '\u{1EE0B}',
  meem: '\u{1EE0C}',
  noon: '\u{1EE0D}',
  seen: '\u{1EE0E}',
  ain: '\u{1EE0F}',
  fa: '\u{1EE10}',
  sad: '\u{1EE11}',
  qaf: '\u{1EE12}',
  ra: '\u{1EE13}',
  sheen: '\u{1EE14}',
  ta: '\u{1EE15}',
  tha: '\u{1EE16}',
  kha: '\u{1EE17}',
  dhal: '\u{1EE18}',
  dad: '\u{1EE19}',
  ghayn: '\u{1EE1A}',
};

/**
 * Curated special symbols used in Arabic math typography.
 */
export const SPECIAL_ARABIC_SYMBOLS = {
  arabicFractionSlash: '/',
  integralMaghribi: '\\int',  // mirrored visually via CSS
} as const;

// ═══════════════════════════════════════════════════════════════
//  Mirroring engine
// ═══════════════════════════════════════════════════════════════

/**
 * Escape a string for safe use in a RegExp pattern.
 */
function escapeRegex(input: string): string {
  return input.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Build a regex that matches a LaTeX command at a word boundary.
 * For single-character keys (like `<`), we require non-letter
 * neighbors instead of `\b` (which doesn't fire between two
 * non-word characters).
 */
function buildMirrorRegex(key: string): RegExp {
  const escaped = escapeRegex(key);
  if (key.length === 1) {
    return new RegExp(`(?<![A-Za-z\\\\])${escaped}(?![A-Za-z])`, 'g');
  }
  return new RegExp(escaped + '(?![A-Za-z])', 'g');
}

/**
 * Apply symbol mirroring to a LaTeX string.
 *
 * A single left-to-right pass over the *original* string is used. Each
 * symbol is mapped at most once (so `<` never re-mirrors back to `<`),
 * longer commands win over shorter prefixes, and verbatim regions are
 * skipped — all without the offset-shift problems of chained passes.
 *
 * @param latex   LaTeX source.
 * @param enabled Whether mirroring is active.
 */
export function applyMirroredSymbols(latex: string, enabled = true): string {
  if (!enabled) return latex;

  // Sort by length descending so longer commands win at every position
  // (\\longrightarrow before \\rightarrow, \\leqslant before \\leq).
  const sorted = Object.entries(MIRRORED_SYMBOLS).sort(
    (a, b) => b[0].length - a[0].length,
  );

  // Build a single left-to-right pass: each key's pattern (with its own
  // word boundaries) becomes a non-capturing alternative. Scanning the
  // *original* string once means offsets never shift, so protected
  // regions stay valid and no symbol is ever mirrored twice (no ping-pong).
  const pattern = new RegExp(
    sorted.map(([key]) => `(?:${buildMirrorRegex(key).source})`).join('|'),
    'g',
  );

  const mirrorByText = new Map<string, string>(
    sorted.map(([key, value]) => [key, value]),
  );

  // Verbatim spans (\\text{…}, \\operatorname{…}, …) hold user-authored
  // prose and must never be mirrored — they are not math operators.
  const protectedRegions = collectProtectedRegions(latex);

  return latex.replace(pattern, (...args) => {
    // The combined pattern has no capture groups, so the callback is
    // (match, offset, string) — offset is the second argument.
    const match = args[0] as string;
    const offset = args[1] as number;
    if (isInsideRegions(offset, protectedRegions)) return match;
    return mirrorByText.get(match) ?? match;
  });
}
