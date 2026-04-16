import type { FormSchema } from 'hookra'

export const allFieldsSchema: FormSchema = {
  title: 'All Field Types',
  description: 'Every field type the library supports.',
  showReset: true,
  sections: [
    {
      title: 'Text Fields',
      columns: 2,
      fields: [
        { name: 'textField', type: 'text', label: 'Text', placeholder: 'Plain text' },
        { name: 'emailField', type: 'email', label: 'Email', placeholder: 'you@example.com' },
        { name: 'passwordField', type: 'password', label: 'Password' },
        { name: 'urlField', type: 'url', label: 'URL', placeholder: 'https://', prefix: '🔗' },
        { name: 'telField', type: 'tel', label: 'Phone', placeholder: '+1 555 000 0000', prefix: '📞' },
        { name: 'searchField', type: 'search', label: 'Search', placeholder: 'Search…' },
        {
          name: 'textareaField',
          type: 'textarea',
          label: 'Textarea',
          rows: 3,
          maxLength: 200,
          showCount: true,
          width: 'full',
        },
        {
          name: 'editableField',
          type: 'editable',
          label: 'Editable (inline edit)',
          defaultValue: 'Click the pencil icon to edit',
          description: 'Click the edit button to modify inline',
          width: 'full',
        },
      ],
    },
    {
      title: 'Numeric',
      columns: 2,
      fields: [
        { name: 'numberField', type: 'number', label: 'Number', min: 0, max: 1000, step: 5 },
        { name: 'integerField', type: 'integer', label: 'Integer', min: 0, step: 1 },
        {
          name: 'sliderField',
          type: 'slider',
          label: 'Slider',
          min: 0,
          max: 100,
          step: 1,
          showValue: true,
          defaultValue: 42,
          width: 'full',
        },
        {
          name: 'ratingField',
          type: 'rating',
          label: 'Rating',
          count: 5,
          defaultValue: 3,
          description: 'Star rating (1–5)',
        },
      ],
    },
    {
      title: 'Choice Fields',
      columns: 2,
      fields: [
        {
          name: 'selectField',
          type: 'select',
          label: 'Select (native)',
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C', disabled: true },
          ],
        },
        {
          name: 'selectChakraField',
          type: 'select',
          label: 'Select (Chakra)',
          variant: 'chakra',
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ],
        },
        {
          name: 'radioField',
          type: 'radio',
          label: 'Radio',
          options: [
            { value: 'x', label: 'Choice X' },
            { value: 'y', label: 'Choice Y' },
            { value: 'z', label: 'Choice Z' },
          ],
        },
        {
          name: 'segmentedField',
          type: 'segmented',
          label: 'Segmented Control',
          options: [
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ],
        },
        {
          name: 'multiselectField',
          type: 'multiselect',
          label: 'Multiselect (checkboxes)',
          min: 1,
          max: 3,
          description: 'Pick between 1 and 3',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' },
          ],
          width: 'full',
        },
        {
          name: 'checkboxgroupField',
          type: 'checkboxgroup',
          label: 'Checkbox Group',
          direction: 'row',
          options: [
            { value: 'ts', label: 'TypeScript' },
            { value: 'go', label: 'Go' },
            { value: 'rust', label: 'Rust' },
          ],
          width: 'full',
        },
      ],
    },
    {
      title: 'Card Selectors',
      columns: 1,
      fields: [
        {
          name: 'radiocardField',
          type: 'radiocard',
          label: 'Radio Cards',
          options: [
            { value: 'starter', label: 'Starter', description: 'Up to 5 users, 10 GB storage' },
            { value: 'pro', label: 'Pro', description: 'Up to 50 users, 100 GB storage' },
            { value: 'enterprise', label: 'Enterprise', description: 'Unlimited users and storage' },
          ],
          width: 'full',
        },
        {
          name: 'checkboxcardField',
          type: 'checkboxcard',
          label: 'Checkbox Cards',
          options: [
            { value: 'analytics', label: 'Analytics', description: 'Track usage and performance' },
            { value: 'notifications', label: 'Notifications', description: 'Email and push alerts' },
            { value: 'integrations', label: 'Integrations', description: 'Connect third-party apps' },
          ],
          width: 'full',
        },
      ],
    },
    {
      title: 'Toggle Fields',
      columns: 2,
      fields: [
        { name: 'booleanField', type: 'boolean', label: 'Switch', checkboxLabel: 'Enable feature', defaultValue: true },
        { name: 'switchField', type: 'switch', label: 'Another Switch', checkboxLabel: 'Dark mode' },
        { name: 'checkboxField', type: 'checkbox', label: 'Checkbox', checkboxLabel: 'I agree' },
      ],
    },
    {
      title: 'Date & Time',
      columns: 3,
      fields: [
        { name: 'dateField', type: 'date', label: 'Date' },
        { name: 'timeField', type: 'time', label: 'Time' },
        { name: 'datetimeField', type: 'datetime', label: 'Date & Time' },
      ],
    },
    {
      title: 'Special Inputs',
      columns: 2,
      fields: [
        {
          name: 'pinField',
          type: 'pin',
          label: 'PIN / OTP',
          length: 6,
          description: 'Enter a 6-digit code',
        },
        {
          name: 'tagsField',
          type: 'tags',
          label: 'Tags',
          placeholder: 'Add a tag…',
          max: 5,
          description: 'Press Enter to add a tag (max 5)',
        },
        { name: 'colorField', type: 'color', label: 'Colour Picker (native)', defaultValue: '#4299e1' },
        {
          name: 'colorChakraField',
          type: 'color',
          label: 'Colour Picker (Chakra)',
          variant: 'chakra',
          defaultValue: '#4299e1',
        },
      ],
    },
    {
      title: 'File Upload',
      columns: 1,
      fields: [
        {
          name: 'fileField',
          type: 'file',
          label: 'File Upload',
          accept: 'image/*',
          description: 'Drop images here or click to browse',
        },
      ],
    },
  ],
}
