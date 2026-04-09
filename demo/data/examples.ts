import type { FormSchema } from 'hookra'

// ─── Schema imports ──────────────────────────────────────────────────────────
import { simpleSchema } from '../schemas/simpleSchema'
import { singleFieldSchema } from '../schemas/singleFieldSchema'
import { defaultsSchema } from '../schemas/defaultsSchema'
import { nullableSchema } from '../schemas/nullableSchema'
import { readOnlySchema } from '../schemas/readOnlySchema'
import { numbersSchema } from '../schemas/numbersSchema'
import { widgetsSchema } from '../schemas/widgetsSchema'
import { dateTimeSchema } from '../schemas/dateTimeSchema'
import { fileUploadSchema } from '../schemas/fileUploadSchema'
import { enumObjectsSchema } from '../schemas/enumObjectsSchema'
import { allFieldsSchema } from '../schemas/allFieldsSchema'
import { multiColumnSchema } from '../schemas/multiColumnSchema'
import { sectionsSchema } from '../schemas/sectionsSchema'
import { validationSchema } from '../schemas/validationSchema'
import { customValidationSchema } from '../schemas/customValidationSchema'
import { errorMessagesSchema } from '../schemas/errorMessagesSchema'
import { dependenciesSchema } from '../schemas/dependenciesSchema'
import { compoundConditionsSchema } from '../schemas/compoundConditionsSchema'
import { simpleArraysSchema } from '../schemas/simpleArraysSchema'
import { objectArraysSchema } from '../schemas/objectArraysSchema'
import { nestedObjectsSchema } from '../schemas/nestedObjectsSchema'
import { deepNestingSchema } from '../schemas/deepNestingSchema'
import { registrationSchema } from '../schemas/registrationSchema'
import { complexSchema } from '../schemas/complexSchema'
import { surveySchema } from '../schemas/surveySchema'
import { settingsSchema } from '../schemas/settingsSchema'
import { contactSchema } from '../schemas/contactSchema'
import { largeFormSchema } from '../schemas/largeFormSchema'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExampleDef {
  id: string
  title: string
  category: string
  description: string
  features: string[]
  schema: FormSchema
  /** If true, the FormBuilder is rendered with readOnly prop */
  readOnly?: boolean
}

export interface ExampleCategory {
  id: string
  title: string
  examples: ExampleDef[]
}

// ─── Examples ────────────────────────────────────────────────────────────────

