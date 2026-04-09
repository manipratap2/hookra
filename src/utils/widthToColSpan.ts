import type { FieldWidth } from '../types/schema'

/** Maps a FieldWidth value to a CSS grid column-span number within `totalColumns` */
export function widthToColSpan(width: FieldWidth | undefined, totalColumns: number): number {
  if (width === undefined) return 1
  if (typeof width === 'number') return Math.min(width, totalColumns)

  switch (width) {
    case 'full': return totalColumns
    case 'half': return Math.ceil(totalColumns / 2)
    case 'third': return Math.ceil(totalColumns / 3)
    case 'quarter': return Math.ceil(totalColumns / 4)
    case 'two-thirds': return Math.ceil((totalColumns * 2) / 3)
    case 'three-quarters': return Math.ceil((totalColumns * 3) / 4)
    default: return 1
  }
}
