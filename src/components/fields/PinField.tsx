import { PinInput } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { PinFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: PinFieldSchema
  name: string
  readOnly?: boolean
}

export function PinField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const length = field.length ?? 4

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => (
        <PinInput.Root
          id={name}
          value={String(value ?? '').split('')}
          onValueChange={(details) => onChange(details.value.join(''))}
          onValueComplete={(details) => onChange(details.value.join(''))}
          onBlur={onBlur}
          type={field.mask ? 'numeric' : 'numeric'}
          mask={field.mask}
          otp={field.otp}
          disabled={field.disabled || readOnly || field.readOnly}
          {...field.props}
        >
          <PinInput.HiddenInput />
          <PinInput.Control>
            {Array.from({ length }).map((_, i) => (
              <PinInput.Input key={i} index={i} />
            ))}
          </PinInput.Control>
        </PinInput.Root>
      )}
    />
  )
}
