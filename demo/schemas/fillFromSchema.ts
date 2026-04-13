import type { FormSchema } from 'hookra'

/**
 * Demonstrates fillFrom: API-driven field population.
 *
 * This schema is intentionally schema-only — the actual mock fetcher lives
 * in the Examples component so the schema stays pure JSON-serialisable.
 *
 * Two independent fillFrom triggers:
 *   1. "country" → fills phone_prefix, currency, city (partial fill via targets)
 *   2. "product_category" → fills product_name, unit_price, description (targets: '*')
 */
export const fillFromSchema: FormSchema = {
  title: 'Order Entry',
  description:
    'Select a country or product category — related fields are populated automatically via a mock API call.',
  layout: { columns: 2 },
  fields: [
    // ── Section 1: Shipping ──────────────────────────────────────────────────
    {
      name: '_shipping_heading',
      type: 'hidden',
      defaultValue: null,
    },

    // Trigger field 1 — selecting a country triggers fillFrom
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      width: 'half',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'jp', label: 'Japan' },
        { value: 'in', label: 'India' },
        { value: 'br', label: 'Brazil' },
      ],
      // When country changes, call onFill and populate phone_prefix + currency + city
      fillFrom: {
        trigger: 'country',
        targets: ['phone_prefix', 'currency', 'city'],
        debounce: 0, // instant for demo (no user typing)
      },
    },

    {
      name: 'phone_prefix',
      type: 'text',
      label: 'Phone Prefix',
      placeholder: 'Auto-filled from country',
      readOnly: true,
      width: 'quarter',
      description: 'Filled automatically when you select a country.',
    },

    {
      name: 'currency',
      type: 'text',
      label: 'Currency',
      placeholder: 'Auto-filled',
      readOnly: true,
      width: 'quarter',
    },

    {
      name: 'city',
      type: 'text',
      label: 'City / Region',
      placeholder: 'Auto-filled from country',
      width: 'half',
      description: 'Pre-filled with a suggestion; you can edit it.',
    },

    {
      name: 'address',
      type: 'text',
      label: 'Street Address',
      placeholder: 'Enter your street address',
      width: 'half',
    },

    // ── Section 2: Product ───────────────────────────────────────────────────

    // Trigger field 2 — selecting a category triggers fillFrom for product details
    {
      name: 'product_category',
      type: 'select',
      label: 'Product Category',
      required: true,
      width: 'half',
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
        { value: 'furniture', label: 'Furniture' },
      ],
      // targets: '*' → every key returned by onFill is merged into the form
      fillFrom: {
        trigger: 'product_category',
        targets: '*',
        debounce: 200,
      },
    },

    {
      name: 'product_name',
      type: 'text',
      label: 'Product Name',
      placeholder: 'Auto-filled from category',
      width: 'half',
      description: 'Suggested product name — you can override it.',
    },

    {
      name: 'unit_price',
      type: 'number',
      label: 'Unit Price (USD)',
      placeholder: 'Auto-filled',
      width: 'quarter',
      description: 'Suggested price from the catalogue.',
    },

    {
      name: 'quantity',
      type: 'number',
      label: 'Quantity',
      defaultValue: 1,
      width: 'quarter',
      validation: { min: 1 },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Product Description',
      placeholder: 'Auto-filled from category',
      width: 'full',
      rows: 3,
    },

    // ── Section 3: Notes (always manual) ────────────────────────────────────
    {
      name: 'notes',
      type: 'textarea',
      label: 'Order Notes',
      placeholder: 'Any special instructions…',
      width: 'full',
      rows: 2,
    },
  ],
}
