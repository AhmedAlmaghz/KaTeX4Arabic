/**
 * ════════════════════════════════════════════════════════════════
 *  EquationCard.tsx
 *  Card component for displaying a single equation with title,
 *  description, and source code toggle.
 *
 *  Adds a "Copy LaTeX" affordance and proper a11y labelling.
 * ════════════════════════════════════════════════════════════════
 */

import { useCallback, useState, type FC } from 'react';
import { MathBlock } from './MathEquation';
import { copyToClipboard } from '../utils/clipboard';
import type { PartialArabicOptions } from '../lib/katex-arabic/types';

export interface EquationCardProps {
  /** Card title. */
  title: string;
  /** LaTeX source. */
  latex: string;
  /** Optional description. */
  description?: string;
  /** Optional emoji icon. */
  icon?: string;
  /** Tailwind border-color class. */
  borderColor?: string;
  /** Arabic rendering options. */
  options?: PartialArabicOptions;
  /** Optional copy success callback. */
  onCopy?: (latex: string) => void;
}

/**
 * Display a single equation with title, description, and code toggle.
 * Supports copying the LaTeX source to the clipboard.
 */
export const EquationCard: FC<EquationCardProps> = ({
  title,
  latex,
  description,
  icon = '📐',
  borderColor = 'border-blue-500',
  options,
  onCopy,
}) => {
  const [showSource, setShowSource] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(latex);
    setCopied(ok);
    if (ok) {
      onCopy?.(latex);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }, [latex, onCopy]);

  return (
    <article
      className={`equation-card animate-fadeInUp ${borderColor}`}
      aria-label={`معادلة: ${title}`}
    >
      {/* Header */}
      <header className="equation-card__header">
        <span className="equation-card__icon" aria-hidden="true">{icon}</span>
        <h3 className="equation-card__title">{title}</h3>
      </header>

      {/* Body: the equation itself */}
      <div className="equation-card__body">
        <MathBlock latex={latex} options={options} />

        {description && (
          <p className="equation-card__description">{description}</p>
        )}
      </div>

      {/* Footer: actions */}
      <footer className="equation-card__footer">
        <button
          type="button"
          className="equation-card__action"
          onClick={() => setShowSource((s) => !s)}
          aria-expanded={showSource}
          aria-controls={`src-${title.replace(/\s+/g, '-')}`}
        >
          <span aria-hidden="true">{showSource ? '▾' : '▸'}</span>
          <span>{showSource ? 'إخفاء الكود' : 'عرض الكود'}</span>
        </button>
        <button
          type="button"
          className="equation-card__action"
          onClick={handleCopy}
          aria-label="نسخ كود LaTeX"
        >
          <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
          <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
        </button>
      </footer>

      {showSource && (
        <pre
          id={`src-${title.replace(/\s+/g, '-')}`}
          className="equation-card__source"
          aria-label="كود LaTeX"
        >
          {latex}
        </pre>
      )}
    </article>
  );
};

export default EquationCard;
