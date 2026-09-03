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
import { clearRenderCache, resolveOptions, buildCssClasses, getArabicMacros, detectStructuralClass } from './rtlRenderer';
import { toArabicNumerals, fromArabicNumerals, formatArabicNumber, convertNumbersInText, isArabicDigit } from './arabicNumerals';
import { translateFunctions, translateVariables, translateDifferentials, translateSpecialPatterns, translateAll } from './arabicFunctions';
import { applyMirroredSymbols } from './arabicSymbols';
export { DEFAULT_OPTIONS, resolveOptions, buildCssClasses, getArabicMacros, detectStructuralClass, clearRenderCache, MAX_INPUT_LENGTH, } from './rtlRenderer';
export type { ArabicKatexOptions, PartialArabicOptions, RenderResult, StructuralClass } from './types';
export { renderArabicToString, renderArabicWithMeta, renderArabic, renderArabicBatch, processLatex, validateLatex, } from './render';
export { toArabicNumerals, fromArabicNumerals, formatArabicNumber, convertNumbersInText, isArabicDigit, } from './arabicNumerals';
export { translateFunctions, translateVariables, translateDifferentials, translateSpecialPatterns, translateAll, FUNCTION_MAP, VARIABLE_MAP, GREEK_MAP, DIFFERENTIAL_PATTERNS, } from './arabicFunctions';
export { applyMirroredSymbols, MIRRORED_SYMBOLS, COMPARISON_SYMBOLS, ARROW_SYMBOLS, BRACKET_SYMBOLS, UNICODE_SYMBOLS, ARABIC_MATH_UNICODE, SPECIAL_ARABIC_SYMBOLS, } from './arabicSymbols';
export declare const VERSION = "1.1.7";
declare const KaTeXArabic: {
    render: typeof renderArabic;
    renderToString: typeof renderArabicToString;
    renderWithMeta: typeof renderArabicWithMeta;
    renderBatch: typeof renderArabicBatch;
    process: typeof processLatex;
    validate: typeof validateLatex;
    toArabicNumerals: typeof toArabicNumerals;
    fromArabicNumerals: typeof fromArabicNumerals;
    formatArabicNumber: typeof formatArabicNumber;
    convertNumbersInText: typeof convertNumbersInText;
    isArabicDigit: typeof isArabicDigit;
    translateFunctions: typeof translateFunctions;
    translateVariables: typeof translateVariables;
    translateDifferentials: typeof translateDifferentials;
    translateSpecialPatterns: typeof translateSpecialPatterns;
    translateAll: typeof translateAll;
    applyMirroredSymbols: typeof applyMirroredSymbols;
    resolveOptions: typeof resolveOptions;
    buildCssClasses: typeof buildCssClasses;
    getArabicMacros: typeof getArabicMacros;
    detectStructuralClass: typeof detectStructuralClass;
    clearCache: typeof clearRenderCache;
    DEFAULT_OPTIONS: import("./types").ArabicKatexOptions;
    VERSION: string;
};
export default KaTeXArabic;
//# sourceMappingURL=index.d.ts.map