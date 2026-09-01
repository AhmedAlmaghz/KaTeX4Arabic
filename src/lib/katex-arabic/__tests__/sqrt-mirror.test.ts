import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderArabicToString } from '../index';

// ═══════════════════════════════════════════════════════════════
//  sqrt mirroring — structural regression guards
// ═══════════════════════════════════════════════════════════════
//  The CSS mirror-sqrt implementation flips the whole `.sqrt`
//  container and counter-flips only the readable content. That
//  contract depends on (a) KaTeX's internal sqrt DOM shape and
//  (b) specific selectors in katex-arabic.css. These tests pin both,
//  so a KaTeX upgrade or a CSS edit that breaks the mirror surfaces
//  here instead of as a silent visual regression.

const CSS_PATH = join(process.cwd(), 'src', 'katex-arabic.css');

describe('sqrt DOM shape (KaTeX contract)', () => {
  it('renders the .katex-root index as a direct child of .sqrt', () => {
    const html = renderArabicToString('\\sqrt[3]{x}', { displayMode: true });
    expect(html).toMatch(/class="mord sqrt"><span class="katex-root">/);
  });

  it('renders the radicand inside an .svg-align cell as a wrapped span', () => {
    const html = renderArabicToString('\\sqrt{x}', { displayMode: true });
    // The svg-align row directly contains the pstrut, then the
    // shrink-wrapped content span that the CSS counter-flip targets.
    expect(html).toMatch(
      /class="svg-align"[^>]*><span class="pstrut"[^>]*><\/span><span class="mord"/,
    );
  });

  it('keeps the sign SVG in .hide-tail, outside .svg-align', () => {
    const html = renderArabicToString('\\sqrt{x}', { displayMode: true });
    const svgAlign = html.indexOf('svg-align');
    const hideTail = html.indexOf('hide-tail');
    expect(svgAlign).toBeGreaterThan(-1);
    expect(hideTail).toBeGreaterThan(svgAlign);
  });

  it('renders nested roots with the same structure at every level', () => {
    const html = renderArabicToString('\\sqrt{1+\\sqrt{y}}', { displayMode: true });
    const count = (html.match(/class="mord sqrt"/g) ?? []).length;
    expect(count).toBe(2);
  });
});

describe('sqrt mirror CSS contract', () => {
  const css = readFileSync(CSS_PATH, 'utf8');

  it('lays the .sqrt container out RTL (radicand reads Arabic-first)', () => {
    // With direction: rtl the radicand reads right-to-left at every
    // nesting depth and the n-th root index lands on the right of
    // the stroke — no container flip, no per-depth counter-flips.
    expect(css).toMatch(/mirror-sqrt \.katex \.sqrt \{[^}]*direction: rtl/);
  });

  it('flips ONLY the radical glyph (.hide-tail), never the container', () => {
    // Each .sqrt owns exactly one .hide-tail, so flipping it alone
    // gives every radical at any nesting depth exactly one flip.
    expect(css).toContain(
      '.katex-arabic.mirror-sqrt .katex .sqrt .hide-tail',
    );
    // Regression guard: the whole-container flip mirrored nested
    // roots twice (upright) and read multi-term radicands backwards.
    const containerRule = css.slice(
      css.indexOf('.katex-arabic.mirror-sqrt .katex .sqrt {'),
      css.indexOf('}', css.indexOf('.katex-arabic.mirror-sqrt .katex .sqrt {')),
    );
    expect(containerRule).not.toContain('transform');
  });

  it('moves the sign→radicand gap to the stroke (right) side', () => {
    // KaTeX hardcodes padding-left inline on the radicand wrapper;
    // the CSS must beat it with !important and mirror the gap.
    const start = css.indexOf(
      '.katex-arabic.mirror-sqrt .katex .sqrt .svg-align > span:not(.pstrut) {',
    );
    const rule = css.slice(start, css.indexOf('}', start));
    expect(rule).toContain('padding-left: 0 !important');
    expect(rule).toContain('padding-right: 0.833em !important');
  });

  it('drops KaTeX\'s negative n-th-root-index margin (RTL side switch)', () => {
    expect(css).toContain(
      '.katex-arabic.mirror-sqrt .katex .sqrt > .katex-root',
    );
  });
});
