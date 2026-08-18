/**
 * ════════════════════════════════════════════════════════════════
 *  Documentation.tsx
 *  In-app documentation view: translation tables, usage examples,
 *  feature highlights.
 *
 *  Uses the same MathEquation component so the documentation
 *  previews always match what the library actually renders.
 * ════════════════════════════════════════════════════════════════
 */

import { type FC } from 'react';
import { MathInline } from './MathEquation';
import type { PartialArabicOptions } from '../lib/katex-arabic/types';

export interface DocumentationProps {
  options: PartialArabicOptions;
}

// ─── Translation tables ─────────────────────────────────────
interface TableRow {
  latex?: string;
  latin?: string;
  arabic: string;
  preview: string;
}

const FUNCTION_ROWS: TableRow[] = [
  { latex: '\\sin', arabic: 'جا', preview: '\\sin(x)' },
  { latex: '\\cos', arabic: 'جتا', preview: '\\cos(x)' },
  { latex: '\\tan', arabic: 'ظا', preview: '\\tan(x)' },
  { latex: '\\cot', arabic: 'ظتا', preview: '\\cot(x)' },
  { latex: '\\sec', arabic: 'قا', preview: '\\sec(x)' },
  { latex: '\\csc', arabic: 'قتا', preview: '\\csc(x)' },
  { latex: '\\ln', arabic: 'لو', preview: '\\ln(x)' },
  { latex: '\\log', arabic: 'لغ', preview: '\\log(x)' },
  { latex: '\\lim', arabic: 'نها', preview: '\\lim_{x \\to 0}' },
  { latex: '\\max', arabic: 'أقصى', preview: '\\max(a, b)' },
  { latex: '\\min', arabic: 'أدنى', preview: '\\min(a, b)' },
  { latex: '\\Pr', arabic: 'حا', preview: '\\Pr(A)' },
  { latex: '\\det', arabic: 'محدد', preview: '\\det(A)' },
  { latex: '\\gcd', arabic: 'ق.م.أ', preview: '\\gcd(a, b)' },
];

const VARIABLE_ROWS: TableRow[] = [
  { latin: 'x', arabic: 'س', preview: 'x^2 + 1' },
  { latin: 'y', arabic: 'ص', preview: 'y = x' },
  { latin: 'z', arabic: 'ع', preview: 'z^3' },
  { latin: 'a, b, c', arabic: 'أ، ب، جـ', preview: 'a + b = c' },
  { latin: 'dx', arabic: 'د س', preview: '\\int dx' },
  { latin: 'dy', arabic: 'د ص', preview: '\\int dy' },
  { latin: 'e', arabic: 'هـ', preview: 'e^x' },
  { latin: 'i', arabic: 'ت', preview: 'x + iy' },
  { latin: 'n, m, k', arabic: 'ن، م، ك', preview: 'n + m' },
  { latin: 'r', arabic: 'ر', preview: 'r^2' },
  { latin: 't', arabic: 'ز', preview: 't = 0' },
];

const FEATURES: ReadonlyArray<{ icon: string; title: string; desc: string }> = [
  { icon: '🔢', title: 'الأرقام العربية', desc: 'تحويل تلقائي للأرقام (٠١٢…٩) أو الفارسية (۰۱۲…۹)' },
  { icon: '📐', title: 'ترجمة الدوال', desc: 'sin → جا، cos → جتا، lim → نها' },
  { icon: '🔤', title: 'ترجمة المتغيرات', desc: 'x → س، y → ص، z → ع، n → ن' },
  { icon: '↔️', title: 'عكس الرموز', desc: '∫، Σ، ∏، √ معكوسة بصرياً' },
  { icon: '🌙', title: 'الوضع العربي الكامل', desc: 'RTL للمعادلة بأكملها' },
  { icon: '🎨', title: 'خطوط عربية', desc: 'دعم Amiri وCairo وTajawal وغيرها' },
  { icon: '🖥️', title: 'الوضع الداكن', desc: 'دعم تلقائي كامل' },
  { icon: '📱', title: 'متجاوب', desc: 'يعمل على جميع الشاشات' },
  { icon: '⚡', title: 'أداء عالٍ', desc: 'useDeferredValue للتفاعل السلس' },
  { icon: '♿', title: 'إمكانية وصول', desc: 'aria-labels وkeyboard shortcuts' },
];

// ═══════════════════════════════════════════════════════════════
//  Main component
// ═══════════════════════════════════════════════════════════════

