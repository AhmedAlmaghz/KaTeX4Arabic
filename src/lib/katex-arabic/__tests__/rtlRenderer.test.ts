/**
 * Tests for the main render pipeline and configuration helpers.
 * Verifies that the pipeline produces sensible Arabic output for
 * common inputs and that defaults are well-formed.
 */

import { describe, expect, it } from 'vitest';
import {
  renderArabicToString,
  processLatex,
  validateLatex,
  DEFAULT_OPTIONS,
  resolveOptions,
  getArabicMacros,
  buildCssClasses,
} from '../index';

describe('processLatex', () => {
  it('produces a non-empty string for valid input', () => {
    const result = processLatex('\\sin(x) + 1');
    expect(result.length).toBeGreaterThan(0);
  });

  it('applies function translation by default', () => {
    const result = processLatex('\\sin(x)');
    expect(result).toContain('جا');
  });

  it('applies variable translation by default', () => {
    const result = processLatex('x^2 + y^2');
    expect(result).toContain('\\text{س}');
  });

  it('can disable individual transforms', () => {
    // When both function and variable translation are off, input is unchanged
    const result = processLatex('\\sin(x)', {
      translateFuncs: false,
      translateVars: false,
    });
    expect(result).toBe('\\sin(x)');
  });

  it('respects translateFuncs toggle independently', () => {
    // translateFuncs=false leaves \\sin alone, but translateVars still processes x
    const result = processLatex('\\sin(x)', { translateFuncs: false });
    expect(result).toBe('\\sin(\\text{س})');
  });

  it('leaves TeX dimension literals untouched (units guard)', () => {
    // \\hspace{5pt} is a size, not math content — converting the digits
    // would corrupt the dimension ("Invalid size" in KaTeX).
    const result = processLatex('\\hspace{5pt}');
    expect(result).toContain('5pt');
    expect(result).not.toContain('٥pt');
  });

  it('still converts digits inside bracketed intervals', () => {
    const result = processLatex('x \\in [0, 1]');
    expect(result).toContain('٠');
    expect(result).toContain('١');
  });
});

describe('renderArabicToString', () => {
  it('produces a wrapped HTML string', () => {
    const html = renderArabicToString('\\sin(x)');
    expect(html).toContain('katex-arabic');
    expect(html).toContain('katex');
  });

  it('respects the displayMode option', () => {
    const html = renderArabicToString('x = 1', { displayMode: true });
    expect(html).toContain('katex-display');
  });

  it('handles invalid LaTeX without throwing', () => {
    expect(() => renderArabicToString('\\frac{')).not.toThrow();
  });

  it('renders a styled, accessible error fallback for invalid LaTeX', () => {
    const html = renderArabicToString('\\frac{');
    expect(html).toContain('katex-arabic--error');
    expect(html).toContain('aria-hidden');
  });

  it('propagates errors when throwOnError is true', () => {
    expect(() => renderArabicToString('\\frac{', { throwOnError: true })).toThrow();
  });

  it('embeds the operatorScale as a CSS variable on the wrapper', () => {
    const html = renderArabicToString('\\sin(x)', { operatorScale: 1.08 });
    expect(html).toContain('--ka-op-scale:1.08');
  });

  it('renders \\pmod with its Arabic name and preserved argument', () => {
    const html = renderArabicToString('a \\pmod{4}');
    expect(html).toContain('باقي');
    // The Latin operator name must be gone ("mode" in full-rtl-mode is
    // a class name, not rendered text, hence the tag-bounded check).
    expect(html).not.toMatch(/>mod</);
    // The parenthesized argument form survives: (باقي …).
    expect(html).toContain('mopen');
    expect(html).toContain('mclose');
  });

  it('exposes the Arabic-first font stack through --ka-font-family', () => {
    const html = renderArabicToString('x = 1');
    expect(html).toContain('--ka-font-family:');
    expect(html).toContain("'Amiri'");
    // The robust fallback chain survives the inline override.
    expect(html).toContain('Noto Naskh Arabic');
    expect(html).toContain('KaTeX_Main');
  });

  it('mirrors operators but protects prose inside \\text{…}', () => {
    const result = processLatex('x < y + \\text{a > b}');
    expect(result).toContain('\\text{س} > \\text{ص}');
    expect(result).toContain('\\text{a > b}');
  });
});

describe('validateLatex', () => {
  it('returns null for valid LaTeX', () => {
    expect(validateLatex('x + 1 = 2')).toBeNull();
  });

  it('returns an error message for invalid LaTeX', () => {
    const error = validateLatex('\\frac{');
    expect(error).toBeTruthy();
    expect(typeof error).toBe('string');
  });
});

describe('DEFAULT_OPTIONS', () => {
  it('has expected defaults', () => {
    expect(DEFAULT_OPTIONS.numerals).toBe('arabic');
    expect(DEFAULT_OPTIONS.direction).toBe('rtl');
    expect(DEFAULT_OPTIONS.fontFamily).toBe('Amiri');
    expect(DEFAULT_OPTIONS.translateFuncs).toBe(true);
    expect(DEFAULT_OPTIONS.mirrorSymbols).toBe(true);
  });
});

describe('resolveOptions', () => {
  it('returns defaults when called with no arguments', () => {
    const opts = resolveOptions();
    expect(opts).toEqual(DEFAULT_OPTIONS);
  });

  it('merges user overrides on top of defaults', () => {
    const opts = resolveOptions({ numerals: 'latin' });
    expect(opts.numerals).toBe('latin');
    expect(opts.direction).toBe('rtl'); // still default
  });

  it('does not mutate the defaults object', () => {
    const opts = resolveOptions({ numerals: 'latin' });
    opts.numerals = 'extended';
    expect(DEFAULT_OPTIONS.numerals).toBe('arabic');
  });
});

describe('getArabicMacros', () => {
  it('returns built-in Arabic macros', () => {
    const macros = getArabicMacros();
    expect(macros['\\جا']).toBeDefined();
    expect(macros['\\نها']).toBeDefined();
  });

  it('merges custom macros', () => {
    const macros = getArabicMacros({ '\\foo': '\\operatorname{foo}' });
    expect(macros['\\foo']).toBe('\\operatorname{foo}');
  });
});

describe('buildCssClasses', () => {
  it('always includes the base class', () => {
    const classes = buildCssClasses({});
    expect(classes).toContain('katex-arabic');
  });

  it('includes the display class when displayMode is true', () => {
    const classes = buildCssClasses({ displayMode: true });
    expect(classes).toContain('is-display');
  });

  it('includes the inline class when displayMode is false', () => {
    const classes = buildCssClasses({ displayMode: false });
    expect(classes).toContain('is-inline');
  });

  it('includes mirror classes when mirroring is on', () => {
    const classes = buildCssClasses({
      mirrorBigOperators: true,
      mirrorSqrt: true,
    });
    expect(classes).toContain('mirror-big-ops');
    expect(classes).toContain('mirror-sqrt');
  });
});
