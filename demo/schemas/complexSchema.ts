import type { FormSchema } from 'hookra'

export const complexSchema: FormSchema = {
  title: 'Order Form',
  description: 'Nested objects, dynamic arrays, and complex conditions.',
  showReset: true,
  sections: [
    {
      title: 'Customer Details',
      columns: 2,
      fields: [
        { name: 'fullName', type: 'text', label: 'Full Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        {
          name: 'address',
          type: 'object',
          label: 'Shipping Address',
          collapsible: true,
          width: 'full',
          fields: [
            { name: 'line1', type: 'text', label: 'Address Line 1', required: true, width: 'full' },
            { name: 'line2', type: 'text', label: 'Address Line 2 (optional)', width: 'full' },
            { name: 'city', type: 'text', label: 'City', required: true },
            { name: 'postcode', type: 'text', label: 'Postcode', required: true },
            {
              name: 'country',
              type: 'select',
              label: 'Country',
              required: true,
              options: [
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Order Items',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Products',
          width: 'full',
          minItems: 1,
          maxItems: 10,
          addLabel: 'Add product',
          itemSchema: {
            type: 'object',
            name: 'item',
            fields: [
              {
                name: 'product',
                type: 'select',
                label: 'Product',
                required: true,
                options: [
                  { value: 'widget-a', label: 'Widget A — $10' },
                  { value: 'widget-b', label: 'Widget B — $25' },
                  { value: 'gadget', label: 'Gadget Pro — $99' },
                ],
              },
              { name: 'qty', type: 'integer', label: 'Qty', required: true, min: 1, max: 99, defaultValue: 1 },
              { name: 'note', type: 'text', label: 'Note (optional)' },
            ],
          },
        },
      ],
    },
    {
      title: 'Payment',
      columns: 2,
      fields: [
        {
          name: 'paymentMethod',
          type: 'radio',
          label: 'Payment Method',
          required: true,
          direction: 'row',
          width: 'full',
          options: [
            { value: 'card', label: 'Credit / Debit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bank', label: 'Bank Transfer' },
          ],
        },
        {
          name: 'cardNumber',
          type: 'text',
          label: 'Card Number',
          placeholder: '1234 5678 9012 3456',
          required: true,
          width: 'full',
          dependsOn: { field: 'paymentMethod', value: 'card' },
        },
        {
          name: 'cardExpiry',
          type: 'text',
          label: 'Expiry',
          placeholder: 'MM/YY',
          required: true,
          dependsOn: { field: 'paymentMethod', value: 'card' },
        },
        {
          name: 'cardCvc',
          type: 'text',
          label: 'CVC',
          placeholder: '123',
          required: true,
          dependsOn: { field: 'paymentMethod', value: 'card' },
        },
        {
          name: 'paypalEmail',
          type: 'email',
          label: 'PayPal Email',
          required: true,
          width: 'full',
          dependsOn: { field: 'paymentMethod', value: 'paypal' },
        },
        {
          name: 'bankInfo',
          type: 'textarea',
          label: 'Bank Reference',
          description: 'We will send wire transfer details to your email.',
          width: 'full',
          dependsOn: { field: 'paymentMethod', value: 'bank' },
        },
      ],
    },
    {
      title: 'Extras',
      fields: [
        {
          name: 'deliverySpeed',
          type: 'radio',
          label: 'Delivery Speed',
          required: true,
          direction: 'row',
          options: [
            { value: 'standard', label: 'Standard (5-7 days)' },
            { value: 'express', label: 'Express (2-3 days)' },
            { value: 'overnight', label: 'Overnight' },
          ],
        },
        {
          name: 'giftMessage',
          type: 'textarea',
          label: 'Gift Message',
          description: 'Shown only for express / overnight deliveries',
          rows: 2,
          dependsOn: {
            any: [
              { field: 'deliverySpeed', value: 'express' },
              { field: 'deliverySpeed', value: 'overnight' },
            ],
          },
        },
        {
          name: 'promoCode',
          type: 'text',
          label: 'Promo Code',
          placeholder: 'SAVE20',
          prefix: '🏷️',
        },
        {
          name: 'comments',
          type: 'textarea',
          label: 'Additional Comments',
          rows: 3,
        },
      ],
    },
  ],
}
