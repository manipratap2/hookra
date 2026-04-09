import type { FieldSchema, FormSchema, FormSection, ArrayFieldSchema, ObjectFieldSchema } from '../types/schema'

type DefaultValues = Record<string, unknown>

function fieldDefault(field: FieldSchema): unknown {
  if (field.defaultValue !== undefined) return field.defaultValue

  switch (field.type) {
    case 'boolean':
    case 'switch':
    case 'checkbox':
      return false

    case 'number':
    case 'integer':
      return ''

    case 'multiselect':
    case 'checkboxgroup':
    case 'array':
      return []

    case 'object': {
      const obj = field as ObjectFieldSchema
      const nested: DefaultValues = {}
      for (const f of obj.fields) {
        nested[f.name] = fieldDefault(f)
      }
      return nested
    }

    default:
      return ''
  }
}

function processFields(fields: FieldSchema[], acc: DefaultValues): void {
  for (const field of fields) {
    if (field.hidden) continue

    if (field.type === 'object') {
      const obj = field as ObjectFieldSchema
      const nested: DefaultValues = {}
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue
        continue
      }
      processFields(obj.fields, nested)
      acc[field.name] = nested
    } else if (field.type === 'array') {
      const arr = field as ArrayFieldSchema
      acc[field.name] = field.defaultValue ?? (arr.minItems ? [] : [])
    } else {
      acc[field.name] = fieldDefault(field)
    }
  }
}

/**
 * Derives RHF defaultValues from a FormSchema.
 * External defaultValues passed to <FormBuilder> take precedence.
 */
export function buildDefaultValues(schema: FormSchema): DefaultValues {
  const acc: DefaultValues = {}

  const sections: FormSection[] = schema.sections ?? []
  const topFields: FieldSchema[] = schema.fields ?? []

  processFields(topFields, acc)
  for (const section of sections) {
    processFields(section.fields, acc)
  }

  return acc
}
