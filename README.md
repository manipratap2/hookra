# Hookra

> JSON-driven form builder on top of **React Hook Form** + **Chakra UI**.  
> Better DX than RJSF. Type-safe. Tree-shakable. Zero config.

```bash
npm install hookra
```

## Quick start

```tsx
import { FormBuilder } from 'hookra'
import type { FormSchema } from 'hookra'

const schema: FormSchema = {
  title: 'Contact Us',
  fields: [
    { name: 'name',  type: 'text',  label: 'Name',  required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'message', type: 'textarea', label: 'Message', rows: 4 },
  ],
}

export function ContactForm() {
  return (
    <FormBuilder
      schema={schema}
      onSubmit={(data) => console.log(data)}
    />
  )
}
```

## Field types

| type | Description |
|------|-------------|
| `text` `email` `password` `url` `tel` `search` | Text input variants |
| `number` `integer` | Numeric input with stepper |
| `textarea` | Multi-line text (optional char count) |
| `boolean` `switch` | Toggle switch |
| `checkbox` | Single checkbox |
| `select` | Native dropdown |
| `multiselect` | Multi-select via checkboxes |
| `radio` | Radio button group |
| `checkboxgroup` | Checkbox group (multi-value) |
| `date` `time` `datetime` | Date/time pickers |
| `file` | File upload (accept, maxSize) |
| `color` | Color picker |
| `slider` | Range slider |
| `hidden` | Hidden field (value included in submit) |
| `array` | Dynamic list — add/remove rows |
| `object` | Nested group of fields |
| `custom` | Your own component via registry |

## Schema reference

### `FormSchema`

```ts
{
  title?: string
  description?: string
  layout?: { columns?: number }   // grid columns (default 1)
  fields?: FieldSchema[]          // flat list
  sections?: FormSection[]        // grouped with titles
  submitLabel?: string
  showReset?: boolean
  resetLabel?: string
}
```

### Common field properties

```ts
{
  name: string          // required — used as form value key
  type: FieldType       // required
  label?: string
  description?: string  // helper text
  placeholder?: string
  defaultValue?: unknown
  required?: boolean | string   // true or custom error message
  disabled?: boolean
  readOnly?: boolean
  hidden?: boolean      // excludes from render AND form values
  width?: 'full' | 'half' | 'third' | 'quarter' | 'two-thirds' | 'three-quarters' | 1–12
  validation?: FieldValidation
  dependsOn?: Condition // conditional visibility
  props?: Record<string, any>   // forwarded to Chakra component
}
```

### Validation

```ts
validation: {
  required?: boolean | string
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: string | { value: string; message: string }  // regex
  validate?: Record<string, (value) => boolean | string>
}
```

### Conditions (`dependsOn`)

**Simple** — show when `country` equals `"us"`:
```json
{ "field": "country", "value": "us" }
```

**With operator**:
```json
{ "field": "age", "operator": "gte", "value": 18 }
```

**Compound** — AND:
```json
{ "all": [
  { "field": "country", "value": "us" },
  { "field": "role", "operator": "ne", "value": "guest" }
]}
```

**Compound** — OR:
```json
{ "any": [
  { "field": "plan", "value": "pro" },
  { "field": "plan", "value": "enterprise" }
]}
```

**Negation**:
```json
{ "not": { "field": "subscribed", "operator": "truthy" } }
```

#### All operators

| Operator | Meaning |
|----------|---------|
| `eq` | `==` (default) |
| `ne` | `!=` |
| `gt` `gte` `lt` `lte` | Numeric comparisons |
| `in` | Value is in array |
| `nin` | Value is NOT in array |
| `contains` | String contains |
| `startsWith` `endsWith` | String start/end |
| `matches` | Regex test |
| `empty` `notEmpty` | null/undefined/''/"" |
| `truthy` `falsy` | Boolean coercion |

### Array fields

```ts
{
  name: 'phoneNumbers',
  type: 'array',
  label: 'Phone Numbers',
  minItems: 1,
  maxItems: 5,
  addLabel: 'Add phone',
  itemSchema: {
    type: 'object',
    name: 'phone',
    fields: [
      { name: 'type',   type: 'select', label: 'Type', options: [...] },
      { name: 'number', type: 'tel',    label: 'Number' },
    ],
  },
}
```

### Object (nested) fields

```ts
{
  name: 'address',
  type: 'object',
  label: 'Address',
  collapsible: true,
  fields: [
    { name: 'street', type: 'text', label: 'Street', width: 'full' },
    { name: 'city',   type: 'text', label: 'City' },
    { name: 'zip',    type: 'text', label: 'Zip' },
  ],
}
```

### Sections

```ts
sections: [
  {
    title: 'Personal Info',
    description: 'Your basic details',
    columns: 2,
    collapsible: true,
    dependsOn: { field: 'type', value: 'individual' },
    fields: [...],
  },
]
```

### Multi-column layout

Set `layout.columns` on the form, then override per-field with `width`:

```ts
{
  layout: { columns: 3 },
  fields: [
    { name: 'a', type: 'text', label: 'A' },          // 1 col
    { name: 'b', type: 'text', label: 'B', width: 'full' },   // all 3 cols
    { name: 'c', type: 'text', label: 'C', width: 'two-thirds' }, // 2 cols
  ],
}
```

## `<FormBuilder>` props

```ts
<FormBuilder
  schema={schema}                 // required
  onSubmit={(data) => {}}         // required
  onCancel={() => {}}             // optional
  defaultValues={{ name: 'Joe' }} // override schema defaults
  registry={{ myField: MyComp }}  // custom field components
  readOnly={false}
  loading={false}
  mode="onBlur"                   // RHF validation mode
  submitButton={<Button>Save</Button>}  // custom submit
  cancelButton={null}             // hide cancel
/>
```

## Accessing RHF methods (ref)

```tsx
import { useRef } from 'react'
import { FormBuilder, type FormBuilderRef } from 'hookra'

const ref = useRef<FormBuilderRef>(null)

<FormBuilder ref={ref} schema={schema} onSubmit={handleSubmit} />

// Programmatic submit / reset
ref.current?.submit()
ref.current?.reset()
ref.current?.form.setValue('email', 'new@example.com')
ref.current?.form.watch('country')
```

## Custom field components

```tsx
import { FormBuilder, createRegistry, defaultRegistry } from 'hookra'

function StarRating({ field, name }) {
  const { control } = useFormContext()
  // ... your implementation
}

<FormBuilder
  schema={schema}
  registry={{ starRating: StarRating }}
  onSubmit={handleSubmit}
/>
```

In the schema:
```ts
{ name: 'rating', type: 'custom', component: 'starRating', label: 'Rating' }
```

## Tree-shaking

The package is marked `"sideEffects": false`. If you only use a subset of field types the unused field modules are eliminated by your bundler automatically.

You can also use individual field components directly:

```tsx
import { TextField, SelectField } from 'hookra'
```

## Peer dependencies

```
react >= 18
react-dom >= 18
```

Everything else (`react-hook-form`, `@chakra-ui/react`, `@emotion/react`) is installed automatically.

## Dev / Demo

```bash
npm install
npm run dev        # Vite dev server with full demo on http://localhost:5173
npm run build      # Build library → dist/
npm run typecheck  # TypeScript check with no emit
```

## License

MIT
