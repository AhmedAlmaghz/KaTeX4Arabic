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
 *   - Regex safety: the `escapeRegex` helper protects against
 *     special characters in keys when building dynamic patterns.
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

  // ─── Limits (kept as \arabiLim; translated separately) ───
  '\\liminf': '\\operatorname*{نها}',

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

  // ─── Probability & statistics ────────────────────────────
  '\\Pr': '\\operatorname{حا}',
  '\\P': '\\operatorname{حا}',

  // ─── Complex & argument ──────────────────────────────────
  '\\arg': '\\operatorname{سعة}',
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
  '\\limsup': '\\operatorname*{نها}',

  // ─── Special marker used internally for limit translation ─
  // \arabiLim is a sentinel that the translator pipeline replaces
  // with the proper \operatorname* form. Users normally do not write this.
  '\\arabiLim': '\\operatorname*{نها}',
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
  // u: 'ث',
  // v: 'ڤ',
  // w: 'و',

  // ─── Uppercase ───────────────────────────────────────────
  A: 'أ',
  B: 'ب',
  C: 'جـ',
  D: 'د',
  E: 'هـ',
  F: 'ف',
  G: 'ق',
  H: 'ح',
  I: 'ت',
  J: 'ج',
  K: 'ك',
  L: 'ل',
  M: 'م',
  N: 'ن',
  O: 'ع',
  P: 'ح',
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
 */
export const DIFFERENTIAL_PATTERNS: Record<string, string> = {
  dx: '\\text{د}\\text{س}',
  dy: '\\text{د}\\text{ص}',
  dz: '\\text{د}\\text{ع}',
  dt: '\\text{د}\\text{ز}',
  dr: '\\text{د}\\text{ر}',
  du: '\\text{د}\\text{ث}',
  dv: '\\text{د}\\text{ڤ}',
  ds: '\\text{د}\\text{س}',
  dA: '\\text{د}\\text{أ}',
  dV: '\\text{د}\\text{ح}',
  dS: '\\text{د}\\text{س}',
};

// ═══════════════════════════════════════════════════════════════
//  Internal helpers
// ═══════════════════════════════════════════════════════════════

/**
 * Escape a string for safe use in a RegExp pattern.
 * Escapes: \ ^ $ * + ? . ( ) | { } [ ]
 */
function escapeRegex(input: string): string {
  return input.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
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

  // Greek-letter differentials: d\theta, d\phi, d\rho, d\alpha, d\beta.
  result = result.replace(
    /d\\(theta|phi|rho|alpha|beta|gamma|delta)\b/g,
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
 * Implementation note: the pattern has exactly one capture group, so the
 * `replace` callback is `(match, p1, offset, string)` — `offset` is the
 * **third** argument.
 */
export function translateVariables(
  latex: string,
  customMap: Record<string, string> = {},
): string {
  const merged = { ...VARIABLE_MAP, ...customMap };
  const keys = Object.keys(merged);
  if (keys.length === 0) return latex;

  // Longest-first so a multi-character custom key beats single letters.
  const sorted = keys.sort((a, b) => b.length - a.length);
  const protectedRegions = collectProtectedRegions(latex);

  // A variable is a Latin letter (or custom key) that is not surrounded
  // by other Latin letters or a backslash, so command names are untouched.
  const pattern = new RegExp(
    `(?<![A-Za-z\\\\])(${sorted.map(escapeRegex).join('|')})(?![A-Za-z])`,
    'g',
  );

  return latex.replace(pattern, (match, _p1, offset, _string) => {
    const pos = Number(offset);
    if (isInsideRegions(pos, protectedRegions)) return match;
    return `\\text{${merged[match as string] as string}}`;
  });
}

/**
 * Translate `d\theta` and other named Greek differentials to Arabic.
 * Used by the differential pipeline; exposed for completeness.
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
