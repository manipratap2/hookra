import { Textarea, Text, Box } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { TextareaFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: TextareaFieldSchema
  name: string
  readOnly?: boolean
}

export function TextareaField({ field, name, readOnly }: Props) {
  const { register, watch } = useFormContext()
  const rules = buildValidationRules(field)
  const value = watch(name) ?? ''

  const effectiveMaxLength = field.maxLength ?? (field.validation?.maxLength as number | undefined)

  return (
    <Box position="relative" width="100%">
      <Textarea
        id={name}
        placeholder={field.placeholder}
        rows={field.rows ?? 3}
        resize={field.resize ?? 'vertical'}
        disabled={field.disabled}
        readOnly={readOnly || field.readOnly}
        maxLength={effectiveMaxLength}
        width="100%"
        {...field.props}
        {...register(name, rules)}
      />
      {field.showCount && effectiveMaxLength && (
        <Text
          fontSize="xs"
          color={String(value).length >= effectiveMaxLength ? 'red.500' : 'gray.500'}
          textAlign="right"
          mt="1"
        >
          {String(value).length} / {effectiveMaxLength}
        </Text>
      )}
    </Box>
  )
}
