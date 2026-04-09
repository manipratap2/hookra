# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-04-09

### Added

- `onlyDirty` prop on `FormBuilder` — when `true`, the `onSubmit` callback receives only the fields the user has actually changed, not the full form payload. Useful for PATCH-style API calls where sending unchanged fields is undesirable.

### Changed

- No breaking changes. Fully backwards-compatible with v1.0.0.

---

## [1.0.0] - 2026-04-09

### Added

- `FormBuilder` component with JSON schema-driven form generation
- 17 field types: text, email, password, url, tel, search, number, integer, textarea, select, multiselect, radio, checkboxgroup, boolean, switch, checkbox, date, time, datetime, file, color, slider, hidden, array, object, custom
- Conditional field visibility with `dependsOn` — supports simple, compound (all/any), and negated conditions
- 16 condition operators: eq, ne, gt, gte, lt, lte, in, nin, contains, startsWith, endsWith, matches, empty, notEmpty, truthy, falsy
- Nested object fields with optional collapse
- Dynamic array fields with add/remove and min/max items
- Multi-column grid layouts with flexible width options
- Sections with titles, descriptions, and collapsible groups
- Comprehensive validation: required, min/max, minLength/maxLength, pattern, custom validators
- Custom error messages per validation rule
- Custom field components via registry system
- `FormBuilderRef` for programmatic access to React Hook Form methods
- ReadOnly mode support
- Tree-shakable ESM + CJS dual output
- Full TypeScript support with strict types
- Demo site with 25+ interactive examples
