import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Separator,
  Collapsible,
} from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useMemo, useState, useEffect, type ComponentType } from 'react'
import {
  useForm,
  FormProvider,
  useWatch,
  type UseFormReturn,
  type SubmitHandler,
  type DefaultValues,
} from 'react-hook-form'
import type { FormSchema, FormSection, FieldSchema } from '../types/schema'
import type { FillFetcher } from '../logic/useFillFrom'
import { buildDefaultValues } from '../logic/buildDefaultValues'
import { evaluateCondition, extractConditionFields } from '../logic/evaluateCondition'
import { createRegistry, type FieldRegistry } from '../registry/createRegistry'
import { defaultRegistry } from '../registry/defaultRegistry'
import { FormBuilderContext } from '../context/FormBuilderContext'
import { FieldRenderer } from './FieldRenderer'
import { widthToColSpan } from '../utils/widthToColSpan'

// ─── Public types ─────────────────────────────────────────────────────────────

export interface FormBuilderRef {
  form: UseFormReturn
  submit: () => void
  reset: () => void
}

export interface FormBuilderProps {
  schema: FormSchema
  onSubmit: SubmitHandler<Record<string, unknown>>
  onCancel?: () => void
  defaultValues?: Record<string, unknown>
  registry?: Record<string, ComponentType>
  readOnly?: boolean
  loading?: boolean
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
  submitButton?: React.ReactNode
  cancelButton?: React.ReactNode
  onlyDirty?: boolean
  /**
   * Async fetcher for `fillFrom` field population.
   * Called whenever a field with `fillFrom` has its trigger value change.
   * Return a `Record<string, unknown>` whose keys match target field names.
   */
  onFill?: FillFetcher
}

// ─── Section renderer ─────────────────────────────────────────────────────────

interface SectionProps {
  section: FormSection
  readOnly?: boolean
}

