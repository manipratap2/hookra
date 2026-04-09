import { Input, Text, Box } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { FileFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: FileFieldSchema
  name: string
  readOnly?: boolean
}

export function FileField({ field, name, readOnly }: Props) {
  const { register } = useFormContext()

  const rules = buildValidationRules(field)

  if (field.maxSize) {
    const maxBytes = field.maxSize
    rules.validate = {
      ...(rules.validate as object | undefined),
      maxSize: (files: FileList) => {
        if (!files?.length) return true
        const oversized = Array.from(files).some((f) => f.size > maxBytes)
        return !oversized || `File size must be under ${Math.round(maxBytes / 1024)} KB`
      },
    }
  }

  return (
    <Box>
      <Input
        id={name}
        type="file"
        accept={field.accept}
        multiple={field.multiple}
        disabled={field.disabled || readOnly || field.readOnly}
        css={{ paddingTop: '4px' }}
        {...field.props}
        {...register(name, rules)}
      />
      {field.accept && (
        <Text fontSize="xs" color="gray.500" mt="1">
          Accepted: {field.accept}
        </Text>
      )}
    </Box>
  )
}