export const Documentation: FC<DocumentationProps> = ({ options }) => {
  return (
    <div>
      {/* ─── Introduction ──────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">📖</span>
          مقدمة
        </h2>
        <p>
          <strong>KaTeX Arabic</strong> مكتبة متخصصة لعرض المعادلات الرياضية بالأسلوب
          العربي الاحترافي. تدعم المكتبة تحويل الأرقام إلى الشكل العربي-الهندي،
          وترجمة أسماء الدوال الرياضية (مثل <code>sin → جا</code>،{' '}
          <code>cos → جتا</code>، <code>lim → نها</code>)، بالإضافة إلى عكس رموز
          الاتجاه للتوافق مع الكتابة من اليمين إلى اليسار.
        </p>
        <p>
          المكتبة مبنية على <a href="https://katex.org" target="_blank" rel="noopener noreferrer">KaTeX</a>{' '}
          وتدعم جميع أوامر LaTeX القياسية، مع إضافة طبقة تحويل عربية فوق
          الإخراج النهائي.
        </p>
      </section>

      {/* ─── Function table ────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">📋</span>
          قاموس الدوال المترجمة
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th>LaTeX</th>
                <th>العربي</th>
                <th>المعاينة</th>
              </tr>
            </thead>
            <tbody>
              {FUNCTION_ROWS.map((row) => (
                <tr key={row.latex}>
                  <td><code dir="ltr">{row.latex}</code></td>
                  <td><strong>{row.arabic}</strong></td>
                  <td><MathInline latex={row.preview ?? ''} options={options} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Variable table ────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">🔤</span>
          قاموس المتغيرات
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th>اللاتيني</th>
                <th>العربي</th>
                <th>المعاينة</th>
              </tr>
            </thead>
            <tbody>
              {VARIABLE_ROWS.map((row) => (
                <tr key={row.latin}>
                  <td><code dir="ltr">{row.latin}</code></td>
                  <td><strong>{row.arabic}</strong></td>
                  <td><MathInline latex={row.preview ?? ''} options={options} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Usage examples ────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">💻</span>
          أمثلة الاستخدام
        </h2>

        <h3>الاستخدام المباشر (Vanilla JS):</h3>
        <pre className="doc-code" dir="ltr">
{`import { renderArabicToString } from 'katex4arabic';
import 'katex4arabic/katex-arabic.css';

const html = renderArabicToString('\\\\sin^2(x) + \\\\cos^2(x) = 1', {
  numerals: 'arabic',
  translateFuncs: true,
  mirrorSymbols: true,
});
document.getElementById('eq').innerHTML = html;`}
        </pre>

        <h3>الاستخدام مع React:</h3>
        <pre className="doc-code" dir="ltr">
{`import { useArabicKatex } from 'katex4arabic/hooks';
import 'katex4arabic/katex-arabic.css';

function Equation({ latex }) {
  const html = useArabicKatex(latex, { numerals: 'arabic' });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}`}
        </pre>

        <h3>معالجة LaTeX فقط (بدون عرض):</h3>
        <pre className="doc-code" dir="ltr">
{`import { processLatex } from 'katex4arabic';

const processed = processLatex('\\\\sin(x) + dx');
// → "\\\\operatorname{جا}(x) + \\\\text{د}\\\\text{س}"`}
        </pre>
      </section>

      {/* ─── Visual control ─────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">🎨</span>
          التوافق البصري مع اللاتينية وتخصيص الأنماط
        </h2>
        <p>
          تُعرض الحروف والرموز العربية على نفس الخط الأساسي (baseline) وبأبعاد
          أسطر مطابقة لتنسيق KaTeX اللاتيني، مع منع قصّ النتوءات السفلية والحركات
          العلوية. للتحكم الدقيق في الحجم البصري للعوامل (مثل <code>جا</code>،{' '}
          <code>جتا</code>، <code>د س</code>) يمكنك ضبط متغير CSS واحد:
        </p>
        <pre className="doc-code" dir="ltr">{`.math-equation { --ka-op-scale: 1.08; }`}</pre>
        <p>
          أو عبر خيار <code>operatorScale</code> من لوحة الإعدادات (من 0.9 حتى
          1.25). المتغيرات التالية قابلة للتخصيص لكل معادلة على حدة:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th>المتغير</th>
                <th>الوظيفة</th>
                <th>الافتراضي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code dir="ltr">--ka-op-scale</code></td>
                <td>حجم أسماء الدوال والنصوص العربية داخل المعادلة</td>
                <td><code dir="ltr">1.05</code></td>
              </tr>
              <tr>
                <td><code dir="ltr">--ka-font-family</code></td>
                <td>عائلة الخط المستخدمة للنصوص العربية</td>
                <td><code dir="ltr">Amiri</code></td>
              </tr>
              <tr>
                <td><code dir="ltr">--ka-color</code></td>
                <td>لون المعادلة</td>
                <td><code dir="ltr">inherit</code></td>
              </tr>
              <tr>
                <td><code dir="ltr">--ka-line-height</code></td>
                <td>ارتفاع السطر المحيط بالمعادلة</td>
                <td><code dir="ltr">1.6</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Features ──────────────────────────────────── */}
      <section className="doc-section">
        <h2>
          <span aria-hidden="true">✨</span>
          الميزات
        </h2>
        <div className="doc-features">
          {FEATURES.map((f) => (
            <div key={f.title} className="doc-feature">
              <span className="doc-feature__icon" aria-hidden="true">{f.icon}</span>
              <div>
                <h4 className="doc-feature__title">{f.title}</h4>
                <p className="doc-feature__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Documentation;
