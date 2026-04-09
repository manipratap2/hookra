import type { FormSchema } from 'formora'

export const objectArraysSchema: FormSchema = {
  title: 'Object Arrays (Add Rows)',
  description: 'Dynamic arrays where each item is a multi-field object — the most common pattern for editable tables.',
  showReset: true,
  sections: [
    {
      title: 'Team Members',
      description: 'Add and remove team members, each with name, role, and email.',
      fields: [
        {
          name: 'members',
          type: 'array',
          label: 'Team Members',
          addLabel: 'Add member',
          minItems: 1,
          maxItems: 8,
          itemSchema: {
            type: 'object',
            name: 'member',
            fields: [
              { name: 'name', type: 'text', label: 'Name', required: true },
              { name: 'email', type: 'email', label: 'Email', required: true },
              {
                name: 'role',
                type: 'select',
                label: 'Role',
                required: true,
                options: [
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'pm', label: 'Project Manager' },
                  { value: 'qa', label: 'QA Engineer' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Line Items (Invoice)',
      description: 'Add products with quantity and price per line.',
      fields: [
        {
          name: 'lineItems',
          type: 'array',
          label: 'Invoice Items',
          addLabel: 'Add line item',
          minItems: 1,
          maxItems: 20,
          itemSchema: {
            type: 'object',
            name: 'item',
            fields: [
              { name: 'description', type: 'text', label: 'Description', required: true },
              { name: 'quantity', type: 'integer', label: 'Qty', required: true, min: 1, max: 999, defaultValue: 1 },
              { name: 'unitPrice', type: 'number', label: 'Unit Price ($)', required: true, min: 0, step: 0.01, precision: 2 },
              {
                name: 'taxRate',
                type: 'select',
                label: 'Tax',
                defaultValue: 'standard',
                options: [
                  { value: 'none', label: 'No Tax' },
                  { value: 'reduced', label: 'Reduced (5%)' },
                  { value: 'standard', label: 'Standard (10%)' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Education History',
      description: 'Add educational qualifications.',
      fields: [
        {
          name: 'education',
          type: 'array',
          label: 'Education',
          addLabel: 'Add qualification',
          maxItems: 10,
          itemSchema: {
            type: 'object',
            name: 'qualification',
            fields: [
              { name: 'institution', type: 'text', label: 'Institution', required: true },
              {
                name: 'degree',
                type: 'select',
                label: 'Degree',
                required: true,
                options: [
                  { value: 'highschool', label: 'High School' },
                  { value: 'associate', label: 'Associate' },
                  { value: 'bachelor', label: 'Bachelor' },
                  { value: 'master', label: 'Master' },
                  { value: 'phd', label: 'PhD' },
                ],
              },
              { name: 'field', type: 'text', label: 'Field of Study' },
              { name: 'year', type: 'integer', label: 'Year', min: 1950, max: 2026 },
            ],
          },
        },
      ],
    },
  ],
}
