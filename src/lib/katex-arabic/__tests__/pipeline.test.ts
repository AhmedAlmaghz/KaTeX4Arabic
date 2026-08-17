/**
 * ════════════════════════════════════════════════════════════════
 *  pipeline.test.ts
 *  End-to-end tests for the full Arabic preprocessing pipeline.
 *  These verify that the individual transforms (differentials,
 *  functions, variables, mirroring, numerals) compose correctly and
 *  in the right order.
 * ════════════════════════════════════════════════════════════════
 */

import { describe, expect, it } from 'vitest';
import { processLatex, renderArabicToString, validateLatex } from '../index';

describe('full Arabic pipeline', () => {
  it('translates, mirrors and converts digits in a single pass', () => {
    const result = processLatex('\\sin(x) < \\cos(y) + 3');

    // Function names → Arabic operators
    expect(result).toContain('جا');
    expect(result).toContain('جتا');
    // Variables → Arabic math text
    expect(result).toContain('\\text{س}');
    expect(result).toContain('\\text{ص}');
    // Comparison symbol is mirrored for RTL
    expect(result).toContain('>');
    // Digits become Arabic-Indic numerals
    expect(result).toContain('٣');
  });

  it('handles limits, differentials and fractions together', () => {
    const result = processLatex('\\lim_{x \\to 0} \\frac{\\sin x}{x} dx');

    expect(result).toContain('\\operatorname*{نها}');
    expect(result).toContain('\\gets'); // \to mirrored for RTL
    expect(result).toContain('\\text{د}'); // dx differential
    expect(result).toContain('\\text{س}');
    expect(result).toContain('٠'); // 0 → ٠
  });

  it('keeps the order of transforms stable and idempotent-safe', () => {
    // Process once → the inserted \text{} / \operatorname{} regions must
    // survive a second pass unchanged (no double translation).
    const once = processLatex('\\sin(x) + dx');
    const twice = processLatex(once);
    expect(twice).toBe(once);
  });

  it('renders every mirror + RTL class by default', () => {
    const html = renderArabicToString('\\sqrt{x}');
    expect(html).toContain('mirror-sqrt');
    expect(html).toContain('mirror-big-ops');
    expect(html).toContain('mirror-brackets');
    expect(html).toContain('mirror-symbols');
    expect(html).toContain('full-rtl-mode');
    expect(html).toContain('is-inline');
  });

  it('respects the displayMode flag end-to-end', () => {
    const html = renderArabicToString('x = 1', { displayMode: true });
    expect(html).toContain('katex-display');
    expect(html).toContain('is-display');
  });

  it('validateLatex accepts real-world Arabic equations', () => {
    const examples = [
      '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
      '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
      '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    ];
    for (const latex of examples) {
      expect(validateLatex(latex), latex).toBeNull();
    }
  });

  it('escapes user content in the error fallback (no HTML injection)', () => {
    const html = renderArabicToString('<script>alert(1)</script> \\frac{');
    expect(html).not.toContain('<script>');
    expect(html).toContain('katex-arabic--error');
  });
});