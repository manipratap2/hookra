import { TagsInput } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { TagsFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: TagsFieldSchema
  name: string
  readOnly?: boolean
}

export function TagsField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)

  const validatedRules = {
    ...rules,
    validate: {
      ...(rules.validate as object | undefined),
      ...(field.max !== undefined
        ? {
            maxTags: (v: string[]) =>
              (v?.length ?? 0) <= field.max! || `Maximum ${field.max} tag(s) allowed`,
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
      render={({ field: { value, onChange, onBlur } }) => {
        const tags: string[] = Array.isArray(value) ? value : []

        return (
          <TagsInput.Root
            value={tags}
            onValueChange={(details) => onChange(details.value)}
            onBlur={onBlur}
            max={field.max}
            allowDuplicates={field.allowDuplicates}
            disabled={field.disabled || readOnly || field.readOnly}
            width="100%"
            {...field.props}
          >
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder={field.placeholder ?? 'Add a tag…'} />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
        )
      }}
    />
  )
}
