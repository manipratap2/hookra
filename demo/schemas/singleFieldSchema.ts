import type { FormSchema } from 'formora'

export const singleFieldSchema: FormSchema = {
  title: 'Single Field',
  description: 'The simplest possible form — just one field.',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      placeholder: 'Enter a title',
      required: 'Title is required',
    },
  ],
}
