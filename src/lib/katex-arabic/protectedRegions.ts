/**
 * ════════════════════════════════════════════════════════════════
 *  protectedRegions.ts
 *  Shared helpers for tracking spans of a LaTeX string that text
 *  transforms must never touch (the bodies of \text{…},
 *  \operatorname{…}, …). Used by the function translator and the
 *  symbol-mirroring engine so user-written prose inside math stays
 *  byte-for-byte identical.
 * ════════════════════════════════════════════════════════════════
 */

export interface TextRegion {
  start: number;
  end: number;
}

/**
 * Macros whose single-brace argument must be treated as verbatim text.
 * The list intentionally mirrors KaTeX's text / operator macros.
 */
const VERBATIM_MACROS = [
  'text',
  'textnormal',
  'textbf',
  'textit',
  'textrm',
  'mathrm',
  'mathbf',
  'mathit',
  'mathtt',
  'mathsf',
  'mathscr',
  'mathfrak',
  'mathbb',
  'mathcal',
  'color',
  'textcolor',
  'operatorname',
  'operatorname*',
  'operatornamewithlimits',
] as const;

/** Pre-compiled once at module load. */
const VERBATIM_PATTERN = new RegExp(
  `\\\\(?:${VERBATIM_MACROS.join('|')})\\{[^}]*\\}`,
  'g',
);

/**
 * Collect the indices of every verbatim span in `latex`.
 * Regions are sorted by start; overlapping spans are merged so a
 * single `isInsideRegions` walk stays correct.
 */
export function collectProtectedRegions(latex: string): TextRegion[] {
  const regions: TextRegion[] = [];
  let m: RegExpExecArray | null;
  // Fresh state per call — a shared global regex would leak lastIndex.
  VERBATIM_PATTERN.lastIndex = 0;
  while ((m = VERBATIM_PATTERN.exec(latex)) !== null) {
    regions.push({ start: m.index, end: m.index + m[0].length });
  }

  regions.sort((a, b) => a.start - b.start);

  const merged: TextRegion[] = [];
  for (const r of regions) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) {
      last.end = Math.max(last.end, r.end);
    } else {
      merged.push({ ...r });
    }
  }
  return merged;
}

/**
 * Returns true when `pos` (a match offset in the original string) lies
 * inside any protected region. Regions must be sorted (see above).
 */
export function isInsideRegions(pos: number, regions: TextRegion[]): boolean {
  for (const r of regions) {
    if (pos >= r.start && pos < r.end) return true;
    if (r.start > pos) break; // regions are sorted
  }
  return false;
}
