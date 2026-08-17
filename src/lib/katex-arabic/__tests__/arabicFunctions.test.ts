/**
 * Tests for the function/variable translation utilities.
 * Verifies correct translation, idempotency, and protection of
 * already-translated regions.
 */

import { describe, expect, it } from 'vitest';
import {
  translateFunctions,
  translateVariables,
  translateDifferentials,
  translateAll,
  FUNCTION_MAP,
  VARIABLE_MAP,
} from '../arabicFunctions';

describe('translateFunctions', () => {
  it('translates basic trigonometric functions', () => {
    expect(translateFunctions('\\sin(x)')).toContain('جا');
    expect(translateFunctions('\\cos(x)')).toContain('جتا');
    expect(translateFunctions('\\tan(x)')).toContain('ظا');
  });

  it('does not match shorter prefixes of longer commands', () => {
    // \\sin should not match inside \\sinh
    const result = translateFunctions('\\sinh(x)');
    expect(result).toContain('جـا'); // hyperbolic, not جا
    expect(result).not.toMatch(/\\operatorname\{جا\}/);
  });

  it('handles custom map overrides', () => {
    const result = translateFunctions('\\sin(x)', { '\\sin': '\\operatorname{zz}' });
    expect(result).toContain('zz');
  });

  it('leaves non-matching LaTeX untouched', () => {
    expect(translateFunctions('x + y = 1')).toBe('x + y = 1');
  });

  it('respects word boundaries after command', () => {
    // \\sin followed by letter should NOT match
    expect(translateFunctions('\\sinx')).not.toContain('جا');
  });

  it('protects prose inside \\text{} blocks', () => {
    const result = translateFunctions('\\text{sin(x)} + \\sin(x)');
    expect(result).toContain('\\text{sin(x)}');
    expect(result).toContain('جا');
  });

  it('protects commands nested inside \\text{} blocks', () => {
    expect(translateFunctions('\\text{\\sin}')).toBe('\\text{\\sin}');
  });
});

describe('translateVariables', () => {
  it('translates single Latin variables to Arabic', () => {
    const result = translateVariables('x + y = z');
    expect(result).toContain('\\text{س}');
    expect(result).toContain('\\text{ص}');
    expect(result).toContain('\\text{ع}');
  });

  it('protects variables inside \\text{} blocks', () => {
    const result = translateVariables('\\text{x} + y');
    // The x inside \text{...} should NOT be re-translated
    expect(result).toBe('\\text{x} + \\text{ص}');
  });

  it('handles uppercase variables', () => {
    const result = translateVariables('A + B');
    expect(result).toContain('\\text{أ}');
    expect(result).toContain('\\text{ب}');
  });

  it('respects custom map overrides', () => {
    const result = translateVariables('x', { x: 'مخصص' });
    expect(result).toBe('\\text{مخصص}');
  });

  it('protects variables inside \\operatorname{} names', () => {
    const result = translateVariables('\\operatorname{max}(x)');
    expect(result).toBe('\\operatorname{max}(\\text{س})');
  });

  it('supports multi-character custom keys', () => {
    const result = translateVariables('ab + c', { ab: 'ب أ' });
    expect(result).toBe('\\text{ب أ} + \\text{جـ}');
  });
});

describe('translateDifferentials', () => {
  it('translates dx, dy, dz to Arabic form', () => {
    const result = translateDifferentials('\\int x dx');
    expect(result).toContain('\\text{د}');
    expect(result).toContain('\\text{س}');
  });

  it('translates d\\theta, d\\phi to Arabic form', () => {
    const result = translateDifferentials('d\\theta');
    expect(result).toContain('\\text{د}');
    expect(result).toContain('\\theta');
  });

  it('does not match differentials inside words', () => {
    // "idx" should not be turned into "iدx"
    const result = translateDifferentials('idx');
    expect(result).toBe('idx');
  });
});

describe('translateAll', () => {
  it('translates differentials, functions, and variables together', () => {
    const result = translateAll('\\sin(x) + dx');
    expect(result).toContain('جا');
    expect(result).toContain('\\text{د}');
    expect(result).toContain('\\text{س}');
  });

  it('respects individual toggles', () => {
    const result = translateAll('\\sin(x)', {
      functions: false,
      variables: false,
      differentials: false,
    });
    expect(result).toBe('\\sin(x)');
  });
});

describe('dictionaries', () => {
  it('FUNCTION_MAP has expected entries', () => {
    expect(FUNCTION_MAP['\\sin']).toBeDefined();
    expect(FUNCTION_MAP['\\cos']).toBeDefined();
    expect(FUNCTION_MAP['\\lim']).toBeDefined();
  });

  it('VARIABLE_MAP covers common letters', () => {
    expect(VARIABLE_MAP.x).toBe('س');
    expect(VARIABLE_MAP.y).toBe('ص');
    expect(VARIABLE_MAP.z).toBe('ع');
  });
});
