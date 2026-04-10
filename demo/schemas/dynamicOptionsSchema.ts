import type { FormSchema } from 'hookra'

export const dynamicOptionsSchema: FormSchema = {
  title: 'Dynamic Options',
  description:
    'The choices available in a field change based on the value selected in another field, using optionsFrom.',
  showReset: true,
  sections: [
    {
      title: 'Country → State / Province',
      description:
        'Selecting a country populates the region dropdown with that country\'s regions.',
      columns: 2,
      fields: [
        {
          name: 'country',
          type: 'select',
          label: 'Country',
          required: true,
          width: 'full',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
          ],
        },
        {
          name: 'region',
          type: 'select',
          label: 'State / Province',
          required: true,
          width: 'full',
          placeholder: 'Select a country first…',
          optionsFrom: {
            field: 'country',
            map: {
              us: [
                { value: 'ca', label: 'California' },
                { value: 'ny', label: 'New York' },
                { value: 'tx', label: 'Texas' },
                { value: 'fl', label: 'Florida' },
                { value: 'wa', label: 'Washington' },
              ],
              ca: [
                { value: 'on', label: 'Ontario' },
                { value: 'bc', label: 'British Columbia' },
                { value: 'qc', label: 'Quebec' },
                { value: 'ab', label: 'Alberta' },
              ],
              au: [
                { value: 'nsw', label: 'New South Wales' },
                { value: 'vic', label: 'Victoria' },
                { value: 'qld', label: 'Queensland' },
                { value: 'wa', label: 'Western Australia' },
              ],
            },
          },
        },
      ],
    },
    {
      title: 'Category → Sub-category (Radio)',
      description:
        'Picking a product category updates the radio options for sub-category.',
      columns: 2,
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: [
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'food', label: 'Food & Drink' },
          ],
        },
        {
          name: 'subCategory',
          type: 'radio',
          label: 'Sub-category',
          required: true,
          optionsFrom: {
            field: 'category',
            default: [{ value: '', label: 'Select a category first', disabled: true }],
            map: {
              electronics: [
                { value: 'phones', label: 'Phones' },
                { value: 'laptops', label: 'Laptops' },
                { value: 'accessories', label: 'Accessories' },
              ],
              clothing: [
                { value: 'mens', label: "Men's" },
                { value: 'womens', label: "Women's" },
                { value: 'kids', label: "Kids'" },
              ],
              food: [
                { value: 'beverages', label: 'Beverages' },
                { value: 'snacks', label: 'Snacks' },
                { value: 'fresh', label: 'Fresh Produce' },
              ],
            },
          },
        },
      ],
    },
    {
      title: 'Role → Permissions (Checkboxgroup)',
      description:
        'The set of available permissions changes based on the selected role.',
      columns: 2,
      fields: [
        {
          name: 'role',
          type: 'radio',
          label: 'Role',
          required: true,
          direction: 'row',
          options: [
            { value: 'viewer', label: 'Viewer' },
            { value: 'editor', label: 'Editor' },
            { value: 'admin', label: 'Admin' },
          ],
        },
        {
          name: 'permissions',
          type: 'checkboxgroup',
          label: 'Permissions',
          optionsFrom: {
            field: 'role',
            default: [{ value: '', label: 'Select a role first', disabled: true }],
            map: {
              viewer: [
                { value: 'read', label: 'Read' },
              ],
              editor: [
                { value: 'read', label: 'Read' },
                { value: 'write', label: 'Write' },
                { value: 'comment', label: 'Comment' },
              ],
              admin: [
                { value: 'read', label: 'Read' },
                { value: 'write', label: 'Write' },
                { value: 'comment', label: 'Comment' },
                { value: 'delete', label: 'Delete' },
                { value: 'manage_users', label: 'Manage Users' },
              ],
            },
          },
        },
      ],
    },
    {
      title: 'Combined with dependsOn',
      description:
        'optionsFrom and dependsOn work together — this field is only visible for certain plan types and its options also change.',
      fields: [
        {
          name: 'plan',
          type: 'radio',
          label: 'Plan',
          required: true,
          direction: 'row',
          options: [
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
            { value: 'enterprise', label: 'Enterprise' },
          ],
        },
        {
          name: 'addOn',
          type: 'select',
          label: 'Add-on',
          placeholder: 'Choose an add-on…',
          dependsOn: { field: 'plan', operator: 'ne', value: 'free' },
          optionsFrom: {
            field: 'plan',
            map: {
              pro: [
                { value: 'storage_50gb', label: 'Extra Storage (50 GB)' },
                { value: 'priority_support', label: 'Priority Support' },
              ],
              enterprise: [
                { value: 'storage_1tb', label: 'Extra Storage (1 TB)' },
                { value: 'sla', label: 'SLA Guarantee' },
                { value: 'dedicated_manager', label: 'Dedicated Account Manager' },
              ],
            },
          },
        },
      ],
    },
  ],
}
