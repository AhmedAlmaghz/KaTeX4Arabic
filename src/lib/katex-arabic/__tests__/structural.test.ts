/**
 * ════════════════════════════════════════════════════════════════
 *  structural.test.ts
 *  Tests for the structural / RTL-adaptation layer:
 *    - detectStructuralClass (cases / \left\{ vs matrices)
 *    - `has-cases` wrapper class scoping the piecewise mirror rules
 *    - big-operator mirroring still present for DISPLAY and INLINE math
 *    - RTL integral / nested-root constraints never throw
 * ════════════════════════════════════════════════════════════════
 */

import { describe, expect, it } from 'vitest';
import {
  renderArabicToString,
  validateLatex,
  detectStructuralClass,
} from '../index';

describe('detectStructuralClass', () => {
  it('detects \\begin{cases} piecewise environments', () => {
    expect(detectStructuralClass('\\begin{cases} x & y \\end{cases}')).toBe('has-cases');
    expect(detectStructuralClass('\\begin{dcases} a & b \\end{dcases}')).toBe('has-cases');
  });

  it('detects the explicit \\left\\{ … \\right. piecewise form', () => {
    expect(
      detectStructuralClass('\\left\\{ \\begin{matrix} x \\\\ y \\end{matrix} \\right.'),
    ).toBe('has-cases');
  });

  it('returns null for ordinary matrices', () => {
    expect(detectStructuralClass('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}')).toBeNull();
    expect(detectStructuralClass('\\begin{array}{cc} 1 & 2 \\end{array}')).toBeNull();
  });

  it('ignores "cases" inside \\text{} prose', () => {
    expect(detectStructuralClass('\\text{the \\begin{cases} is special}')).toBeNull();
  });

  it('returns null for plain math', () => {
    expect(detectStructuralClass('x^2 + \\sqrt{y} = 1')).toBeNull();
  });
});

describe('structural CSS class on the wrapper', () => {
  it('adds has-cases only for real piecewise arrays', () => {
    const cases = renderArabicToString(
      '\\begin{cases} \\frac{a}{b} & \\text{if } x>0 \\\\ 0 & \\text{otherwise} \\end{cases}',
      { displayMode: true },
    );
    expect(cases).toContain('has-cases');
    expect(cases).toContain('mirror-brackets');

    const matrix = renderArabicToString('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}');
    expect(matrix).not.toContain('has-cases');
  });
});

describe('RTL integral & big-op mirroring', () => {
  it('mirrors big operators in BOTH display and inline mode', () => {
    // The integrator CSS matches `.op-symbol.large-op` (display) and
    // `.op-symbol.small-op` (inline). Regression-guard the old bug where
    // inline integrals were never mirrored.
    expect(renderArabicToString('\\int_0^1 x^2 dx', { displayMode: true })).toContain('mirror-big-ops');
    expect(renderArabicToString('\\int_0^1 x^2 dx', { displayMode: false })).toContain('mirror-big-ops');
    expect(renderArabicToString('\\sum_{n=1}^N n', { displayMode: true })).toContain('mirror-big-ops');
  });

  // Regression-guard for the bug where display-mode Σ / ∏ silently kept
  // their original / English orientation because the old CSS selector
  // (`.mop:has(> .op-symbol)`) only matched the `.mop > .op-symbol` shape
  // used for inline and display-integral operators. Display sums and
  // products render as `.mop.op-limits` with the glyph nested inside a
  // `.vlist` (a grandchild, not a direct child). The CSS now uses the
  // descendant selector `.mop .op-symbol`, so any future DOM change that
  // removes the `.op-symbol.large-op` glyph node will surface here.
  it('renders display sum/product glyphs as a descendant of .mop', () => {
    const html = renderArabicToString('\\sum_{n=1}^{\\infty} \\frac{1}{n^2}', { displayMode: true });
    expect(html).toMatch(/class="mop[^"]*op-limits[^"]*"[\s\S]*class="[^"]*op-symbol[^"]*large-op[^"]*"/);
  });

  it('keeps RTL integrals with limits valid end-to-end', () => {
    const latex = '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}';
    expect(validateLatex(latex)).toBeNull();
    const html = renderArabicToString(latex, { displayMode: true });
    expect(html).toContain('mirror-big-ops');
    expect(html).toContain('mirror-sqrt');
  });
});

describe('RTL roots (square / higher / nested)', () => {
  it('renders sqrt classes untouched', () => {
    expect(renderArabicToString('\\sqrt{x}')).toContain('mirror-sqrt');
  });

  it('renders higher and nested roots without throwing', () => {
    expect(validateLatex('\\sqrt[3]{\\frac{a}{b}}')).toBeNull();
    expect(validateLatex('\\sqrt{1 + \\sqrt{x + \\sqrt{y}}}')).toBeNull();
    const html = renderArabicToString('\\sqrt[3]{x} \\cdot \\sqrt{1+\\sqrt{y}}');
    expect(html).toContain('mirror-sqrt');
  });
});