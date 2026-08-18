/**
 * ════════════════════════════════════════════════════════════════
 *  index.ts
 *  Public entry point for the KaTeX Arabic library.
 *
 *  This module is the *only* file the application should import
 *  from when consuming the library. All internal modules are
 *  re-exported below for advanced use cases.
 *
 *  The render functions themselves live in `render.ts` so that
 *  `hooks.ts` can import them without a circular dependency
 *  through this barrel.
 * ════════════════════════════════════════════════════════════════
 */
import { renderArabic, renderArabicToString, renderArabicWithMeta, renderArabicBatch, processLatex, validateLatex } from './render';
import { clearRenderCache } from './rtlRenderer';
export { DEFAULT_OPTIONS, resolveOptions, buildCssClasses, getArabicMacros, clearRenderCache, MAX_INPUT_LENGTH, } from './rtlRenderer';
export type { ArabicKatexOptions, PartialArabicOptions, RenderResult } from './types';
export { renderArabicToString, renderArabicWithMeta, renderArabic, renderArabicBatch, processLatex, validateLatex, } from './render';
export { toArabicNumerals, fromArabicNumerals, formatArabicNumber, convertNumbersInText, isArabicDigit, } from './arabicNumerals';
export { translateFunctions, translateVariables, translateDifferentials, translateSpecialPatterns, translateAll, FUNCTION_MAP, VARIABLE_MAP, GREEK_MAP, DIFFERENTIAL_PATTERNS, } from './arabicFunctions';
export { applyMirroredSymbols, MIRRORED_SYMBOLS, COMPARISON_SYMBOLS, ARROW_SYMBOLS, BRACKET_SYMBOLS, ARABIC_MATH_UNICODE, SPECIAL_ARABIC_SYMBOLS, } from './arabicSymbols';
export declare const VERSION = "1.0.0";
declare const KaTeXArabic: {
    render: typeof renderArabic;
    renderToString: typeof renderArabicToString;
    renderWithMeta: typeof renderArabicWithMeta;
    renderBatch: typeof renderArabicBatch;
    process: typeof processLatex;
    validate: typeof validateLatex;
    clearCache: typeof clearRenderCache;
    DEFAULT_OPTIONS: import("./types").ArabicKatexOptions;
    VERSION: string;
};
export default KaTeXArabic;
//# sourceMappingURL=index.d.ts.map