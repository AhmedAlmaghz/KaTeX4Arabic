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
 * Collect the indices of every verbatim span in `latex`.
 * Regions are sorted by start; overlapping spans are merged so a
 * single `isInsideRegions` walk stays correct.
 */
export declare function collectProtectedRegions(latex: string): TextRegion[];
/**
 * Returns true when `pos` (a match offset in the original string) lies
 * inside any protected region. Regions must be sorted (see above).
 */
export declare function isInsideRegions(pos: number, regions: TextRegion[]): boolean;
//# sourceMappingURL=protectedRegions.d.ts.map