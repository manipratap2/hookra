import {
  Editable,
  Box,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { EditableFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

interface Props {
  field: EditableFieldSchema
  name: string
  readOnly?: boolean
}

export function EditableField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const isReadOnly = readOnly || field.readOnly

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => (
        <Editable.Root
          value={String(value ?? '')}
          onValueChange={(details) => onChange(details.value)}
          onBlur={onBlur}
          placeholder={field.placeholder ?? 'Click to edit…'}
          disabled={field.disabled}
          readOnly={isReadOnly}
          activationMode="click"
          width="100%"
          {...field.props}
        >
          <Editable.Context>
            {(editable) => (
              <Box display="flex" alignItems="center" gap="2" width="100%">
                {field.multiline ? (
                  <Editable.Area flex="1">
                    <Editable.Preview
                      minH="60px"
                      p="2"
                      borderWidth="1px"
                      borderColor="transparent"
                      borderRadius="md"
                      width="100%"
                      _hover={!isReadOnly ? { borderColor: 'border' } : undefined}
                      whiteSpace="pre-wrap"
                    />
                    <Editable.Textarea
                      rows={3}
                      p="2"
                      borderWidth="1px"
                      borderRadius="md"
                      width="100%"
                      resize="vertical"
                    />
                  </Editable.Area>
                ) : (
                  <Editable.Area flex="1">
                    <Editable.Preview
                      p="2"
                      borderWidth="1px"
                      borderColor="transparent"
                      borderRadius="md"
                      width="100%"
                      _hover={!isReadOnly ? { borderColor: 'border' } : undefined}
                    />
                    <Editable.Input p="2" borderWidth="1px" borderRadius="md" width="100%" />
                  </Editable.Area>
                )}

                {!isReadOnly && (
                  <ButtonGroup size="xs" variant="ghost">
                    {editable.editing ? (
                      <>
                        <Editable.SubmitTrigger asChild>
                          <IconButton aria-label="Save" colorPalette="green">
                            <CheckIcon />
                          </IconButton>
                        </Editable.SubmitTrigger>
                        <Editable.CancelTrigger asChild>
                          <IconButton aria-label="Cancel" colorPalette="red">
                            <XIcon />
                          </IconButton>
                        </Editable.CancelTrigger>
                      </>
                    ) : (
                      <Editable.EditTrigger asChild>
                        <IconButton aria-label="Edit" colorPalette="gray">
                          <PencilIcon />
                        </IconButton>
                      </Editable.EditTrigger>
                    )}
                  </ButtonGroup>
                )}
              </Box>
            )}
          </Editable.Context>
        </Editable.Root>
      )}
    />
  )
}
