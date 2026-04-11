import { Slider, Box, HStack, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { SliderFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

interface Props {
  field: SliderFieldSchema
  name: string
  readOnly?: boolean
}

export function SliderField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)

  const min = field.min ?? 0
  const max = field.max ?? 100
  const step = field.step ?? 1

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={min}
      render={({ field: { value, onChange } }) => (
        <Box pt="6" pb="2" width="100%">
          <HStack justify="space-between" mb="2">
            <Text fontSize="sm" color="gray.500">{min}</Text>
            {field.showValue && (
              <Text fontSize="sm" fontWeight="semibold">{value ?? min}</Text>
            )}
            <Text fontSize="sm" color="gray.500">{max}</Text>
          </HStack>
          <Slider.Root
            id={name}
            value={[Number(value ?? min)]}
            onValueChange={(details) => onChange(details.value[0])}
            min={min}
            max={max}
            step={step}
            disabled={field.disabled || readOnly || field.readOnly}
            {...field.props}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb index={0} />
            </Slider.Control>
          </Slider.Root>
        </Box>
      )}
    />
  )
}
