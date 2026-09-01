// Dumps DOM for matrix / determinant / accent / vec samples.
import katex from 'katex';
const cases = {
  matrix: '\\begin{pmatrix} أ & ب \\\\ ج & د \\end{pmatrix}',
  det: '\\begin{vmatrix} ١ & ٢ \\\\ ٣ & ٤ \\end{vmatrix}',
  vec: '\\vec{س}',
  overline: '\\overline{س}',
  bar: '\\bar{س}',
  hat: '\\hat{س}',
  in: 'س \\in المجموعة',
  subseteq: 'أ \\subseteq ب',
};
for (const [name, latex] of Object.entries(cases)) {
  console.log('════ ' + name + ' ════');
  console.log(katex.renderToString(latex, { output: 'html' }).replace(/></g, '>\n<'));
}
