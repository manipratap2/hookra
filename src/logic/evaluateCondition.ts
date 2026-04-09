import type { Condition, SimpleCondition, CompoundCondition } from '../types/schema'
import { evaluateOperator } from './evaluateOperator'

type FormValues = Record<string, unknown>

function isSimpleCondition(c: Condition): c is SimpleCondition {
  return 'field' in c
}

function isCompoundCondition(c: Condition): c is CompoundCondition {
  return 'all' in c || 'any' in c || 'not' in c
}

/**
 * Resolve a dot-path value from a potentially nested object.
 * e.g. getByPath({ a: { b: 1 } }, "a.b") → 1
 */
function getByPath(values: FormValues, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object' && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, values)
}

/**
 * Pure function — evaluates a condition tree against a snapshot of form values.
 * Returns true if the condition passes (field should be visible).
 */
export function evaluateCondition(condition: Condition, values: FormValues): boolean {
  if (isSimpleCondition(condition)) {
    const { field, operator = 'eq', value } = condition
    const fieldValue = getByPath(values, field)
    return evaluateOperator(operator, fieldValue, value)
  }

  if (isCompoundCondition(condition)) {
    const { all, any, not } = condition

    if (all && all.length > 0) {
      return all.every((c) => evaluateCondition(c, values))
    }

    if (any && any.length > 0) {
      return any.some((c) => evaluateCondition(c, values))
    }

    if (not) {
      return !evaluateCondition(not, values)
    }
  }

  // Empty condition → always visible
  return true
}
