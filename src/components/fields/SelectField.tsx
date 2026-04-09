import { NativeSelect } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { SelectFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: SelectFieldSchema
  name: string
  readOnly?: boolean
}

export function SelectField({ field, name, readOnly }: Props) {
  const { register } = useFormContext()
  const rules = buildValidationRules(field)

  return (
    <NativeSelect.Root
      disabled={field.disabled || readOnly || field.readOnly}
      {...field.props}
    >
      <NativeSelect.Field
        id={name}
        placeholder={field.placeholder ?? 'Select\u2026'}
        {...register(name, rules)}
      >
        {field.options.map((opt) => (
          <option
            key={String(opt.value)}
            value={String(opt.value)}
            disabled={opt.disabled}
          >
            {opt.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
