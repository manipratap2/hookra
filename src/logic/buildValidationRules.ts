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
    const raw = v.minLength
    const num = typeof raw === 'object' && 'value' in raw ? raw.value : raw
    rules.minLength = resolveRuleValue(raw, `Minimum ${num} characters`)
  }

  if (v.maxLength !== undefined) {
    const raw = v.maxLength
    const num = typeof raw === 'object' && 'value' in raw ? raw.value : raw
    rules.maxLength = resolveRuleValue(raw, `Maximum ${num} characters`)
  }

  if (v.min !== undefined) {
    const raw = v.min
    const num = typeof raw === 'object' && 'value' in raw ? raw.value : raw
    rules.min = resolveRuleValue(raw, `Minimum value is ${num}`)
  }

  if (v.max !== undefined) {
    const raw = v.max
    const num = typeof raw === 'object' && 'value' in raw ? raw.value : raw
    rules.max = resolveRuleValue(raw, `Maximum value is ${num}`)
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
    rules.setValueAs = (raw: string) => (raw === '' || raw === undefined ? undefined : Number(raw))
  }

  return rules
}
