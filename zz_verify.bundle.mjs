// src/lib/katex-arabic/protectedRegions.ts
var VERBATIM_MACROS = [
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
var VERBATIM_PATTERN = new RegExp(
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
  for (const r2 of regions) {
    const last = merged[merged.length - 1];
    if (last && r2.start <= last.end) {
      last.end = Math.max(last.end, r2.end);
    } else {
      merged.push({ ...r2 });
    }
  }
  return merged;
}
function isInsideRegions(pos, regions) {
  for (const r2 of regions) {
    if (pos >= r2.start && pos < r2.end) return true;
    if (r2.start > pos) break;
  }
  return false;
}

// src/lib/katex-arabic/arabicFunctions.ts
var FUNCTION_MAP = {
  // ─── Basic trigonometric ─────────────────────────────────
  "\\sin": "\\operatorname{\u062C\u0627}",
  "\\cos": "\\operatorname{\u062C\u062A\u0627}",
  "\\tan": "\\operatorname{\u0638\u0627}",
  "\\cot": "\\operatorname{\u0638\u062A\u0627}",
  "\\sec": "\\operatorname{\u0642\u0627}",
  "\\csc": "\\operatorname{\u0642\u062A\u0627}",
  // ─── Inverse trigonometric ───────────────────────────────
  "\\arcsin": "\\operatorname{\u062C\u0627}^{-1}",
  "\\arccos": "\\operatorname{\u062C\u062A\u0627}^{-1}",
  "\\arctan": "\\operatorname{\u0638\u0627}^{-1}",
  "\\arccot": "\\operatorname{\u0638\u062A\u0627}^{-1}",
  "\\arcsec": "\\operatorname{\u0642\u0627}^{-1}",
  "\\arccsc": "\\operatorname{\u0642\u062A\u0627}^{-1}",
  // ─── Hyperbolic ──────────────────────────────────────────
  "\\sinh": "\\operatorname{\u062C\u0640\u0627}",
  // جيب زائدي
  "\\cosh": "\\operatorname{\u062C\u062A\u0640\u0627}",
  // جيب تمام زائدي
  "\\tanh": "\\operatorname{\u0638\u0640\u0627}",
  // ظل زائدي
  "\\coth": "\\operatorname{\u0638\u062A\u0640\u0627}",
  // ظل تمام زائدي
  "\\sech": "\\operatorname{\u0642\u0640\u0627}",
  // قاطع زائدي
  "\\csch": "\\operatorname{\u0642\u062A\u0640\u0627}",
  // قاطع تمام زائدي
  // ─── Logarithms & exponentials ───────────────────────────
  "\\ln": "\\operatorname{\u0644\u0648}",
  "\\log": "\\operatorname{\u0644\u063A}",
  "\\lg": "\\operatorname{\u0644\u063A}",
  "\\exp": "\\operatorname{\u0647\u0640}",
  // ─── Limits (kept as \arabiLim; translated separately) ───
  // Named consistently with the \sup / \inf entries (أعلى / أدنى)
  // so the operator vocabulary stays internally coherent.
  "\\liminf": "\\operatorname*{\u0646\u0647\u0640\u0627\\,\u0623\u062F\u0646\u0649}",
  // ─── Maxima / minima ─────────────────────────────────────
  "\\max": "\\operatorname*{\u0623\u0642\u0635\u0649}",
  "\\min": "\\operatorname*{\u0623\u062F\u0646\u0649}",
  "\\sup": "\\operatorname*{\u062D\u062F\\,\u0623\u0639\u0644\u0649}",
  "\\inf": "\\operatorname*{\u062D\u062F\\,\u0623\u062F\u0646\u0649}",
  // ─── Linear algebra ──────────────────────────────────────
  "\\det": "\\operatorname{\u0645\u062D\u062F\u062F}",
  "\\dim": "\\operatorname{\u0628\u0639\u062F}",
  "\\ker": "\\operatorname{\u0646\u0648\u0627\u0629}",
  "\\rank": "\\operatorname{\u0631\u062A\u0628\u0629}",
  "\\tr": "\\operatorname{\u0623\u062B\u0631}",
  "\\diag": "\\operatorname{\u0642\u0637\u0631\u064A}",
  "\\span": "\\operatorname{\u0645\u062F\u0649}",
  "\\null": "\\operatorname{\u0641\u0636\u0627\u0621\\,\u0635\u0641\u0631\u064A}",
  // ─── Number theory ───────────────────────────────────────
  "\\gcd": "\\operatorname{\u0642.\u0645.\u0623}",
  "\\lcm": "\\operatorname{\u0645.\u0645.\u0623}",
  "\\mod": "\\operatorname{\u0628\u0627\u0642\u064A}",
  "\\bmod": "\\operatorname{\u0628\u0627\u0642\u064A}",
  // ─── Combinatorics (التباديل / التوافيق) ───────────────────
  "perm": "operatorname{\u0644}",
  "comb": "operatorname{\u0642}",
  // ─── Probability & statistics ────────────────────────────
  "\\Pr": "\\operatorname{\u062D\u0627}",
  "\\P": "\\operatorname{\u062D\u0627}",
  // ─── Complex & argument ──────────────────────────────────
  "\\arg": "\\operatorname{\u03B8}",
  "\\deg": "\\operatorname{\u062F\u0631\u062C\u0629}",
  "\\sgn": "\\operatorname{\u0625\u0634\u0627}",
  "\\Re": "\\operatorname{\u062D\u0642}",
  "\\Im": "\\operatorname{\u062A\u062E}",
  "\\hom": "\\operatorname{\u062A\u0634\u0627}",
  "\\Hom": "\\operatorname{\u062A\u0634\u0627}",
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
  "\\limsup": "\\operatorname*{\u0646\u0647\u0640\u0627\\,\u0623\u0639\u0644\u0649}",
  // ─── Special marker used internally for limit translation ─
  // \arabiLim is a sentinel that the translator pipeline replaces
  // with the proper \operatorname* form. Users normally do not write this.
  "\\arabiLim": "\\operatorname*{\u0646\u0647\u0640\u0627}"
  // '\\lim': '\\operatorname*{نها}',
};
var VARIABLE_MAP = {
  // ─── Lowercase ───────────────────────────────────────────
  x: "\u0633",
  y: "\u0635",
  z: "\u0639",
  a: "\u0623",
  b: "\u0628",
  c: "\u062C\u0640",
  d: "\u062F",
  e: "\u0647\u0640",
  // Euler's number
  f: "\u0641",
  g: "\u0642",
  h: "\u062D",
  i: "\u062A",
  // imaginary unit
  j: "\u062C",
  k: "\u0643",
  l: "\u0644",
  m: "\u0645",
  n: "\u0646",
  o: "\u0639",
  p: "\u0628",
  q: "\u0642",
  r: "\u0631",
  s: "\u0632",
  t: "\u062A",
  u: "\u062B",
  v: "\u06A4",
  w: "\u0648",
  // Lowercase u/v/w mirror the uppercase entries above (U: 'ث',
  // V: 'ڤ', W: 'و') so that both cases share one convention — and so
  // that differentials (du, dv) never leak a Latin letter into the
  // otherwise-Arabic form \text{د}\text{…}.
  // ─── Uppercase ───────────────────────────────────────────
  A: "\u0623",
  B: "\u0628",
  C: "\u062C\u0640",
  D: "\u062F",
  E: "\u0647\u0640",
  F: "\u0641",
  G: "\u0642",
  H: "\u0647\u0640",
  I: "\u062A",
  J: "\u062C\u0640",
  K: "\u0643",
  L: "\u0644",
  M: "\u0645",
  N: "\u0646",
  O: "\u0639",
  P: "\u062D\u0627",
  Q: "\u0642",
  R: "\u0631",
  S: "\u0632",
  T: "\u062A",
  U: "\u062B",
  V: "\u06A4",
  W: "\u0648",
  X: "\u0633",
  Y: "\u0635",
  Z: "\u0632"
};
var DIFFERENTIAL_LETTERS = ["x", "y", "z", "t", "r", "u", "v", "s", "A", "V", "S"];
var DIFFERENTIAL_PATTERNS = Object.fromEntries(
  DIFFERENTIAL_LETTERS.map((letter) => [
    `d${letter}`,
    `\\text{\u062F}\\text{${VARIABLE_MAP[letter] ?? letter}}`
  ])
);
var TEX_DIMENSION_UNITS = /* @__PURE__ */ new Set([
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
      return `\\text{\u062F}\\text{${arabic}}`;
    }
  );
  result = result.replace(
    /d\\(alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|vartheta|theta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|varphi|phi|chi|psi|omega)\b/g,
    (_match, greek) => `\\text{\u062F}\\${greek}`
  );
  result = result.replace(
    /\bd([AVS])\b/g,
    (_match, letter) => {
      const arabic = VARIABLE_MAP[letter] ?? letter;
      return `\\text{\u062F}\\text{${arabic}}`;
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

// zz_verify.mjs
console.warn = () => {
};
var r = translateVariables("\\sqrt{ r^2 + 2\\pi r }");
var arg = translateFunctions("\\arg(z)");
var perm = translateFunctions("\\perm(n, k)");
var comb = translateFunctions("\\comb(n, k)");
var dr = translateDifferentials("dr");
console.log("r ->", JSON.stringify(r));
console.log("arg ->", JSON.stringify(arg));
console.log("perm ->", JSON.stringify(perm));
console.log("comb ->", JSON.stringify(comb));
console.log("dr ->", JSON.stringify(dr));
