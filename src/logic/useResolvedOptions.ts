import { useWatch } from 'react-hook-form'
import type { FieldOption, OptionsFrom } from '../types/schema'

/**
 * Returns the resolved options for a choice field.
 * - If `optionsFrom` is provided, watches the source field and maps its value to options.
 * - Otherwise returns the static `options` array.
 */
export function useResolvedOptions(
  options: FieldOption[] | undefined,
  optionsFrom: OptionsFrom | undefined,
): FieldOption[] {
  const sourceValue = useWatch({ name: optionsFrom?.field ?? '__unused__' })

  if (!optionsFrom) return options ?? []

  const key = sourceValue == null ? '' : String(sourceValue)
  return optionsFrom.map[key] ?? optionsFrom.default ?? []
}
