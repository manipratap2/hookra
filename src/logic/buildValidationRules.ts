import type { RegisterOptions } from 'react-hook-form'
import type { FieldSchema, RuleValue, FieldValidation } from '../types/schema'

function resolveRuleValue<T>(
  rule: RuleValue<T>,
  defaultMsg: string,
): { value: T; message: string } {
  if (rule !== null && typeof rule === 'object' && 'value' in (rule as object)) {
    const r = rule as { value: T; message: string }
    return { value: r.value, message: r.message ?? defaultMsg }
  }
  return { value: rule as T, message: defaultMsg }
}

/**
 * Converts a FieldSchema's validation config into RHF RegisterOptions.
 */
export function buildValidationRules(field: FieldSchema): RegisterOptions {
  const rules: RegisterOptions = {}

  // required: can be set at top-level or inside validation
  const requiredRaw = field.validation?.required ?? field.required
  if (requiredRaw !== undefined && requiredRaw !== false) {
    rules.required =
      typeof requiredRaw === 'string' ? requiredRaw : 'This field is required'
  }

  const v: FieldValidation = field.validation ?? {}

  if (v.minLength !== undefined) {
    const r = resolveRuleValue(v.minLength, `Minimum ${(v.minLength as { value: number }).value ?? v.minLength} characters`)
    rules.minLength = r
  }

  if (v.maxLength !== undefined) {
    const r = resolveRuleValue(v.maxLength, `Maximum ${(v.maxLength as { value: number }).value ?? v.maxLength} characters`)
    rules.maxLength = r
  }

  if (v.min !== undefined) {
    const r = resolveRuleValue(v.min, `Minimum value is ${(v.min as { value: number }).value ?? v.min}`)
    rules.min = r
  }

  if (v.max !== undefined) {
    const r = resolveRuleValue(v.max, `Maximum value is ${(v.max as { value: number }).value ?? v.max}`)
    rules.max = r
  }

  if (v.pattern !== undefined) {
    const raw = v.pattern
    if (typeof raw === 'string') {
      rules.pattern = { value: new RegExp(raw), message: 'Invalid format' }
    } else if (typeof raw === 'object' && 'value' in raw) {
      const r = raw as { value: string; message: string }
      rules.pattern = { value: new RegExp(r.value), message: r.message ?? 'Invalid format' }
    }
  }

  // Built-in email/url patterns for convenience
  if (field.type === 'email' && !rules.pattern) {
    rules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    }
  }
  if (field.type === 'url' && !rules.pattern) {
    rules.pattern = {
      value: /^https?:\/\/.+/,
      message: 'Enter a valid URL (must start with http:// or https://)',
    }
  }

  if (v.validate) {
    rules.validate = v.validate
  }

  // Number fields: cast string input to number
  if (field.type === 'number' || field.type === 'integer') {
    rules.setValueAs = (v: string) => (v === '' || v === undefined ? undefined : Number(v))
  }

  return rules
}
