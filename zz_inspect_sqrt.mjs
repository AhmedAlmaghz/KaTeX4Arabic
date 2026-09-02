// Inspect integral limits + nth-root index DOM for the RTL nudge fixes.
import { renderArabicToString } from './src/lib/katex-arabic/index.ts';

console.warn = () => {};

const clean = (s) => s.replace(/<path[^>]*>[\s\S]*?<\/path>/g, '<path/>').replace(/d="[^"]*"/g, '');

const html = renderArabicToString('\\lim_{س \\to 0} ف(س)', { displayMode: true });
const i = html.indexOf('op-limits');
console.log(clean(html.substring(Math.max(0, i - 300), i + 1800)));


