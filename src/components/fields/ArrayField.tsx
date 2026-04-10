import {
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
  Text,
  Separator,
  SimpleGrid,
  Table,
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
  const isHorizontal = field.layout === 'horizontal' && isObject
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

  const addButton = !isDisabledOrReadOnly && (
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
  )

  const maxMessage = field.maxItems && fields.length >= field.maxItems && (
    <Text fontSize="xs" color="orange.500">
      Maximum of {field.maxItems} item(s) reached.
    </Text>
  )

  // ── Horizontal (table-like) layout ──────────────────────────────────────────
  if (isHorizontal && 'fields' in itemSchema) {
    const subFields = itemSchema.fields

    return (
      <VStack gap="3" align="stretch">
        {fields.length === 0 && (
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            No items yet. Click "{field.addLabel ?? 'Add item'}" to add one.
          </Text>
        )}

        {fields.length > 0 && (
          <Box overflowX="auto">
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  {subFields.map((sf) => (
                    <Table.ColumnHeader key={sf.name} whiteSpace="nowrap" fontWeight="semibold">
                      {sf.label ?? sf.name}
                      {(sf.required || (typeof sf.required === 'string' && sf.required)) && (
                        <Text as="span" color="red.500" ml="1">*</Text>
                      )}
                    </Table.ColumnHeader>
                  ))}
                  {!isDisabledOrReadOnly && (
                    <Table.ColumnHeader width="40px" />
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {fields.map((item, index) => (
                  <Table.Row key={item.id}>
                    {subFields.map((subField) => {
                      const subName = `${name}.${index}.${subField.name}`
                      return (
                        <Table.Cell key={subField.name} verticalAlign="top" py="2">
                          <FieldRenderer
                            field={{ ...subField, label: undefined }}
                            name={subName}
                            readOnly={readOnly}
                          />
                        </Table.Cell>
                      )
                    })}
                    {!isDisabledOrReadOnly && (
                      <Table.Cell verticalAlign="top" py="2">
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
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {addButton}
        {maxMessage}
      </VStack>
    )
  }

  // ── Vertical (card) layout (default) ────────────────────────────────────────
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

      {addButton}
      {maxMessage}
    </VStack>
  )
}
