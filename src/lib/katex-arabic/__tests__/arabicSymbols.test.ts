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

  it('mirrors set relations both ways', () => {
    expect(applyMirroredSymbols('A \\subset B', true)).toBe('A \\supset B');
    expect(applyMirroredSymbols('A \\supset B', true)).toBe('A \\subset B');
    expect(applyMirroredSymbols('A \\subseteq B', true)).toBe('A \\supseteq B');
    expect(applyMirroredSymbols('x \\in S', true)).toBe('x \\ni S');
    expect(applyMirroredSymbols('S \\ni x', true)).toBe('S \\in x');
  });

  it('mirrors unicode set relations typed as literal characters', () => {
    expect(applyMirroredSymbols('س ∈ م', true)).toBe('س ∋ م');
    expect(applyMirroredSymbols('م ∋ س', true)).toBe('م ∈ س');
    expect(applyMirroredSymbols('س ∉ م', true)).toBe('س ∌ م');
    expect(applyMirroredSymbols('أ ⊂ ب', true)).toBe('أ ⊃ ب');
    expect(applyMirroredSymbols('أ ⊆ ب', true)).toBe('أ ⊇ ب');
    expect(applyMirroredSymbols('أ ⊊ ب', true)).toBe('أ ⊋ ب');
  });

  it('mirrors unicode arrows typed as literal characters', () => {
    expect(applyMirroredSymbols('أ → ب', true)).toBe('أ ← ب');
    expect(applyMirroredSymbols('أ ← ب', true)).toBe('أ → ب');
    expect(applyMirroredSymbols('أ ⇒ ب', true)).toBe('أ ⇐ ب');
    expect(applyMirroredSymbols('أ ⟶ ب', true)).toBe('أ ⟵ ب');
  });

  it('mirrors predecessor/successor relations', () => {
    expect(applyMirroredSymbols('a \\prec b', true)).toBe('a \\succ b');
    expect(applyMirroredSymbols('a \\preceq b', true)).toBe('a \\succeq b');
  });

  it('mirrors diagonal arrows', () => {
    expect(applyMirroredSymbols('a \\nearrow b', true)).toBe('a \\nwarrow b');
    expect(applyMirroredSymbols('a \\searrow b', true)).toBe('a \\swarrow b');
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

  it('mirrors every entry back to itself (involution)', () => {
    for (const [key, value] of Object.entries(MIRRORED_SYMBOLS)) {
      expect(MIRRORED_SYMBOLS[value]).toBe(key);
    }
  });

  it('contains set and membership relations', () => {
    expect(MIRRORED_SYMBOLS['\\subset']).toBe('\\supset');
    expect(MIRRORED_SYMBOLS['\\subseteq']).toBe('\\supseteq');
    expect(MIRRORED_SYMBOLS['\\in']).toBe('\\ni');
  });

  it('contains unicode set relations', () => {
    expect(MIRRORED_SYMBOLS['∈']).toBe('∋');
    expect(MIRRORED_SYMBOLS['∉']).toBe('∌');
    expect(MIRRORED_SYMBOLS['⊆']).toBe('⊇');
    expect(MIRRORED_SYMBOLS['→']).toBe('←');
  });
});
