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
 *   - Regex safety: the `escapeRegex` helper protects against
 *     special characters in keys when building dynamic patterns.
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
/**
 * Convert a `dX` differential to Arabic form: `دX` where X is the
 * Arabic variable. e.g. dx → د س, dθ → د θ.
 */
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
 * Implementation note: the pattern has exactly one capture group, so the
 * `replace` callback is `(match, p1, offset, string)` — `offset` is the
 * **third** argument.
 */
export declare function translateVariables(latex: string, customMap?: Record<string, string>): string;
/**
 * Translate `d\theta` and other named Greek differentials to Arabic.
 * Used by the differential pipeline; exposed for completeness.
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