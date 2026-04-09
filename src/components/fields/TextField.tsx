import { Group, Input, InputAddon } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { TextFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: TextFieldSchema
  name: string
  readOnly?: boolean
}

const HTML_INPUT_TYPE: Record<string, string> = {
  text: 'text',
  email: 'email',
  password: 'password',
  url: 'url',
  tel: 'tel',
  search: 'search',
}

export function TextField({ field, name, readOnly }: Props) {
  const { register } = useFormContext()
  const rules = buildValidationRules(field)

  const inputEl = (
    <Input
      id={name}
      type={HTML_INPUT_TYPE[field.type] ?? 'text'}
      placeholder={field.placeholder}
      disabled={field.disabled}
      readOnly={readOnly || field.readOnly}
      {...field.props}
      {...register(name, rules)}
    />
  )

  if (!field.prefix && !field.suffix) return inputEl

  return (
    <Group attached>
      {field.prefix && <InputAddon>{field.prefix}</InputAddon>}
      {inputEl}
      {field.suffix && <InputAddon>{field.suffix}</InputAddon>}
    </Group>
  )
}
