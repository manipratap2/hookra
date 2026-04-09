import {
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
  Text,
  Separator,
  SimpleGrid,
} from '@chakra-ui/react'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import type { ArrayFieldSchema } from '../../types/schema'
import { FieldRenderer } from '../FieldRenderer'
import { widthToColSpan } from '../../utils/widthToColSpan'

interface Props {
  field: ArrayFieldSchema
  name: string
  readOnly?: boolean
}

export function ArrayField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })

  const itemSchema = field.itemSchema
  const isObject = itemSchema.type === 'object' && 'fields' in itemSchema
  const atMax = field.maxItems !== undefined && fields.length >= field.maxItems
  const atMin = field.minItems !== undefined && fields.length <= field.minItems
  const isDisabledOrReadOnly = field.disabled || readOnly || field.readOnly

  const getNewItem = () => {
    if (isObject && 'fields' in itemSchema) {
      const obj: Record<string, unknown> = {}
      for (const f of itemSchema.fields) {
        obj[f.name] = f.defaultValue ?? ''
      }
      return obj
    }
    return itemSchema.defaultValue ?? ''
  }

  return (
    <VStack gap="3" align="stretch">
      {fields.length === 0 && (
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          No items yet. Click "{field.addLabel ?? 'Add item'}" to add one.
        </Text>
      )}

      {fields.map((item, index) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          p="3"
          position="relative"
        >
          <HStack justify="space-between" mb="2">
            <Text fontSize="sm" fontWeight="semibold" color="gray.600">
              #{index + 1}
            </Text>
            {!isDisabledOrReadOnly && (
              <IconButton
                aria-label={field.removeLabel ?? 'Remove'}
                size="sm"
                variant="ghost"
                colorPalette="red"
                disabled={atMin}
                onClick={() => remove(index)}
              >
                <Trash2 size={16} />
              </IconButton>
            )}
          </HStack>

          <Separator mb="3" />

          {isObject && 'fields' in itemSchema ? (
            <SimpleGrid columns={1} gap="3">
              {itemSchema.fields.map((subField) => {
                const subName = `${name}.${index}.${subField.name}`
                const colSpan = widthToColSpan(subField.width, 1)
                return (
                  <Box key={subField.name} gridColumn={colSpan > 1 ? `span ${colSpan}` : undefined}>
                    <FieldRenderer field={subField} name={subName} readOnly={readOnly} />
                  </Box>
                )
              })}
            </SimpleGrid>
          ) : (
            <FieldRenderer
              field={{ ...itemSchema, name: String(index) }}
              name={`${name}.${index}`}
              readOnly={readOnly}
            />
          )}
        </Box>
      ))}

      {!isDisabledOrReadOnly && (
        <Button
          size="sm"
          variant="outline"
          colorPalette="blue"
          disabled={atMax}
          onClick={() => append(getNewItem())}
          alignSelf="flex-start"
        >
          <Plus size={16} />
          {field.addLabel ?? 'Add item'}
        </Button>
      )}

      {field.maxItems && fields.length >= field.maxItems && (
        <Text fontSize="xs" color="orange.500">
          Maximum of {field.maxItems} item(s) reached.
        </Text>
      )}
    </VStack>
  )
}
