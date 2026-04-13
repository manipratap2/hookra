import type { FillFetcher } from 'hookra'

// ─── Mock data tables ─────────────────────────────────────────────────────────

type Employee = { name: string; role: string; email: string; level: string }

const DEPARTMENT_DATA: Record<string, Employee[]> = {
  engineering: [
    { name: 'Alice Chen',    role: 'Backend Engineer',      email: 'alice@example.com',    level: 'senior' },
    { name: 'Bob Martinez',  role: 'Frontend Engineer',     email: 'bob@example.com',      level: 'mid'    },
    { name: 'Carol Nguyen',  role: 'DevOps Engineer',       email: 'carol@example.com',    level: 'senior' },
    { name: 'David Kim',     role: 'Junior Engineer',       email: 'david@example.com',    level: 'junior' },
  ],
  design: [
    { name: 'Eva Rossi',     role: 'Product Designer',      email: 'eva@example.com',      level: 'lead'   },
    { name: 'Frank Okafor',  role: 'UX Researcher',         email: 'frank@example.com',    level: 'mid'    },
    { name: 'Grace Lee',     role: 'Visual Designer',       email: 'grace@example.com',    level: 'junior' },
  ],
  marketing: [
    { name: 'Henry Park',    role: 'Growth Lead',           email: 'henry@example.com',    level: 'lead'   },
    { name: 'Irene Torres',  role: 'Content Strategist',    email: 'irene@example.com',    level: 'senior' },
    { name: 'James Nwosu',   role: 'SEO Specialist',        email: 'james@example.com',    level: 'mid'    },
    { name: 'Karen Blake',   role: 'Social Media Manager',  email: 'karen@example.com',    level: 'mid'    },
    { name: 'Leo Singh',     role: 'Marketing Intern',      email: 'leo@example.com',      level: 'junior' },
  ],
  sales: [
    { name: 'Mia Johansson', role: 'Sales Director',        email: 'mia@example.com',      level: 'lead'   },
    { name: 'Noah Patel',    role: 'Account Executive',     email: 'noah@example.com',     level: 'senior' },
    { name: 'Olivia Reed',   role: 'SDR',                   email: 'olivia@example.com',   level: 'junior' },
  ],
}

const COUNTRY_DATA: Record<string, { phone_prefix: string; currency: string; city: string }> = {
  us: { phone_prefix: '+1',   currency: 'USD', city: 'New York' },
  gb: { phone_prefix: '+44',  currency: 'GBP', city: 'London' },
  de: { phone_prefix: '+49',  currency: 'EUR', city: 'Berlin' },
  jp: { phone_prefix: '+81',  currency: 'JPY', city: 'Tokyo' },
  in: { phone_prefix: '+91',  currency: 'INR', city: 'Mumbai' },
  br: { phone_prefix: '+55',  currency: 'BRL', city: 'São Paulo' },
}

const PRODUCT_DATA: Record<string, {
  product_name: string
  unit_price: number
  description: string
}> = {
  electronics: {
    product_name: 'Wireless Noise-Cancelling Headphones',
    unit_price: 149.99,
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and foldable design. Ideal for travel and office use.',
  },
  clothing: {
    product_name: 'Classic Slim-Fit Chino Trousers',
    unit_price: 49.95,
    description:
      'Versatile slim-fit chinos made from stretch cotton blend. Available in multiple colours, machine washable, and suitable for casual or smart-casual occasions.',
  },
  books: {
    product_name: 'The Pragmatic Programmer (20th Anniversary Edition)',
    unit_price: 34.99,
    description:
      'The seminal guide to software craftsmanship — updated for modern development practices. Essential reading for developers at every level.',
  },
  furniture: {
    product_name: 'Ergonomic Mesh Office Chair',
    unit_price: 299.00,
    description:
      'Height-adjustable mesh chair with lumbar support, armrests, and 360° swivel. Supports up to 150 kg and comes with a 3-year warranty.',
  },
}

/**
 * Mock `onFill` fetcher for the fillFrom demo.
 *
 * In a real application this would be `fetch('/api/...')`.
 * We simulate a small network delay so the loading spinner is visible.
 */
export const fillFromFetcher: FillFetcher = async ({ trigger, value }) => {
  // Simulate network latency (50–150 ms)
  await new Promise((resolve) => setTimeout(resolve, 80 + Math.random() * 70))

  if (trigger === 'country') {
    const data = COUNTRY_DATA[String(value)]
    return data ?? {}
  }

  if (trigger === 'product_category') {
    const data = PRODUCT_DATA[String(value)]
    return data ?? {}
  }

  if (trigger === 'department') {
    const rows = DEPARTMENT_DATA[String(value)]
    return rows ? { employees: rows } : {}
  }

  return {}
}
