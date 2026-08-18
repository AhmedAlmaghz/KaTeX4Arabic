import { D as DEFAULT_OPTIONS, c as clearRenderCache, v as validateLatex, b as processLatex, a as renderArabicBatch, r as renderArabicWithMeta, d as renderArabicToString, e as renderArabic } from "./render.mjs";
import { A, f, B, C, g, F, G, M, h, S, V, i, j, k, l, m, n, o, q, t, s, u, w, x, y } from "./render.mjs";
const VERSION = "1.0.0";
const KaTeXArabic = {
  render: renderArabic,
  renderToString: renderArabicToString,
  renderWithMeta: renderArabicWithMeta,
  renderBatch: renderArabicBatch,
  process: processLatex,
  validate: validateLatex,
  clearCache: clearRenderCache,
  DEFAULT_OPTIONS,
  VERSION
};
export {
  A as ARABIC_MATH_UNICODE,
  f as ARROW_SYMBOLS,
  B as BRACKET_SYMBOLS,
  C as COMPARISON_SYMBOLS,
  DEFAULT_OPTIONS,
  g as DIFFERENTIAL_PATTERNS,
  F as FUNCTION_MAP,
  G as GREEK_MAP,
  M as MAX_INPUT_LENGTH,
  h as MIRRORED_SYMBOLS,
  S as SPECIAL_ARABIC_SYMBOLS,
  V as VARIABLE_MAP,
  VERSION,
  i as applyMirroredSymbols,
  j as buildCssClasses,
  clearRenderCache,
  k as convertNumbersInText,
  KaTeXArabic as default,
  l as formatArabicNumber,
  m as fromArabicNumerals,
  n as getArabicMacros,
  o as isArabicDigit,
  processLatex,
  renderArabic,
  renderArabicBatch,
  renderArabicToString,
  renderArabicWithMeta,
  q as resolveOptions,
  t as toArabicNumerals,
  s as translateAll,
  u as translateDifferentials,
  w as translateFunctions,
  x as translateSpecialPatterns,
  y as translateVariables,
  validateLatex
};
//# sourceMappingURL=index.mjs.map
