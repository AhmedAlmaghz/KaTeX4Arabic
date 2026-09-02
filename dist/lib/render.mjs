import katex from "katex";
const ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const EXTENDED_ARABIC = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const DIGIT_MAP = {
  arabic: ARABIC_INDIC,
  extended: EXTENDED_ARABIC
};
function toArabicNumerals(input, style = "arabic") {
  if (style === "latin") return String(input);
  const digits = DIGIT_MAP[style];
  return String(input).replace(/[0-9]/g, (d) => digits[Number(d)]);
}
function fromArabicNumerals(input) {
  return String(input).replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC.indexOf(d))).replace(/[۰-۹]/g, (d) => String(EXTENDED_ARABIC.indexOf(d)));
}
function formatArabicNumber(numStr) {
  return numStr.replace(/,/g, "٬").replace(/\./g, "٫").replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)]);
}
function convertNumbersInText(text, style = "arabic", formatSeparators = true) {
  if (style === "latin") return text;
  return text.replace(/\d+(?:[.,]\d+)*/g, (match) => {
    if (formatSeparators) {
      return formatArabicNumber(match);
    }
    return toArabicNumerals(match, style);
  });
}
function isArabicDigit(ch) {
  return /[٠-٩۰-۹]/.test(ch);
}
const VERBATIM_MACROS = [
  "text",
  "textnormal",
  "textbf",
  "textit",
  "textrm",
  "mathrm",
  "mathbf",
  "mathit",
  "mathtt",
  "mathsf",
  "mathscr",
  "mathfrak",
  "mathbb",
  "mathcal",
  "color",
  "textcolor",
  "operatorname",
  "operatorname*",
  "operatornamewithlimits"
];
const VERBATIM_PATTERN = new RegExp(
  `\\\\(?:${VERBATIM_MACROS.join("|")})\\{[^}]*\\}`,
  "g"
);
function collectProtectedRegions(latex) {
  const regions = [];
  let m;
  VERBATIM_PATTERN.lastIndex = 0;
  while ((m = VERBATIM_PATTERN.exec(latex)) !== null) {
    regions.push({ start: m.index, end: m.index + m[0].length });
  }
  regions.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const r of regions) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) {
      last.end = Math.max(last.end, r.end);
    } else {
      merged.push({ ...r });
    }
  }
  return merged;
}
function isInsideRegions(pos, regions) {
  for (const r of regions) {
    if (pos >= r.start && pos < r.end) return true;
    if (r.start > pos) break;
  }
  return false;
}
const FUNCTION_MAP = {
  // ─── Basic trigonometric ─────────────────────────────────
  "\\sin": "\\operatorname{جا}",
  "\\cos": "\\operatorname{جتا}",
  "\\tan": "\\operatorname{ظا}",
  "\\cot": "\\operatorname{ظتا}",
  "\\sec": "\\operatorname{قا}",
  "\\csc": "\\operatorname{قتا}",
  // ─── Inverse trigonometric ───────────────────────────────
  "\\arcsin": "\\operatorname{جا}^{-1}",
  "\\arccos": "\\operatorname{جتا}^{-1}",
  "\\arctan": "\\operatorname{ظا}^{-1}",
  "\\arccot": "\\operatorname{ظتا}^{-1}",
  "\\arcsec": "\\operatorname{قا}^{-1}",
  "\\arccsc": "\\operatorname{قتا}^{-1}",
  // ─── Hyperbolic ──────────────────────────────────────────
  "\\sinh": "\\operatorname{جـا}",
  // جيب زائدي
  "\\cosh": "\\operatorname{جتـا}",
  // جيب تمام زائدي
  "\\tanh": "\\operatorname{ظـا}",
  // ظل زائدي
  "\\coth": "\\operatorname{ظتـا}",
  // ظل تمام زائدي
  "\\sech": "\\operatorname{قـا}",
  // قاطع زائدي
  "\\csch": "\\operatorname{قتـا}",
  // قاطع تمام زائدي
  // ─── Logarithms & exponentials ───────────────────────────
  "\\ln": "\\operatorname{لو}",
  "\\log": "\\operatorname{لغ}",
  "\\lg": "\\operatorname{لغ}",
  "\\exp": "\\operatorname{هـ}",
  // ─── Limits (kept as \arabiLim; translated separately) ───
  // Named consistently with the \sup / \inf entries (أعلى / أدنى)
  // so the operator vocabulary stays internally coherent.
  "\\liminf": "\\operatorname*{نهـا\\,أدنى}",
  // ─── Maxima / minima ─────────────────────────────────────
  "\\max": "\\operatorname*{أقصى}",
  "\\min": "\\operatorname*{أدنى}",
  "\\sup": "\\operatorname*{حد\\,أعلى}",
  "\\inf": "\\operatorname*{حد\\,أدنى}",
  // ─── Linear algebra ──────────────────────────────────────
  "\\det": "\\operatorname{محدد}",
  "\\dim": "\\operatorname{بعد}",
  "\\ker": "\\operatorname{نواة}",
  "\\rank": "\\operatorname{رتبة}",
  "\\tr": "\\operatorname{أثر}",
  "\\diag": "\\operatorname{قطري}",
  "\\span": "\\operatorname{مدى}",
  "\\null": "\\operatorname{فضاء\\,صفري}",
  // ─── Number theory ───────────────────────────────────────
  "\\gcd": "\\operatorname{ق.م.أ}",
  "\\lcm": "\\operatorname{م.م.أ}",
  "\\mod": "\\operatorname{باقي}",
  "\\bmod": "\\operatorname{باقي}",
  // ─── Probability & statistics ────────────────────────────
  "\\Pr": "\\operatorname{حا}",
  "\\P": "\\operatorname{حا}",
  // ─── Complex & argument ──────────────────────────────────
  "\\arg": "\\operatorname{سعة}",
  "\\deg": "\\operatorname{درجة}",
  "\\sgn": "\\operatorname{إشا}",
  "\\Re": "\\operatorname{حق}",
  "\\Im": "\\operatorname{تخ}",
  "\\hom": "\\operatorname{تشا}",
  "\\Hom": "\\operatorname{تشا}",
  // ─── Special operator forms (preserved as-is) ────────────
  // \sum, \prod, \int stay — they are mirrored visually via CSS.
  "\\sum": "\\sum",
  "\\prod": "\\prod",
  "\\coprod": "\\coprod",
  "\\int": "\\int",
  "\\iint": "\\iint",
  "\\iiint": "\\iiint",
  "\\oint": "\\oint",
  "\\partial": "\\partial",
  "\\nabla": "\\nabla",
  "\\infty": "\\infty",
  "\\lim": "\\lim",
  // processed via arabiLim pathway
  "\\limsup": "\\operatorname*{نهـا\\,أعلى}",
  // ─── Special marker used internally for limit translation ─
  // \arabiLim is a sentinel that the translator pipeline replaces
  // with the proper \operatorname* form. Users normally do not write this.
  "\\arabiLim": "\\operatorname*{نهـا}"
  // '\\lim': '\\operatorname*{نها}',
};
const VARIABLE_MAP = {
  // ─── Lowercase ───────────────────────────────────────────
  x: "س",
  y: "ص",
  z: "ع",
  a: "أ",
  b: "ب",
  c: "جـ",
  d: "د",
  e: "هـ",
  // Euler's number
  f: "ف",
  g: "ق",
  h: "ح",
  i: "ت",
  // imaginary unit
  j: "ج",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  o: "ع",
  p: "ب",
  q: "ق",
  r: "ر",
  s: "ز",
  t: "ت",
  u: "ث",
  v: "ڤ",
  w: "و",
  // Lowercase u/v/w mirror the uppercase entries above (U: 'ث',
  // V: 'ڤ', W: 'و') so that both cases share one convention — and so
  // that differentials (du, dv) never leak a Latin letter into the
  // otherwise-Arabic form \text{د}\text{…}.
  // ─── Uppercase ───────────────────────────────────────────
  A: "أ",
  B: "ب",
  C: "جـ",
  D: "د",
  E: "هـ",
  F: "ف",
  G: "ق",
  H: "هـ",
  I: "ت",
  J: "جـ",
  K: "ك",
  L: "ل",
  M: "م",
  N: "ن",
  O: "ع",
  P: "حا",
  Q: "ق",
  R: "ر",
  S: "ز",
  T: "ت",
  U: "ث",
  V: "ڤ",
  W: "و",
  X: "س",
  Y: "ص",
  Z: "ز"
};
const GREEK_MAP = {
  "\\alpha": "α",
  "\\beta": "β",
  "\\gamma": "γ",
  "\\delta": "δ",
  "\\epsilon": "ε",
  "\\varepsilon": "ε",
  "\\zeta": "ζ",
  "\\eta": "η",
  "\\theta": "θ",
  "\\vartheta": "ϑ",
  "\\iota": "ι",
  "\\kappa": "κ",
  "\\lambda": "λ",
  "\\mu": "μ",
  "\\nu": "ν",
  "\\xi": "ξ",
  "\\pi": "π",
  "\\varpi": "ϖ",
  "\\rho": "ρ",
  "\\varrho": "ϱ",
  "\\sigma": "σ",
  "\\varsigma": "ς",
  "\\tau": "τ",
  "\\upsilon": "υ",
  "\\phi": "φ",
  "\\varphi": "ϕ",
  "\\chi": "χ",
  "\\psi": "ψ",
  "\\omega": "ω",
  "\\Gamma": "Γ",
  "\\Delta": "Δ",
  "\\Theta": "Θ",
  "\\Lambda": "Λ",
  "\\Xi": "Ξ",
  "\\Pi": "Π",
  "\\Sigma": "Σ",
  "\\Upsilon": "Υ",
  "\\Phi": "Φ",
  "\\Psi": "Ψ",
  "\\Omega": "Ω"
};
const DIFFERENTIAL_LETTERS = ["x", "y", "z", "t", "r", "u", "v", "s", "A", "V", "S"];
const DIFFERENTIAL_PATTERNS = Object.fromEntries(
  DIFFERENTIAL_LETTERS.map((letter) => [
    `d${letter}`,
    `\\text{د}\\text{${VARIABLE_MAP[letter] ?? letter}}`
  ])
);
const TEX_DIMENSION_UNITS = /* @__PURE__ */ new Set([
  "pt",
  "mm",
  "cm",
  "in",
  "ex",
  "em",
  "mu",
  "px",
  "pc",
  "bp",
  "dd",
  "cc",
  "nd",
  "nc",
  "sp"
]);
function findMatchingBrace(latex, open) {
  let depth = 0;
  for (let k = open; k < latex.length; k++) {
    const c = latex[k];
    if (c === "\\") {
      k++;
      continue;
    }
    if (c === "{") {
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0) return k + 1;
    }
  }
  return latex.length;
}
function translateFunctions(latex, customMap = {}) {
  const merged = { ...FUNCTION_MAP, ...customMap };
  const protectedRegions = collectProtectedRegions(latex);
  const cmdPattern = /\\[a-zA-Z]+/g;
  let result = "";
  let cursor = 0;
  let m;
  while ((m = cmdPattern.exec(latex)) !== null) {
    const command = m[0];
    const end = m.index + command.length;
    const next = latex[end];
    const followedByLetter = !!next && /[A-Za-z]/.test(next);
    const replacement = followedByLetter ? void 0 : merged[command];
    if (replacement !== void 0 && !isInsideRegions(m.index, protectedRegions)) {
      result += latex.slice(cursor, m.index) + replacement;
      cursor = end;
      continue;
    }
    result += latex.slice(cursor, end);
    cursor = end;
  }
  result += latex.slice(cursor);
  return result;
}
function translateDifferentials(latex) {
  let result = latex;
  result = result.replace(
    /\bd([xyztruvs])\b/g,
    (_match, letter) => {
      const arabic = VARIABLE_MAP[letter] ?? letter;
      return `\\text{د}\\text{${arabic}}`;
    }
  );
  result = result.replace(
    /d\\(alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|vartheta|theta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|varphi|phi|chi|psi|omega)\b/g,
    (_match, greek) => `\\text{د}\\${greek}`
  );
  result = result.replace(
    /\bd([AVS])\b/g,
    (_match, letter) => {
      const arabic = VARIABLE_MAP[letter] ?? letter;
      return `\\text{د}\\text{${arabic}}`;
    }
  );
  return result;
}
function translateVariables(latex, customMap = {}) {
  const merged = { ...VARIABLE_MAP, ...customMap };
  const sortedKeys = Object.keys(merged).filter((key) => key.length > 0).sort((a, b) => b.length - a.length);
  const protectedRegions = collectProtectedRegions(latex);
  let result = "";
  let i = 0;
  while (i < latex.length) {
    const ch = latex[i];
    if (ch === "\\" && i + 1 < latex.length && /[a-zA-Z]/.test(latex[i + 1])) {
      let j = i + 1;
      while (j < latex.length && /[a-zA-Z]/.test(latex[j])) {
        j++;
      }
      const command = latex.slice(i + 1, j);
      if (command === "begin" || command === "end") {
        let k = j;
        while (k < latex.length && /\s/.test(latex[k])) {
          k++;
        }
        if (latex[k] === "{") {
          const groupEnd = findMatchingBrace(latex, k);
          result += latex.slice(i, groupEnd);
          i = groupEnd;
          const envName = latex.slice(k + 1, groupEnd - 1);
          if (command === "begin" && (envName === "array" || envName === "darray" || envName === "subarray")) {
            let s = i;
            while (s < latex.length && /\s/.test(latex[s])) {
              s++;
            }
            if (latex[s] === "{") {
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
    if (!isInsideRegions(i, protectedRegions)) {
      let matched = false;
      for (const key of sortedKeys) {
        if (latex.startsWith(key, i)) {
          result += `\\text{${merged[key]}}`;
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
function translateSpecialPatterns(latex) {
  return translateDifferentials(latex);
}
function translateAll(latex, options = {}) {
  const {
    functions = true,
    variables = true,
    differentials = true,
    customFunctionMap = {},
    customVariableMap = {}
  } = options;
  let result = latex;
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
const COMPARISON_MIRRORS = {
  "<": ">",
  ">": "<",
  "\\lt": "\\gt",
  "\\gt": "\\lt",
  "\\leq": "\\geq",
  "\\geq": "\\leq",
  "\\le": "\\ge",
  "\\ge": "\\le",
  "\\leqslant": "\\geqslant",
  "\\geqslant": "\\leqslant",
  "\\lesssim": "\\gtrsim",
  "\\gtrsim": "\\lesssim",
  "\\ll": "\\gg",
  "\\gg": "\\ll",
  "\\nless": "\\ngtr",
  "\\ngtr": "\\nless",
  "\\nleq": "\\ngeq",
  "\\ngeq": "\\nleq",
  // Double-struck and slanted comparisons (KaTeX-supported pairs).
  "\\leqq": "\\geqq",
  "\\geqq": "\\leqq",
  "\\eqslantless": "\\eqslantgtr",
  "\\eqslantgtr": "\\eqslantless",
  "\\lll": "\\ggg",
  "\\ggg": "\\lll",
  "\\lneq": "\\gneq",
  "\\gneq": "\\lneq",
  // Predecessor / successor relations.
  "\\prec": "\\succ",
  "\\succ": "\\prec",
  "\\preceq": "\\succeq",
  "\\succeq": "\\preceq",
  "\\nprec": "\\nsucc",
  "\\nsucc": "\\nprec",
  "\\npreceq": "\\nsucceq",
  "\\nsucceq": "\\npreceq",
  // Set relations: like the comparisons above, the open end of the
  // relation faces the reading start (right in RTL) after mirroring,
  // so A ⊂ B is read "A contained in B" with B on the left.
  "\\subset": "\\supset",
  "\\supset": "\\subset",
  "\\subseteq": "\\supseteq",
  "\\supseteq": "\\subseteq",
  "\\subsetneq": "\\supsetneq",
  "\\supsetneq": "\\subsetneq",
  // Membership: the element side faces the reading start.
  "\\in": "\\ni",
  "\\ni": "\\in",
  // Triangle relations.
  "\\vartriangleleft": "\\vartriangleright",
  "\\vartriangleright": "\\vartriangleleft",
  "\\trianglelefteq": "\\trianglerighteq",
  "\\trianglerighteq": "\\trianglelefteq",
  // Diagonal strokes.
  "\\diagup": "\\diagdown",
  "\\diagdown": "\\diagup"
};
const ARROW_MIRRORS = {
  "\\to": "\\gets",
  "\\gets": "\\to",
  "\\rightarrow": "\\leftarrow",
  "\\leftarrow": "\\rightarrow",
  "\\longrightarrow": "\\longleftarrow",
  "\\longleftarrow": "\\longrightarrow",
  "\\Rightarrow": "\\Leftarrow",
  "\\Leftarrow": "\\Rightarrow",
  "\\Longrightarrow": "\\Longleftarrow",
  "\\Longleftarrow": "\\Longrightarrow",
  "\\hookrightarrow": "\\hookleftarrow",
  "\\hookleftarrow": "\\hookrightarrow",
  "\\mapsto": "\\mapsfrom",
  "\\mapsfrom": "\\mapsto",
  "\\rightleftharpoons": "\\leftrightharpoons",
  "\\leftrightharpoons": "\\rightleftharpoons",
  // Diagonal arrows: the head flips between the four quadrants.
  "\\nearrow": "\\nwarrow",
  "\\nwarrow": "\\nearrow",
  "\\searrow": "\\swarrow",
  "\\swarrow": "\\searrow",
  // Harpoons.
  "\\rightharpoonup": "\\leftharpoonup",
  "\\leftharpoonup": "\\rightharpoonup",
  "\\rightharpoondown": "\\leftharpoondown",
  "\\leftharpoondown": "\\rightharpoondown",
  // Long / double / hooked / looped / two-headed variants.
  "\\Rrightarrow": "\\Lleftarrow",
  "\\Lleftarrow": "\\Rrightarrow",
  "\\twoheadrightarrow": "\\twoheadleftarrow",
  "\\twoheadleftarrow": "\\twoheadrightarrow",
  "\\looparrowright": "\\looparrowleft",
  "\\looparrowleft": "\\looparrowright"
};
const BRACKET_MIRRORS = {
  "\\langle": "\\rangle",
  "\\rangle": "\\langle",
  "\\lceil": "\\rceil",
  "\\rceil": "\\lceil",
  "\\lfloor": "\\rfloor",
  "\\rfloor": "\\lfloor",
  "\\lbrace": "\\rbrace",
  "\\rbrace": "\\lbrace",
  "\\lbrack": "\\rbrack",
  "\\rbrack": "\\lbrack"
};
const UNICODE_SYMBOL_MIRRORS = {
  // Membership and subset relations: the open side of the symbol
  // should face the reading start (right) in RTL, like the commands.
  "∈": "∋",
  "∋": "∈",
  "∉": "∌",
  "∌": "∉",
  "⊂": "⊃",
  "⊃": "⊂",
  "⊆": "⊇",
  "⊇": "⊆",
  "⊊": "⊋",
  "⊋": "⊊",
  // Arrows typed as literal characters.
  "←": "→",
  "→": "←",
  "⇐": "⇒",
  "⇒": "⇐",
  "⟵": "⟶",
  "⟶": "⟵",
  "⟸": "⟹",
  "⟹": "⟸"
};
const BIG_OP_MIRRORS = {
  "\\sum": "\\sum",
  // mirrored via CSS
  "\\prod": "\\prod",
  // mirrored via CSS
  "\\int": "\\int",
  // mirrored via CSS
  "\\iint": "\\iint",
  "\\iiint": "\\iiint",
  "\\oint": "\\oint"
};
const MIRRORED_SYMBOLS = {
  ...COMPARISON_MIRRORS,
  ...ARROW_MIRRORS,
  ...BRACKET_MIRRORS,
  ...UNICODE_SYMBOL_MIRRORS,
  ...BIG_OP_MIRRORS
};
const COMPARISON_SYMBOLS = COMPARISON_MIRRORS;
const ARROW_SYMBOLS = ARROW_MIRRORS;
const BRACKET_SYMBOLS = BRACKET_MIRRORS;
const UNICODE_SYMBOLS = UNICODE_SYMBOL_MIRRORS;
const ARABIC_MATH_UNICODE = {
  alef: "𞸀",
  ba: "𞸁",
  jeem: "𞸂",
  dal: "𞸃",
  waw: "𞸅",
  zain: "𞸆",
  ha: "𞸇",
  tah: "𞸈",
  ya: "𞸉",
  kaf: "𞸊",
  lam: "𞸋",
  meem: "𞸌",
  noon: "𞸍",
  seen: "𞸎",
  ain: "𞸏",
  fa: "𞸐",
  sad: "𞸑",
  qaf: "𞸒",
  ra: "𞸓",
  sheen: "𞸔",
  ta: "𞸕",
  tha: "𞸖",
  kha: "𞸗",
  dhal: "𞸘",
  dad: "𞸙",
  ghayn: "𞸚"
};
const SPECIAL_ARABIC_SYMBOLS = {
  arabicFractionSlash: "/",
  integralMaghribi: "\\int"
  // mirrored visually via CSS
};
function escapeRegex(input) {
  return input.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
function buildMirrorRegex(key) {
  const escaped = escapeRegex(key);
  if (key.length === 1) {
    return new RegExp(`(?<![A-Za-z\\\\])${escaped}(?![A-Za-z])`, "g");
  }
  return new RegExp(escaped + "(?![A-Za-z])", "g");
}
function applyMirroredSymbols(latex, enabled = true) {
  if (!enabled) return latex;
  const sorted = Object.entries(MIRRORED_SYMBOLS).sort(
    (a, b) => b[0].length - a[0].length
  );
  const pattern = new RegExp(
    sorted.map(([key]) => `(?:${buildMirrorRegex(key).source})`).join("|"),
    "g"
  );
  const mirrorByText = new Map(
    sorted.map(([key, value]) => [key, value])
  );
  const protectedRegions = collectProtectedRegions(latex);
  return latex.replace(pattern, (...args) => {
    const match = args[0];
    const offset = args[1];
    if (isInsideRegions(offset, protectedRegions)) return match;
    return mirrorByText.get(match) ?? match;
  });
}
const MAX_INPUT_LENGTH = 2e4;
const CACHE_CAPACITY = 256;
class LruCache {
  constructor(capacity) {
    this.capacity = capacity;
  }
  capacity;
  map = /* @__PURE__ */ new Map();
  get(key) {
    const value = this.map.get(key);
    if (value !== void 0) {
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const firstKey = this.map.keys().next().value;
      if (firstKey !== void 0) this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }
  clear() {
    this.map.clear();
  }
  get size() {
    return this.map.size;
  }
}
const renderCache = new LruCache(CACHE_CAPACITY);
function clearRenderCache() {
  renderCache.clear();
}
function buildCacheKey(latex, opts) {
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
    opts.minRuleThickness
  ].join("|");
}
const DEFAULT_OPTIONS = {
  // Numerals
  numerals: "arabic",
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
  direction: "rtl",
  fontFamily: "Amiri",
  displayMode: false,
  fullArabicMode: true,
  // 1.05 compensates for the x-height difference between Arabic fonts
  // (Amiri et al.) and KaTeX_Main, so Arabic operator names (جا، جتا…)
  // visually match the size of their Latin counterparts out of the box.
  operatorScale: 1.05,
  // KaTeX
  macros: {},
  throwOnError: false,
  output: "html",
  strict: false,
  trust: false,
  minRuleThickness: 0.04
};
function resolveOptions(overrides = {}) {
  return { ...DEFAULT_OPTIONS, ...overrides };
}
function processArabicLatex(latex, options = {}) {
  const opts = resolveOptions(options);
  let processed = latex.length > MAX_INPUT_LENGTH ? latex.slice(0, MAX_INPUT_LENGTH) : latex;
  if (!processed.trim()) return processed;
  if (opts.translateFuncs) {
    processed = processed.replace(/\\lim(?![A-Za-z])/g, "\\arabiLim");
  }
  if (opts.translateDiffs) {
    processed = translateDifferentials(processed);
  }
  if (opts.translateFuncs) {
    processed = translateFunctions(processed, opts.customFunctionMap);
  }
  if (opts.translateVars) {
    processed = translateVariables(processed, opts.customVariableMap);
  }
  if (opts.mirrorSymbols) {
    processed = applyMirroredSymbols(processed, true);
  }
  if (opts.numerals !== "latin") {
    processed = convertNumbersInLatex(processed, opts.numerals, opts.formatNumbers);
  }
  return processed;
}
const TEX_UNIT_PATTERN = /^(?:pt|mm|cm|in|ex|em|mu|px|pc|bp|dd|cc|nd|nc|sp)/;
function convertNumbersInLatex(latex, style, formatSeparators) {
  let result = "";
  let i = 0;
  while (i < latex.length) {
    const ch = latex[i];
    if (ch && /[0-9]/.test(ch)) {
      const prev = i > 0 ? latex[i - 1] : "";
      if (prev && /[A-Za-z]/.test(prev)) {
        result += ch;
      } else {
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
        if (TEX_UNIT_PATTERN.test(latex.slice(j, j + 2))) {
          result += run;
          i = j;
          continue;
        }
        result += formatSeparators ? formatArabicNumber(run) : toArabicNumerals(run, style);
        i = j;
        continue;
      }
    } else {
      result += ch ?? "";
    }
    i++;
  }
  return result;
}
function getArabicMacros(customMacros = {}) {
  return {
    // Trigonometric
    "\\جا": "\\operatorname{جا}",
    "\\جتا": "\\operatorname{جتا}",
    "\\ظا": "\\operatorname{ظا}",
    "\\ظتا": "\\operatorname{ظتا}",
    "\\قا": "\\operatorname{قا}",
    "\\قتا": "\\operatorname{قتا}",
    // Logarithms
    "\\لو": "\\operatorname{لو}",
    "\\لغ": "\\operatorname{لغ}",
    // Limits
    "\\نها": "\\operatorname*{نها}",
    "\\نهى": "\\operatorname*{نها}",
    // Max/min
    "\\اقصى": "\\operatorname*{أقصى}",
    "\\ادنى": "\\operatorname*{أدنى}",
    // Imaginary / constants
    "\\ت": "\\text{ت}",
    "\\هـ": "\\text{هـ}",
    // \pmod keeps its argument: the macro consumes {…} and renders the
    // parenthesized Arabic form — matching LaTeX's own \pmod semantics
    // (KaTeX lets a user macro override the built-in \pmod).
    "\\pmod": "\\,(\\operatorname{باقي}\\,#1)",
    ...customMacros
  };
}
const CASES_ENV_PATTERN = /\\begin\{(?:cases|dcases)\}/g;
const LEFT_BRACE_PATTERN = /\\left\\\{/g;
const RIGHT_DOT_PATTERN = /\\right\./g;
function detectStructuralClass(latex) {
  if (!latex) return null;
  const protectedRegions = collectProtectedRegions(latex);
  const occursOutsideProse = (pattern) => {
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(latex)) !== null) {
      if (!isInsideRegions(m.index, protectedRegions)) return true;
    }
    return false;
  };
  if (occursOutsideProse(CASES_ENV_PATTERN)) return "has-cases";
  if (occursOutsideProse(LEFT_BRACE_PATTERN) && occursOutsideProse(RIGHT_DOT_PATTERN)) {
    return "has-cases";
  }
  return null;
}
function buildCssClasses(options, structuralClass = null) {
  const opts = resolveOptions(options);
  const classes = ["katex-arabic"];
  if (opts.mirrorBigOperators) classes.push("mirror-big-ops");
  if (opts.mirrorSqrt) classes.push("mirror-sqrt");
  if (opts.mirrorBrackets) classes.push("mirror-brackets");
  if (opts.mirrorSymbols) classes.push("mirror-symbols");
  if (opts.fullArabicMode) classes.push("full-rtl-mode");
  if (opts.displayMode) classes.push("is-display");
  else classes.push("is-inline");
  if (structuralClass) classes.push(structuralClass);
  return classes;
}
function buildFontStack(preferred) {
  return `'${preferred}', 'Scheherazade New', 'Noto Naskh Arabic', 'Cairo', 'Tajawal', 'KaTeX_Main', 'Latin Modern Math', serif`;
}
function wrapWithArabicStyles(html, options, structuralClass = null) {
  const opts = resolveOptions(options);
  const classes = buildCssClasses(opts, structuralClass);
  return `<span class="${classes.join(" ")}" dir="${opts.direction}" style="direction:${opts.direction};--ka-op-scale:${opts.operatorScale};--ka-font-family:${buildFontStack(opts.fontFamily)};">${html}</span>`;
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function renderArabicToString(latex, options = {}) {
  return renderArabicWithMeta(latex, options).html;
}
function renderArabicWithMeta(latex, options = {}) {
  const opts = resolveOptions(options);
  const cacheKey = buildCacheKey(latex, opts);
  const cached = renderCache.get(cacheKey);
  if (cached !== void 0) {
    return { html: cached, error: null };
  }
  const processedLatex = processArabicLatex(latex, opts);
  const structuralClass = detectStructuralClass(processedLatex);
  try {
    const html = katex.renderToString(processedLatex, {
      displayMode: opts.displayMode,
      throwOnError: true,
      output: opts.output,
      strict: opts.strict,
      trust: opts.trust,
      minRuleThickness: opts.minRuleThickness,
      macros: {
        ...getArabicMacros(opts.macros),
        ...opts.macros ?? {}
      }
    });
    const wrapped = wrapWithArabicStyles(html, opts, structuralClass);
    renderCache.set(cacheKey, wrapped);
    return { html: wrapped, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (opts.throwOnError) {
      throw error instanceof Error ? error : new Error(message);
    }
    console.error("[katex-arabic] render failed:", message, "\nLaTeX:", latex);
    return {
      html: `<span class="katex-arabic katex-arabic--error" dir="rtl" role="alert" style="color:#dc2626;font-family:monospace;"><span class="katex-arabic__error-icon" aria-hidden="true">⚠</span> <span class="katex-arabic__error-text">${escapeHtml(latex)}</span></span>`,
      error: message
    };
  }
}
function renderArabic(latex, element, options = {}) {
  const html = renderArabicToString(latex, options);
  element.innerHTML = html;
  applyDomStyles(element, options);
}
function renderArabicBatch(items, options = {}) {
  return items.map((item) => {
    if (typeof item === "string") {
      return renderArabicWithMeta(item, options);
    }
    return renderArabicWithMeta(item.latex, { ...options, ...item.options });
  });
}
function processLatex(latex, options = {}) {
  return processArabicLatex(latex, options);
}
function validateLatex(latex, options = {}) {
  const opts = resolveOptions(options);
  const processed = processArabicLatex(latex, opts);
  try {
    katex.renderToString(processed, {
      displayMode: opts.displayMode,
      throwOnError: true,
      strict: opts.strict,
      trust: opts.trust
    });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
function applyDomStyles(element, options) {
  const opts = resolveOptions(options);
  const katexEl = element.querySelector(".katex");
  if (katexEl) {
    katexEl.setAttribute("dir", opts.direction);
    katexEl.style.setProperty("--ka-font-family", buildFontStack(opts.fontFamily));
    katexEl.style.direction = opts.direction;
  }
}
export {
  ARABIC_MATH_UNICODE as A,
  BRACKET_SYMBOLS as B,
  COMPARISON_SYMBOLS as C,
  DEFAULT_OPTIONS as D,
  FUNCTION_MAP as F,
  GREEK_MAP as G,
  MAX_INPUT_LENGTH as M,
  SPECIAL_ARABIC_SYMBOLS as S,
  UNICODE_SYMBOLS as U,
  VARIABLE_MAP as V,
  renderArabicBatch as a,
  buildCssClasses as b,
  clearRenderCache as c,
  detectStructuralClass as d,
  resolveOptions as e,
  applyMirroredSymbols as f,
  getArabicMacros as g,
  translateSpecialPatterns as h,
  translateDifferentials as i,
  translateVariables as j,
  translateFunctions as k,
  isArabicDigit as l,
  convertNumbersInText as m,
  formatArabicNumber as n,
  fromArabicNumerals as o,
  processArabicLatex as p,
  toArabicNumerals as q,
  renderArabicWithMeta as r,
  processLatex as s,
  translateAll as t,
  renderArabicToString as u,
  validateLatex as v,
  renderArabic as w,
  ARROW_SYMBOLS as x,
  DIFFERENTIAL_PATTERNS as y,
  MIRRORED_SYMBOLS as z
};
//# sourceMappingURL=render.mjs.map
