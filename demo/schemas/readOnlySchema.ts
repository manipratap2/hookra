import type { FormSchema } from 'hookra'

export const readOnlySchema: FormSchema = {
  title: 'Read-Only & Disabled Fields',
  description: 'Demonstrates readOnly and disabled states for various field types.',
  showReset: true,
  sections: [
    {
      title: 'Read-Only Fields',
      description: 'These fields display values but cannot be edited.',
      columns: 2,
      fields: [
        { name: 'roText', type: 'text', label: 'Text (Read-Only)', defaultValue: 'Cannot edit this', readOnly: true },
        { name: 'roEmail', type: 'email', label: 'Email (Read-Only)', defaultValue: 'admin@example.com', readOnly: true },
        { name: 'roNumber', type: 'number', label: 'Number (Read-Only)', defaultValue: 42, readOnly: true },
        { name: 'roDate', type: 'date', label: 'Date (Read-Only)', defaultValue: '2026-01-01', readOnly: true },
        {
          name: 'roSelect',
          type: 'select',
          label: 'Select (Read-Only)',
          defaultValue: 'b',
          readOnly: true,
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ],
        },
        { name: 'roTextarea', type: 'textarea', label: 'Textarea (Read-Only)', defaultValue: 'This is a longer text that is read-only.', readOnly: true, rows: 2 },
      ],
    },
    {
      title: 'Disabled Fields',
      description: 'These fields are greyed out and cannot receive focus.',
      columns: 2,
      fields: [
        { name: 'disText', type: 'text', label: 'Text (Disabled)', defaultValue: 'Disabled field', disabled: true },
        { name: 'disEmail', type: 'email', label: 'Email (Disabled)', defaultValue: 'disabled@example.com', disabled: true },
        { name: 'disNumber', type: 'number', label: 'Number (Disabled)', defaultValue: 99, disabled: true },
        { name: 'disDate', type: 'date', label: 'Date (Disabled)', defaultValue: '2026-06-15', disabled: true },
        {
          name: 'disSelect',
          type: 'select',
          label: 'Select (Disabled)',
          defaultValue: 'c',
          disabled: true,
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ],
        },
        {
          name: 'disRadio',
          type: 'radio',
          label: 'Radio (Disabled)',
          defaultValue: 'y',
          disabled: true,
          direction: 'row',
          options: [
            { value: 'x', label: 'X' },
            { value: 'y', label: 'Y' },
            { value: 'z', label: 'Z' },
          ],
        },
        { name: 'disBoolean', type: 'boolean', label: 'Switch (Disabled)', checkboxLabel: 'Toggle me', defaultValue: true, disabled: true },
        { name: 'disCheckbox', type: 'checkbox', label: 'Checkbox (Disabled)', checkboxLabel: 'Check me', defaultValue: true, disabled: true },
      ],
    },
    {
      title: 'Mixed Editable & Non-Editable',
      description: 'Some fields can be edited, others are locked.',
      columns: 2,
      fields: [
        { name: 'accountId', type: 'text', label: 'Account ID', defaultValue: 'ACC-12345', readOnly: true, description: 'Auto-generated, cannot change' },
        { name: 'displayName', type: 'text', label: 'Display Name', defaultValue: 'Jane Doe', description: 'You can update this' },
        { name: 'createdAt', type: 'date', label: 'Created', defaultValue: '2025-01-15', disabled: true, description: 'Account creation date' },
        { name: 'notes', type: 'textarea', label: 'Notes', placeholder: 'Add your notes...', description: 'Editable', width: 'full' },
      ],
    },
  ],
}
