/**
 * cdn.ts
 * Dedicated CDN entry point.
 *
 * The full `index.ts` barrel exports many named symbols; the CDN IIFE
 * needs a *single* default export so that `window.KaTeXArabic` IS the
 * namespace object (exactly like the `katex` global). This wrapper
 * re-exports just that object.
 *
 * Everything the namespace needs is reachable through it:
 *
 *   KaTeXArabic.renderToString('...')
 *   KaTeXArabic.render(el, '...')
 *   KaTeXArabic.toArabicNumerals('123') → '١٢٣'
 *   KaTeXArabic.DEFAULT_OPTIONS
 */
export { default } from './index';
//# sourceMappingURL=cdn.d.ts.map