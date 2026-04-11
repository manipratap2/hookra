import {
  Box,
  Heading,
  Text,
  Collapsible,
  Button,
  Separator,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState } from 'react'
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
import type { ObjectFieldSchema } from '../../types/schema'
import { FieldRenderer } from '../FieldRenderer'
import { widthToColSpan } from '../../utils/widthToColSpan'

interface Props {
  field: ObjectFieldSchema
  name: string
  readOnly?: boolean
  columns?: number
}

export function ObjectField({ field, name, readOnly, columns = 1 }: Props) {
  const [open, setOpen] = useState(!(field.defaultCollapsed ?? false))

  const content = (
    <SimpleGrid columns={{ base: 1, sm: 12 }} gap="4" mt={field.label ? '3' : '0'}>
      {field.fields.map((subField) => {
        const subName = `${name}.${subField.name}`
        const colSpan = widthToColSpan(subField.width, columns)
        return (
          <Box
            key={subField.name}
            gridColumn={{ base: '1 / -1', sm: `span ${colSpan}` }}
          >
            <FieldRenderer field={subField} name={subName} readOnly={readOnly} />
          </Box>
        )
      })}
    </SimpleGrid>
  )

  if (!field.label && !field.description) return content

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" borderColor="gray.200">
      {(field.label || field.description) && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            cursor={field.collapsible ? 'pointer' : 'default'}
            onClick={field.collapsible ? () => setOpen((o) => !o) : undefined}
          >
            <Box>
              {field.label && <Heading size="sm">{field.label}</Heading>}
              {field.description && (
                <Text fontSize="sm" color="gray.500">{field.description}</Text>
              )}
            </Box>
            {field.collapsible && (
              <Button variant="ghost" size="sm" aria-label={open ? 'Collapse' : 'Expand'}>
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            )}
          </Box>
          <Separator mt="2" mb="3" />
        </>
      )}

      {field.collapsible ? (
        <Collapsible.Root open={open}>
          <Collapsible.Content>{content}</Collapsible.Content>
        </Collapsible.Root>
      ) : content}
    </Box>
  )
}
