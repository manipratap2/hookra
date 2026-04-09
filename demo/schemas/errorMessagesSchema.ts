import type { FormSchema } from 'hookra'

export const errorMessagesSchema: FormSchema = {
  title: 'Custom Error Messages',
  description: 'Every validation rule can have a custom error message. Try submitting to see all the messages.',
  submitLabel: 'Validate All',
  showReset: true,
  layout: { columns: 2 },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: 'We need your name to proceed.',
      validation: {
        minLength: { value: 2, message: 'Your name must be at least 2 characters long.' },
        maxLength: { value: 100, message: 'Name is too long (max 100 characters).' },
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: 'Please provide your email address.',
    },
    {
      name: 'age',
      type: 'integer',
      label: 'Age',
      required: 'Age is a required field.',
      validation: {
        min: { value: 1, message: 'Age must be at least 1.' },
        max: { value: 150, message: 'Age cannot be greater than 150.' },
      },
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      required: 'Phone number is required for verification.',
      validation: {
        pattern: { value: '^\\+?[0-9\\s-]{7,15}$', message: 'Enter a valid phone number (7-15 digits, optional +).' },
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: 'Password cannot be empty.',
      validation: {
        minLength: { value: 8, message: 'Password must be at least 8 characters.' },
        pattern: {
          value: '(?=.*[A-Z])(?=.*[0-9])',
          message: 'Password must include at least one uppercase letter and one digit.',
        },
      },
    },
    {
      name: 'website',
      type: 'url',
      label: 'Website',
      required: 'Please enter your website URL.',
      validation: {
        pattern: {
          value: '^https://',
          message: 'URL must start with https://',
        },
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      required: 'Please write a short bio.',
      rows: 3,
      showCount: true,
      maxLength: 500,
      width: 'full',
      validation: {
        minLength: { value: 10, message: 'Bio must be at least 10 characters.' },
        maxLength: { value: 500, message: 'Bio cannot exceed 500 characters.' },
      },
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Terms',
      checkboxLabel: 'I accept the terms and conditions',
      required: 'You must accept the terms and conditions to continue.',
      width: 'full',
    },
  ],
}
