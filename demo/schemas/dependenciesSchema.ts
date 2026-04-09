import type { FormSchema } from 'formora'

export const dependenciesSchema: FormSchema = {
  title: 'Property Dependencies',
  description: 'Fields appear or hide based on the value of other fields using simple dependsOn conditions.',
  showReset: true,
  sections: [
    {
      title: 'Show/Hide Based on Selection',
      fields: [
        {
          name: 'contactMethod',
          type: 'radio',
          label: 'Preferred Contact Method',
          required: true,
          direction: 'row',
          options: [
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'mail', label: 'Postal Mail' },
          ],
        },
        {
          name: 'emailAddress',
          type: 'email',
          label: 'Email Address',
          required: true,
          dependsOn: { field: 'contactMethod', value: 'email' },
        },
        {
          name: 'phoneNumber',
          type: 'tel',
          label: 'Phone Number',
          required: true,
          dependsOn: { field: 'contactMethod', value: 'phone' },
        },
        {
          name: 'mailingAddress',
          type: 'textarea',
          label: 'Mailing Address',
          required: true,
          rows: 3,
          dependsOn: { field: 'contactMethod', value: 'mail' },
        },
      ],
    },
    {
      title: 'Show/Hide Based on Boolean',
      fields: [
        {
          name: 'hasDiscount',
          type: 'boolean',
          label: 'Apply Discount',
          checkboxLabel: 'I have a discount code',
        },
        {
          name: 'discountCode',
          type: 'text',
          label: 'Discount Code',
          placeholder: 'SAVE20',
          required: true,
          dependsOn: { field: 'hasDiscount', operator: 'truthy' },
        },
      ],
    },
    {
      title: 'Cascading Dependencies',
      description: 'Field C depends on Field B, which depends on Field A.',
      fields: [
        {
          name: 'hasAccount',
          type: 'boolean',
          label: 'Existing Account',
          checkboxLabel: 'I already have an account',
        },
        {
          name: 'accountType',
          type: 'radio',
          label: 'Account Type',
          direction: 'row',
          options: [
            { value: 'personal', label: 'Personal' },
            { value: 'business', label: 'Business' },
          ],
          dependsOn: { field: 'hasAccount', operator: 'truthy' },
        },
        {
          name: 'companyName',
          type: 'text',
          label: 'Company Name',
          required: true,
          dependsOn: { field: 'accountType', value: 'business' },
        },
        {
          name: 'taxId',
          type: 'text',
          label: 'Tax ID',
          placeholder: 'XX-XXXXXXX',
          dependsOn: { field: 'accountType', value: 'business' },
        },
      ],
    },
    {
      title: 'Show/Hide Based on Select Value',
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
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'other', label: 'Other' },
          ],
        },
        {
          name: 'usState',
          type: 'select',
          label: 'State',
          dependsOn: { field: 'country', value: 'us' },
          options: [
            { value: 'ca', label: 'California' },
            { value: 'ny', label: 'New York' },
            { value: 'tx', label: 'Texas' },
          ],
        },
        {
          name: 'ukCounty',
          type: 'text',
          label: 'County',
          placeholder: 'e.g. Surrey',
          dependsOn: { field: 'country', value: 'uk' },
        },
        {
          name: 'caProvince',
          type: 'select',
          label: 'Province',
          dependsOn: { field: 'country', value: 'ca' },
          options: [
            { value: 'on', label: 'Ontario' },
            { value: 'bc', label: 'British Columbia' },
            { value: 'qc', label: 'Quebec' },
          ],
        },
        {
          name: 'otherCountryName',
          type: 'text',
          label: 'Country Name',
          required: true,
          dependsOn: { field: 'country', value: 'other' },
        },
      ],
    },
  ],
}
