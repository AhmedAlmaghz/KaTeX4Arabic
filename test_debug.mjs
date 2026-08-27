import { renderArabicToString } from './src/lib/katex-arabic/index.ts';
const latex = 'f(x) = \\begin{cases} 1 & ، x > 1 \\\\\\ x^2 & ، 0 \\leq x \\leq 1 \\\\\\ 0 & ، -1 \\leq x < 0 \\\\\\ -1 & ، x < -1 \\end{cases}';
const html = renderArabicToString(latex, {displayMode:true});
console.log('has-cases?', html.includes('has-cases'));
console.log('mirror-brackets?', html.includes('mirror-brackets'));
console.log('First 800 chars of HTML:');
console.log(html.slice(0,800));
