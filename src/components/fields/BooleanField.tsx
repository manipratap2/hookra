import { Switch, Checkbox, HStack } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { BooleanFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: BooleanFieldSchema
  name: string
  readOnly?: boolean
}

export function BooleanField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const inlineLabel = field.checkboxLabel ?? field.label

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => {
        const isChecked = Boolean(value)
        const isDisabled = field.disabled || readOnly || field.readOnly

        if (field.type === 'checkbox') {
          return (
            <Checkbox.Root
              id={name}
              checked={isChecked}
              onCheckedChange={(details) => onChange(details.checked)}
              onBlur={onBlur}
              disabled={isDisabled}
              {...field.props}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              {inlineLabel && <Checkbox.Label>{inlineLabel}</Checkbox.Label>}
            </Checkbox.Root>
          )
        }

        // boolean or switch → render as Switch
        return (
          <HStack>
            <Switch.Root
              id={name}
              checked={isChecked}
              onCheckedChange={(details) => onChange(details.checked)}
              onBlur={onBlur}
              disabled={isDisabled}
              {...field.props}
            >
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              {inlineLabel && <Switch.Label>{inlineLabel}</Switch.Label>}
            </Switch.Root>
          </HStack>
        )
      }}
    />
  )
}
