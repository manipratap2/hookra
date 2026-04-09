import type { FormSchema } from 'formora'

export const customValidationSchema: FormSchema = {
  title: 'Custom Validation',
  description: 'Demonstrates custom validate functions for complex business rules that go beyond simple min/max/pattern.',
  showReset: true,
  layout: { columns: 2 },
  fields: [
    {
      name: 'evenNumber',
      type: 'number',
      label: 'Even Number Only',
      description: 'Custom validator rejects odd numbers',
      validation: {
        validate: {
          isEven: (v: number) => !v || v % 2 === 0 || 'Must be an even number',
        },
      },
    },
    {
      name: 'noSpaces',
      type: 'text',
      label: 'No Spaces Allowed',
      description: 'Custom validator rejects whitespace',
      validation: {
        validate: {
          noSpaces: (v: string) => !v || !/\s/.test(v) || 'Spaces are not allowed',
        },
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      required: true,
      description: 'Must be today or later',
      validation: {
        validate: {
          notPast: (v: string) => {
            if (!v) return true
            return v >= new Date().toISOString().split('T')[0] || 'Date cannot be in the past'
          },
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      description: 'Must be after start date (cross-field)',
    },
    {
      name: 'divisibleBy5',
      type: 'number',
      label: 'Divisible by 5',
      description: 'Custom validator ensures divisibility',
      validation: {
        validate: {
          divBy5: (v: number) => !v || v % 5 === 0 || 'Must be divisible by 5',
        },
      },
    },
    {
      name: 'forbiddenWords',
      type: 'text',
      label: 'No Forbidden Words',
      placeholder: 'Try typing "spam" or "test"',
      description: 'Rejects "spam" and "test"',
      validation: {
        validate: {
          noForbidden: (v: string) => {
            if (!v) return true
            const forbidden = ['spam', 'test']
            const lower = v.toLowerCase()
            const found = forbidden.find((w) => lower.includes(w))
            return !found || `The word "${found}" is not allowed`
          },
        },
      },
    },
    {
      name: 'multipleOf3',
      type: 'integer',
      label: 'Multiple of 3',
      description: 'Custom validator for multiples',
      validation: {
        validate: {
          multipleOf3: (v: number) => !v || v % 3 === 0 || 'Must be a multiple of 3',
        },
      },
    },
    {
      name: 'jsonInput',
      type: 'textarea',
      label: 'Valid JSON',
      placeholder: '{"key": "value"}',
      description: 'Custom validator checks JSON parsing',
      rows: 3,
      width: 'full',
      validation: {
        validate: {
          validJson: (v: string) => {
            if (!v) return true
            try {
              JSON.parse(v)
              return true
            } catch {
              return 'Must be valid JSON'
            }
          },
        },
      },
    },
  ],
}
