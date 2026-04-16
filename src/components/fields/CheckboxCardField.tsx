import { CheckboxCard, SimpleGrid, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { CheckboxCardFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: CheckboxCardFieldSchema
  name: string
  readOnly?: boolean
}

export function CheckboxCardField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const selected: string[] = Array.isArray(value) ? value : []

        const toggle = (optValue: string) => {
          if (selected.includes(optValue)) {
            onChange(selected.filter((v) => v !== optValue))
          } else {
            onChange([...selected, optValue])
          }
        }

        const cols = field.direction === 'column' ? 1 : { base: 1, sm: 2, md: Math.min(options.length, 3) }

        return (
          <SimpleGrid columns={cols} gap="3">
            {options.map((opt) => {
              const isChecked = selected.includes(String(opt.value))
              const isDisabled = field.disabled || opt.disabled || readOnly || field.readOnly

              return (
                <CheckboxCard.Root
                  key={String(opt.value)}
                  checked={isChecked}
                  onCheckedChange={() => toggle(String(opt.value))}
                  disabled={isDisabled}
                  variant="outline"
                >
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Indicator />
                    <CheckboxCard.Content>
                      <CheckboxCard.Label>{opt.label}</CheckboxCard.Label>
                      {opt.description && (
                        <CheckboxCard.Description>
                          <Text fontSize="xs" color="fg.muted">{opt.description}</Text>
                        </CheckboxCard.Description>
                      )}
                    </CheckboxCard.Content>
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              )
            })}
          </SimpleGrid>
        )
      }}
    />
  )
}
