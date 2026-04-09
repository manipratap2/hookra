import type { ConditionOperator } from '../types/schema'

/** Returns true if `fieldValue` satisfies `operator` against `conditionValue` */
export function evaluateOperator(
  operator: ConditionOperator,
  fieldValue: unknown,
  conditionValue: unknown,
): boolean {
  switch (operator) {
    case 'eq':
      return fieldValue == conditionValue // intentional loose equality for type-coerced comparison

    case 'ne':
      return fieldValue != conditionValue // intentional loose equality for type-coerced comparison

    case 'gt':
      return Number(fieldValue) > Number(conditionValue)

    case 'gte':
      return Number(fieldValue) >= Number(conditionValue)

    case 'lt':
      return Number(fieldValue) < Number(conditionValue)

    case 'lte':
      return Number(fieldValue) <= Number(conditionValue)

    case 'in':
      return Array.isArray(conditionValue) && conditionValue.includes(fieldValue)

    case 'nin':
      return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue)

    case 'contains':
      return String(fieldValue).includes(String(conditionValue))

    case 'startsWith':
      return String(fieldValue).startsWith(String(conditionValue))

    case 'endsWith':
      return String(fieldValue).endsWith(String(conditionValue))

    case 'matches': {
      try {
        return new RegExp(String(conditionValue)).test(String(fieldValue))
      } catch {
        return false
      }
    }

    case 'empty':
      return (
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      )

    case 'notEmpty':
      return !(
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      )

    case 'truthy':
      return Boolean(fieldValue)

    case 'falsy':
      return !fieldValue

    default:
      return false
  }
}
