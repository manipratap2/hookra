import type { RegisterOptions } from 'react-hook-form'

// ─── Field types ──────────────────────────────────────────────────────────────

export type TextFieldType = 'text' | 'email' | 'password' | 'url' | 'tel' | 'search'
export type NumericFieldType = 'number' | 'integer'
export type ChoiceFieldType = 'select' | 'multiselect' | 'radio' | 'checkboxgroup'
export type ToggleFieldType = 'boolean' | 'switch' | 'checkbox'
export type TemporalFieldType = 'date' | 'time' | 'datetime'
export type SpecialFieldType = 'textarea' | 'file' | 'color' | 'slider' | 'hidden'
export type StructuralFieldType = 'array' | 'object'
export type FieldType =
  | TextFieldType
  | NumericFieldType
  | ChoiceFieldType
  | ToggleFieldType
  | TemporalFieldType
  | SpecialFieldType
  | StructuralFieldType
  | 'custom'

// ─── Conditions (dependsOn) ───────────────────────────────────────────────────

export type ConditionOperator =
  | 'eq'         // === (default)
  | 'ne'         // !==
  | 'gt'         // >
  | 'gte'        // >=
  | 'lt'         // <
  | 'lte'        // <=
  | 'in'         // value is in array
  | 'nin'        // value is NOT in array
  | 'contains'   // string.includes(value)
  | 'startsWith' // string.startsWith(value)
  | 'endsWith'   // string.endsWith(value)
  | 'matches'    // regex match
  | 'empty'      // null | undefined | '' | []
  | 'notEmpty'   // not empty
  | 'truthy'     // Boolean(value) === true
  | 'falsy'      // Boolean(value) === false

/** A single condition against one field */
export interface SimpleCondition {
  /** Absolute field path from the form root, e.g. "address.city" */
  field: string
  operator?: ConditionOperator
  /** The value to compare against. Not needed for empty/notEmpty/truthy/falsy */
  value?: unknown
}

/** Combine multiple conditions with AND / OR / NOT */
export interface CompoundCondition {
  all?: Condition[]
  any?: Condition[]
  not?: Condition
}

export type Condition = SimpleCondition | CompoundCondition

// ─── Options (for select / radio / checkboxgroup) ────────────────────────────

export interface FieldOption {
  value: string | number | boolean
  label: string
  disabled?: boolean
  /** Optional helper text shown below the option */
  description?: string
}

/**
 * Drive a field's options from another field's value.
 * When the source field's value matches a key in `map`, those options are used.
 * Falls back to `default` (or an empty list) when no key matches.
 */
