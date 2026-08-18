/**
 * ════════════════════════════════════════════════════════════════
 *  arabicNumerals.ts
 *  Convert Latin digits to Arabic-Indic / Persian digits, and
 *  format numbers with proper Arabic separators.
 *
 *  Digit ranges:
 *    - Arabic-Indic (٠-٩)   U+0660 – U+0669  (Standard Arabic)
 *    - Eastern Arabic (۰-۹) U+06F0 – U+06F9  (Persian / Urdu)
 * ════════════════════════════════════════════════════════════════
 */
import type { NumeralStyle } from './types';
/**
 * Converts a string of Latin digits to the requested numeral style.
 * Returns the input unchanged when style is 'latin'.
 *
 * @param input  The text to convert.
 * @param style  Target numeral style. Defaults to 'arabic'.
 */
export declare function toArabicNumerals(input: string | number, style?: NumeralStyle): string;
/**
 * Converts Arabic-Indic and Eastern-Arabic digits back to Latin.
 * Useful for round-tripping or input normalization.
 */
export declare function fromArabicNumerals(input: string): string;
/**
 * Formats a numeric string with Arabic-Indic digits and Arabic separators:
 *   - Thousands separator: ٬ (U+066C)
 *   - Decimal separator:  ٫ (U+066B)
 *
 * Example: `1,000.50` → `١٬٠٠٠٫٥٠`
 *
 * Always uses the Arabic-Indic digit set, regardless of the requested style,
 * because the Arabic separators are paired with that set in standard usage.
 */
export declare function formatArabicNumber(numStr: string): string;
/**
 * Convert all numeric substrings inside a text to the requested style.
 * Optionally applies Arabic separators.
 */
export declare function convertNumbersInText(text: string, style?: NumeralStyle, formatSeparators?: boolean): string;
/**
 * Internal: returns true if the given character is any Arabic digit
 * (Arabic-Indic or Eastern-Arabic).
 *
 * We rebuild a fresh regex per call to avoid the global-regex
 * `lastIndex` state that would otherwise cause flaky results.
 */
export declare function isArabicDigit(ch: string): boolean;
//# sourceMappingURL=arabicNumerals.d.ts.map