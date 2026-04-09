import type { FormSchema } from 'formora'

export const nullableSchema: FormSchema = {
  title: 'Optional & Nullable Fields',
  description: 'Demonstrates required vs optional fields. Only "Name" and "Email" are required — all other fields can be left empty.',
  showReset: true,
  layout: { columns: 2 },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: 'Name is required',
      description: 'Required field',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      description: 'Required field',
    },
    {
      name: 'nickname',
      type: 'text',
      label: 'Nickname',
      placeholder: 'Optional...',
      description: 'Optional — leave blank if you prefer',
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone',
      placeholder: 'Optional...',
      description: 'Not required',
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      description: 'Optional number field',
    },
    {
      name: 'birthday',
      type: 'date',
      label: 'Birthday',
      description: 'Optional date',
    },
    {
      name: 'website',
      type: 'url',
      label: 'Website',
      placeholder: 'https://...',
      description: 'Optional URL',
    },
    {
      name: 'favouriteColor',
      type: 'select',
      label: 'Favourite Colour',
      placeholder: 'Pick one (or don\'t)',
      description: 'Optional select',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself...',
      description: 'Optional text area',
      width: 'full',
    },
  ],
}
