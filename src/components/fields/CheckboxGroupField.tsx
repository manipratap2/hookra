import { Stack, Text, Checkbox } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { CheckboxGroupFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: CheckboxGroupFieldSchema
  name: string
  readOnly?: boolean
}

export function CheckboxGroupField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)

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

        return (
          <Stack direction={field.direction ?? 'column'} gap="2" flexWrap="wrap">
            {field.options.map((opt) => (
              <Checkbox.Root
                key={String(opt.value)}
                checked={selected.includes(String(opt.value))}
                onCheckedChange={() => toggle(String(opt.value))}
                disabled={field.disabled || opt.disabled || readOnly || field.readOnly}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>
                  <Text as="span">{opt.label}</Text>
                  {opt.description && (
                    <Text fontSize="sm" color="gray.500" mt="0.5">
                      {opt.description}
                    </Text>
                  )}
                </Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Stack>
        )
      }}
    />
  )
}
