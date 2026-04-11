import { Field } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import type { FieldSchema } from '../types/schema'

interface Props {
  field: FieldSchema
  name: string
  children: ReactNode
}

export function FieldWrapper({ field, name, children }: Props) {
  const { formState: { errors } } = useFormContext()

  // Drill into nested error paths (e.g. "address.street")
  const error = name.split('.').reduce<unknown>(
    (acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as object)) {
        return (acc as Record<string, unknown>)[key]
      }
      return undefined
    },
    errors,
  )

  const errorMessage =
    error && typeof error === 'object' && 'message' in (error as object)
      ? String((error as { message?: unknown }).message ?? '')
      : undefined

  const isRequired = !!(field.required || field.validation?.required)

  // Boolean/checkbox renders its own inline label — skip the outer label
  const hideLabel =
    field.type === 'boolean' ||
    field.type === 'switch' ||
    field.type === 'checkbox' ||
    !field.label

  return (
    <Field.Root invalid={!!errorMessage} required={isRequired} width="100%">
      {!hideLabel && (
        <Field.Label htmlFor={name} mb="1">
          {field.label}
        </Field.Label>
      )}
      {children}
      {field.description && !errorMessage && (
        <Field.HelperText>{field.description}</Field.HelperText>
      )}
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}
