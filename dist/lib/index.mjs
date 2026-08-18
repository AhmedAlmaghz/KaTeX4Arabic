import { D as DEFAULT_OPTIONS, c as clearRenderCache, g as getArabicMacros, b as buildCssClasses, d as resolveOptions, e as applyMirroredSymbols, t as translateAll, f as translateSpecialPatterns, h as translateDifferentials, i as translateVariables, j as translateFunctions, k as isArabicDigit, l as convertNumbersInText, m as formatArabicNumber, n as fromArabicNumerals, o as toArabicNumerals, v as validateLatex, q as processLatex, a as renderArabicBatch, r as renderArabicWithMeta, s as renderArabicToString, u as renderArabic } from "./render.mjs";
import { A, w, B, C, x, F, G, M, y, S, V } from "./render.mjs";
const VERSION = "1.1.1";
const KaTeXArabic = {
  // ─── Rendering ───────────────────────────────────────────
  render: renderArabic,
  renderToString: renderArabicToString,
  renderWithMeta: renderArabicWithMeta,
  renderBatch: renderArabicBatch,
  // ─── Text processing ─────────────────────────────────────
  process: processLatex,
  validate: validateLatex,
  // ─── Numerals ────────────────────────────────────────────
  toArabicNumerals,
  fromArabicNumerals,
  formatArabicNumber,
  convertNumbersInText,
  isArabicDigit,
  // ─── Translation ─────────────────────────────────────────
  translateFunctions,
  translateVariables,
  translateDifferentials,
  translateSpecialPatterns,
  translateAll,
  // ─── Mirroring ───────────────────────────────────────────
  applyMirroredSymbols,
  // ─── Options / cache ─────────────────────────────────────
  resolveOptions,
  buildCssClasses,
  getArabicMacros,
  clearCache: clearRenderCache,
  DEFAULT_OPTIONS,
  VERSION
};
export {
  A as ARABIC_MATH_UNICODE,
  w as ARROW_SYMBOLS,
  B as BRACKET_SYMBOLS,
  C as COMPARISON_SYMBOLS,
  DEFAULT_OPTIONS,
  x as DIFFERENTIAL_PATTERNS,
  F as FUNCTION_MAP,
  G as GREEK_MAP,
  M as MAX_INPUT_LENGTH,
  y as MIRRORED_SYMBOLS,
  S as SPECIAL_ARABIC_SYMBOLS,
  V as VARIABLE_MAP,
  VERSION,
  applyMirroredSymbols,
  buildCssClasses,
  clearRenderCache,
  convertNumbersInText,
  KaTeXArabic as default,
  formatArabicNumber,
  fromArabicNumerals,
  getArabicMacros,
  isArabicDigit,
  processLatex,
  renderArabic,
  renderArabicBatch,
  renderArabicToString,
  renderArabicWithMeta,
  resolveOptions,
  toArabicNumerals,
  translateAll,
  translateDifferentials,
  translateFunctions,
  translateSpecialPatterns,
  translateVariables,
  validateLatex
};
//# sourceMappingURL=index.mjs.map
