import { RadioGroup, HStack, VStack, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { RadioFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: RadioFieldSchema
  name: string
  readOnly?: boolean
}

export function RadioField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)

  const Wrapper = field.direction === 'row' ? HStack : VStack

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <RadioGroup.Root
          value={String(value ?? '')}
          onValueChange={(details) => onChange(details.value)}
          disabled={field.disabled || readOnly || field.readOnly}
          {...field.props}
        >
          <Wrapper gap="2" align={field.direction === 'row' ? 'center' : 'stretch'}>
            {field.options.map((opt) => (
              <RadioGroup.Item
                key={String(opt.value)}
                value={String(opt.value)}
                disabled={opt.disabled}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  <Text as="span">{opt.label}</Text>
                  {opt.description && (
                    <Text fontSize="sm" color="gray.500" display="block" mt="0.5">
                      {opt.description}
                    </Text>
                  )}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </Wrapper>
        </RadioGroup.Root>
      )}
    />
  )
}
