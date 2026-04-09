import type { FormSchema } from 'formora'

export const widgetsSchema: FormSchema = {
  title: 'Widgets Showcase',
  description: 'The same conceptual data can be collected with different widget types. Compare how each renders.',
  showReset: true,
  sections: [
    {
      title: 'Single Choice — 3 Ways',
      description: 'Choose one colour using different widgets.',
      columns: 3,
      fields: [
        {
          name: 'colorSelect',
          type: 'select',
          label: 'As Select Dropdown',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' },
          ],
        },
        {
          name: 'colorRadioV',
          type: 'radio',
          label: 'As Radio (vertical)',
          direction: 'column',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' },
          ],
        },
        {
          name: 'colorRadioH',
          type: 'radio',
          label: 'As Radio (horizontal)',
          direction: 'row',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' },
          ],
        },
      ],
    },
    {
      title: 'Multiple Choice — 2 Ways',
      description: 'Pick multiple items using different widgets.',
      columns: 2,
      fields: [
        {
          name: 'fruitsMultiselect',
          type: 'multiselect',
          label: 'As Multiselect',
          min: 1,
          max: 3,
          description: 'Pick 1 to 3',
          options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
            { value: 'grape', label: 'Grape' },
            { value: 'mango', label: 'Mango' },
          ],
        },
        {
          name: 'fruitsCheckbox',
          type: 'checkboxgroup',
          label: 'As Checkbox Group',
          direction: 'column',
          options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
            { value: 'grape', label: 'Grape' },
            { value: 'mango', label: 'Mango' },
          ],
        },
      ],
    },
    {
      title: 'Boolean Toggle — 3 Ways',
      description: 'A yes/no value rendered with different widgets.',
      columns: 3,
      fields: [
        {
          name: 'enableSwitch',
          type: 'switch',
          label: 'As Switch',
          checkboxLabel: 'Enable notifications',
        },
        {
          name: 'enableBoolean',
          type: 'boolean',
          label: 'As Boolean Toggle',
          checkboxLabel: 'Enable notifications',
        },
        {
          name: 'enableCheckbox',
          type: 'checkbox',
          label: 'As Checkbox',
          checkboxLabel: 'Enable notifications',
        },
      ],
    },
    {
      title: 'Numeric Input — 2 Ways',
      description: 'Collect a number via a text input or a slider.',
      columns: 2,
      fields: [
        {
          name: 'ratingNumber',
          type: 'number',
          label: 'As Number Input',
          min: 0,
          max: 10,
          step: 1,
          placeholder: '0-10',
        },
        {
          name: 'ratingSlider',
          type: 'slider',
          label: 'As Slider',
          min: 0,
          max: 10,
          step: 1,
          showValue: true,
          defaultValue: 5,
        },
      ],
    },
    {
      title: 'Text Input Variants',
      description: 'Different input types for text-based data.',
      columns: 2,
      fields: [
        { name: 'plainText', type: 'text', label: 'Plain Text', placeholder: 'Regular text input' },
        { name: 'emailInput', type: 'email', label: 'Email', placeholder: 'you@example.com' },
        { name: 'passwordInput', type: 'password', label: 'Password' },
        { name: 'urlInput', type: 'url', label: 'URL', prefix: 'https://' },
        { name: 'phoneInput', type: 'tel', label: 'Phone', prefix: '+1' },
        { name: 'searchInput', type: 'search', label: 'Search', placeholder: 'Type to search...' },
        {
          name: 'longText',
          type: 'textarea',
          label: 'Long Text (Textarea)',
          rows: 3,
          maxLength: 500,
          showCount: true,
          width: 'full',
        },
      ],
    },
  ],
}
