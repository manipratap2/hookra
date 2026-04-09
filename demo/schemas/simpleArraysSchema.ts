import type { FormSchema } from 'formora'

export const simpleArraysSchema: FormSchema = {
  title: 'Simple Arrays',
  description: 'Dynamic lists of single values — add, remove, and reorder items.',
  showReset: true,
  sections: [
    {
      title: 'List of Strings',
      description: 'A simple list of text values.',
      fields: [
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          addLabel: 'Add tag',
          removeLabel: 'Remove',
          minItems: 1,
          maxItems: 10,
          itemSchema: {
            name: 'tag',
            type: 'text',
            label: 'Tag',
            placeholder: 'Enter a tag...',
            required: true,
          },
        },
      ],
    },
    {
      title: 'List of Numbers',
      description: 'A dynamic list of numeric values.',
      fields: [
        {
          name: 'scores',
          type: 'array',
          label: 'Scores',
          addLabel: 'Add score',
          minItems: 0,
          maxItems: 5,
          itemSchema: {
            name: 'score',
            type: 'number',
            label: 'Score',
            min: 0,
            max: 100,
            placeholder: '0-100',
          },
        },
      ],
    },
    {
      title: 'List of Emails',
      description: 'Add multiple email addresses.',
      fields: [
        {
          name: 'emails',
          type: 'array',
          label: 'Email Addresses',
          addLabel: 'Add email',
          minItems: 1,
          maxItems: 5,
          itemSchema: {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'user@example.com',
            required: true,
          },
        },
      ],
    },
    {
      title: 'List of Dates',
      description: 'Add multiple date entries.',
      fields: [
        {
          name: 'importantDates',
          type: 'array',
          label: 'Important Dates',
          addLabel: 'Add date',
          maxItems: 10,
          itemSchema: {
            name: 'date',
            type: 'date',
            label: 'Date',
          },
        },
      ],
    },
  ],
}
