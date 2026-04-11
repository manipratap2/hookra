import { NativeSelect } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { SelectFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: SelectFieldSchema
  name: string
  readOnly?: boolean
}

export function SelectField({ field, name, readOnly }: Props) {
  const { register } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)
  const isReadOnly = readOnly || field.readOnly

  return (
    <NativeSelect.Root
      disabled={field.disabled}
      width="100%"
      // Native <select> has no readOnly attribute. Block interaction via CSS and
      // capture handlers so the value stays in the form payload (unlike disabled).
      css={isReadOnly ? { pointerEvents: 'none', opacity: 1 } : undefined}
      aria-readonly={isReadOnly || undefined}
      {...field.props}
    >
      <NativeSelect.Field
        id={name}
        placeholder={field.placeholder ?? 'Select\u2026'}
        tabIndex={isReadOnly ? -1 : undefined}
        {...register(name, rules)}
      >
        {options.map((opt) => (
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
