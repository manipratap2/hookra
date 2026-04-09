import { useFormContext } from 'react-hook-form'
import type { HiddenFieldSchema } from '../../types/schema'

interface Props {
  field: HiddenFieldSchema
  name: string
}

/** Registers the field with RHF but renders nothing visible */
export function HiddenField({ field, name }: Props) {
  const { register } = useFormContext()
  return <input type="hidden" {...register(name)} defaultValue={String(field.defaultValue ?? '')} />
}
