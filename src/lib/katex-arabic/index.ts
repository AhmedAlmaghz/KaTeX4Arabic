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

import {
  renderArabic,
  renderArabicToString,
  renderArabicWithMeta,
  renderArabicBatch,
  processLatex,
  validateLatex,
} from './render';
import {
  DEFAULT_OPTIONS,
  clearRenderCache,
  resolveOptions,
  buildCssClasses,
  getArabicMacros,
  detectStructuralClass,
} from './rtlRenderer';
import {
  toArabicNumerals,
  fromArabicNumerals,
  formatArabicNumber,
  convertNumbersInText,
  isArabicDigit,
} from './arabicNumerals';
import {
  translateFunctions,
  translateVariables,
  translateDifferentials,
  translateSpecialPatterns,
  translateAll,
} from './arabicFunctions';
import { applyMirroredSymbols } from './arabicSymbols';

// ─── Re-exports: configuration ─────────────────────────────
export {
  DEFAULT_OPTIONS,
  resolveOptions,
  buildCssClasses,
  getArabicMacros,
  detectStructuralClass,
  clearRenderCache,
  MAX_INPUT_LENGTH,
} from './rtlRenderer';
export type { ArabicKatexOptions, PartialArabicOptions, RenderResult, StructuralClass } from './types';

// ─── Re-exports: render functions ────────────────────────────
export {
  renderArabicToString,
  renderArabicWithMeta,
  renderArabic,
  renderArabicBatch,
  processLatex,
  validateLatex,
} from './render';

// ─── Re-exports: numerals ──────────────────────────────────
export {
  toArabicNumerals,
  fromArabicNumerals,
  formatArabicNumber,
  convertNumbersInText,
  isArabicDigit,
} from './arabicNumerals';

// ─── Re-exports: function translation ──────────────────────
export {
  translateFunctions,
  translateVariables,
  translateDifferentials,
  translateSpecialPatterns,
  translateAll,
  FUNCTION_MAP,
  VARIABLE_MAP,
  GREEK_MAP,
  DIFFERENTIAL_PATTERNS,
} from './arabicFunctions';

// ─── Re-exports: symbol mirroring ──────────────────────────
export {
  applyMirroredSymbols,
  MIRRORED_SYMBOLS,
  COMPARISON_SYMBOLS,
  ARROW_SYMBOLS,
  BRACKET_SYMBOLS,
  UNICODE_SYMBOLS,
  ARABIC_MATH_UNICODE,
  SPECIAL_ARABIC_SYMBOLS,
} from './arabicSymbols';

// ─── Version constant ──────────────────────────────────────
// Kept in sync with package.json by scripts/build-cdn.mjs
// (the CDN build fails if these ever drift apart).
export const VERSION = '1.1.7';

// ═══════════════════════════════════════════════════════════════
//  Default export — the "KaTeXArabic" namespace
//
//  This object is what a CDN <script> tag exposes as `window.KaTeXArabic`,
//  and what `import KaTeXArabic from 'katex-arabic'` returns. It mirrors
//  `katex`'s own API shape (render / renderToString / …) plus every
//  Arabic helper, so it works as a full drop-in namespace.
// ═══════════════════════════════════════════════════════════════

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
  VERSION,
};

export default KaTeXArabic;