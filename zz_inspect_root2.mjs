import { renderArabicToString } from './src/lib/katex-arabic/index.ts';
console.warn = () => {};
const clean = (s) => s.replace(/<path[^>]*>[\s\S]*?<\/path>/g, '<path/>').replace(/d=\"[^\"]*\"/g, '');
const html = renderArabicToString('\\sqrt[ن]{س^2+1}', { displayMode: true });
const i = html.indexOf('sqrt');
console.log(clean(html.substring(Math.max(0, i - 100), i + 2000)));
