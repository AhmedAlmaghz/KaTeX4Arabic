/**
 * ════════════════════════════════════════════════════════════════
 *  OptionsPanel.tsx
 *  Configuration panel for the Arabic renderer.
 *
 *  Exposes all Arabic rendering options through a clean UI
 *  with toggle switches and selects. Calls back to the parent
 *  with the new partial options.
 * ════════════════════════════════════════════════════════════════
 */

import { type FC } from 'react';
import { DEFAULT_OPTIONS } from '../lib/katex-arabic/rtlRenderer';
import type {
  ArabicKatexOptions,
  NumeralStyle,
  PartialArabicOptions,
} from '../lib/katex-arabic/types';

export interface OptionsPanelProps {
  /** Current option overrides. */
  options: PartialArabicOptions;
  /** Callback when any option changes. */
  onChange: (next: PartialArabicOptions) => void;
}

// ─── Toggle switch ─────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  highlight?: boolean;
}

const Toggle: FC<ToggleProps> = ({ checked, onChange, label, description, highlight }) => (
  <label className={`toggle ${highlight ? 'toggle--highlight' : ''}`}>
    <input
      type="checkbox"
      className="toggle__input"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="toggle__switch" aria-hidden="true" />
    <div>
      <span className="toggle__label">{label}</span>
      {description && <p className="toggle__description">{description}</p>}
    </div>
  </label>
);

// ─── Font families ────────────────────────────────────────────
const FONT_CHOICES: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'Amiri', label: 'Amiri (أميري)' },
  { value: 'Cairo', label: 'Cairo (القاهرة)' },
  { value: 'Tajawal', label: 'Tajawal (تجوال)' },
  { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic' },
  { value: 'Scheherazade New', label: 'Scheherazade New' },
];

const NUMERAL_CHOICES: ReadonlyArray<{ value: NumeralStyle; label: string }> = [
  { value: 'arabic', label: 'عربية-هندية (٠١٢٣٤٥٦٧٨٩)' },
  { value: 'extended', label: 'فارسية (۰۱۲۳۴۵۶۷۸۹)' },
  { value: 'latin', label: 'لاتينية (0123456789)' },
];

// ═══════════════════════════════════════════════════════════════
//  Main panel
// ═══════════════════════════════════════════════════════════════

export const OptionsPanel: FC<OptionsPanelProps> = ({ options, onChange }) => {
  // Merge with defaults so we always have known values.
  const current: ArabicKatexOptions = { ...DEFAULT_OPTIONS, ...options };

  /**
   * Generic change handler with type safety.
   * Limits K to actual keys of ArabicKatexOptions.
   */
  const handle = <K extends keyof ArabicKatexOptions>(
    key: K,
    value: ArabicKatexOptions[K],
  ) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <aside className="options-panel" aria-label="إعدادات العرض">
      <div className="options-panel__header">
        <h2 className="options-panel__title">
          <span aria-hidden="true">⚙️</span>
          إعدادات العرض
        </h2>
        <p className="options-panel__subtitle">خصص طريقة عرض المعادلات</p>
      </div>

      {/* ─── Numerals ─────────────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">🔢</span>
          نوع الأرقام
        </h3>
        <label className="options-panel__label" htmlFor="numeral-style">
          اختر النظام العددي
        </label>
        <select
          id="numeral-style"
          className="options-panel__select"
          value={current.numerals}
          onChange={(e) => handle('numerals', e.target.value as NumeralStyle)}
        >
          {NUMERAL_CHOICES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </section>

      {/* ─── Translation ──────────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">📝</span>
          الترجمة
        </h3>
        <Toggle
          checked={current.translateFuncs}
          onChange={(v) => handle('translateFuncs', v)}
          label="ترجمة الدوال"
          description="sin → جا، cos → جتا، lim → نها"
        />
        <Toggle
          checked={current.translateVars}
          onChange={(v) => handle('translateVars', v)}
          label="ترجمة المتغيرات"
          description="x → س، y → ص، z → ع"
        />
        <Toggle
          checked={current.translateDiffs}
          onChange={(v) => handle('translateDiffs', v)}
          label="ترجمة التفاضلات"
          description="dx → د س، dy → د ص"
        />
      </section>

      {/* ─── Mirroring ────────────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">🔄</span>
          عكس الرموز
        </h3>
        <Toggle
          checked={current.mirrorBigOperators}
          onChange={(v) => handle('mirrorBigOperators', v)}
          label="عكس ∫ Σ ∏"
          description="رموز التكامل والمجموع والجداء"
        />
        <Toggle
          checked={current.mirrorSqrt}
          onChange={(v) => handle('mirrorSqrt', v)}
          label="عكس رمز الجذر √"
        />
        <Toggle
          checked={current.mirrorBrackets}
          onChange={(v) => handle('mirrorBrackets', v)}
          label="عكس الأقواس"
          description="( ) ↔ ) (، [ ] ↔ ] ["
        />
        <Toggle
          checked={current.mirrorSymbols}
          onChange={(v) => handle('mirrorSymbols', v)}
          label="عكس رموز المقارنة"
          description="< ↔ >، ≤ ↔ ≥، ⇒ ↔ ⇐"
        />
      </section>

      {/* ─── RTL mode ─────────────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">🌙</span>
          اتجاه القراءة
        </h3>
        <Toggle
          checked={current.fullArabicMode}
          onChange={(v) => handle('fullArabicMode', v)}
          label="الوضع العربي الكامل"
          description="RTL للمعادلة بأكملها"
          highlight
        />
      </section>

      {/* ─── Font ─────────────────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">🎨</span>
          الخط
        </h3>
        <label className="options-panel__label" htmlFor="font-family">
          اختر خط العرض
        </label>
        <select
          id="font-family"
          className="options-panel__select"
          value={current.fontFamily}
          onChange={(e) => handle('fontFamily', e.target.value)}
        >
          {FONT_CHOICES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </section>

      {/* ─── Operator scale ───────────────────────────────── */}
      <section className="options-panel__section">
        <h3 className="options-panel__section-title">
          <span aria-hidden="true">📏</span>
          حجم العوامل العربية
        </h3>
        <label className="options-panel__label" htmlFor="operator-scale">
          نسبة حجم أسماء الدوال (جا، جتا…) والنصوص العربية داخل المعادلة
        </label>
        <div className="options-panel__range-row">
          <input
            type="range"
            id="operator-scale"
            className="options-panel__range"
            min={0.9}
            max={1.25}
            step={0.01}
            value={current.operatorScale}
            onChange={(e) => handle('operatorScale', Number(e.target.value))}
            aria-valuetext={`${current.operatorScale.toFixed(2)}×`}
          />
          <output className="options-panel__range-value" htmlFor="operator-scale">
            {current.operatorScale.toFixed(2)}×
          </output>
        </div>
        <p className="toggle__description">
          ارفع القيمة قليلاً (≈ 1.05–1.1) لتعويض الفرق البصري في حجم الحروف بين
          الخط العربي وKaTeX_Main، فيبدو الناتج مطابقاً للمعادلة اللاتينية.
        </p>
      </section>

      {/* ─── Reset ────────────────────────────────────────── */}
      <section className="options-panel__section">
        <button
          type="button"
          className="options-panel__reset"
          onClick={() => onChange(DEFAULT_OPTIONS)}
          aria-label="إعادة جميع الإعدادات إلى القيم الافتراضية"
        >
          <span aria-hidden="true">↺</span>
          إعادة الضبط الافتراضي
        </button>
      </section>
    </aside>
  );
};

export default OptionsPanel;
