/**
 * ════════════════════════════════════════════════════════════════
 *  MathEquation.tsx
 *  React component that renders a single LaTeX equation with
 *  Arabic transforms.
 *
 *  Three export shapes are provided:
 *    - <MathEquation>     generic, you choose display or inline
 *    - <MathBlock>        display-mode (block, centered)
 *    - <MathInline>       inline-mode (sits in a sentence)
 *
 *  All three share the same memoized render pipeline to avoid
 *  re-rendering on unrelated state changes.
 * ════════════════════════════════════════════════════════════════
 */

import { memo, useMemo, type FC } from 'react';
import { useArabicKatex } from '../lib/katex-arabic/hooks';
import { resolveOptions } from '../lib/katex-arabic/rtlRenderer';
import type { PartialArabicOptions } from '../lib/katex-arabic/types';
import '../katex-arabic.css';

export type EquationSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Stable empty-options sentinel. Using a module-level constant as the
 * default prop keeps the `options` identity stable across renders,
 * which is essential for the memo() shallow comparison to work.
 */
const EMPTY_OPTIONS: PartialArabicOptions = Object.freeze({});

export interface MathEquationProps {
  /** LaTeX source. Required. */
  latex: string;
  /** Display mode (block) vs inline. Default: inline. */
  displayMode?: boolean;
  /** Visual size. Default: 'lg'. */
  size?: EquationSize;
  /** Text color override. */
  color?: string;
  /** Extra CSS class on the outer wrapper. */
  className?: string;
  /** Custom options. */
  options?: PartialArabicOptions;
  /** Optional aria-label for screen readers. */
  ariaLabel?: string;
}

const sizeClass: Record<EquationSize, string> = {
  sm: 'size-sm',
  md: 'size-md',
  lg: 'size-lg',
  xl: 'size-xl',
  '2xl': 'size-2xl',
};

/**
 * The core renderer. Wrapped in `memo` so that re-renders only
 * happen when the props actually change.
 */
const MathEquationInner = ({
  latex,
  displayMode = false,
  size = 'lg',
  color,
  className = '',
  options = EMPTY_OPTIONS,
  ariaLabel,
}: MathEquationProps) => {
  // Merge partial user options on top of defaults. displayMode is
  // forced to match the prop so callers don't need to repeat it.
  const mergedOptions = useMemo(
    () => ({ ...resolveOptions(options), displayMode }),
    [options, displayMode],
  );

  const html = useArabicKatex(latex, mergedOptions);

  // Provide an accessible name for screen readers. Callers can override
  // with an explicit ariaLabel; otherwise we fall back to the raw LaTeX
  // source, which is the most faithful textual representation. We use
  // role="img" because the rendered KaTeX HTML is a visual representation
  // of the formula, and role="math" is not a valid ARIA role.
  const accessibleLabel = ariaLabel ?? latex;

  return (
    <span
      className={`math-equation katex-arabic ${sizeClass[size]} ${className}`}
      style={color ? { color } : undefined}
      role="img"
      aria-label={accessibleLabel}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const MathEquation = memo(MathEquationInner);

// ═══════════════════════════════════════════════════════════════
//  Convenience wrappers
// ═══════════════════════════════════════════════════════════════

export interface MathBlockProps extends Omit<MathEquationProps, 'displayMode'> {
  /** Optional accent color for the side bar (any CSS color). */
  accent?: string;
}

/** Map of named accent → CSS color. Falls back to the string itself. */
const ACCENT_COLORS: Record<string, string> = {
  blue: '#3b82f6',
  green: '#10b981',
  emerald: '#10b981',
  red: '#ef4444',
  purple: '#a855f7',
  amber: '#f59e0b',
  cyan: '#06b6d4',
  rose: '#f43f5e',
  primary: 'var(--color-primary, #3b82f6)',
};

function resolveAccent(accent: string | undefined): string {
  if (!accent) return 'var(--color-primary, #3b82f6)';
  return ACCENT_COLORS[accent] ?? accent;
}

/**
 * Block-level equation (display mode).
 * Wraps the equation in a styled container with an accent bar.
 */
export const MathBlock: FC<MathBlockProps> = ({
  accent = 'blue',
  className = '',
  size = 'xl',
  ...rest
}) => {
  const accentColor = resolveAccent(accent);
  return (
    <div
      className={`math-block ${className}`}
      style={{ ['--block-accent' as string]: accentColor }}
    >
      <MathEquation
        {...rest}
        displayMode
        size={size}
        className="w-full"
      />
    </div>
  );
};

/**
 * Inline equation. Sits naturally inside a sentence.
 */
export const MathInline: FC<Omit<MathEquationProps, 'displayMode'>> = (props) => {
  return <MathEquation {...props} displayMode={false} size={props.size ?? 'md'} />;
};

export default MathEquation;
