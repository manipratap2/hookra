import type { FormSchema } from 'hookra'

export const surveySchema: FormSchema = {
  title: 'Customer Satisfaction Survey',
  description: 'A multi-section survey demonstrating radio groups, sliders, conditional follow-ups, and textarea feedback.',
  submitLabel: 'Submit Survey',
  showReset: true,
  sections: [
    {
      title: 'About You',
      columns: 2,
      fields: [
        { name: 'name', type: 'text', label: 'Name (optional)', placeholder: 'Anonymous if blank' },
        { name: 'email', type: 'email', label: 'Email (optional)' },
        {
          name: 'ageGroup',
          type: 'radio',
          label: 'Age Group',
          direction: 'row',
          width: 'full',
          options: [
            { value: '18-24', label: '18-24' },
            { value: '25-34', label: '25-34' },
            { value: '35-44', label: '35-44' },
            { value: '45-54', label: '45-54' },
            { value: '55+', label: '55+' },
          ],
        },
      ],
    },
    {
      title: 'Product Satisfaction',
      fields: [
        {
          name: 'overallRating',
          type: 'slider',
          label: 'Overall Satisfaction (1-10)',
          min: 1,
          max: 10,
          step: 1,
          showValue: true,
          defaultValue: 7,
          required: true,
        },
        {
          name: 'qualityRating',
          type: 'radio',
          label: 'Product Quality',
          required: true,
          direction: 'row',
          options: [
            { value: '1', label: 'Poor' },
            { value: '2', label: 'Fair' },
            { value: '3', label: 'Good' },
            { value: '4', label: 'Very Good' },
            { value: '5', label: 'Excellent' },
          ],
        },
        {
          name: 'valueRating',
          type: 'radio',
          label: 'Value for Money',
          required: true,
          direction: 'row',
          options: [
            { value: '1', label: 'Poor' },
            { value: '2', label: 'Fair' },
            { value: '3', label: 'Good' },
            { value: '4', label: 'Very Good' },
            { value: '5', label: 'Excellent' },
          ],
        },
        {
          name: 'qualityFeedback',
          type: 'textarea',
          label: 'What could we improve about product quality?',
          rows: 2,
          dependsOn: {
            any: [
              { field: 'qualityRating', value: '1' },
              { field: 'qualityRating', value: '2' },
            ],
          },
        },
      ],
    },
    {
      title: 'Service & Support',
      fields: [
        {
          name: 'usedSupport',
          type: 'boolean',
          label: 'Customer Support',
          checkboxLabel: 'I have contacted customer support',
        },
        {
          name: 'supportRating',
          type: 'radio',
          label: 'Support Experience',
          direction: 'row',
          options: [
            { value: '1', label: 'Terrible' },
            { value: '2', label: 'Poor' },
            { value: '3', label: 'OK' },
            { value: '4', label: 'Good' },
            { value: '5', label: 'Outstanding' },
          ],
          dependsOn: { field: 'usedSupport', operator: 'truthy' },
        },
        {
          name: 'supportFeedback',
          type: 'textarea',
          label: 'Tell us about your support experience',
          rows: 2,
          dependsOn: { field: 'usedSupport', operator: 'truthy' },
        },
      ],
    },
    {
      title: 'Recommendations',
      fields: [
        {
          name: 'nps',
          type: 'slider',
          label: 'How likely are you to recommend us? (0-10)',
          description: '0 = Not at all, 10 = Extremely likely',
          min: 0,
          max: 10,
          step: 1,
          showValue: true,
          defaultValue: 8,
        },
        {
          name: 'features',
          type: 'checkboxgroup',
          label: 'Which features do you use the most?',
          direction: 'row',
          options: [
            { value: 'dashboard', label: 'Dashboard' },
            { value: 'reports', label: 'Reports' },
            { value: 'api', label: 'API' },
            { value: 'mobile', label: 'Mobile App' },
            { value: 'integrations', label: 'Integrations' },
            { value: 'support', label: 'Support Chat' },
          ],
        },
        {
          name: 'improvement',
          type: 'textarea',
          label: 'What is the #1 thing we could improve?',
          rows: 3,
          maxLength: 500,
          showCount: true,
        },
        {
          name: 'canContact',
          type: 'boolean',
          label: 'Follow-up',
          checkboxLabel: 'You may contact me about my feedback',
        },
      ],
    },
  ],
}
