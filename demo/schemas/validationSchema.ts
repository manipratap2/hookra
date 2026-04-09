import type { FormSchema } from 'hookra'

export const validationSchema: FormSchema = {
  title: 'Validation Rules',
  description: 'Demonstrates all built-in validation rules: required, min, max, minLength, maxLength, and pattern.',
  showReset: true,
  sections: [
    {
      title: 'Required Fields',
      columns: 2,
      fields: [
        {
          name: 'requiredText',
          type: 'text',
          label: 'Required Text',
          required: true,
          description: 'Uses boolean required: true',
        },
        {
          name: 'requiredCustomMsg',
          type: 'text',
          label: 'Required (Custom Message)',
          required: 'This field cannot be left empty!',
          description: 'Uses string required for custom message',
        },
        {
          name: 'requiredSelect',
          type: 'select',
          label: 'Required Select',
          required: 'Please select an option',
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ],
        },
        {
          name: 'requiredCheckbox',
          type: 'checkbox',
          label: 'Required Agreement',
          checkboxLabel: 'I agree to the terms',
          required: 'You must agree to continue',
        },
      ],
    },
    {
      title: 'String Length Validation',
      columns: 2,
      fields: [
        {
          name: 'minLengthField',
          type: 'text',
          label: 'Min Length (3)',
          validation: {
            minLength: { value: 3, message: 'Must be at least 3 characters' },
          },
          description: 'minLength: 3',
        },
        {
          name: 'maxLengthField',
          type: 'text',
          label: 'Max Length (10)',
          validation: {
            maxLength: { value: 10, message: 'Cannot exceed 10 characters' },
          },
          description: 'maxLength: 10',
        },
        {
          name: 'rangeLengthField',
          type: 'text',
          label: 'Length 5-20',
          validation: {
            minLength: { value: 5, message: 'At least 5 characters' },
            maxLength: { value: 20, message: 'At most 20 characters' },
          },
          description: 'minLength: 5, maxLength: 20',
        },
        {
          name: 'textareaCount',
          type: 'textarea',
          label: 'Textarea with Count',
          maxLength: 100,
          showCount: true,
          rows: 2,
          description: 'Visual character counter',
        },
      ],
    },
    {
      title: 'Numeric Validation',
      columns: 2,
      fields: [
        {
          name: 'minValue',
          type: 'number',
          label: 'Min Value (0)',
          validation: {
            min: { value: 0, message: 'Must be zero or positive' },
          },
          description: 'min: 0',
        },
        {
          name: 'maxValue',
          type: 'number',
          label: 'Max Value (100)',
          validation: {
            max: { value: 100, message: 'Cannot exceed 100' },
          },
          description: 'max: 100',
        },
        {
          name: 'rangeValue',
          type: 'number',
          label: 'Range (1-10)',
          validation: {
            min: { value: 1, message: 'At least 1' },
            max: { value: 10, message: 'At most 10' },
          },
          description: 'min: 1, max: 10',
        },
        {
          name: 'ageValidation',
          type: 'integer',
          label: 'Age (13-120)',
          required: true,
          validation: {
            min: { value: 13, message: 'Must be at least 13 years old' },
            max: { value: 120, message: 'Please enter a realistic age' },
          },
        },
      ],
    },
    {
      title: 'Pattern (Regex) Validation',
      columns: 2,
      fields: [
        {
          name: 'alphaOnly',
          type: 'text',
          label: 'Letters Only',
          validation: {
            pattern: { value: '^[a-zA-Z]+$', message: 'Only letters allowed (a-z, A-Z)' },
          },
          description: 'Pattern: ^[a-zA-Z]+$',
        },
        {
          name: 'zipCode',
          type: 'text',
          label: 'US ZIP Code',
          placeholder: '12345',
          validation: {
            pattern: { value: '^\\d{5}(-\\d{4})?$', message: 'Enter a valid ZIP (12345 or 12345-6789)' },
          },
          description: 'Pattern: ^\\d{5}(-\\d{4})?$',
        },
        {
          name: 'strongPassword',
          type: 'password',
          label: 'Strong Password',
          validation: {
            minLength: { value: 8, message: 'At least 8 characters' },
            pattern: {
              value: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])',
              message: 'Must include uppercase, lowercase, number, and special character',
            },
          },
          description: 'Min 8 chars + uppercase + lowercase + number + special',
        },
        {
          name: 'slug',
          type: 'text',
          label: 'URL Slug',
          placeholder: 'my-page-slug',
          validation: {
            pattern: { value: '^[a-z0-9]+(-[a-z0-9]+)*$', message: 'Only lowercase letters, numbers, and hyphens' },
          },
          description: 'Pattern: lowercase-with-hyphens',
        },
      ],
    },
    {
      title: 'Combined Validation',
      columns: 2,
      fields: [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          required: 'Username is required',
          validation: {
            minLength: { value: 3, message: 'At least 3 characters' },
            maxLength: { value: 20, message: 'At most 20 characters' },
            pattern: { value: '^[a-zA-Z0-9_]+$', message: 'Only letters, numbers, and underscores' },
          },
          description: 'Required + length 3-20 + alphanumeric',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: 'Email is required',
          description: 'Browser email validation + required',
        },
      ],
    },
  ],
}
