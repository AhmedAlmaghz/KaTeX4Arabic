// Validates that KaTeX can render each candidate raw-Unicode mirror char,
// so the UNICODE_MIRRORS table only contains renderable pairs.
import { validateLatex, processLatex } from './src/lib/katex-arabic/index.ts';

console.warn = () => {}; // silence KaTeX warnings

const chars = [
  '∈', '∋', '⊆', '⊇', '⊂', '⊃', '⊊', '⊋',
  '≤', '≥', '≪', '≫', '≲', '≳', '≦', '≧', '≨', '≩',
  '≺', '≻', '≼', '≽', '≮', '≯', '≰', '≱', '⊀', '⊁',
  '▷', '◁', '⊵', '⊴',
  '→', '←', '⟶', '⟵', '⇒', '⇐', '⟹', '⟸',
  '↪', '↩', '↦', '↤', '↗', '↖', '↘', '↙',
];

for (const ch of chars) {
  const err = validateLatex(`س ${ch} م`);
  const hex = ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
  console.log(`${ch} U+${hex} : ${err === null ? 'OK' : 'FAIL ' + err.slice(0, 70)}`);
}

console.log('');
console.log('command \\mapsfrom:', validateLatex('a \\mapsfrom b'));
console.log('unicode mirror after pipeline:', processLatex('س ∈ م'));
console.log('unicode mirror arrow after pipeline:', processLatex('س → م'));
