export interface VersionInfo {
  version: string
  date: string
  label?: string
  features: string[]
  changelog: string[]
}

export const versions: VersionInfo[] = [
  {
    version: '1.0.1',
    date: '2026-04-09',
    label: 'Latest',
    features: [
      'onlyDirty prop — submit only changed fields for PATCH-style APIs',
    ],
    changelog: [
      'Added onlyDirty prop to FormBuilder',
      'When true, onSubmit receives only fields the user changed (dirty fields)',
      'Useful for PATCH-style API calls — no more manual diffing',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-09',
    features: [
      '17+ field types including text, number, select, radio, checkbox, date, file, slider, color',
      'Chakra UI v3 support with modern compound component API',
      'Conditional field visibility with dependsOn (simple, compound AND/OR/NOT)',
      'Nested structures: object fields and dynamic array fields',
      'Custom component registry for extensibility',
      'Full TypeScript support with discriminated union types',
      'Grid-based responsive layout system (1-12 columns)',
      'Built-in validation with React Hook Form integration',
      'React 19 compatible',
      'Collapsible sections and object groups',
      'Read-only mode (form-level and per-field)',
      'Programmatic control via ref (submit, reset, form access)',
      'Tree-shakable exports with zero side effects',
      '28 interactive demo examples covering all features',
    ],
    changelog: [
      'Initial stable release (v1.0.0)',
      'Chakra UI v3 with compound component API',
      'React 19 and React Hook Form 7.72',
      '28 interactive examples covering all RJSF-equivalent patterns',
      'Comprehensive demo site with TanStack Router',
    ],
  },
]

export const currentVersion = versions[0]
