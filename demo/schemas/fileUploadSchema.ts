import type { FormSchema } from 'formora'

export const fileUploadSchema: FormSchema = {
  title: 'File Upload',
  description: 'Demonstrates file upload fields with different accept types, multiple file support, and size limits.',
  showReset: true,
  sections: [
    {
      title: 'Basic File Upload',
      fields: [
        {
          name: 'anyFile',
          type: 'file',
          label: 'Any File',
          description: 'No restrictions — accepts any file type',
        },
      ],
    },
    {
      title: 'Restricted by Type',
      columns: 2,
      fields: [
        {
          name: 'imageFile',
          type: 'file',
          label: 'Image Only',
          accept: 'image/*',
          description: 'Accepts image/*, e.g. PNG, JPG, GIF',
        },
        {
          name: 'pdfFile',
          type: 'file',
          label: 'PDF Only',
          accept: '.pdf',
          description: 'Accepts .pdf files',
        },
        {
          name: 'documentFile',
          type: 'file',
          label: 'Documents',
          accept: '.pdf,.doc,.docx,.txt',
          description: 'PDF, Word, or text files',
        },
        {
          name: 'spreadsheet',
          type: 'file',
          label: 'Spreadsheets',
          accept: '.csv,.xlsx,.xls',
          description: 'CSV or Excel files',
        },
      ],
    },
    {
      title: 'Multiple Files',
      fields: [
        {
          name: 'multipleImages',
          type: 'file',
          label: 'Multiple Images',
          accept: 'image/*',
          multiple: true,
          description: 'Select multiple image files at once',
        },
        {
          name: 'multipleDocuments',
          type: 'file',
          label: 'Multiple Documents',
          accept: '.pdf,.doc,.docx',
          multiple: true,
          description: 'Upload several documents',
        },
      ],
    },
    {
      title: 'With Size Limits',
      columns: 2,
      fields: [
        {
          name: 'smallFile',
          type: 'file',
          label: 'Small File (max 1 MB)',
          maxSize: 1048576,
          description: 'Maximum 1 MB',
        },
        {
          name: 'largeFile',
          type: 'file',
          label: 'Large File (max 10 MB)',
          maxSize: 10485760,
          description: 'Maximum 10 MB',
        },
      ],
    },
    {
      title: 'Required Upload',
      fields: [
        {
          name: 'requiredFile',
          type: 'file',
          label: 'Profile Photo',
          accept: 'image/*',
          required: 'Please upload a profile photo',
          description: 'This upload is required',
        },
      ],
    },
  ],
}
