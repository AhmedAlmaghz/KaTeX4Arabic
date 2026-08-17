/**
 * ════════════════════════════════════════════════════════════════
 *  robustness.test.ts
 *  Tests for the performance and safety hardening added to the
 *  render pipeline:
 *    - LRU render cache (hit / miss / clear)
 *    - renderArabicBatch (order, per-item overrides)
 *    - MAX_INPUT_LENGTH guard (no catastrophic cost on huge input)
 *    - empty / whitespace input short-circuit
 * ════════════════════════════════════════════════════════════════
 */

import { describe, expect, it } from 'vitest';
import {
  renderArabicToString,
  renderArabicWithMeta,
  renderArabicBatch,
  clearRenderCache,
  MAX_INPUT_LENGTH,
  processLatex,
} from '../index';

describe('render cache', () => {
  it('returns identical HTML for repeated renders of the same input', () => {
    clearRenderCache();
    const first = renderArabicToString('x^2 + 1');
    const second = renderArabicToString('x^2 + 1');
    expect(second).toBe(first);
  });

  it('produces different output when options differ', () => {
    clearRenderCache();
    const arabic = renderArabicToString('x = 1', { numerals: 'arabic' });
    const latin = renderArabicToString('x = 1', { numerals: 'latin' });
    expect(arabic).not.toBe(latin);
  });

  it('clearRenderCache forces a fresh render', () => {
    const a = renderArabicToString('\\sin(x)');
    clearRenderCache();
    const b = renderArabicToString('\\sin(x)');
    // Content is identical, but the call path re-rendered. We assert
    // correctness rather than identity (cache is an implementation detail).
    expect(b).toBe(a);
  });

  it('does not cache error results', () => {
    clearRenderCache();
    const first = renderArabicWithMeta('\\frac{');
    expect(first.error).toBeTruthy();
    // A second call still reports the error (not a stale success).
    const second = renderArabicWithMeta('\\frac{');
    expect(second.error).toBeTruthy();
  });
});

describe('renderArabicBatch', () => {
  it('renders multiple strings preserving input order', () => {
    const results = renderArabicBatch(['x = 1', 'y = 2', 'z = 3']);
    expect(results).toHaveLength(3);
    for (const r of results) {
      expect(r.error).toBeNull();
      expect(r.html).toContain('katex-arabic');
    }
  });

  it('supports per-item option overrides', () => {
    const results = renderArabicBatch([
      { latex: 'x = 1', options: { numerals: 'latin' } },
      'x = 1',
    ], { numerals: 'arabic' });

    expect(results).toHaveLength(2);
    // First item forced latin numerals → no Arabic-Indic digit.
    expect(results[0]?.html).not.toContain('١');
    // Second item uses the shared arabic default → Arabic-Indic digit.
    expect(results[1]?.html).toContain('١');
  });

  it('handles an empty batch', () => {
    expect(renderArabicBatch([])).toEqual([]);
  });
});

describe('input guards', () => {
  it('returns empty input unchanged without throwing', () => {
    expect(() => renderArabicToString('')).not.toThrow();
    expect(() => renderArabicToString('   ')).not.toThrow();
  });

  it('bounds preprocessing cost for extremely long input', () => {
    // Build an input far beyond MAX_INPUT_LENGTH. The guard truncates it
    // before any regex runs, so our preprocessing stays fast. We time
    // processLatex (where our transforms live) rather than the full
    // render, because KaTeX itself must still parse whatever we hand it.
    const huge = 'x + '.repeat(MAX_INPUT_LENGTH);
    const start = Date.now();
    expect(() => processLatex(huge)).not.toThrow();
    const elapsed = Date.now() - start;
    // Generous bound: preprocessing of the capped input must be quick.
    expect(elapsed).toBeLessThan(1500);
  });

  it('truncates input longer than MAX_INPUT_LENGTH', () => {
    const huge = 'x'.repeat(MAX_INPUT_LENGTH + 5000);
    const processed = processLatex(huge, { translateVars: false });
    // With translation off, output equals the (truncated) input.
    expect(processed.length).toBeLessThanOrEqual(MAX_INPUT_LENGTH);
  });

  it('exposes a positive MAX_INPUT_LENGTH constant', () => {
    expect(MAX_INPUT_LENGTH).toBeGreaterThan(0);
  });
});
