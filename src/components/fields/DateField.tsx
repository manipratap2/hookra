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

  return (
    <Input
      id={name}
      type={INPUT_TYPE[field.type] ?? 'date'}
      min={field.min}
      max={field.max}
      disabled={field.disabled}
      readOnly={readOnly || field.readOnly}
      width="100%"
      {...field.props}
      {...register(name, rules)}
    />
  )
}
