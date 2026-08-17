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

// Lookup tables. Frozen at module load — never mutated.
const ARABIC_INDIC = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;
const EXTENDED_ARABIC = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

// Build a single map per style for O(1) digit lookup during conversion.
const DIGIT_MAP: Record<Exclude<NumeralStyle, 'latin'>, readonly string[]> = {
  arabic: ARABIC_INDIC,
  extended: EXTENDED_ARABIC,
};

/**
 * Converts a string of Latin digits to the requested numeral style.
 * Returns the input unchanged when style is 'latin'.
 *
 * @param input  The text to convert.
 * @param style  Target numeral style. Defaults to 'arabic'.
 */
export function toArabicNumerals(input: string | number, style: NumeralStyle = 'arabic'): string {
  if (style === 'latin') return String(input);

  const digits = DIGIT_MAP[style];
  // String#replace with a single-char regex is significantly faster than
  // splitting + joining or array-mapping.
  return String(input).replace(/[0-9]/g, (d) => digits[Number(d)] as string);
}

/**
 * Converts Arabic-Indic and Eastern-Arabic digits back to Latin.
 * Useful for round-tripping or input normalization.
 */
export function fromArabicNumerals(input: string): string {
  return String(input)
    .replace(/[٠-٩]/g, (d) => String((ARABIC_INDIC as readonly string[]).indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String((EXTENDED_ARABIC as readonly string[]).indexOf(d)));
}

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
export function formatArabicNumber(numStr: string): string {
  return numStr
    .replace(/,/g, '٬')
    .replace(/\./g, '٫')
    .replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)] as string);
}

/**
 * Convert all numeric substrings inside a text to the requested style.
 * Optionally applies Arabic separators.
 */
export function convertNumbersInText(
  text: string,
  style: NumeralStyle = 'arabic',
  formatSeparators = true,
): string {
  if (style === 'latin') return text;

  return text.replace(/\d+(?:[.,]\d+)*/g, (match) => {
    if (formatSeparators) {
      return formatArabicNumber(match);
    }
    return toArabicNumerals(match, style);
  });
}

/**
 * Internal: returns true if the given character is any Arabic digit
 * (Arabic-Indic or Eastern-Arabic).
 *
 * We rebuild a fresh regex per call to avoid the global-regex
 * `lastIndex` state that would otherwise cause flaky results.
 */
export function isArabicDigit(ch: string): boolean {
  return /[٠-٩۰-۹]/.test(ch);
}
