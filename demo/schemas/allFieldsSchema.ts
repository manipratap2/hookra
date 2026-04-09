import type { FormSchema } from 'formora'

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
      ],
    },
    {
      title: 'Choice Fields',
      columns: 2,
      fields: [
        {
          name: 'selectField',
          type: 'select',
          label: 'Select (single)',
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C', disabled: true },
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
      title: 'Misc',
      columns: 2,
      fields: [
        { name: 'colorField', type: 'color', label: 'Colour Picker', defaultValue: '#4299e1' },
        { name: 'fileField', type: 'file', label: 'File Upload', accept: 'image/*', description: 'Images only' },
      ],
    },
  ],
}
