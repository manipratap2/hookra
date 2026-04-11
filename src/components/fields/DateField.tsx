import { Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { DateFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: DateFieldSchema
  name: string
  readOnly?: boolean
}

const INPUT_TYPE: Record<string, string> = {
  date: 'date',
  time: 'time',
  datetime: 'datetime-local',
}

export function DateField({ field, name, readOnly }: Props) {
  const { register } = useFormContext()
  const rules = buildValidationRules(field)
  const isReadOnly = readOnly || field.readOnly

  return (
    <Input
      id={name}
      type={INPUT_TYPE[field.type] ?? 'date'}
      min={field.min}
      max={field.max}
      disabled={field.disabled}
      readOnly={isReadOnly}
      // Native date/time pickers ignore the readOnly attribute and still open on click.
      // Block all pointer and keyboard interactions explicitly when the field is read-only.
      onClickCapture={isReadOnly ? (e) => e.preventDefault() : undefined}
      onKeyDownCapture={isReadOnly ? (e) => e.preventDefault() : undefined}
      css={isReadOnly ? { pointerEvents: 'none' } : undefined}
      width="100%"
      {...field.props}
      {...register(name, rules)}
    />
  )
}
