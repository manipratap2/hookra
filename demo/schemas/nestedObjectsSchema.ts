import type { FormSchema } from 'hookra'

export const nestedObjectsSchema: FormSchema = {
  title: 'Nested Objects',
  description: 'Fields grouped into nested object structures with collapsible containers.',
  showReset: true,
  sections: [
    {
      title: 'User Profile',
      columns: 2,
      fields: [
        { name: 'username', type: 'text', label: 'Username', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        {
          name: 'personalInfo',
          type: 'object',
          label: 'Personal Information',
          collapsible: true,
          width: 'full',
          fields: [
            { name: 'firstName', type: 'text', label: 'First Name', required: true },
            { name: 'lastName', type: 'text', label: 'Last Name', required: true },
            { name: 'dateOfBirth', type: 'date', label: 'Date of Birth' },
            { name: 'gender', type: 'radio', label: 'Gender', direction: 'row', options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer-not', label: 'Prefer not to say' },
            ]},
          ],
        },
        {
          name: 'address',
          type: 'object',
          label: 'Home Address',
          collapsible: true,
          width: 'full',
          fields: [
            { name: 'street', type: 'text', label: 'Street Address', width: 'full' },
            { name: 'city', type: 'text', label: 'City' },
            { name: 'state', type: 'text', label: 'State / Province' },
            { name: 'zip', type: 'text', label: 'ZIP / Postal Code' },
            {
              name: 'country',
              type: 'select',
              label: 'Country',
              options: [
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
                { value: 'de', label: 'Germany' },
              ],
            },
          ],
        },
        {
          name: 'workInfo',
          type: 'object',
          label: 'Work Information',
          collapsible: true,
          defaultCollapsed: true,
          width: 'full',
          fields: [
            { name: 'company', type: 'text', label: 'Company Name' },
            { name: 'title', type: 'text', label: 'Job Title' },
            {
              name: 'department',
              type: 'select',
              label: 'Department',
              options: [
                { value: 'engineering', label: 'Engineering' },
                { value: 'design', label: 'Design' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'sales', label: 'Sales' },
                { value: 'operations', label: 'Operations' },
              ],
            },
            { name: 'startDate', type: 'date', label: 'Start Date' },
          ],
        },
        {
          name: 'socialLinks',
          type: 'object',
          label: 'Social Links',
          collapsible: true,
          defaultCollapsed: true,
          width: 'full',
          fields: [
            { name: 'twitter', type: 'url', label: 'Twitter / X', placeholder: 'https://x.com/...', prefix: 'X' },
            { name: 'linkedin', type: 'url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
            { name: 'github', type: 'url', label: 'GitHub', placeholder: 'https://github.com/...' },
            { name: 'website', type: 'url', label: 'Personal Website', placeholder: 'https://...' },
          ],
        },
      ],
    },
  ],
}
