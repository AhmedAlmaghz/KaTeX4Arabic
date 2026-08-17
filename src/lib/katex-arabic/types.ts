/**
 * ════════════════════════════════════════════════════════════════
 *  types.ts
 *  Type definitions for KaTeX Arabic.
 *  Provides strongly-typed contracts for the entire library.
 * ════════════════════════════════════════════════════════════════
 */

/** Numeral system used for digit rendering. */
export type NumeralStyle = 'arabic' | 'extended' | 'latin';

/** Text direction for the rendered equation. */
export type Direction = 'rtl' | 'ltr';

/** Render target (block | inline). */
export type RenderMode = 'block' | 'inline';

/**
 * Main configuration object for KaTeX Arabic.
 * Merges KaTeX behavior with Arabic-specific transforms.
 */
export interface ArabicKatexOptions {
  // ─── Numerals ─────────────────────────────────────────────
  /** Which numeral system to render. */
  numerals: NumeralStyle;
  /** Whether to use Arabic separators (٬٫) in numbers. */
  formatNumbers: boolean;

  // ─── Translation ──────────────────────────────────────────
  /** Translate function names (sin → جا). */
  translateFuncs: boolean;
  /** Translate variables (x → س). */
  translateVars: boolean;
  /** Translate differential operators (dx → د س). */
  translateDiffs: boolean;
  /** User-supplied function overrides. */
  customFunctionMap: Record<string, string>;
  /** User-supplied variable overrides. */
  customVariableMap: Record<string, string>;

  // ─── Mirroring ────────────────────────────────────────────
  /** Mirror comparison operators (<, >, ≤, ≥). */
  mirrorSymbols: boolean;
  /** Mirror big operators (∫, Σ, ∏, ∮). */
  mirrorBigOperators: boolean;
  /** Mirror the square-root sign. */
  mirrorSqrt: boolean;
  /** Mirror brackets. */
  mirrorBrackets: boolean;

  // ─── Rendering ────────────────────────────────────────────
  /** Text direction. */
  direction: Direction;
  /** Font family. */
  fontFamily: string;
  /** Display mode (block) vs inline. */
  displayMode: boolean;
  /** Enable full Arabic RTL mode for the whole equation. */
  fullArabicMode: boolean;
  /**
   * Optical size factor for Arabic operator names and math text
   * (e.g. جا، جتا، د س) relative to Latin glyphs. `1` keeps KaTeX's
   * natural size; values like `1.08` compensate for fonts whose
   * x-height differs from KaTeX_Main. Applied via the `--ka-op-scale`
   * CSS variable.
   */
  operatorScale: number;

  // ─── Advanced ─────────────────────────────────────────────
  /** Custom KaTeX macros. */
  macros: Record<string, string>;
  /** Whether to throw on errors (otherwise render error message). */
  throwOnError: boolean;
  /** Output target for KaTeX (always 'html' for our pipeline). */
  output: 'html' | 'mathml' | 'htmlAndMathml';
  /** Strict mode for KaTeX. */
  strict: boolean | 'ignore' | 'warn' | 'error';
  /** Trust mode for KaTeX (allow commands). */
  trust: boolean;
  /** Min rule thickness. */
  minRuleThickness: number;
}

/** Options that can be passed partially. */
export type PartialArabicOptions = Partial<ArabicKatexOptions>;

/** Result of a successful render. */
export interface RenderResult {
  /** HTML string from KaTeX (already wrapped). */
  html: string;
  /** Processed LaTeX after Arabic transformations. */
  processedLatex: string;
  /** Whether the render succeeded. */
  ok: boolean;
  /** Error message if !ok. */
  error?: string;
}

/** An example equation displayed in the demo. */
export interface ExampleEquation {
  /** Display title in Arabic. */
  title: string;
  /** LaTeX source. */
  latex: string;
  /** Optional description. */
  description?: string;
  /** Emoji icon. */
  icon?: string;
  /** Tailwind border color class. */
  borderColor?: string;
  /** Category for grouping. */
  category?: string;
}
