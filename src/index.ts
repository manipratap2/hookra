// ─── Main component ───────────────────────────────────────────────────────────
export { FormBuilder } from './components/FormBuilder'
export type { FormBuilderProps, FormBuilderRef } from './components/FormBuilder'

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  // Field types
  FieldType,
  TextFieldType,
  NumericFieldType,
  ChoiceFieldType,
  ToggleFieldType,
  TemporalFieldType,
  SpecialFieldType,
  StructuralFieldType,

  // Field schemas
  FieldSchema,
  BaseField,
  TextFieldSchema,
  NumberFieldSchema,
  TextareaFieldSchema,
  SelectFieldSchema,
  MultiSelectFieldSchema,
  RadioFieldSchema,
  CheckboxGroupFieldSchema,
  BooleanFieldSchema,
  DateFieldSchema,
  FileFieldSchema,
  SliderFieldSchema,
  ColorFieldSchema,
  HiddenFieldSchema,
  ArrayFieldSchema,
  ObjectFieldSchema,
  CustomFieldSchema,

  // Form schema
  FormSchema,
  FormSection,
  FormLayout,

  // Options
  FieldOption,
  OptionsFrom,

  // Conditions
  Condition,
  SimpleCondition,
  CompoundCondition,
  ConditionOperator,

  // Validation
  FieldValidation,
  RuleValue,

  // Layout
  FieldWidth,
  ColSpan,
} from './types/schema'

// ─── Registry ─────────────────────────────────────────────────────────────────
export { createRegistry } from './registry/createRegistry'
export type { FieldRegistry, FieldComponentProps } from './registry/createRegistry'
export { defaultRegistry } from './registry/defaultRegistry'

// ─── Logic utilities (tree-shakable) ─────────────────────────────────────────
export { evaluateCondition } from './logic/evaluateCondition'
export { evaluateOperator } from './logic/evaluateOperator'
export { buildDefaultValues } from './logic/buildDefaultValues'
export { buildValidationRules } from './logic/buildValidationRules'
export { useResolvedOptions } from './logic/useResolvedOptions'

// ─── Context ──────────────────────────────────────────────────────────────────
export { useFormBuilderContext } from './context/FormBuilderContext'

// ─── Individual field components (for custom compositions) ────────────────────
export { TextField } from './components/fields/TextField'
export { NumberField } from './components/fields/NumberField'
export { TextareaField } from './components/fields/TextareaField'
export { SelectField } from './components/fields/SelectField'
export { MultiSelectField } from './components/fields/MultiSelectField'
export { RadioField } from './components/fields/RadioField'
export { CheckboxGroupField } from './components/fields/CheckboxGroupField'
export { BooleanField } from './components/fields/BooleanField'
export { DateField } from './components/fields/DateField'
export { FileField } from './components/fields/FileField'
export { SliderField } from './components/fields/SliderField'
export { ColorField } from './components/fields/ColorField'
export { HiddenField } from './components/fields/HiddenField'
export { ArrayField } from './components/fields/ArrayField'
export { ObjectField } from './components/fields/ObjectField'
export { CustomField } from './components/fields/CustomField'
export { FieldRenderer } from './components/FieldRenderer'
export { FieldWrapper } from './components/FieldWrapper'
