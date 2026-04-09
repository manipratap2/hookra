import type { FormSchema } from 'formora'

export const dateTimeSchema: FormSchema = {
  title: 'Date & Time',
  description: 'Demonstrates date, time, and datetime fields with various constraints.',
  showReset: true,
  sections: [
    {
      title: 'Basic Date & Time Inputs',
      columns: 3,
      fields: [
        {
          name: 'basicDate',
          type: 'date',
          label: 'Date',
          description: 'Standard date picker',
        },
        {
          name: 'basicTime',
          type: 'time',
          label: 'Time',
          description: 'Standard time picker',
        },
        {
          name: 'basicDatetime',
          type: 'datetime',
          label: 'Date & Time',
          description: 'Combined date + time',
        },
      ],
    },
    {
      title: 'With Constraints',
      columns: 2,
      fields: [
        {
          name: 'futureDate',
          type: 'date',
          label: 'Future Date Only',
          min: '2026-04-09',
          description: 'Cannot select a date before today',
        },
        {
          name: 'pastDate',
          type: 'date',
          label: 'Past Date Only',
          max: '2026-04-09',
          description: 'Cannot select a date after today',
        },
        {
          name: 'dateRange',
          type: 'date',
          label: 'Date in Range',
          min: '2026-01-01',
          max: '2026-12-31',
          description: 'Only dates in 2026',
        },
        {
          name: 'businessHours',
          type: 'time',
          label: 'Business Hours',
          min: '09:00',
          max: '17:00',
          description: '9 AM to 5 PM only',
        },
      ],
    },
    {
      title: 'With Default Values',
      columns: 3,
      fields: [
        {
          name: 'defaultDate',
          type: 'date',
          label: 'Pre-filled Date',
          defaultValue: '2026-06-15',
        },
        {
          name: 'defaultTime',
          type: 'time',
          label: 'Pre-filled Time',
          defaultValue: '14:30',
        },
        {
          name: 'defaultDatetime',
          type: 'datetime',
          label: 'Pre-filled DateTime',
          defaultValue: '2026-06-15T14:30',
        },
      ],
    },
    {
      title: 'Required Date Fields',
      columns: 2,
      fields: [
        {
          name: 'requiredDate',
          type: 'date',
          label: 'Birth Date',
          required: 'Please enter your birth date',
        },
        {
          name: 'requiredTime',
          type: 'time',
          label: 'Preferred Contact Time',
          required: 'Please choose a time',
        },
      ],
    },
  ],
}
