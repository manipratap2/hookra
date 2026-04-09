import type { FormSchema } from 'formora'

export const simpleSchema: FormSchema = {
  title: 'Simple Form',
  description: 'A basic form with a few common field types.',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      required: true,
    },
    {
      name: 'age',
      type: 'integer',
      label: 'Age',
      placeholder: '25',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself...',
      rows: 3,
    },
    {
      name: 'agree',
      type: 'checkbox',
      label: 'Terms',
      checkboxLabel: 'I agree to the terms and conditions',
      required: 'You must agree to continue',
    },
  ],
}
