import { RatingGroup } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { RatingFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: RatingFieldSchema
  name: string
  readOnly?: boolean
}

export function RatingField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const count = field.count ?? 5

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={0}
      render={({ field: { value, onChange, onBlur } }) => (
        <RatingGroup.Root
          id={name}
          count={count}
          value={Number(value ?? 0)}
          onValueChange={(details) => onChange(details.value)}
          onBlur={onBlur}
          allowHalf={field.allowHalf}
          readOnly={readOnly || field.readOnly}
          disabled={field.disabled}
          colorPalette="yellow"
          {...field.props}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control>
            {Array.from({ length: count }).map((_, i) => (
              <RatingGroup.Item key={i} index={i + 1}>
                <RatingGroup.ItemIndicator />
              </RatingGroup.Item>
            ))}
          </RatingGroup.Control>
        </RatingGroup.Root>
      )}
    />
  )
}
