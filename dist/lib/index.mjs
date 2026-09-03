import { D as DEFAULT_OPTIONS, c as clearRenderCache, d as detectStructuralClass, g as getArabicMacros, b as buildCssClasses, e as resolveOptions, f as applyMirroredSymbols, t as translateAll, h as translateSpecialPatterns, i as translateDifferentials, j as translateVariables, k as translateFunctions, l as isArabicDigit, m as convertNumbersInText, n as formatArabicNumber, o as fromArabicNumerals, q as toArabicNumerals, v as validateLatex, s as processLatex, a as renderArabicBatch, r as renderArabicWithMeta, u as renderArabicToString, w as renderArabic } from "./render.mjs";
import { A, x, B, C, y, F, G, M, z, S, U, V } from "./render.mjs";
const VERSION = "1.1.7";
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
  detectStructuralClass,
  clearCache: clearRenderCache,
  DEFAULT_OPTIONS,
  VERSION
};
export {
  A as ARABIC_MATH_UNICODE,
  x as ARROW_SYMBOLS,
  B as BRACKET_SYMBOLS,
  C as COMPARISON_SYMBOLS,
  DEFAULT_OPTIONS,
  y as DIFFERENTIAL_PATTERNS,
  F as FUNCTION_MAP,
  G as GREEK_MAP,
  M as MAX_INPUT_LENGTH,
  z as MIRRORED_SYMBOLS,
  S as SPECIAL_ARABIC_SYMBOLS,
  U as UNICODE_SYMBOLS,
  V as VARIABLE_MAP,
  VERSION,
  applyMirroredSymbols,
  buildCssClasses,
  clearRenderCache,
  convertNumbersInText,
  KaTeXArabic as default,
  detectStructuralClass,
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
