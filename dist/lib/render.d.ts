/**
 * ════════════════════════════════════════════════════════════════
 *  render.ts
 *  Core render functions for KaTeX Arabic.
 *
 *  This module is separated from index.ts so that hooks.ts can
 *  import render functions without creating a circular dependency
 *  through the barrel export.
 * ════════════════════════════════════════════════════════════════
 */
import type { PartialArabicOptions } from './types';
/**
 * Render LaTeX with Arabic transforms to an HTML string.
 *
 * Always returns a valid string — errors are reported via the
 * `throwOnError` option (which defaults to false, producing a
 * styled error message in the output).
 */
export declare function renderArabicToString(latex: string, options?: PartialArabicOptions): string;
/**
 * Render LaTeX with Arabic transforms and return both the HTML and
 * any error message in a single pass. This avoids the double-render
 * cost of validate + render when callers need both.
 *
 * Returns `{ html, error }` where `error` is null on success.
 */
export declare function renderArabicWithMeta(latex: string, options?: PartialArabicOptions): {
    html: string;
    error: string | null;
};
/**
 * Render LaTeX with Arabic transforms into a DOM element.
 * Replaces the element's children with the rendered output.
 */
export declare function renderArabic(latex: string, element: HTMLElement, options?: PartialArabicOptions): void;
/**
 * Render a batch of LaTeX strings in one call.
 *
 * Returns an array of `{ html, error }` results in the same order as
 * the input. This is more efficient than calling `renderArabicToString`
 * in a loop because the options object is resolved once and the LRU
 * cache is shared across the batch.
 *
 * @param items   Array of LaTeX strings (or `{ latex, options }` objects
 *                for per-item overrides).
 * @param options Shared options applied to every item unless overridden.
 */
export declare function renderArabicBatch(items: ReadonlyArray<string | {
    latex: string;
    options?: PartialArabicOptions;
}>, options?: PartialArabicOptions): Array<{
    html: string;
    error: string | null;
}>;
/**
 * Process LaTeX without rendering. Useful for inspecting the
 * transformed source or for caching.
 */
export declare function processLatex(latex: string, options?: PartialArabicOptions): string;
/**
 * Validate that a LaTeX string can be rendered without errors.
 * Returns null on success, or an error message on failure.
 */
export declare function validateLatex(latex: string, options?: PartialArabicOptions): string | null;
//# sourceMappingURL=render.d.ts.map