import { RadioCard, SimpleGrid, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { RadioCardFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: RadioCardFieldSchema
  name: string
  readOnly?: boolean
}

export function RadioCardField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => {
        const cols = field.direction === 'column' ? 1 : { base: 1, sm: 2, md: Math.min(options.length, 3) }

        return (
          <RadioCard.Root
            value={String(value ?? '')}
            onValueChange={(details) => onChange(details.value)}
            onBlur={onBlur}
            disabled={field.disabled || readOnly || field.readOnly}
            variant="outline"
          >
            <SimpleGrid columns={cols} gap="3">
              {options.map((opt) => (
                <RadioCard.Item
                  key={String(opt.value)}
                  value={String(opt.value)}
                  disabled={opt.disabled}
                >
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText>{opt.label}</RadioCard.ItemText>
                      {opt.description && (
                        <RadioCard.ItemDescription>
                          <Text fontSize="xs" color="fg.muted">{opt.description}</Text>
                        </RadioCard.ItemDescription>
                      )}
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </SimpleGrid>
          </RadioCard.Root>
        )
      }}
    />
  )
}
