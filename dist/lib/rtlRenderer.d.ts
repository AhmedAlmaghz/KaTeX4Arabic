/**
 * ════════════════════════════════════════════════════════════════
 *  rtlRenderer.ts
 *  The main pipeline that transforms a LaTeX string for Arabic
 *  rendering and builds a KaTeX options object.
 *
 *  Pipeline (run in order — order is significant):
 *    1. Rewrite \lim → \arabiLim (sentinel) so that the function
 *       translator can use \operatorname* with limits.
 *    2. Translate differentials (dx, dy, d\theta, …).
 *    3. Translate function commands (sin → جا, cos → جتا, …).
 *    4. Translate variables (x → س, y → ص, …).
 *    5. Mirror comparison and arrow symbols for RTL.
 *    6. Convert digits to the requested numeral style.
 *
 *  Performance:
 *    - An LRU render cache avoids re-processing identical LaTeX.
 *    - Input length is capped to prevent catastrophic backtracking.
 * ════════════════════════════════════════════════════════════════
 */
import type { ArabicKatexOptions, PartialArabicOptions } from './types';
export type { ArabicKatexOptions, NumeralStyle, PartialArabicOptions } from './types';
/**
 * Maximum allowed LaTeX input length (characters). Inputs beyond
 * this are truncated to prevent catastrophic regex backtracking and
 * excessive memory use. 20 000 chars is far above any realistic
 * equation (even a page of dense math is a few thousand chars) while
 * still bounding worst-case preprocessing and render cost.
 */
export declare const MAX_INPUT_LENGTH = 20000;
/**
 * A minimal, dependency-free LRU cache backed by a Map.
 * Map iteration order in JS is insertion order, so the *first*
 * key is always the least-recently-used.
 */
declare class LruCache<K, V> {
    private readonly capacity;
    private readonly map;
    constructor(capacity: number);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    clear(): void;
    get size(): number;
}
/** Module-level render cache. Exported so the render entry point can reuse it. */
export declare const renderCache: LruCache<string, string>;
/**
 * Clear the internal render cache. Useful when options change
 * globally or in tests.
 */
export declare function clearRenderCache(): void;
/**
 * Build a stable cache key from latex + options.
 * Every field that can affect the rendered output is included so a
 * stale entry can never be served. Record fields are serialized with
 * JSON.stringify (key order is not guaranteed, but two identical
 * option objects built the same way produce identical JSON; callers
 * who mutate key order simply get a cache miss, never a wrong hit).
 */
export declare function buildCacheKey(latex: string, opts: ArabicKatexOptions): string;
/**
 * The default configuration. Tweak individual fields by passing
 * an overrides object to the render functions.
 */
export declare const DEFAULT_OPTIONS: ArabicKatexOptions;
/**
 * Merge partial user options on top of the defaults.
 * Pure function: safe to call repeatedly.
 */
export declare function resolveOptions(overrides?: PartialArabicOptions): ArabicKatexOptions;
/**
 * The single entry point for Arabic LaTeX transformation.
 *
 * Returns the transformed LaTeX that can be passed to KaTeX.renderToString.
 * Each pipeline step is gated by an option, so callers can disable
 * any stage they don't need.
 */
export declare function processArabicLatex(latex: string, options?: PartialArabicOptions): string;
/**
 * Build the macro table for KaTeX. Custom user macros are merged on
 * top of the built-in ones.
 */
export declare function getArabicMacros(customMacros?: Record<string, string>): Record<string, string>;
/**
 * Build the list of CSS classes applied to the wrapper span.
 * The "katex-arabic" base class is always present; the rest are
 * toggled by options.
 */
export declare function buildCssClasses(options: PartialArabicOptions): string[];
/**
 * Get mirror classes without the base class. Useful when the wrapper
 * already has the base class.
 */
export declare function getMirrorClasses(options: PartialArabicOptions): string;
/**
 * Wrap the KaTeX-rendered HTML in a span with the right classes
 * and inline styles for Arabic rendering.
 */
export declare function wrapWithArabicStyles(html: string, options: PartialArabicOptions): string;
//# sourceMappingURL=rtlRenderer.d.ts.map