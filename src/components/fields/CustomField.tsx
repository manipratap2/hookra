import { useMemo } from 'react'
import { Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { CustomFieldSchema } from '../../types/schema'
import { useFormBuilderContext } from '../../context/FormBuilderContext'

interface Props {
  field: CustomFieldSchema
  name: string
  readOnly?: boolean
}

/* eslint-disable react-hooks/static-components -- intentional: component is dynamically resolved from a registry by key */
export function CustomField({ field, name, readOnly }: Props) {
  const { registry } = useFormBuilderContext()
  const form = useFormContext()

  const key = field.component ?? field.name
  const ResolvedComponent = useMemo(() => registry.get(key), [registry, key])

  if (!ResolvedComponent) {
    return (
      <Text color="red.500" fontSize="sm">
        [CustomField] No component registered for key "{key}". Pass it via the{' '}
        <code>registry</code> prop on FormBuilder.
      </Text>
    )
  }

  return <ResolvedComponent field={field} name={name} readOnly={readOnly} form={form} {...field.props} />
}
/* eslint-enable react-hooks/static-components */
