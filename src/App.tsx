/**
 * ════════════════════════════════════════════════════════════════
 *  App.tsx
 *  Application root.
 *
 *  Responsibilities:
 *    - Own the global Arabic rendering options (the demo and editor
 *      both share them, so changes in the panel affect both).
 *    - Switch between the three primary views (gallery, editor, docs).
 *    - Compose the header, main content, and footer.
 *
 *  Layout pieces (header, options panel, equation card, etc.) live
 *  in their own files under `components/`.
 * ════════════════════════════════════════════════════════════════
 */

import { useCallback, useState, type FC } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AppHeader, type TabId } from './components/AppHeader';
import { OptionsPanel } from './components/OptionsPanel';
import { EquationCard } from './components/EquationCard';
import { LiveEditor } from './components/LiveEditor';
import { ComparisonDemo } from './components/ComparisonDemo';
import { Documentation } from './components/Documentation';
import { equationGroups } from './data/examples';
import { DEFAULT_OPTIONS } from './lib/katex-arabic/rtlRenderer';
import { VERSION } from './lib/katex-arabic/index';
import type { PartialArabicOptions } from './lib/katex-arabic/types';
import 'katex/dist/katex.min.css';

// ═══════════════════════════════════════════════════════════════
//  Application root
// ═══════════════════════════════════════════════════════════════

function App() {
  const [options, setOptions] = useState<PartialArabicOptions>(DEFAULT_OPTIONS);
  const [activeTab, setActiveTab] = useState<TabId>('demo');

  // Wrap setOptions so we can pass a stable callback down to children.
  const handleOptionsChange = useCallback((next: PartialArabicOptions) => {
    setOptions(next);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir="rtl"
    >
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'demo' && (
          <div role="tabpanel" id="tab-panel-demo">
            <GalleryInner options={options} onOptionsChange={handleOptionsChange} />
          </div>
        )}
        {activeTab === 'editor' && (
          <div role="tabpanel" id="tab-panel-editor">
            <EditorInner options={options} onOptionsChange={handleOptionsChange} />
          </div>
        )}
        {activeTab === 'docs' && (
          <div role="tabpanel" id="tab-panel-docs">
            <div className="max-w-4xl mx-auto">
              <Documentation options={options} />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          <span aria-hidden="true">🌙</span>{' '}
          KaTeX Arabic — مكتبة مفتوحة المصدر لعرض الرياضيات بالأسلوب العربي
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          مبنية على{' '}
          <a href="https://katex.org" target="_blank" rel="noopener noreferrer">
            KaTeX
          </a>
          {' '}• الإصدار {VERSION}
        </p>
        <p>POWERED BY- <a href="https://github.com/AhmedAlmaghz/KaTeX4Arabic" target="_blank" rel="noopener noreferrer">AHMED ALMAGHZ </a> - 2026</p>
      </footer>
      <Analytics />
    </div>
  );
}

/**
 * Inner wrappers that pass the *real* options-change callback down.
 * Using inner components ensures the GalleryView / EditorView themselves
 * don't re-render when the user toggles an option (only the
 * OptionsPanel does, since the options prop is the same object).
 */
interface InnerProps {
  options: PartialArabicOptions;
  onOptionsChange: (next: PartialArabicOptions) => void;
}

const GalleryInner: FC<InnerProps> = ({ options, onOptionsChange }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <OptionsPanel options={options} onChange={onOptionsChange} />
        </div>
      </div>
      <div className="lg:col-span-3 space-y-10">
        {equationGroups.map((group) => (
          <section key={group.id}>
            <h2 className="section-title">
              <span className={`section-title__icon ${group.iconBg}`} aria-hidden="true">
                {group.icon}
              </span>
              {group.title}
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {group.equations.map((eq, idx) => (
                <EquationCard
                  key={`${group.id}-${idx}`}
                  {...eq}
                  options={options}
                />
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="section-title">
            <span className="section-title__icon bg-emerald-500" aria-hidden="true">⚖️</span>
            مقارنة: اللاتيني مقابل العربي
          </h2>
          <ComparisonDemo options={options} />
        </section>
      </div>
    </div>
  );
};

const EditorInner: FC<InnerProps> = ({ options, onOptionsChange }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <OptionsPanel options={options} onChange={onOptionsChange} />
        </div>
      </div>
      <div className="lg:col-span-2">
        <LiveEditor options={options} />
      </div>
    </div>
  );
};

export default App;
