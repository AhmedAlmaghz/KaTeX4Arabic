// Generates rtl-fix-demo.html: renders the four reported problem areas
// (nested/multi-term radicals, matrices, unicode set symbols, accents)
// through the real package renderer with the updated CSS, so the fixes
// can be inspected visually.
import { writeFileSync } from 'node:fs';
import { renderArabicToString } from './src/lib/katex-arabic/index.ts';

console.warn = () => {};

const groups = [
  {
    title: 'الجذر: قراءة المقدار من اليمين لليسار + جذر متداخل',
    cases: [
      ['\\sqrt{ب + ٣}', '\\sqrt{ب + ٣}'],
      ['\\sqrt{\\sqrt{س} + ب}', '\\sqrt{\\sqrt{س} + ب}'],
      ['\\sqrt[3]{\\frac{أ}{ب}}', '\\sqrt[3]{\\frac{أ}{ب}}'],
      ['\\sqrt{1+\\sqrt{x+\\sqrt{y}}}', '\\sqrt{1+\\sqrt{x+\\sqrt{y}}}'],
    ],
  },
  {
    title: 'المصفوفات والمحددات: الأعمدة من اليمين لليسار',
    cases: [
      ['pmatrix', '\\begin{pmatrix} أ & ب \\\\ ج & د \\end{pmatrix}'],
      ['vmatrix', '\\begin{vmatrix} ١ & ٢ \\\\ ٣ & ٤ \\end{vmatrix}'],
      ['cases', '\\begin{cases} س + ١ \\\\ ص - ٢ \\end{cases}'],
    ],
  },
  {
    title: 'رموز المجموعات (يونيكود مباشر)',
    cases: [
      ['∈', 'س ∈ المجموعة م'],
      ['⊆', 'أ ⊆ ب'],
      ['∉', 'س ∉ م'],
    ],
  },
  {
    title: 'العلامات العلوية: المرافق والمتجه والقبعة',
    cases: [
      ['\\bar', '\\bar{س}'],
      ['\\vec', '\\vec{س}'],
      ['\\hat', '\\hat{س}'],
      ['\\overline', '\\overline{ز} = \\bar{ز}'],
    ],
  },
];

let body = '';
for (const g of groups) {
  body += `<h2>${g.title}</h2>\n`;
  for (const [label, latex] of g.cases) {
    const html = renderArabicToString(latex, { displayMode: true });
    body += `  <div class="row"><code class="lbl">${label}</code><div class="eq">${html}</div></div>\n`;
  }
}

const out = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>rtl fixes demo</title>
<link rel="stylesheet" href="./node_modules/katex/dist/katex.min.css">
<link rel="stylesheet" href="./src/katex-arabic.css">
<style>
  body { font-family: sans-serif; background: #fff; padding: 1rem 2rem; }
  h2 { border-bottom: 1px solid #ddd; padding-bottom: 4px; }
  .row { display: flex; align-items: center; gap: 16px; margin: 10px 0; }
  .lbl { min-width: 90px; color: #666; direction: ltr; }
  .eq { flex: 1; font-size: 1.4em; }
</style>
</head>
<body>
<h1>عرض إصلاحات الاتجاه — mirrorSqrt / mtable RTL / رموز يونيكود / العلامات العلوية</h1>
${body}
</body>
</html>
`;

writeFileSync('rtl-fix-demo.html', out);
console.log('written rtl-fix-demo.html');

