// Generates sqrt-mirror-demo.html: renders sqrt variants through the
// real package renderer, side by side with mirrorSqrt ON and OFF, so
// the mirrored-radical geometry can be inspected visually (open the
// file, or screenshot it with a headless browser).
import { writeFileSync } from 'node:fs';
import { renderArabicToString } from './src/lib/katex-arabic/index.ts';

const equations = [
  '\\sqrt[3]{x}',
  '\\sqrt{x}',
  '\\sqrt{x^2 + 1}',
  '\\sqrt[3]{\\frac{a}{b}}',
  '\\sqrt{1+\\sqrt{x+\\sqrt{y}}}',
];

let rows = '';
for (const latex of equations) {
  const on = renderArabicToString(latex, { displayMode: true, mirrorSqrt: true });
  const off = renderArabicToString(latex, { displayMode: true, mirrorSqrt: false });
  rows += `
  <div class="row">
    <code class="lbl">${latex.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code>
    <div class="eq on">${on}</div>
    <div class="eq off">${off}</div>
  </div>`;
}

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>sqrt mirror demo</title>
<link rel="stylesheet" href="./node_modules/katex/dist/katex.min.css">
<link rel="stylesheet" href="./src/katex-arabic.css">
<style>
  body { font-family: 'Amiri', 'Noto Naskh Arabic', serif; background: #fff; padding: 24px 32px; }
  h1 { font-size: 18px; }
  .head { display: flex; gap: 40px; font-size: 14px; font-weight: bold; margin-bottom: 4px; }
  .row { display: flex; gap: 40px; align-items: center; border-top: 1px solid #eee; padding: 14px 0; }
  .lbl { flex: 0 0 210px; font-size: 12px; color: #555; direction: ltr; text-align: left; }
  .eq { min-width: 220px; }
  .eq.off { opacity: .55; }
  /* debug: outline the sqrt boxes to check widths */
  .eq .katex .sqrt { outline: 1px solid rgba(255,0,0,.6); }
  .eq .katex .hide-tail { outline: 1px solid rgba(0,120,255,.6); }
  body { zoom: 1.6; }
</style>
</head>
<body>
<h1>عكس رمز الجذر — mirrorSqrt: ON vs OFF (right column = unmirrored reference)</h1>
<div class="head"><span class="lbl">LaTeX</span><span>ON (mirrored)</span><span>OFF (reference)</span></div>
${rows}
</body>
</html>
`;

writeFileSync('sqrt-mirror-demo.html', html, 'utf8');
console.log('wrote sqrt-mirror-demo.html');
