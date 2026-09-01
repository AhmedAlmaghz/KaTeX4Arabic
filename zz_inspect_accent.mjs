// Inspects the rendered accent DOM (\bar, \hat, \overline, \vec) on
// Arabic vs Latin base glyphs, to design the RTL accent fix.
import { renderArabicToString } from './src/lib/katex-arabic/index.ts';

console.warn = () => {}; // silence KaTeX "No character metrics" warnings

const cases = {
  barArabic: '\\bar{س}',
  hatArabic: '\\hat{س}',
  overlineArabic: '\\overline{س}',
  vecArabic: '\\vec{س}',
  barLatin: { latex: '\\bar{x}', opts: { translateVars: false, translateFuncs: false, numerals: 'latin' } },
  overlineLatin: { latex: '\\overline{x}', opts: { translateVars: false, translateFuncs: false, numerals: 'latin' } },
};

for (const [name, spec] of Object.entries(cases)) {
  const isObj = typeof spec === 'object';
  const latex = isObj ? spec.latex : spec;
  const opts = isObj ? spec.opts : {};
  const html = renderArabicToString(latex, { displayMode: true, ...opts });
  console.log(`══════ ${name} ══════`);
  const i = html.indexOf('accent');
  console.log(html.substring(Math.max(0, i - 200), i + 1600));
  console.log('');
}
