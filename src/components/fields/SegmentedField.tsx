import { SegmentGroup } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { SegmentedFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: SegmentedFieldSchema
  name: string
  readOnly?: boolean
}

export function SegmentedField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => (
        <SegmentGroup.Root
          value={String(value ?? '')}
          onValueChange={(details) => onChange(details.value)}
          onBlur={onBlur}
          disabled={field.disabled || readOnly || field.readOnly}
          width="100%"
          {...field.props}
        >
          <SegmentGroup.Indicator />
          {options.map((opt) => (
            <SegmentGroup.Item key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
              <SegmentGroup.ItemHiddenInput />
              <SegmentGroup.ItemText>{opt.label}</SegmentGroup.ItemText>
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      )}
    />
  )
}