function SectionBlock({ section, readOnly }: SectionProps) {
  const [open, setOpen] = useState(!(section.defaultCollapsed ?? false))

  // Collect all condition field paths needed by this section and its fields,
  // so we subscribe only to those values — not the entire form store.
  const watchedKeys = useMemo(() => {
    const keys: string[] = []
    if (section.dependsOn) keys.push(...extractConditionFields(section.dependsOn))
    for (const field of section.fields) {
      if (field.dependsOn) keys.push(...extractConditionFields(field.dependsOn))
    }
    return [...new Set(keys)]
  // section reference is stable (from schema prop); re-run only when it changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  const watchedValues = useWatch({ name: watchedKeys }) as unknown[]

  const conditionValues = useMemo(() => {
    const map: Record<string, unknown> = {}
    watchedKeys.forEach((key, i) => { map[key] = watchedValues[i] })
    return map
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedKeys, watchedValues])

  if (section.dependsOn && !evaluateCondition(section.dependsOn, conditionValues)) {
    return null
  }

  const cols = section.columns ?? 1

  const content = (
    <SimpleGrid columns={{ base: 1, sm: 12 }} gap="4">
      {section.fields.map((field) => {
        if (field.hidden) return null
        // Skip the wrapper entirely when condition fails — avoids empty grid slots
        if (field.dependsOn && !evaluateCondition(field.dependsOn, conditionValues)) return null
        const colSpan = widthToColSpan(field.width, cols)
        return (
          <Box
            key={field.name}
            gridColumn={{ base: '1 / -1', sm: `span ${colSpan}` }}
          >
            <FieldRenderer field={field} name={field.name} readOnly={readOnly} columns={cols} />
          </Box>
        )
      })}
    </SimpleGrid>
  )

  if (!section.title && !section.description) return content

  return (
    <Box borderWidth="1px" borderRadius="lg" p={{ base: "3", sm: "5" }} borderColor="gray.200">
      {(section.title || section.description) && (
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          cursor={section.collapsible ? 'pointer' : 'default'}
          onClick={section.collapsible ? () => setOpen((o) => !o) : undefined}
          mb="3"
        >
          <Box>
            {section.title && <Heading size="sm">{section.title}</Heading>}
            {section.description && (
              <Text fontSize="sm" color="gray.500" mt="1">{section.description}</Text>
            )}
          </Box>
          {section.collapsible && (
            <Text fontSize="sm" color="blue.500" ml="4" flexShrink={0}>
              {open ? 'Hide' : 'Show'}
            </Text>
          )}
        </Box>
      )}
      <Separator mb="4" />
      {section.collapsible ? (
        <Collapsible.Root open={open}>
          <Collapsible.Content>{content}</Collapsible.Content>
        </Collapsible.Root>
      ) : content}
    </Box>
  )
}

// ─── Top-level flat fields list ───────────────────────────────────────────────

interface TopLevelFieldsProps {
  fields: FieldSchema[]
  readOnly?: boolean
  cols: number
}

function TopLevelFields({ fields, readOnly, cols }: TopLevelFieldsProps) {
  const watchedKeys = useMemo(() => {
    const keys: string[] = []
    for (const field of fields) {
      if (field.dependsOn) keys.push(...extractConditionFields(field.dependsOn))
    }
    return [...new Set(keys)]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields])

  const watchedValues = useWatch({ name: watchedKeys }) as unknown[]

  const conditionValues = useMemo(() => {
    const map: Record<string, unknown> = {}
    watchedKeys.forEach((key, i) => { map[key] = watchedValues[i] })
    return map
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedKeys, watchedValues])

  return (
    <SimpleGrid columns={{ base: 1, sm: 12 }} gap="4">
      {fields.map((field: FieldSchema) => {
        if (field.hidden) return null
        // Skip the wrapper entirely when condition fails — avoids empty grid slots
        if (field.dependsOn && !evaluateCondition(field.dependsOn, conditionValues)) return null
        const colSpan = widthToColSpan(field.width, cols)
        return (
          <Box
            key={field.name}
            gridColumn={{ base: '1 / -1', sm: `span ${colSpan}` }}
          >
            <FieldRenderer
              field={field}
              name={field.name}
              readOnly={readOnly}
              columns={cols}
            />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

// ─── FormBuilder ──────────────────────────────────────────────────────────────

export const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  function FormBuilder(
    {
      schema,
      onSubmit,
      onCancel,
      defaultValues: externalDefaults,
      registry: customRegistry,
      readOnly = false,
      loading = false,
      mode = 'onBlur',
      submitButton,
      cancelButton,
      onlyDirty = false,
      onFill,
    },
    ref,
  ) {
    const form = useForm({
      defaultValues: {
        ...buildDefaultValues(schema),
        ...externalDefaults,
      } as DefaultValues<Record<string, unknown>>,
      mode,
    })

    const submitHandler = (data: Record<string, unknown>) => {
      if (onlyDirty) {
        const dirtyFields = form.formState.dirtyFields
        const changedData = Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [key, data[key]])
        )
        return (onSubmit as (data: Record<string, unknown>) => void)(changedData)
      }
      return (onSubmit as (data: Record<string, unknown>) => void)(data)
    }

    useEffect(() => {
      const newDefaults = { ...buildDefaultValues(schema), ...externalDefaults }
      form.reset(newDefaults)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema, externalDefaults])

    useImperativeHandle(ref, () => ({
      form,
      submit: form.handleSubmit(submitHandler as SubmitHandler<Record<string, unknown>>),
      // Recompute defaults at call-time so the ref always resets to the
      // latest schema + externalDefaults, not a stale closure snapshot.
      reset: () => form.reset({ ...buildDefaultValues(schema), ...externalDefaults }),
    }))

    const registry: FieldRegistry = createRegistry(defaultRegistry, customRegistry)
    const cols = schema.layout?.columns ?? 1

    return (
      <FormBuilderContext.Provider value={{ form, schema, registry, readOnly, onFill }}>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler as SubmitHandler<Record<string, unknown>>)}
            noValidate
          >
            <VStack gap="6" align="stretch">
              {(schema.title || schema.description) && (
                <Box>
                  {schema.title && <Heading size="md">{schema.title}</Heading>}
                  {schema.description && (
                    <Text color="gray.600" mt="1">{schema.description}</Text>
                  )}
                </Box>
              )}

              {schema.fields && schema.fields.length > 0 && (
                <TopLevelFields fields={schema.fields} readOnly={readOnly} cols={cols} />
              )}

              {schema.sections && schema.sections.map((section, i) => (
                <SectionBlock
                  key={i}
                  section={section}
                  readOnly={readOnly}
                />
              ))}

              {!readOnly && (
                <HStack gap="3" pt="2">
                  {submitButton !== undefined ? (
                    submitButton
                  ) : (
                    <Button
                      type="submit"
                      colorPalette="blue"
                      loading={loading || form.formState.isSubmitting}
                    >
                      {schema.submitLabel ?? 'Submit'}
                    </Button>
                  )}

                  {schema.showReset && (
                    <Button
                      variant="outline"
                      disabled={form.formState.isSubmitting}
                      onClick={() => form.reset({ ...buildDefaultValues(schema), ...externalDefaults })}
                    >
                      {schema.resetLabel ?? 'Reset'}
                    </Button>
                  )}

                  {(onCancel || cancelButton !== undefined) && (
                    cancelButton !== undefined ? (
                      cancelButton
                    ) : (
                      <Button variant="ghost" disabled={form.formState.isSubmitting} onClick={onCancel}>
                        Cancel
                      </Button>
                    )
                  )}
                </HStack>
              )}
            </VStack>
          </form>
        </FormProvider>
      </FormBuilderContext.Provider>
    )
  },
)
