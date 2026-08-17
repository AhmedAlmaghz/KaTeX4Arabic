/**
 * ════════════════════════════════════════════════════════════════
 *  AppHeader.tsx
 *  The top banner with branding and primary navigation tabs.
 *
 *  Kept as a separate component so the main App component stays
 *  focused on layout and the header can be styled independently.
 * ════════════════════════════════════════════════════════════════
 */

import { useCallback, useRef, type FC, type KeyboardEvent } from 'react';
import { VERSION } from '../lib/katex-arabic/index';

export type TabId = 'demo' | 'editor' | 'docs';

export interface AppHeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: ReadonlyArray<{ id: TabId; label: string; icon: string }> = [
  { id: 'demo', label: 'معرض المعادلات', icon: '🎨' },
  { id: 'editor', label: 'المحرر المباشر', icon: '✏️' },
  { id: 'docs', label: 'التوثيق', icon: '📚' },
];

export const AppHeader: FC<AppHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /**
   * WAI-ARIA tablist keyboard pattern:
   *  - ArrowRight / ArrowLeft move focus & activate the adjacent tab.
   *  - Home / End jump to the first / last tab.
   * Because the document is RTL, ArrowRight moves to the *previous*
   * tab (visually to the right) and ArrowLeft to the next.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = index - 1; // RTL: right = previous
          break;
        case 'ArrowLeft':
          nextIndex = index + 1; // RTL: left = next
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = TABS.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      // Wrap around.
      const wrapped = ((nextIndex % TABS.length) + TABS.length) % TABS.length;
      const tab = TABS[wrapped];
      if (tab) {
        onTabChange(tab.id);
        tabRefs.current[wrapped]?.focus();
      }
    },
    [onTabChange],
  );

  return (
    <header className="app-header" role="banner">
      <div className="app-header__inner">
        <div className="app-header__top">
          <div className="app-header__brand">
            <span className="app-header__logo" aria-hidden="true">🌙</span>
            <div>
              <h1 className="app-header__title">KaTeX Arabic</h1>
              <p className="app-header__tagline">
                مكتبة احترافية لعرض المعادلات الرياضية بالأسلوب العربي
              </p>
            </div>
          </div>
          <span className="app-header__version" aria-label={`الإصدار ${VERSION}`}>
            الإصدار {VERSION}
          </span>
        </div>

        <nav className="app-header__tabs" role="tablist" aria-label="أقسام التطبيق">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`app-header__tab ${
                activeTab === tab.id ? 'app-header__tab--active' : ''
              }`}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
