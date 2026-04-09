import type { FormSchema } from 'hookra'

export const compoundConditionsSchema: FormSchema = {
  title: 'Compound Conditions',
  description: 'Advanced conditional logic using AND (all), OR (any), NOT (not), and comparison operators.',
  showReset: true,
  sections: [
    {
      title: 'OR Condition (any)',
      description: 'The "Gift Message" field appears if delivery is Express OR Overnight.',
      fields: [
        {
          name: 'delivery',
          type: 'radio',
          label: 'Delivery Speed',
          required: true,
          direction: 'row',
          options: [
            { value: 'standard', label: 'Standard' },
            { value: 'express', label: 'Express' },
            { value: 'overnight', label: 'Overnight' },
          ],
        },
        {
          name: 'giftMessage',
          type: 'textarea',
          label: 'Gift Message',
          rows: 2,
          placeholder: 'Write a personal message...',
          dependsOn: {
            any: [
              { field: 'delivery', value: 'express' },
              { field: 'delivery', value: 'overnight' },
            ],
          },
        },
      ],
    },
    {
      title: 'AND Condition (all)',
      description: 'The "VIP Badge Name" field appears only when role is "VIP" AND newsletter is enabled.',
      fields: [
        {
          name: 'role',
          type: 'select',
          label: 'Membership Role',
          options: [
            { value: 'guest', label: 'Guest' },
            { value: 'member', label: 'Member' },
            { value: 'vip', label: 'VIP' },
          ],
        },
        {
          name: 'wantsNewsletter',
          type: 'boolean',
          label: 'Newsletter',
          checkboxLabel: 'Subscribe to newsletter',
        },
        {
          name: 'vipBadgeName',
          type: 'text',
          label: 'VIP Badge Name',
          placeholder: 'Name on your VIP badge',
          dependsOn: {
            all: [
              { field: 'role', value: 'vip' },
              { field: 'wantsNewsletter', operator: 'truthy' },
            ],
          },
        },
      ],
    },
    {
      title: 'NOT Condition',
      description: 'The "Guest Notice" only appears when the user is NOT a "Member" (i.e., is a Guest).',
      fields: [
        {
          name: 'userType',
          type: 'radio',
          label: 'User Type',
          direction: 'row',
          options: [
            { value: 'guest', label: 'Guest' },
            { value: 'member', label: 'Member' },
          ],
        },
        {
          name: 'guestNotice',
          type: 'textarea',
          label: 'Guest Notice',
          placeholder: 'Please describe why you want to join...',
          rows: 2,
          dependsOn: {
            not: { field: 'userType', value: 'member' },
          },
        },
      ],
    },
    {
      title: 'Comparison Operators',
      description: 'Show "Discount" field if quantity is >= 10, show "Bulk Notice" if quantity >= 100.',
      columns: 2,
      fields: [
        {
          name: 'quantity',
          type: 'integer',
          label: 'Quantity',
          min: 1,
          defaultValue: 1,
          width: 'full',
        },
        {
          name: 'discountCode',
          type: 'text',
          label: 'Discount Code',
          placeholder: 'BULK10',
          description: 'Shown when quantity >= 10',
          dependsOn: { field: 'quantity', operator: 'gte', value: 10 },
        },
        {
          name: 'bulkNotice',
          type: 'textarea',
          label: 'Bulk Order Notes',
          rows: 2,
          description: 'Shown when quantity >= 100',
          dependsOn: { field: 'quantity', operator: 'gte', value: 100 },
        },
      ],
    },
    {
      title: 'String Operators',
      description: 'Uses contains, startsWith, endsWith operators.',
      columns: 2,
      fields: [
        {
          name: 'domain',
          type: 'text',
          label: 'Email Domain',
          placeholder: 'e.g. user@company.com',
          width: 'full',
        },
        {
          name: 'corporateNotice',
          type: 'text',
          label: 'Corporate Account Detected',
          readOnly: true,
          defaultValue: 'You may be eligible for a corporate discount.',
          dependsOn: { field: 'domain', operator: 'endsWith', value: '.com' },
        },
        {
          name: 'gmailNotice',
          type: 'text',
          label: 'Gmail Detected',
          readOnly: true,
          defaultValue: 'Consider using a professional email address.',
          dependsOn: { field: 'domain', operator: 'contains', value: 'gmail' },
        },
      ],
    },
    {
      title: 'IN / NOT-IN Operators',
      description: 'Show field based on membership in a set of values.',
      fields: [
        {
          name: 'plan',
          type: 'select',
          label: 'Plan',
          options: [
            { value: 'free', label: 'Free' },
            { value: 'starter', label: 'Starter' },
            { value: 'pro', label: 'Pro' },
            { value: 'enterprise', label: 'Enterprise' },
          ],
        },
        {
          name: 'apiKeyLimit',
          type: 'number',
          label: 'API Key Limit',
          description: 'Shown for Pro or Enterprise plans (uses "in" operator)',
          dependsOn: { field: 'plan', operator: 'in', value: ['pro', 'enterprise'] },
        },
        {
          name: 'upgradePrompt',
          type: 'text',
          label: 'Upgrade Notice',
          readOnly: true,
          defaultValue: 'Upgrade to Pro or Enterprise for API access.',
          description: 'Shown for Free or Starter (uses "nin" operator on paid plans)',
          dependsOn: { field: 'plan', operator: 'nin', value: ['pro', 'enterprise'] },
        },
      ],
    },
    {
      title: 'Empty / Not-Empty Operators',
      fields: [
        {
          name: 'optionalNote',
          type: 'textarea',
          label: 'Optional Note',
          rows: 2,
          placeholder: 'Type something to reveal the save button text...',
        },
        {
          name: 'savePreference',
          type: 'radio',
          label: 'Save As',
          direction: 'row',
          description: 'Only visible when the note is not empty',
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ],
          dependsOn: { field: 'optionalNote', operator: 'notEmpty' },
        },
      ],
    },
    {
      title: 'Conditional Section',
      description: 'This entire section appears only when "Show Advanced" is enabled.',
      dependsOn: { field: 'role', value: 'vip' },
      columns: 2,
      fields: [
        { name: 'advancedField1', type: 'text', label: 'Advanced Field 1' },
        { name: 'advancedField2', type: 'text', label: 'Advanced Field 2' },
        { name: 'advancedSlider', type: 'slider', label: 'Priority Level', min: 1, max: 10, showValue: true, defaultValue: 5, width: 'full' },
      ],
    },
  ],
}
