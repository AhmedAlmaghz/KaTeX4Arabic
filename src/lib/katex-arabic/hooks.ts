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

import { useMemo, useDeferredValue } from 'react';
import { renderArabicWithMeta, renderArabicBatch } from './index';
import { processArabicLatex } from './rtlRenderer';
import type { PartialArabicOptions, RenderResult } from './types';

/**
 * Stable empty-options sentinel. Using a module-level constant as the
 * default parameter keeps the `options` identity stable across renders,
 * which is essential for the useMemo dependency check to work.
 */
const EMPTY_OPTIONS: PartialArabicOptions = Object.freeze({});

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
export function useArabicKatex(
  latex: string,
  options: PartialArabicOptions = EMPTY_OPTIONS,
): string {
  // Defer the value to keep the UI responsive when the user is
  // rapidly editing a long equation. The first render uses the
  // current value, then subsequent renders may use the deferred
  // one if React chooses to deprioritize the work.
  const deferredLatex = useDeferredValue(latex);

  return useMemo(() => {
    try {
      return renderArabicWithMeta(deferredLatex, options).html;
    } catch {
      // The renderer never throws (it returns a styled error string),
      // but be defensive for unforeseen runtime errors.
      return '';
    }
  }, [deferredLatex, options]);
}

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
export function useArabicKatexResult(
  latex: string,
  options: PartialArabicOptions = EMPTY_OPTIONS,
): RenderResult {
  const deferredLatex = useDeferredValue(latex);

  return useMemo<RenderResult>(() => {
    const processedLatex = processArabicLatex(deferredLatex, options);
    const { html, error } = renderArabicWithMeta(deferredLatex, options);

    if (error !== null) {
      return { html: '', processedLatex, ok: false, error };
    }

    return { html, processedLatex, ok: true };
  }, [deferredLatex, options]);
}

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
export function useArabicKatexBatch(
  items: ReadonlyArray<string | { latex: string; options?: PartialArabicOptions }>,
  options: PartialArabicOptions = EMPTY_OPTIONS,
): Array<{ html: string; error: string | null }> {
  // Serialize the items into a stable dependency so the memo only
  // recomputes when the actual content changes, not on every render.
  const itemsKey = useMemo(
    () =>
      items
        .map((it) => (typeof it === 'string' ? it : `${it.latex}|${JSON.stringify(it.options ?? {})}`))
        .join('\u0000'),
    [items],
  );

  return useMemo(
    () => renderArabicBatch(items, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey, options],
  );
}

