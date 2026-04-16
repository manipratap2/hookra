import {
  NativeSelect,
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import type { SelectFieldSchema } from '../../types/schema'
import { buildValidationRules } from '../../logic/buildValidationRules'
import { useResolvedOptions } from '../../logic/useResolvedOptions'

interface Props {
  field: SelectFieldSchema
  name: string
  readOnly?: boolean
}

export function SelectField({ field, name, readOnly }: Props) {
  const { register, control } = useFormContext()
  const rules = buildValidationRules(field)
  const options = useResolvedOptions(field.options, field.optionsFrom)
  const isReadOnly = readOnly || field.readOnly
  const variant = field.variant ?? 'native'

  // ── Chakra rich Select ──────────────────────────────────────────────────────
  const collection = useMemo(
    () =>
      createListCollection({
        items: options.map((opt) => ({
          label: opt.label,
          value: String(opt.value),
          disabled: opt.disabled,
        })),
      }),
    [options],
  )

  if (variant === 'chakra') {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select.Root
            collection={collection}
            value={value ? [String(value)] : []}
            onValueChange={(details) => onChange(details.value[0] ?? '')}
            onBlur={onBlur}
            disabled={field.disabled}
            readOnly={isReadOnly}
            width="100%"
            {...field.props}
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={field.placeholder ?? 'Select\u2026'} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
    )
  }

  // ── Native Select (default) ─────────────────────────────────────────────────
  return (
    <NativeSelect.Root
      disabled={field.disabled}
      width="100%"
      css={isReadOnly ? { pointerEvents: 'none', opacity: 1 } : undefined}
      aria-readonly={isReadOnly || undefined}
      {...field.props}
    >
      <NativeSelect.Field
        id={name}
        placeholder={field.placeholder ?? 'Select\u2026'}
        tabIndex={isReadOnly ? -1 : undefined}
        {...register(name, rules)}
      >
        {options.map((opt) => (
          <option
            key={String(opt.value)}
            value={String(opt.value)}
            disabled={opt.disabled}
          >
            {opt.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
