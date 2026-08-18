"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const render = require("./render.cjs");
const VERSION = "1.0.0";
const KaTeXArabic = {
  render: render.renderArabic,
  renderToString: render.renderArabicToString,
  renderWithMeta: render.renderArabicWithMeta,
  renderBatch: render.renderArabicBatch,
  process: render.processLatex,
  validate: render.validateLatex,
  clearCache: render.clearRenderCache,
  DEFAULT_OPTIONS: render.DEFAULT_OPTIONS,
  VERSION
};
exports.ARABIC_MATH_UNICODE = render.ARABIC_MATH_UNICODE;
exports.ARROW_SYMBOLS = render.ARROW_SYMBOLS;
exports.BRACKET_SYMBOLS = render.BRACKET_SYMBOLS;
exports.COMPARISON_SYMBOLS = render.COMPARISON_SYMBOLS;
exports.DEFAULT_OPTIONS = render.DEFAULT_OPTIONS;
exports.DIFFERENTIAL_PATTERNS = render.DIFFERENTIAL_PATTERNS;
exports.FUNCTION_MAP = render.FUNCTION_MAP;
exports.GREEK_MAP = render.GREEK_MAP;
exports.MAX_INPUT_LENGTH = render.MAX_INPUT_LENGTH;
exports.MIRRORED_SYMBOLS = render.MIRRORED_SYMBOLS;
exports.SPECIAL_ARABIC_SYMBOLS = render.SPECIAL_ARABIC_SYMBOLS;
exports.VARIABLE_MAP = render.VARIABLE_MAP;
exports.applyMirroredSymbols = render.applyMirroredSymbols;
exports.buildCssClasses = render.buildCssClasses;
exports.clearRenderCache = render.clearRenderCache;
exports.convertNumbersInText = render.convertNumbersInText;
exports.formatArabicNumber = render.formatArabicNumber;
exports.fromArabicNumerals = render.fromArabicNumerals;
exports.getArabicMacros = render.getArabicMacros;
exports.isArabicDigit = render.isArabicDigit;
exports.processLatex = render.processLatex;
exports.renderArabic = render.renderArabic;
exports.renderArabicBatch = render.renderArabicBatch;
exports.renderArabicToString = render.renderArabicToString;
exports.renderArabicWithMeta = render.renderArabicWithMeta;
exports.resolveOptions = render.resolveOptions;
exports.toArabicNumerals = render.toArabicNumerals;
exports.translateAll = render.translateAll;
exports.translateDifferentials = render.translateDifferentials;
exports.translateFunctions = render.translateFunctions;
exports.translateSpecialPatterns = render.translateSpecialPatterns;
exports.translateVariables = render.translateVariables;
exports.validateLatex = render.validateLatex;
exports.VERSION = VERSION;
exports.default = KaTeXArabic;
//# sourceMappingURL=index.cjs.map
