/**
 * ════════════════════════════════════════════════════════════════
 *  ErrorBoundary.tsx
 *  Top-level React error boundary.
 *
 *  Catches any render-time exception (including unexpected KaTeX
 *  failures) and shows a friendly, RTL-aware fallback instead of
 *  a blank white screen. Offers a "reload" action so the user can
 *  recover without losing the whole page.
 * ════════════════════════════════════════════════════════════════
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    // Log for diagnostics; a production app could forward this to a
    // monitoring service.
    // eslint-disable-next-line no-console
    console.error('[katex-arabic] Uncaught render error:', error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, message: '' });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        dir="rtl"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Tajawal', 'Cairo', system-ui, sans-serif",
          background: 'var(--color-bg-base, #f8fafc)',
          color: 'var(--color-fg, #0f172a)',
          padding: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: 480,
            textAlign: 'center',
            padding: '2rem',
            borderRadius: 16,
            background: 'var(--color-bg-elevated, #fff)',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
            border: '1px solid var(--color-border, #e2e8f0)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">
            ⚠️
          </div>
          <h1 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>
            حدث خطأ غير متوقع
          </h1>
          <p style={{ color: 'var(--color-fg-muted, #475569)', marginBottom: '1.5rem' }}>
            نعتذر عن الإزعاج. يمكنك المحاولة مرة أخرى أو إعادة تحميل الصفحة.
          </p>
          {this.state.message && (
            <p
              dir="ltr"
              style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: 'var(--color-danger, #ef4444)',
                wordBreak: 'break-all',
                marginBottom: '1.5rem',
              }}
            >
              {this.state.message}
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 8,
                border: 'none',
                background: 'var(--color-primary, #3b82f6)',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
              }}
            >
              إعادة المحاولة
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 8,
                border: '1px solid var(--color-border, #e2e8f0)',
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
              }}
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
