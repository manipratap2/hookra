import type { FieldWidth } from '../types/schema'

/**
 * Maps a FieldWidth value to a CSS grid-column span within a 12-column grid.
 *
 * Named widths ('full', 'half', etc.) are always relative to 12 columns —
 * e.g. 'half' always means span 6, 'third' always means span 4.
 *
 * Numeric widths are used as-is (already in 12-col units, clamped to 1–12).
 *
 * When width is undefined the field fills one "logical column" as defined by
 * the section's column count: e.g. in a 3-col section each un-sized field
 * spans 4 grid columns (12 / 3 = 4).
 */
export function widthToColSpan(width: FieldWidth | undefined, totalColumns: number): number {
  // Default: divide 12-column grid evenly by the section's column count
  if (width === undefined) return Math.floor(12 / Math.max(totalColumns, 1))

  // Numeric widths: treat as explicit 12-column span, clamped to valid range
  if (typeof width === 'number') return Math.min(Math.max(width, 1), 12)

  // Named widths: always map to 12-column fractions
  switch (width) {
    case 'full':           return 12
    case 'half':           return 6
    case 'third':          return 4
    case 'quarter':        return 3
    case 'two-thirds':     return 8
    case 'three-quarters': return 9
    default:               return Math.floor(12 / Math.max(totalColumns, 1))
  }
}
