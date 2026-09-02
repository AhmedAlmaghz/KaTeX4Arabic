/**
 * Guards for the demo gallery data: every example equation in
 * examples.ts must render through the real pipeline without a
 * KaTeX parse error (no error markup in the output).
 */

import { describe, expect, it } from 'vitest';
import { equationGroups } from '../../../data/examples';
import { renderArabicToString } from '../index';

describe('equationGroups gallery', () => {
  it('has unique group ids', () => {
    const ids = equationGroups.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('renders every example without a parse error', () => {
    for (const group of equationGroups) {
      for (const eq of group.equations) {
        const html = renderArabicToString(eq.latex, { displayMode: true });
        expect(
          html.includes('katex-arabic--error'),
          `${group.id} / "${eq.title}": ${eq.latex}`,
        ).toBe(false);
      }
    }
  });
});
