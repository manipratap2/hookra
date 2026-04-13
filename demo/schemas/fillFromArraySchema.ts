import type { FormSchema } from 'hookra'

/**
 * Demonstrates fillFrom populating an array field with dynamic rows from an API.
 *
 * The user selects a "department" from a dropdown.  The mock API returns a list
 * of employees for that department which is written directly into the `employees`
 * array field — rows appear automatically without the user clicking "+".
 *
 * Additional rows can still be added manually, and existing rows can be removed,
 * showing that fillFrom + manual editing coexist safely.
 */
export const fillFromArraySchema: FormSchema = {
  title: 'API-Populated Array Field',
  description:
    'Select a department — the employee list is fetched from a mock API and populates the rows automatically. You can still add, edit, or remove rows manually.',
  layout: { columns: 2 },
  fields: [
    // Trigger: selecting a department triggers the fillFrom fetch
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      required: true,
      width: 'half',
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
      ],
      description: 'Choose a department to load its employees automatically.',
      // The employees array field declares fillFrom; it watches this trigger.
    },

    // Notes field — unrelated, always manual
    {
      name: 'notes',
      type: 'text',
      label: 'Review Notes',
      placeholder: 'Optional notes about this review',
      width: 'half',
    },

    // The array field that gets populated by fillFrom
    {
      name: 'employees',
      type: 'array',
      label: 'Employees',
      addLabel: 'Add employee',
      width: 'full',
      layout: 'horizontal',
      maxItems: 20,
      // When "department" changes, call onFill and replace this array with
      // whatever the API returns under the "employees" key.
      fillFrom: {
        trigger: 'department',
        targets: ['employees'],
        debounce: 0,
      },
      itemSchema: {
        type: 'object',
        name: 'employee',
        fields: [
          { name: 'name',  type: 'text',   label: 'Name',   required: true },
          { name: 'role',  type: 'text',   label: 'Role',   required: true },
          { name: 'email', type: 'email',  label: 'Email' },
          {
            name: 'level',
            type: 'select',
            label: 'Level',
            defaultValue: 'mid',
            options: [
              { value: 'junior', label: 'Junior' },
              { value: 'mid',    label: 'Mid' },
              { value: 'senior', label: 'Senior' },
              { value: 'lead',   label: 'Lead' },
            ],
          },
        ],
      },
    },
  ],
}
