/**
 * ════════════════════════════════════════════════════════════════
 *  arabicFunctions.ts
 *  Comprehensive translation dictionaries and transforms that
 *  convert LaTeX function names, variables, and Greek letters
 *  into their Arabic equivalents.
 *
 *  Design notes:
 *   - All keys are LaTeX command names beginning with a backslash,
 *     except for the VARIABLE_MAP which uses single letters.
 *   - Translations never mutate the input. Each function returns
 *     a new string.
 *   - Variable translation uses a single token-aware scan (no regex):
 *     adjacent letters ("ac" in "4ac") are translated independently,
 *     multi-character custom keys win by longest match, and LaTeX
 *     identifiers — command names, \begin{…}/\end{…} environment
 *     names, and dimension units after digits — pass through verbatim.
 * ════════════════════════════════════════════════════════════════
 */
/**
 * Map of LaTeX command → Arabic operator name.
 * \operatorname* is used for operators with limits (e.g. lim, max, min).
 * \operatorname is used for plain operator names.
 */
export declare const FUNCTION_MAP: Record<string, string>;
/**
 * Standard mapping of Latin letters to their conventional Arabic
 * equivalents in mathematical literature. The uppercase forms follow
 * the same scheme, with a few exceptions (e.g. E → هـ for Euler's
 * constant, I → ت for the imaginary unit).
 */
export declare const VARIABLE_MAP: Record<string, string>;
/**
 * KaTeX renders Greek letters as native Unicode, so no translation
 * is required. This table is provided for documentation and
 * for users who want to inspect the supported set.
 */
export declare const GREEK_MAP: Record<string, string>;
export declare const DIFFERENTIAL_PATTERNS: Record<string, string>;
/**
 * Translate LaTeX function commands (sin, cos, lim, …) to Arabic.
 *
 * Uses a single left-to-right scan of the source so that:
 *   • the longest command wins at every position (\\arcsin before \\sin),
 *   • verbatim regions (\\text{…}, \\operatorname{…}) are never modified,
 *   • offsets stay stable — there is no cascade of in-place edits that
 *     could re-shift later matches.
 *
 * @param latex     LaTeX source.
 * @param customMap User-supplied overrides merged on top of FUNCTION_MAP.
 */
export declare function translateFunctions(latex: string, customMap?: Record<string, string>): string;
/**
 * Translate differential patterns like `dx`, `dy`, `d\theta` to their
 * Arabic equivalents.
 */
export declare function translateDifferentials(latex: string): string;
/**
 * Translate standalone Latin variables to their Arabic equivalents.
 *
 * Critical: avoid translating inside LaTeX commands, math text blocks,
 * and \\operatorname names. We pre-compute the "protected" regions once
 * and run a single combined pass so that no offset ever shifts.
 *
 * The scan is token-aware, in this order:
 *   1. `\\command` names are copied verbatim — they are never variables.
 *      The \\begin{…} / \\end{…} environment name (and, for array-style
 *      environments, the column-specification group that follows) is an
 *      identifier too, so it is copied through its closing brace.
 *   2. A letter run glued directly to a preceding digit run is a TeX
 *      dimension unit (5pt, 1.5em, 2cm, …) — a size literal like
 *      `\\hspace{5pt}`, not math content — and is emitted verbatim,
 *      mirroring the units guard in rtlRenderer.ts so the numeral stage
 *      keeps the whole dimension intact.
 *   3. Otherwise the longest key in the merged map wins: adjacent
 *      letters ("ac" in "4ac") still translate independently, while a
 *      multi-character custom key ("ab") beats the single letters
 *      "a" / "b" at the same position.
 */
export declare function translateVariables(latex: string, customMap?: Record<string, string>): string;
/**
 * Translate special patterns like differentials (dx, dθ) to Arabic.
 * Kept as a thin wrapper for API compatibility.
 */
export declare function translateSpecialPatterns(latex: string): string;
/**
 * Translate everything: differentials, functions, and variables.
 * Each step is independent and may be toggled by the caller.
 */
export declare function translateAll(latex: string, options?: {
    functions?: boolean;
    variables?: boolean;
    differentials?: boolean;
    customFunctionMap?: Record<string, string>;
    customVariableMap?: Record<string, string>;
}): string;
//# sourceMappingURL=arabicFunctions.d.ts.map