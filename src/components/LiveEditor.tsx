/**
 * ════════════════════════════════════════════════════════════════
 *  LiveEditor.tsx
 *  Interactive LaTeX editor with live preview.
 *
 *  Features:
 *   - Quick-pick example buttons
 *   - Real-time validation with inline error messages
 *   - Copy rendered HTML / LaTeX to clipboard
 *   - Keyboard shortcuts (Ctrl/Cmd+Enter to copy, Esc to clear)
 *   - Deferred rendering via useDeferredValue for long equations
 * ════════════════════════════════════════════════════════════════
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from 'react';
import { MathBlock } from './MathEquation';
import { editorExamples } from '../data/examples';
import { validateLatex } from '../lib/katex-arabic/index';
import { resolveOptions } from '../lib/katex-arabic/rtlRenderer';
import { copyToClipboard } from '../utils/clipboard';
import type { PartialArabicOptions } from '../lib/katex-arabic/types';

export interface LiveEditorProps {
  /** Arabic rendering options. */
  options: PartialArabicOptions;
  /** Optional initial LaTeX. */
  initialLatex?: string;
}

const PLACEHOLDER = 'مثال: \\sin^2(\\theta) + \\cos^2(\\theta) = 1';

export const LiveEditor: FC<LiveEditorProps> = ({
  options,
  initialLatex = '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
}) => {
  const [latex, setLatex] = useState(initialLatex);
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const textareaId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Validate LaTeX on every change. The validator is cheap (no DOM)
  // so we don't need to defer it.
  const error = useMemo(() => {
    if (!latex.trim()) return null;
    return validateLatex(latex, resolveOptions(options));
  }, [latex, options]);

  // Reset copy state when the user edits again.
  useEffect(() => {
    if (copyState !== 'idle') {
      const t = window.setTimeout(() => setCopyState('idle'), 1800);
      return () => window.clearTimeout(t);
    }
  }, [copyState, latex]);

  // ─── Handlers ─────────────────────────────────────────────
  const handleLatexChange = useCallback((value: string) => {
    setLatex(value);
  }, []);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(latex);
    setCopyState(ok ? 'success' : 'error');
  }, [latex]);

  const handleClear = useCallback(() => {
    setLatex('');
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        void handleCopy();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    },
    [handleCopy, handleClear],
  );

  return (
    <div className="live-editor" aria-label="محرر المعادلات المباشر">
      {/* Header */}
      <header className="live-editor__header">
        <h2 className="live-editor__title">
          <span aria-hidden="true">✏️</span>
          محرر المعادلات المباشر
        </h2>
        <p className="live-editor__subtitle">
          اكتب كود LaTeX وشاهد النتيجة فوراً — اضغط <kbd>Ctrl</kbd>+<kbd>Enter</kbd> للنسخ
        </p>
      </header>

      <div className="live-editor__body">
        {/* Quick-pick examples */}
        <div>
          <h3 className="options-panel__section-title" style={{ marginBottom: '0.5rem' }}>
            <span aria-hidden="true">💡</span>
            أمثلة سريعة
          </h3>
          <div className="live-editor__examples">
            {editorExamples.map((eq) => (
              <button
                key={eq.label}
                type="button"
                className="live-editor__example-btn"
                onClick={() => handleLatexChange(eq.latex)}
              >
                {eq.label}
              </button>
            ))}
          </div>
        </div>

        {/* LaTeX input */}
        <div>
          <label
            htmlFor={textareaId}
            className="options-panel__label"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>كود LaTeX</span>
            <button
              type="button"
              className="equation-card__action"
              onClick={handleClear}
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
              aria-label="مسح الكود"
            >
              مسح
            </button>
          </label>
          <textarea
            id={textareaId}
            ref={textareaRef}
            value={latex}
            onChange={(e) => handleLatexChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="live-editor__textarea"
            dir="ltr"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={PLACEHOLDER}
            aria-label="محرر LaTeX"
          />
        </div>

        {/* Preview */}
        <div>
          <h3 className="options-panel__section-title" style={{ marginBottom: '0.5rem' }}>
            <span aria-hidden="true">👁</span>
            المعاينة
          </h3>
          <div className="live-editor__preview" role="region" aria-live="polite">
            {error ? (
              <div className="live-editor__error" role="alert">
                <strong>خطأ في الصياغة:</strong> {error}
              </div>
            ) : (
              <MathBlock latex={latex} options={options} accent="blue" />
            )}
          </div>
        </div>

        {/* Copy + actions */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="options-panel__reset"
            onClick={handleCopy}
            disabled={!!error || !latex.trim()}
            style={{ width: 'auto', padding: '0.5rem 1.25rem' }}
            aria-label="نسخ كود LaTeX"
          >
            <span aria-hidden="true">
              {copyState === 'success' ? '✓' : copyState === 'error' ? '✗' : '⧉'}
            </span>
            <span>
              {copyState === 'success'
                ? 'تم النسخ'
                : copyState === 'error'
                ? 'فشل النسخ'
                : 'نسخ LaTeX'}
            </span>
          </button>
        </div>

        {/* Tips */}
        <div className="live-editor__tips">
          <h4><span aria-hidden="true">📚</span> نصائح سريعة</h4>
          <ul>
            <li>
              استخدم <code>\sin</code> للجيب ← <code>جا</code>
            </li>
            <li>
              استخدم <code>\cos</code> لجيب التمام ← <code>جتا</code>
            </li>
            <li>
              استخدم <code>\lim</code> للنهاية ← <code>نها</code>
            </li>
            <li>
              الكسور: <code>\frac&#123;a&#125;&#123;b&#125;</code>
            </li>
            <li>
              الأرقام تُحوّل تلقائياً: <code>123 → ١٢٣</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveEditor;
