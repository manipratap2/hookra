import {
  FileUpload,
  Button,
  Text,
  Icon,
  Box,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FileFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

interface Props {
  field: FileFieldSchema
  name: string
  readOnly?: boolean
}

export function FileField({ field, name, readOnly }: Props) {
  const { control } = useFormContext()
  const rules = buildValidationRules(field)
  const isDisabled = field.disabled || readOnly || field.readOnly

  const validatedRules = {
    ...rules,
    validate: {
      ...(rules.validate as object | undefined),
      ...(field.maxSize !== undefined
        ? {
            maxSize: (files: File[]) => {
              if (!files?.length) return true
              const oversized = files.some((f) => f.size > field.maxSize!)
              return !oversized || `File size must be under ${Math.round(field.maxSize! / 1024)} KB`
            },
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
      render={({ field: { onChange } }) => (
        <FileUpload.Root
          onFileChange={(details) => onChange(details.acceptedFiles)}
          accept={field.accept ? field.accept.split(',').map((s) => s.trim()) : undefined}
          maxFiles={field.multiple ? undefined : 1}
          disabled={isDisabled}
          width="100%"
          {...field.props}
        >
          <FileUpload.HiddenInput id={name} />
          <FileUpload.Dropzone>
            <FileUpload.DropzoneContent>
              <Icon color="fg.muted" boxSize="6">
                <UploadIcon />
              </Icon>
              <Box textAlign="center">
                <Text fontWeight="medium" fontSize="sm">
                  Drop files here or{' '}
                  <FileUpload.Trigger asChild>
                    <Button
                      variant="plain"
                      size="sm"
                      colorPalette="blue"
                      display="inline"
                      height="auto"
                      p="0"
                      textDecoration="underline"
                    >
                      browse
                    </Button>
                  </FileUpload.Trigger>
                </Text>
                {field.accept && (
                  <Text fontSize="xs" color="fg.muted" mt="1">
                    Accepted: {field.accept}
                  </Text>
                )}
                {field.maxSize && (
                  <Text fontSize="xs" color="fg.muted">
                    Max size: {Math.round(field.maxSize / 1024)} KB
                  </Text>
                )}
              </Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
          <FileUpload.List clearable={!isDisabled} />
        </FileUpload.Root>
      )}
    />
  )
}
