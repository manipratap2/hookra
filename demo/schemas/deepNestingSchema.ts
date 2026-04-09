import type { FormSchema } from 'hookra'

export const deepNestingSchema: FormSchema = {
  title: 'Deep Nesting',
  description: 'Demonstrates deeply nested structures: arrays inside objects, objects inside arrays, and multi-level nesting.',
  showReset: true,
  sections: [
    {
      title: 'Company Information',
      columns: 2,
      fields: [
        { name: 'companyName', type: 'text', label: 'Company Name', required: true },
        { name: 'industry', type: 'select', label: 'Industry', options: [
          { value: 'tech', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'education', label: 'Education' },
          { value: 'retail', label: 'Retail' },
        ]},
      ],
    },
    {
      title: 'Departments (Array of Objects with Nested Arrays)',
      description: 'Each department has team members — demonstrating arrays inside objects inside arrays.',
      fields: [
        {
          name: 'departments',
          type: 'array',
          label: 'Departments',
          addLabel: 'Add department',
          minItems: 1,
          maxItems: 5,
          itemSchema: {
            type: 'object',
            name: 'department',
            fields: [
              { name: 'name', type: 'text', label: 'Department Name', required: true },
              { name: 'budget', type: 'number', label: 'Annual Budget ($)', min: 0, step: 1000 },
              {
                name: 'head',
                type: 'object',
                label: 'Department Head',
                collapsible: true,
                width: 'full',
                fields: [
                  { name: 'name', type: 'text', label: 'Name', required: true },
                  { name: 'email', type: 'email', label: 'Email', required: true },
                  { name: 'phone', type: 'tel', label: 'Phone' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Headquarters (Nested Object)',
      fields: [
        {
          name: 'headquarters',
          type: 'object',
          label: 'Headquarters',
          collapsible: true,
          fields: [
            {
              name: 'location',
              type: 'object',
              label: 'Location',
              fields: [
                { name: 'street', type: 'text', label: 'Street' },
                { name: 'city', type: 'text', label: 'City', required: true },
                { name: 'country', type: 'text', label: 'Country', required: true },
              ],
            },
            {
              name: 'contact',
              type: 'object',
              label: 'Contact Info',
              fields: [
                { name: 'phone', type: 'tel', label: 'Phone' },
                { name: 'fax', type: 'tel', label: 'Fax' },
                { name: 'email', type: 'email', label: 'General Email' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
