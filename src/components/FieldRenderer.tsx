import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { FieldSchema } from '../types/schema'
import { evaluateCondition } from '../logic/evaluateCondition'
import { FieldWrapper } from './FieldWrapper'

// Field components
import { TextField } from './fields/TextField'
import { NumberField } from './fields/NumberField'
import { TextareaField } from './fields/TextareaField'
import { SelectField } from './fields/SelectField'
import { MultiSelectField } from './fields/MultiSelectField'
import { RadioField } from './fields/RadioField'
import { CheckboxGroupField } from './fields/CheckboxGroupField'
import { BooleanField } from './fields/BooleanField'
import { DateField } from './fields/DateField'
import { FileField } from './fields/FileField'
import { SliderField } from './fields/SliderField'
import { ColorField } from './fields/ColorField'
import { HiddenField } from './fields/HiddenField'
import { ArrayField } from './fields/ArrayField'
import { ObjectField } from './fields/ObjectField'
import { CustomField } from './fields/CustomField'

interface Props {
  field: FieldSchema
  name: string
  readOnly?: boolean
  columns?: number
}

export function FieldRenderer({ field, name, readOnly, columns = 1 }: Props) {
  const { unregister } = useFormContext()

  // Always call useWatch at the top level (never conditionally)
  const allValues = useWatch() as Record<string, unknown>

  // Evaluate visibility
  const visible = field.dependsOn
    ? evaluateCondition(field.dependsOn, allValues)
    : true

  // Track previous visibility to unregister only on transition
  const prevVisible = useRef(visible)

  useEffect(() => {
    if (prevVisible.current && !visible) {
      unregister(name, { keepValue: false })
    }
    prevVisible.current = visible
  }, [visible, unregister, name])

  if (!visible) return null

  // Hidden fields: register but don't render a wrapper
  if (field.type === 'hidden' || field.hidden) {
    return <HiddenField field={field as Parameters<typeof HiddenField>[0]['field']} name={name} />
  }

  const fieldContent = renderField(field, name, readOnly, columns)

  return (
    <FieldWrapper field={field} name={name}>
      {fieldContent}
    </FieldWrapper>
  )
}

function renderField(
  field: FieldSchema,
  name: string,
  readOnly: boolean | undefined,
  columns: number,
) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'url':
    case 'tel':
    case 'search':
      return <TextField field={field} name={name} readOnly={readOnly} />

    case 'number':
    case 'integer':
      return <NumberField field={field} name={name} readOnly={readOnly} />

    case 'textarea':
      return <TextareaField field={field} name={name} readOnly={readOnly} />

    case 'select':
      return <SelectField field={field} name={name} readOnly={readOnly} />

    case 'multiselect':
      return <MultiSelectField field={field} name={name} readOnly={readOnly} />

    case 'radio':
      return <RadioField field={field} name={name} readOnly={readOnly} />

    case 'checkboxgroup':
      return <CheckboxGroupField field={field} name={name} readOnly={readOnly} />

    case 'boolean':
    case 'switch':
    case 'checkbox':
      return <BooleanField field={field} name={name} readOnly={readOnly} />

    case 'date':
    case 'time':
    case 'datetime':
      return <DateField field={field} name={name} readOnly={readOnly} />

    case 'file':
      return <FileField field={field} name={name} readOnly={readOnly} />

    case 'slider':
      return <SliderField field={field} name={name} readOnly={readOnly} />

    case 'color':
      return <ColorField field={field} name={name} readOnly={readOnly} />

    case 'array':
      return <ArrayField field={field} name={name} readOnly={readOnly} />

    case 'object':
      return <ObjectField field={field} name={name} readOnly={readOnly} columns={columns} />

    case 'custom':
      return <CustomField field={field} name={name} readOnly={readOnly} />

    default:
      return null
  }
}