export interface OptionsFrom {
  /** Absolute field path from the form root, e.g. "address.country" */
  field: string
  /** Map of source-field value → options to show */
  map: Record<string, FieldOption[]>
  /** Options shown when no key in map matches (defaults to []) */
  default?: FieldOption[]
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Each rule can be a bare value (uses a default message) or
 * { value, message } for a custom error message.
 */
export type RuleValue<T> = T | { value: T; message: string }

export interface FieldValidation {
  /** Mark field as required. Pass a string to customise the error message. */
  required?: boolean | string
  min?: RuleValue<number>
  max?: RuleValue<number>
  minLength?: RuleValue<number>
  maxLength?: RuleValue<number>
  /** Regex pattern as a string, e.g. "^[a-z]+$" */
  pattern?: RuleValue<string>
  /**
   * Named custom validators. Values must be functions when passed via props;
   * string values are treated as the error message for an always-failing rule
   * (useful as a placeholder in static JSON).
   */
  validate?: RegisterOptions['validate']
}

// ─── Layout ───────────────────────────────────────────────────────────────────

/** How many grid columns this field should span (1–12) */
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
/** Friendly aliases for ColSpan within a 12-column grid */
export type FieldWidth = 'full' | 'half' | 'third' | 'quarter' | 'two-thirds' | 'three-quarters' | ColSpan

// ─── Base field ───────────────────────────────────────────────────────────────

export interface BaseField {
  /** Unique field name (used as the form value key, supports dot notation) */
  name: string
  type: FieldType
  /** Displayed label. Omit to hide the label. */
  label?: string
  /** Helper text shown below the field */
  description?: string
  placeholder?: string
  defaultValue?: unknown
  /** Shorthand for validation.required */
  required?: boolean | string
  disabled?: boolean
  readOnly?: boolean
  /** Completely exclude this field from rendering AND from the form values */
  hidden?: boolean
  /** Column span within the form's grid layout */
  width?: FieldWidth
  validation?: FieldValidation
  /**
   * Condition that must be true for the field to be visible.
   * When hidden by a condition the field is unmounted and its value is cleared.
   */
  dependsOn?: Condition
  /** Any extra props forwarded directly to the underlying Chakra component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
}

// ─── Specific field schemas ───────────────────────────────────────────────────

export interface TextFieldSchema extends BaseField {
  type: TextFieldType
  /** Left input group addon (text) */
  prefix?: string
  /** Right input group addon (text) */
  suffix?: string
}

export interface NumberFieldSchema extends BaseField {
  type: NumericFieldType
  min?: number
  max?: number
  step?: number
  /** Decimal precision */
  precision?: number
  /** Whether to clamp the value to min/max on blur */
  clampValueOnBlur?: boolean
}

export interface TextareaFieldSchema extends BaseField {
  type: 'textarea'
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  maxLength?: number
  /** Show character count */
  showCount?: boolean
}

export interface SelectFieldSchema extends BaseField {
  type: 'select'
  options?: FieldOption[]
  /** Drive options dynamically from another field's value */
  optionsFrom?: OptionsFrom
  /** Label for the blank/placeholder option (default "Select…") */
  placeholder?: string
}

export interface MultiSelectFieldSchema extends BaseField {
  type: 'multiselect'
  options?: FieldOption[]
  /** Drive options dynamically from another field's value */
  optionsFrom?: OptionsFrom
  min?: number
  max?: number
}

export interface RadioFieldSchema extends BaseField {
  type: 'radio'
  options?: FieldOption[]
  /** Drive options dynamically from another field's value */
  optionsFrom?: OptionsFrom
  /** Stack direction (default "column") */
  direction?: 'row' | 'column'
}

export interface CheckboxGroupFieldSchema extends BaseField {
  type: 'checkboxgroup'
  options?: FieldOption[]
  /** Drive options dynamically from another field's value */
  optionsFrom?: OptionsFrom
  direction?: 'row' | 'column'
}

export interface BooleanFieldSchema extends BaseField {
  type: ToggleFieldType
  /** Label shown next to the switch/checkbox (overrides `label` when provided) */
  checkboxLabel?: string
}

export interface DateFieldSchema extends BaseField {
  type: TemporalFieldType
  min?: string
  max?: string
}

export interface FileFieldSchema extends BaseField {
  type: 'file'
  /** MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string
  multiple?: boolean
  /** Max file size in bytes */
  maxSize?: number
}

export interface SliderFieldSchema extends BaseField {
  type: 'slider'
  min?: number
  max?: number
  step?: number
  /** Show value tooltip */
  showValue?: boolean
}

export interface ColorFieldSchema extends BaseField {
  type: 'color'
}

export interface HiddenFieldSchema extends BaseField {
  type: 'hidden'
  defaultValue: unknown
}

export interface ArrayFieldSchema extends BaseField {
  type: 'array'
  /**
   * Schema for each item. Use type "object" for multi-field rows,
   * or any scalar type for a list of single values.
   */
  itemSchema: FieldSchema
  minItems?: number
  maxItems?: number
  /** Label for the "Add" button */
  addLabel?: string
  /** Label for each "Remove" button */
  removeLabel?: string
}

export interface ObjectFieldSchema extends BaseField {
  type: 'object'
  fields: FieldSchema[]
  /** Allow the group to be collapsed */
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export interface CustomFieldSchema extends BaseField {
  type: 'custom'
  /**
   * Key used to look up the component in the registry passed to <FormBuilder>.
   * Falls back to field.name if omitted.
   */
  component?: string
}

/** Discriminated union of all concrete field types */
export type FieldSchema =
  | TextFieldSchema
  | NumberFieldSchema
  | TextareaFieldSchema
  | SelectFieldSchema
  | MultiSelectFieldSchema
  | RadioFieldSchema
  | CheckboxGroupFieldSchema
  | BooleanFieldSchema
  | DateFieldSchema
  | FileFieldSchema
  | SliderFieldSchema
  | ColorFieldSchema
  | HiddenFieldSchema
  | ArrayFieldSchema
  | ObjectFieldSchema
  | CustomFieldSchema

// ─── Section ──────────────────────────────────────────────────────────────────

export interface FormSection {
  /** Optional section heading */
  title?: string
  description?: string
  fields: FieldSchema[]
  /** Number of columns for fields inside this section (overrides form-level columns) */
  columns?: number
  collapsible?: boolean
  defaultCollapsed?: boolean
  dependsOn?: Condition
}

// ─── Form layout ──────────────────────────────────────────────────────────────

export interface FormLayout {
  /** Number of grid columns (default 1) */
  columns?: number
}

// ─── Root schema ──────────────────────────────────────────────────────────────

export interface FormSchema {
  title?: string
  description?: string
  layout?: FormLayout
  /**
   * Flat list of fields. Use `sections` for grouped layouts.
   * Exactly one of `fields` or `sections` should be provided.
   */
  fields?: FieldSchema[]
  /** Sectioned layout with optional titles */
  sections?: FormSection[]
  /** Submit button label (default "Submit") */
  submitLabel?: string
  /** Show a Reset button */
  showReset?: boolean
  resetLabel?: string
}
