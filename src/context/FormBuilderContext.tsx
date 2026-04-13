import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { FieldRegistry } from '../registry/createRegistry'
import type { FormSchema } from '../types/schema'
import type { FillFetcher } from '../logic/useFillFrom'

export interface FormBuilderContextValue {
  form: UseFormReturn
  schema: FormSchema
  registry: FieldRegistry
  readOnly: boolean
  /** User-supplied async fetcher for `fillFrom` field population. */
  onFill?: FillFetcher
}

export const FormBuilderContext = createContext<FormBuilderContextValue | null>(null)

export function useFormBuilderContext(): FormBuilderContextValue {
  const ctx = useContext(FormBuilderContext)
  if (!ctx) {
    throw new Error('useFormBuilderContext must be used inside <FormBuilder>')
  }
  return ctx
}
