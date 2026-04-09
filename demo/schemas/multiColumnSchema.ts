import type { FormSchema } from 'hookra'

export const multiColumnSchema: FormSchema = {
  title: 'Multi-Column Layout',
  description: 'Demonstrates grid-based responsive layouts with mixed column widths.',
  showReset: true,
  sections: [
    {
      title: '2-Column Layout',
      columns: 2,
      fields: [
        { name: 'firstName2', type: 'text', label: 'First Name', placeholder: 'John', width: 'half' },
        { name: 'lastName2', type: 'text', label: 'Last Name', placeholder: 'Doe', width: 'half' },
        { name: 'email2', type: 'email', label: 'Email', placeholder: 'john@example.com', width: 'full' },
      ],
    },
    {
      title: '3-Column Layout',
      columns: 3,
      fields: [
        { name: 'city', type: 'text', label: 'City', placeholder: 'New York' },
        { name: 'state', type: 'text', label: 'State', placeholder: 'NY' },
        { name: 'zip', type: 'text', label: 'ZIP Code', placeholder: '10001' },
      ],
    },
    {
      title: 'Mixed Widths (12-Column Grid)',
      columns: 1,
      fields: [
        { name: 'fullWidth', type: 'text', label: 'Full Width', width: 'full', placeholder: 'width: full (12/12)' },
        { name: 'twoThirds', type: 'text', label: 'Two Thirds', width: 'two-thirds', placeholder: 'width: two-thirds (8/12)' },
        { name: 'oneThird', type: 'text', label: 'One Third', width: 'third', placeholder: 'width: third (4/12)' },
        { name: 'half1', type: 'text', label: 'Half A', width: 'half', placeholder: 'width: half (6/12)' },
        { name: 'half2', type: 'text', label: 'Half B', width: 'half', placeholder: 'width: half (6/12)' },
        { name: 'quarter1', type: 'text', label: 'Quarter 1', width: 'quarter', placeholder: '3/12' },
        { name: 'quarter2', type: 'text', label: 'Quarter 2', width: 'quarter', placeholder: '3/12' },
        { name: 'quarter3', type: 'text', label: 'Quarter 3', width: 'quarter', placeholder: '3/12' },
        { name: 'quarter4', type: 'text', label: 'Quarter 4', width: 'quarter', placeholder: '3/12' },
        { name: 'threeQuarter', type: 'text', label: 'Three Quarters', width: 'three-quarters', placeholder: 'width: three-quarters (9/12)' },
        { name: 'oneQuarter', type: 'text', label: 'Quarter', width: 'quarter', placeholder: 'width: quarter (3/12)' },
      ],
    },
    {
      title: 'Numeric Column Spans',
      description: 'Fields using raw column span numbers (1-12)',
      columns: 1,
      fields: [
        { name: 'col2', type: 'text', label: 'Span 2', width: 2, placeholder: 'width: 2' },
        { name: 'col4', type: 'text', label: 'Span 4', width: 4, placeholder: 'width: 4' },
        { name: 'col6', type: 'text', label: 'Span 6', width: 6, placeholder: 'width: 6' },
        { name: 'col5', type: 'text', label: 'Span 5', width: 5, placeholder: 'width: 5' },
        { name: 'col7', type: 'text', label: 'Span 7', width: 7, placeholder: 'width: 7' },
        { name: 'col12', type: 'text', label: 'Span 12 (full)', width: 12, placeholder: 'width: 12' },
      ],
    },
  ],
}
