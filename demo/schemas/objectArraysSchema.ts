import type { FormSchema } from 'hookra'

export const objectArraysSchema: FormSchema = {
  title: 'Object Arrays (Add Rows)',
  description: 'Dynamic arrays where each item is a multi-field object — the most common pattern for editable tables. Supports both vertical (card) and horizontal (table) layouts.',
  showReset: true,
  sections: [
    {
      title: 'Team Members — Vertical (Card) Layout',
      description: 'Each row is rendered as a stacked card. Best for rows with many fields or longer labels.',
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
              {
                name: 'active',
                type: 'checkbox',
                label: 'Active',
                checkboxLabel: 'Currently active',
                defaultValue: true,
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Line Items — Horizontal (Table) Layout',
      description: 'Set layout: "horizontal" to render rows as a table. Ideal for compact, spreadsheet-like data entry.',
      fields: [
        {
          name: 'lineItems',
          type: 'array',
          label: 'Invoice Items',
          addLabel: 'Add line item',
          layout: 'horizontal',
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
      title: 'Quick Contacts — Horizontal (Table) Layout',
      description: 'Another horizontal example: a compact address book where each contact is a table row.',
      fields: [
        {
          name: 'contacts',
          type: 'array',
          label: 'Contacts',
          addLabel: 'Add contact',
          layout: 'horizontal',
          maxItems: 10,
          itemSchema: {
            type: 'object',
            name: 'contact',
            fields: [
              { name: 'firstName', type: 'text', label: 'First Name', required: true },
              { name: 'lastName', type: 'text', label: 'Last Name', required: true },
              { name: 'email', type: 'email', label: 'Email' },
              { name: 'phone', type: 'tel', label: 'Phone' },
              {
                name: 'type',
                type: 'select',
                label: 'Type',
                defaultValue: 'personal',
                options: [
                  { value: 'personal', label: 'Personal' },
                  { value: 'work', label: 'Work' },
                  { value: 'other', label: 'Other' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Education History — Vertical (Card) Layout',
      description: 'Add educational qualifications. Cards work well when rows have mixed field types.',
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
              { name: 'year', type: 'integer', label: 'Year', min: 1950, max: 2030 },
              {
                name: 'graduated',
                type: 'checkbox',
                label: 'Status',
                checkboxLabel: 'Graduated / Completed',
                defaultValue: true,
              },
            ],
          },
        },
      ],
    },
  ],
}
