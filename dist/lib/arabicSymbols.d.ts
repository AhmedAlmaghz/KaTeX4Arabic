/**
 * ════════════════════════════════════════════════════════════════
 *  arabicSymbols.ts
 *  Symbol mirroring and Unicode math-symbol definitions.
 *
 *  When an equation is rendered in an RTL context, certain symbols
 *  (≤, ≥, ∫, Σ, …) should appear visually mirrored so that the
 *  smaller / open end faces the start of the reading direction.
 *
 *  This module is the *LaTeX-level* mirror. The CSS layer may
 *  additionally apply `transform: scaleX(-1)` to the rendered
 *  DOM nodes for finer-grained control over glyphs that KaTeX
 *  renders directly (√, ∫, Σ, ∏).
 * ════════════════════════════════════════════════════════════════
 */
/**
 * Combined mirror map. Each group can be toggled independently.
 */
export declare const MIRRORED_SYMBOLS: Record<string, string>;
/**
 * Sub-maps exposed for fine-grained control by callers.
 */
export declare const COMPARISON_SYMBOLS: Record<string, string>;
export declare const ARROW_SYMBOLS: Record<string, string>;
export declare const BRACKET_SYMBOLS: Record<string, string>;
/**
 * The Unicode "Arabic Mathematical Alphabet" provides isolated-form
 * Arabic letters optimized for math typesetting. These are *not*
 * connecting forms; they are intended to behave like individual
 * Latin letters inside an equation.
 */
export declare const ARABIC_MATH_UNICODE: Record<string, string>;
/**
 * Curated special symbols used in Arabic math typography.
 */
export declare const SPECIAL_ARABIC_SYMBOLS: {
    readonly arabicFractionSlash: "/";
    readonly integralMaghribi: "\\int";
};
/**
 * Apply symbol mirroring to a LaTeX string.
 *
 * A single left-to-right pass over the *original* string is used. Each
 * symbol is mapped at most once (so `<` never re-mirrors back to `<`),
 * longer commands win over shorter prefixes, and verbatim regions are
 * skipped — all without the offset-shift problems of chained passes.
 *
 * @param latex   LaTeX source.
 * @param enabled Whether mirroring is active.
 */
export declare function applyMirroredSymbols(latex: string, enabled?: boolean): string;
//# sourceMappingURL=arabicSymbols.d.ts.map