export const allExamples: ExampleDef[] = [
  // ── Basics ─────────────────────────────────────────────────────────────────
  {
    id: 'simple',
    title: 'Simple',
    category: 'Basics',
    description: 'A basic form with a few common field types — the "hello world" of form building.',
    features: ['Text fields', 'Email', 'Number', 'Textarea', 'Checkbox'],
    schema: simpleSchema,
  },
  {
    id: 'single',
    title: 'Single Field',
    category: 'Basics',
    description: 'The simplest possible form — just one field.',
    features: ['Minimal schema', 'Single input'],
    schema: singleFieldSchema,
  },
  {
    id: 'defaults',
    title: 'Default Values',
    category: 'Basics',
    description: 'Every field type pre-populated with default values. Click Reset to restore them.',
    features: ['defaultValue', 'Reset button', 'Pre-filled form'],
    schema: defaultsSchema,
  },
  {
    id: 'nullable',
    title: 'Optional / Nullable',
    category: 'Basics',
    description: 'Demonstrates required vs. optional fields. Only a few fields are required — the rest can be left empty.',
    features: ['Required fields', 'Optional fields', 'Empty submit'],
    schema: nullableSchema,
  },
  {
    id: 'read-only',
    title: 'Read-Only & Disabled',
    category: 'Basics',
    description: 'Fields in readOnly and disabled states — useful for view-only profiles, locked fields, etc.',
    features: ['readOnly', 'disabled', 'Mixed states'],
    schema: readOnlySchema,
  },

  // ── Field Types ────────────────────────────────────────────────────────────
  {
    id: 'numbers',
    title: 'Numbers & Ranges',
    category: 'Field Types',
    description: 'All numeric field types: number, integer, slider with min/max/step/precision.',
    features: ['number', 'integer', 'slider', 'min/max', 'step', 'precision', 'clampValueOnBlur'],
    schema: numbersSchema,
  },
  {
    id: 'widgets',
    title: 'Widget Variants',
    category: 'Field Types',
    description: 'Same data, different widgets — compare select vs radio, checkbox vs switch, number vs slider.',
    features: ['select', 'radio', 'checkbox', 'switch', 'multiselect', 'slider', 'text variants'],
    schema: widgetsSchema,
  },
  {
    id: 'date-time',
    title: 'Date & Time',
    category: 'Field Types',
    description: 'Date, time, and datetime fields with min/max constraints and default values.',
    features: ['date', 'time', 'datetime', 'min/max date', 'default values'],
    schema: dateTimeSchema,
  },
  {
    id: 'files',
    title: 'File Upload',
    category: 'Field Types',
    description: 'File upload fields with accept types, multiple files, and size limits.',
    features: ['accept', 'multiple', 'maxSize', 'required'],
    schema: fileUploadSchema,
  },
  {
    id: 'enums',
    title: 'Enums & Options',
    category: 'Field Types',
    description: 'All option-based patterns: disabled options, numeric/boolean values, large option sets.',
    features: ['Disabled options', 'Numeric values', 'Boolean values', 'Many options'],
    schema: enumObjectsSchema,
  },
  {
    id: 'all-fields',
    title: 'All Field Types',
    category: 'Field Types',
    description: 'Comprehensive showcase of every field type the library supports, organized by category.',
    features: ['17+ field types', 'Text variants', 'Numeric', 'Choice', 'Toggle', 'Date/Time', 'File', 'Color', 'Slider'],
    schema: allFieldsSchema,
  },

  // ── Layout ─────────────────────────────────────────────────────────────────
  {
    id: 'multi-column',
    title: 'Multi-Column Grid',
    category: 'Layout',
    description: 'Grid-based responsive layouts with 2, 3, 4 columns and mixed column widths (half, third, quarter, etc.).',
    features: ['columns', 'width aliases', 'Numeric spans (1-12)', 'Mixed widths'],
    schema: multiColumnSchema,
  },
  {
    id: 'sections',
    title: 'Sections & Groups',
    category: 'Layout',
    description: 'Organized into sections with titles, descriptions, collapsible groups, and per-section column overrides.',
    features: ['Sections', 'Collapsible', 'defaultCollapsed', 'Section descriptions', 'Column overrides'],
    schema: sectionsSchema,
  },

  // ── Validation ─────────────────────────────────────────────────────────────
  {
    id: 'validation',
    title: 'Validation Rules',
    category: 'Validation',
    description: 'All built-in validation: required, min/max, minLength/maxLength, and regex patterns.',
    features: ['required', 'min', 'max', 'minLength', 'maxLength', 'pattern', 'Combined rules'],
    schema: validationSchema,
  },
  {
    id: 'custom-validation',
    title: 'Custom Validation',
    category: 'Validation',
    description: 'Custom validate functions for complex business rules: even numbers, JSON parsing, forbidden words.',
    features: ['validate functions', 'Custom rules', 'Cross-field (concept)'],
    schema: customValidationSchema,
  },
  {
    id: 'error-messages',
    title: 'Error Messages',
    category: 'Validation',
    description: 'Every rule with a custom error message. Submit the empty form to see all messages at once.',
    features: ['Custom messages', 'Required messages', 'Pattern messages', 'Range messages'],
    schema: errorMessagesSchema,
  },

  // ── Conditional Logic ──────────────────────────────────────────────────────
  {
    id: 'dependencies',
    title: 'Property Dependencies',
    category: 'Conditional',
    description: 'Fields that appear/hide based on the value of other fields — simple dependsOn with equality checks.',
    features: ['dependsOn', 'Radio switching', 'Boolean toggle', 'Cascading', 'Country/state'],
    schema: dependenciesSchema,
  },
  {
    id: 'compound-conditions',
    title: 'Compound Conditions',
    category: 'Conditional',
    description: 'Advanced conditional logic: AND (all), OR (any), NOT (not), comparison operators (gte, contains, in, empty).',
    features: ['all (AND)', 'any (OR)', 'not (NOT)', 'gte', 'contains', 'endsWith', 'in/nin', 'empty/notEmpty', 'Conditional sections'],
    schema: compoundConditionsSchema,
  },

  // ── Dynamic Data ───────────────────────────────────────────────────────────
  {
    id: 'simple-arrays',
    title: 'Simple Arrays',
    category: 'Dynamic Data',
    description: 'Dynamic lists of scalar values (strings, numbers, emails, dates) with add/remove.',
    features: ['array field', 'Scalar items', 'minItems', 'maxItems', 'Add/Remove'],
    schema: simpleArraysSchema,
  },
  {
    id: 'object-arrays',
    title: 'Object Arrays (Add Rows)',
    category: 'Dynamic Data',
    description: 'Dynamic arrays where each item is a multi-field object — like editable table rows.',
    features: ['array of objects', 'Multi-field rows', 'Add/Remove rows', 'Nested validation'],
    schema: objectArraysSchema,
  },
  {
    id: 'nested-objects',
    title: 'Nested Objects',
    category: 'Dynamic Data',
    description: 'Fields grouped into collapsible nested object containers.',
    features: ['object field', 'Collapsible', 'defaultCollapsed', 'Multi-level'],
    schema: nestedObjectsSchema,
  },
  {
    id: 'deep-nesting',
    title: 'Deep Nesting',
    category: 'Dynamic Data',
    description: 'Complex structures: arrays inside objects, objects inside arrays, multi-level nesting.',
    features: ['Deep nesting', 'Arrays in objects', 'Objects in arrays', 'Nested objects'],
    schema: deepNestingSchema,
  },

  // ── Complete Examples ──────────────────────────────────────────────────────
  {
    id: 'registration',
    title: 'Registration Form',
    category: 'Complete Examples',
    description: 'A full registration form with conditional fields, radio groups, multi-column layout, and validation.',
    features: ['Conditional fields', 'Multi-column', 'Custom messages', 'Radio groups', 'Character count'],
    schema: registrationSchema,
  },
  {
    id: 'order-form',
    title: 'Order Form',
    category: 'Complete Examples',
    description: 'An order form with nested address, dynamic product rows, payment method switching, and compound conditions.',
    features: ['Nested objects', 'Dynamic arrays', 'Compound conditions', 'Collapsible', 'Payment switching'],
    schema: complexSchema,
  },
  {
    id: 'survey',
    title: 'Survey',
    category: 'Complete Examples',
    description: 'A customer satisfaction survey with sliders, radio groups, conditional follow-ups, and NPS scoring.',
    features: ['Sliders', 'Radio groups', 'Conditional sections', 'NPS', 'Character count'],
    schema: surveySchema,
  },
  {
    id: 'settings',
    title: 'Settings / Preferences',
    category: 'Complete Examples',
    description: 'An application settings page with toggles, selects, conditional options, and collapsible sections.',
    features: ['Toggles', 'Conditional fields', 'Collapsible', 'Time picker', 'Slider'],
    schema: settingsSchema,
  },
  {
    id: 'contact',
    title: 'Contact Form',
    category: 'Complete Examples',
    description: 'A contact form with subject selection, priority, file attachment, and conditional "Other" field.',
    features: ['Select', 'Radio', 'File upload', 'Conditional field', 'Character count'],
    schema: contactSchema,
  },
  {
    id: 'large-form',
    title: 'Large Form',
    category: 'Complete Examples',
    description: 'A complex employee onboarding form demonstrating how the library handles large, multi-section real-world forms.',
    features: ['Many sections', 'Collapsible', 'Conditional fields', 'Checkbox groups', 'Slider', 'All field types'],
    schema: largeFormSchema,
  },
]

// ─── Grouped by category ─────────────────────────────────────────────────────

const categoryOrder = [
  'Basics',
  'Field Types',
  'Layout',
  'Validation',
  'Conditional',
  'Dynamic Data',
  'Complete Examples',
]

export const exampleCategories: ExampleCategory[] = categoryOrder.map((cat) => ({
  id: cat.toLowerCase().replace(/\s+/g, '-'),
  title: cat,
  examples: allExamples.filter((e) => e.category === cat),
}))

export function getExampleById(id: string): ExampleDef | undefined {
  return allExamples.find((e) => e.id === id)
}
