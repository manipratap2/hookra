import type { FormSchema } from 'hookra'

export const onlyDirtySchema: FormSchema = {
  title: 'Only Dirty Fields',
  description: 'Pre-filled form — only fields you change will be included in the submitted data.',
  showReset: true,
  layout: { columns: 2 },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      defaultValue: 'Jane',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      defaultValue: 'Doe',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'jane@example.com',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      defaultValue: 'engineer',
      options: [
        { value: 'engineer', label: 'Engineer' },
        { value: 'designer', label: 'Designer' },
        { value: 'manager', label: 'Manager' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      defaultValue: 'A software engineer who loves building great products.',
      rows: 3,
      width: 'full',
    },
    {
      name: 'newsletter',
      type: 'boolean',
      label: 'Notifications',
      checkboxLabel: 'Receive email updates',
      defaultValue: true,
    },
    {
      name: 'experience',
      type: 'slider',
      label: 'Years of Experience',
      min: 0,
      max: 20,
      step: 1,
      showValue: true,
      defaultValue: 5,
    },
  ],
}
