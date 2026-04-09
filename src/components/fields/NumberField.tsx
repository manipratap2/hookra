import { NumberInput } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { NumberFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: NumberFieldSchema
  name: string
  readOnly?: boolean
}

export function NumberField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, onBlur } }) => (
        <NumberInput.Root
          id={name}
          value={value != null ? String(value) : ''}
          onValueChange={(details) => onChange(details.value === '' ? '' : Number(details.value))}
          onBlur={onBlur}
          min={field.min}
          max={field.max}
          step={field.step}
          disabled={field.disabled}
          readOnly={readOnly || field.readOnly}
          {...field.props}
        >
          <NumberInput.Input placeholder={field.placeholder} />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      )}
    />
  )
}
