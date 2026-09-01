import { describe, it, expect } from 'vitest';
import { processLatex } from '../render';

describe('debug render output', () => {
  it('shows processed LaTeX for key examples', () => {
    const examples = [
      { name: 'تكامل غاوس', latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}' },
      { name: 'جذر نوني', latex: '\\sqrt[3]{\\frac{a}{b}}' },
      { name: 'معادلة تربيعية', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
      { name: 'دالة متقطعة', latex: 'f(x) = \\begin{cases} x^2 & ، x \\geq 0 \\\\ 0 & ، x < 0 \\end{cases}' },
      { name: 'متطابقة فيثاغورس', latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1' },
      { name: 'نهاية', latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
    ];

    for (const ex of examples) {
      const processed = processLatex(ex.latex);
      console.log('='.repeat(60));
      console.log(ex.name);
      console.log('INPUT: ', ex.latex);
      console.log('OUTPUT:', processed);
    }

    // Regression guards for the token-aware variable scan:
    //   - adjacent letters ("4ac", "2a") must translate fully,
    //   - environment names must survive verbatim.
    const quadratic = processLatex('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
    expect(quadratic).toContain('٤\\text{أ}\\text{جـ}');
    expect(quadratic).toContain('٢\\text{أ}');

    const piecewise = processLatex('f(x) = \\begin{cases} x^2 & ، x \\geq 0 \\\\ 0 & ، x < 0 \\end{cases}');
    expect(piecewise).toContain('\\begin{cases}');
    expect(piecewise).toContain('\\end{cases}');
  });
});
