/**
 * ════════════════════════════════════════════════════════════════
 *  hooks.ts
 *  React hooks for the KaTeX Arabic library.
 *
 *  These hooks memoize the rendered output and re-render only when
 *  inputs change. They are designed to integrate seamlessly with
 *  React 18+ concurrent rendering.
 *
 *  Performance notes:
 *   - A stable EMPTY_OPTIONS sentinel is used as the default so
 *     callers who omit `options` don't break memoization with a
 *     fresh object identity on every render.
 *   - `useArabicKatexResult` renders once and derives the error
 *     from the result instead of calling KaTeX twice.
 * ════════════════════════════════════════════════════════════════
 */
import type { PartialArabicOptions, RenderResult } from './types';
/**
 * React hook: render a LaTeX string to HTML.
 *
 * The result is memoized on the (latex, options) identity. Heavy
 * renders use `useDeferredValue` so typing in an editor stays
 * responsive even for very long LaTeX strings.
 *
 * @param latex   The LaTeX source.
 * @param options Arabic rendering options.
 */
export declare function useArabicKatex(latex: string, options?: PartialArabicOptions): string;
/**
 * React hook: render LaTeX and return structured metadata.
 *
 * Returns both the rendered HTML and a flag indicating success,
 * along with any validation error message. Useful for editor UIs
 * that want to surface errors inline.
 *
 * Implementation: a single `renderArabicWithMeta` call yields both
 * the HTML and the error message, avoiding the double-render cost
 * of validate + render.
 */
export declare function useArabicKatexResult(latex: string, options?: PartialArabicOptions): RenderResult;
/**
 * React hook: render a batch of LaTeX strings in one memoized pass.
 *
 * Returns an array of `{ html, error }` results in the same order as
 * the input. This is the most efficient way to render a list of
 * equations (e.g. a gallery) because the options object is resolved
 * once and the shared LRU cache is reused across the whole batch.
 *
 * @param items   Array of LaTeX strings (or `{ latex, options }` objects
 *                for per-item overrides).
 * @param options Shared options applied to every item unless overridden.
 */
export declare function useArabicKatexBatch(items: ReadonlyArray<string | {
    latex: string;
    options?: PartialArabicOptions;
}>, options?: PartialArabicOptions): Array<{
    html: string;
    error: string | null;
}>;
//# sourceMappingURL=hooks.d.ts.map