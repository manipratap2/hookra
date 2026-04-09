import type { FormSchema } from 'hookra'

export const sectionsSchema: FormSchema = {
  title: 'Sections & Groups',
  description: 'Forms organized into sections with collapsible groups, descriptions, and per-section column overrides.',
  showReset: true,
  sections: [
    {
      title: 'Personal Information',
      description: 'Basic contact details. This section is always visible.',
      columns: 2,
      fields: [
        { name: 'fullName', type: 'text', label: 'Full Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'phone', type: 'tel', label: 'Phone' },
        { name: 'birthday', type: 'date', label: 'Birthday' },
      ],
    },
    {
      title: 'Address (Collapsible)',
      description: 'Click the section header to expand/collapse.',
      collapsible: true,
      defaultCollapsed: false,
      columns: 2,
      fields: [
        { name: 'street', type: 'text', label: 'Street', width: 'full' },
        { name: 'city', type: 'text', label: 'City' },
        { name: 'state', type: 'text', label: 'State' },
        { name: 'zip', type: 'text', label: 'ZIP Code' },
        {
          name: 'country',
          type: 'select',
          label: 'Country',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
          ],
        },
      ],
    },
    {
      title: 'Work Details (Collapsed by Default)',
      collapsible: true,
      defaultCollapsed: true,
      columns: 2,
      fields: [
        { name: 'company', type: 'text', label: 'Company' },
        { name: 'jobTitle', type: 'text', label: 'Job Title' },
        {
          name: 'department',
          type: 'select',
          label: 'Department',
          options: [
            { value: 'engineering', label: 'Engineering' },
            { value: 'design', label: 'Design' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'sales', label: 'Sales' },
            { value: 'hr', label: 'Human Resources' },
          ],
        },
        { name: 'yearsExperience', type: 'integer', label: 'Years of Experience', min: 0, max: 50 },
      ],
    },
    {
      title: 'Preferences (Single Column)',
      description: 'This section uses a single column layout.',
      fields: [
        {
          name: 'theme',
          type: 'radio',
          label: 'Preferred Theme',
          direction: 'row',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ],
        },
        {
          name: 'notifications',
          type: 'checkboxgroup',
          label: 'Notification Channels',
          direction: 'row',
          options: [
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
            { value: 'push', label: 'Push' },
            { value: 'slack', label: 'Slack' },
          ],
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Additional Notes',
          rows: 3,
          placeholder: 'Anything else...',
        },
      ],
    },
  ],
}
