/**
 * ════════════════════════════════════════════════════════════════
 *  index.ts
 *  Public entry point for the KaTeX Arabic library.
 *
 *  This module is the *only* file the application should import
 *  from when consuming the library. All internal modules are
 *  re-exported below for advanced use cases.
 * ════════════════════════════════════════════════════════════════
 */

import katex from 'katex';
import {
  processArabicLatex,
  getArabicMacros,
  wrapWithArabicStyles,
  buildCssClasses,
  resolveOptions,
  DEFAULT_OPTIONS,
  clearRenderCache,
  MAX_INPUT_LENGTH,
  renderCache,
  buildCacheKey,
} from './rtlRenderer';
import type {
  ArabicKatexOptions,
  PartialArabicOptions,
  RenderResult,
} from './types';

// ─── Re-exports: configuration ─────────────────────────────
export { DEFAULT_OPTIONS, resolveOptions, buildCssClasses, getArabicMacros, clearRenderCache, MAX_INPUT_LENGTH };
export type { ArabicKatexOptions, PartialArabicOptions, RenderResult };

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
  ARABIC_MATH_UNICODE,
  SPECIAL_ARABIC_SYMBOLS,
} from './arabicSymbols';

// ─── Version constant ──────────────────────────────────────
export const VERSION = '3.0.0';

// ═══════════════════════════════════════════════════════════════
//  HTML escaping helper
// ═══════════════════════════════════════════════════════════════

/**
 * Escape a string so it can be safely embedded in HTML.
 * Used for error fallbacks where we display raw LaTeX source.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ═══════════════════════════════════════════════════════════════
//  Main render functions
// ═══════════════════════════════════════════════════════════════

/**
 * Render LaTeX with Arabic transforms to an HTML string.
 *
 * Always returns a valid string — errors are reported via the
 * `throwOnError` option (which defaults to false, producing a
 * styled error message in the output).
 */
export function renderArabicToString(
  latex: string,
  options: PartialArabicOptions = {},
): string {
  return renderArabicWithMeta(latex, options).html;
}

/**
 * Render LaTeX with Arabic transforms and return both the HTML and
 * any error message in a single pass. This avoids the double-render
 * cost of validate + render when callers need both.
 *
 * Returns `{ html, error }` where `error` is null on success.
 */
export function renderArabicWithMeta(
  latex: string,
  options: PartialArabicOptions = {},
): { html: string; error: string | null } {
  const opts = resolveOptions(options);

  // Fast path: return from LRU cache when the same (latex, options)
  // pair has been rendered before. This makes repeated renders of the
  // same equation (e.g. in a gallery or a re-rendering React tree)
  // essentially free.
  const cacheKey = buildCacheKey(latex, opts);
  const cached = renderCache.get(cacheKey);
  if (cached !== undefined) {
    return { html: cached, error: null };
  }

  const processedLatex = processArabicLatex(latex, opts);

  try {
    const html = katex.renderToString(processedLatex, {
      displayMode: opts.displayMode,
      throwOnError: true,
      output: opts.output,
      strict: opts.strict,
      trust: opts.trust,
      minRuleThickness: opts.minRuleThickness,
      macros: {
        ...getArabicMacros(opts.macros),
        ...(opts.macros ?? {}),
      },
    });
    const wrapped = wrapWithArabicStyles(html, opts);
    renderCache.set(cacheKey, wrapped);
    return { html: wrapped, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (opts.throwOnError) {
      throw error instanceof Error ? error : new Error(message);
    }
    // eslint-disable-next-line no-console
    console.error('[katex-arabic] render failed:', message, '\nLaTeX:', latex);
    return {
      html:
        `<span class="katex-arabic katex-arabic--error" dir="rtl" role="alert" ` +
        `style="color:#dc2626;font-family:monospace;">` +
        `<span class="katex-arabic__error-icon" aria-hidden="true">⚠</span> ` +
        `<span class="katex-arabic__error-text">${escapeHtml(latex)}</span>` +
        `</span>`,
      error: message,
    };
  }
}

/**
 * Render LaTeX with Arabic transforms into a DOM element.
 * Replaces the element's children with the rendered output.
 */
export function renderArabic(
  latex: string,
  element: HTMLElement,
  options: PartialArabicOptions = {},
): void {
  const html = renderArabicToString(latex, options);
  element.innerHTML = html;
  applyDomStyles(element, options);
}

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
export function renderArabicBatch(
  items: ReadonlyArray<string | { latex: string; options?: PartialArabicOptions }>,
  options: PartialArabicOptions = {},
): Array<{ html: string; error: string | null }> {
  return items.map((item) => {
    if (typeof item === 'string') {
      return renderArabicWithMeta(item, options);
    }
    return renderArabicWithMeta(item.latex, { ...options, ...item.options });
  });
}

/**
 * Process LaTeX without rendering. Useful for inspecting the
 * transformed source or for caching.
 */
export function processLatex(
  latex: string,
  options: PartialArabicOptions = {},
): string {
  return processArabicLatex(latex, options);
}

/**
 * Validate that a LaTeX string can be rendered without errors.
 * Returns null on success, or an error message on failure.
 */
export function validateLatex(
  latex: string,
  options: PartialArabicOptions = {},
): string | null {
  const opts = resolveOptions(options);
  const processed = processArabicLatex(latex, opts);
  try {
    katex.renderToString(processed, {
      displayMode: opts.displayMode,
      throwOnError: true,
      strict: opts.strict,
      trust: opts.trust,
    });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

// ═══════════════════════════════════════════════════════════════
//  Internal helpers
// ═══════════════════════════════════════════════════════════════

/**
 * Apply per-element styles after the HTML has been written.
 * This is the DOM-level equivalent of the inline styles we add
 * in `wrapWithArabicStyles`.
 */
function applyDomStyles(element: HTMLElement, options: PartialArabicOptions): void {
  const opts = resolveOptions(options);
  const katexEl = element.querySelector('.katex') as HTMLElement | null;
  if (katexEl) {
    katexEl.setAttribute('dir', opts.direction);
    katexEl.style.fontFamily = `'${opts.fontFamily}', 'KaTeX_Main', serif`;
    katexEl.style.direction = opts.direction;
  }
}

// ═══════════════════════════════════════════════════════════════
//  Default export — the legacy "KaTeXArabic" object
// ═══════════════════════════════════════════════════════════════

const KaTeXArabic = {
  render: renderArabic,
  renderToString: renderArabicToString,
  renderWithMeta: renderArabicWithMeta,
  renderBatch: renderArabicBatch,
  process: processLatex,
  validate: validateLatex,
  clearCache: clearRenderCache,
  DEFAULT_OPTIONS,
  VERSION,
};

export default KaTeXArabic;
