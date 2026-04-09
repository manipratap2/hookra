import type { ComponentType } from 'react'
import type { FieldType } from '../types/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldComponentProps = any

export type FieldRegistry = Map<FieldType | string, ComponentType<FieldComponentProps>>

/**
 * Merges the built-in default registry with user-provided custom components.
 * Custom components override built-ins when their keys collide.
 */
export function createRegistry(
  defaultRegistry: FieldRegistry,
  custom?: Record<string, ComponentType<FieldComponentProps>>,
): FieldRegistry {
  if (!custom) return defaultRegistry

  const merged = new Map(defaultRegistry)
  for (const [key, Component] of Object.entries(custom)) {
    merged.set(key, Component)
  }
  return merged
}
