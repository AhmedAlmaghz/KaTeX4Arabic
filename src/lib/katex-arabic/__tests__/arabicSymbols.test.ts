/**
 * Tests for the symbol mirroring utilities.
 * Verifies that operators and arrows are correctly mirrored, and
 * that the placeholder-based pass prevents ping-pong replacement.
 */

import { describe, expect, it } from 'vitest';
import { applyMirroredSymbols, MIRRORED_SYMBOLS } from '../arabicSymbols';

describe('applyMirroredSymbols', () => {
  it('returns input unchanged when disabled', () => {
    expect(applyMirroredSymbols('a < b', false)).toBe('a < b');
  });

  it('mirrors simple comparison operators', () => {
    expect(applyMirroredSymbols('a < b', true)).toBe('a > b');
    expect(applyMirroredSymbols('a > b', true)).toBe('a < b');
  });

  it('mirrors \\lt and \\gt', () => {
    expect(applyMirroredSymbols('a \\lt b', true)).toBe('a \\gt b');
  });

  it('mirrors arrows', () => {
    expect(applyMirroredSymbols('a \\to b', true)).toBe('a \\gets b');
    expect(applyMirroredSymbols('a \\rightarrow b', true)).toBe('a \\leftarrow b');
  });

  it('does not ping-pong longer/shorter variants', () => {
    // \longrightarrow should become \longleftarrow, NOT cycle back
    const result = applyMirroredSymbols('a \\longrightarrow b', true);
    expect(result).toBe('a \\longleftarrow b');
  });

  it('handles multiple replacements in one input', () => {
    const result = applyMirroredSymbols('a < b \\Rightarrow c > d', true);
    expect(result).toContain('>');
    expect(result).toContain('\\Leftarrow');
  });

  it('leaves unrelated content alone', () => {
    expect(applyMirroredSymbols('a + b = c', true)).toBe('a + b = c');
  });

  it('protects \\text{} content from mirroring', () => {
    expect(applyMirroredSymbols('\\text{a < b}', true)).toBe('\\text{a < b}');
  });

  it('protects \\operatorname{} names from mirroring', () => {
    expect(applyMirroredSymbols('\\operatorname{max}(a) < b', true)).toBe(
      '\\operatorname{max}(a) > b',
    );
  });
});

describe('MIRRORED_SYMBOLS dictionary', () => {
  it('contains comparison operators', () => {
    expect(MIRRORED_SYMBOLS['\\lt']).toBe('\\gt');
    expect(MIRRORED_SYMBOLS['\\leq']).toBe('\\geq');
  });

  it('contains arrows', () => {
    expect(MIRRORED_SYMBOLS['\\to']).toBe('\\gets');
    expect(MIRRORED_SYMBOLS['\\rightarrow']).toBe('\\leftarrow');
  });

  it('contains brackets', () => {
    expect(MIRRORED_SYMBOLS['\\lbrace']).toBe('\\rbrace');
    expect(MIRRORED_SYMBOLS['\\langle']).toBe('\\rangle');
  });
});
