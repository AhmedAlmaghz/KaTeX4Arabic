/**
 * ════════════════════════════════════════════════════════════════
 *  ComparisonDemo.tsx
 *  Side-by-side comparison of Latin vs Arabic rendering of the
 *  same LaTeX source.
 *
 *  The Latin side uses raw KaTeX, so users can directly see how
 *  the Arabic transforms change the visual appearance while
 *  keeping the same meaning.
 * ════════════════════════════════════════════════════════════════
 */

import { useMemo, type FC } from 'react';
import katex from 'katex';
import { MathBlock } from './MathEquation';
import { comparisonExamples } from '../data/examples';
import { resolveOptions } from '../lib/katex-arabic/rtlRenderer';
import type { PartialArabicOptions } from '../lib/katex-arabic/types';
import 'katex/dist/katex.min.css';

export interface ComparisonDemoProps {
  options: PartialArabicOptions;
}

export const ComparisonDemo: FC<ComparisonDemoProps> = ({ options }) => {
  // Pre-render the Latin side for all examples. KaTeX's renderToString
  // is synchronous and cheap, so we can do this once per options change.
  const latinRendered = useMemo(
    () =>
      comparisonExamples.map((eq) => {
        try {
          return katex.renderToString(eq.latex, { displayMode: true, throwOnError: false });
        } catch {
          return '<span style="color:#dc2626">render error</span>';
        }
      }),
    [],
  );

  // Pull direction for the Arabic side from the resolved options.
  const direction = resolveOptions(options).direction;

  return (
    <section className="comparison-demo" aria-label="مقارنة العرض اللاتيني والعربي">
      <header className="comparison-demo__header">
        <h2 className="comparison-demo__title">
          <span aria-hidden="true">⚖️</span>
          مقارنة: اللاتيني مقابل العربي
        </h2>
      </header>

      <div className="comparison-demo__body">
        {comparisonExamples.map((eq, idx) => (
          <div key={eq.title} className="comparison-demo__row">
            <div className="comparison-demo__cell">
              <span className="comparison-demo__label">Latin</span>
              <div
                className="text-xl"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: latinRendered[idx] ?? '' }}
                aria-label={`Latin: ${eq.title}`}
              />
            </div>
            <div className="comparison-demo__cell comparison-demo__cell--arabic">
              <span className="comparison-demo__label">العربي 🌙</span>
              <div dir={direction}>
                <MathBlock latex={eq.latex} options={options} accent="emerald" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonDemo;
