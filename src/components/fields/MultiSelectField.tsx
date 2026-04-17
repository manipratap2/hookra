import { Stack, Text, Checkbox } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { MultiSelectFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: MultiSelectFieldSchema
  name: string
  readOnly?: boolean
}

export function MultiSelectField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)

  const validatedRules = {
    ...rules,
    validate: {
      ...(rules.validate as object | undefined),
      ...(field.min !== undefined
        ? {
            minItems: (v: string[]) =>
              (v?.length ?? 0) >= field.min! || `Select at least ${field.min} option(s)`,
          }
        : {}),
      ...(field.max !== undefined
        ? {
            maxItems: (v: string[]) =>
              (v?.length ?? 0) <= field.max! || `Select at most ${field.max} option(s)`,
          }
        : {}),
    },
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={validatedRules}
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
          <Stack gap="2">
            {options.map((opt) => (
              <Checkbox.Root
                key={String(opt.value)}
                ids={{ hiddenInput: `${name}-cb-${String(opt.value)}` }}
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
