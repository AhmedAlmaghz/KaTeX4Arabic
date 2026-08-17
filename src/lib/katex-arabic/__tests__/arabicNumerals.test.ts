/**
 * Tests for the numeral conversion utilities.
 * Covers Latin→Arabic-Indic, Latin→Eastern-Arabic, separators,
 * and round-trip behaviour.
 */

import { describe, expect, it } from 'vitest';
import {
  toArabicNumerals,
  fromArabicNumerals,
  formatArabicNumber,
  convertNumbersInText,
  isArabicDigit,
} from '../arabicNumerals';

describe('toArabicNumerals', () => {
  it('converts Latin digits to Arabic-Indic by default', () => {
    expect(toArabicNumerals('123')).toBe('١٢٣');
  });

  it('converts Latin digits to Eastern-Arabic when requested', () => {
    expect(toArabicNumerals('456', 'extended')).toBe('۴۵۶');
  });

  it('passes through unchanged when style is "latin"', () => {
    expect(toArabicNumerals('789', 'latin')).toBe('789');
  });

  it('handles empty input', () => {
    expect(toArabicNumerals('')).toBe('');
  });

  it('leaves non-digit characters untouched', () => {
    expect(toArabicNumerals('a1b2c3')).toBe('a١b٢c٣');
  });

  it('accepts numeric input', () => {
    expect(toArabicNumerals(42)).toBe('٤٢');
  });
});

describe('fromArabicNumerals', () => {
  it('converts Arabic-Indic back to Latin', () => {
    expect(fromArabicNumerals('١٢٣')).toBe('123');
  });

  it('converts Eastern-Arabic back to Latin', () => {
    expect(fromArabicNumerals('۴۵۶')).toBe('456');
  });

  it('handles mixed input', () => {
    expect(fromArabicNumerals('١۲٣۴')).toBe('1234');
  });
});

describe('formatArabicNumber', () => {
  it('replaces comma separators with Arabic ones', () => {
    expect(formatArabicNumber('1,000')).toBe('١٬٠٠٠');
  });

  it('replaces decimal point with Arabic comma', () => {
    expect(formatArabicNumber('3.14')).toBe('٣٫١٤');
  });

  it('handles both separators together', () => {
    expect(formatArabicNumber('1,234,567.89')).toBe('١٬٢٣٤٬٥٦٧٫٨٩');
  });
});

describe('convertNumbersInText', () => {
  it('converts all numbers in a string', () => {
    expect(convertNumbersInText('in 2024 we have 365 days')).toBe('in ٢٠٢٤ we have ٣٦٥ days');
  });

  it('returns input unchanged when style is "latin"', () => {
    expect(convertNumbersInText('in 2024', 'latin')).toBe('in 2024');
  });

  it('respects the formatSeparators option', () => {
    // With formatSeparators=false, only the digits change, the separators stay Latin
    expect(convertNumbersInText('1,000.5', 'arabic', false)).toBe('١,٠٠٠.٥');
    // With formatSeparators=true (default), separators also become Arabic
    expect(convertNumbersInText('1,000.5', 'arabic', true)).toBe('١٬٠٠٠٫٥');
  });
});

describe('isArabicDigit', () => {
  it('detects Arabic-Indic digits', () => {
    expect(isArabicDigit('٥')).toBe(true);
  });

  it('detects Eastern-Arabic digits', () => {
    expect(isArabicDigit('۵')).toBe(true);
  });

  it('returns false for Latin digits', () => {
    expect(isArabicDigit('5')).toBe(false);
  });

  it('returns false for non-digit characters', () => {
    expect(isArabicDigit('a')).toBe(false);
  });
});
