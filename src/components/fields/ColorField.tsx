import { HStack, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ColorFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: ColorFieldSchema
  name: string
  readOnly?: boolean
}

export function ColorField({ field, name, readOnly }: Props) {
  const { register, watch } = useFormContext()
  const rules = buildValidationRules(field)
  const currentValue = watch(name) ?? '#000000'

  return (
    <HStack gap="3">
      <input
        type="color"
        style={{
          width: '40px',
          height: '40px',
          padding: '4px',
          borderRadius: '6px',
          border: '1px solid var(--chakra-colors-gray-200)',
          cursor: field.disabled || readOnly || field.readOnly ? 'not-allowed' : 'pointer',
        }}
        disabled={field.disabled || readOnly || field.readOnly}
        {...register(name, rules)}
      />
      <Input
        value={currentValue}
        readOnly
        disabled={field.disabled}
        w="120px"
        fontFamily="mono"
        fontSize="sm"
      />
    </HStack>
  )
}
