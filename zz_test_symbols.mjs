// Tests the real package renderer for set-symbol mirroring and matrices.
import { renderArabicToString } from './src/lib/katex-arabic/index.ts';

console.warn = () => {}; // silence KaTeX "No character metrics" warnings

const cases = {
  inCmd: 'س \\in م',
  subseteqCmd: 'أ \\subseteq ب',
  inUnicode: 'س ∈ م',
  subsetUnicode: 'أ ⊆ ب',
  niCmd: 'م \\ni س',
  matrix: '\\begin{pmatrix} أ & ب \\\\ ج & د \\end{pmatrix}',
  det: '\\begin{vmatrix} ١ & ٢ \\\\ ٣ & ٤ \\end{vmatrix}',
};
for (const [name, latex] of Object.entries(cases)) {
  const html = renderArabicToString(latex, { displayMode: true });
  const hasNi = html.includes('\\ni') || html.includes('∋');
  const hasIn = html.includes('∈');
  const hasSse = html.includes('\\supseteq') || html.includes('⊇');
  const hasSst = html.includes('⊆');
  const dir = html.match(/dir="([^"]*)"/)?.[1] ?? '';
  console.log(
    `${name.padEnd(14)} dir=${dir.padEnd(4)} ni=${hasNi} in=${hasIn} sseteq=${hasSse} sset=${hasSst} hasMatrix=${html.includes('has-matrix')} hasCases=${html.includes('has-cases')} mirrorSymbols=${html.includes('mirror-symbols')}`,
  );
}
