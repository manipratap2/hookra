# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-04-10

### Added

- **Horizontal (table) layout for array fields** — set `layout: "horizontal"` on any object-type array field to render rows as a compact table instead of stacked cards. Ideal for spreadsheet-like data entry (e.g. invoice line items, contacts).
- `layout` prop on `ArrayFieldSchema` — `"vertical"` (default) or `"horizontal"`.

### Fixed

- **Empty grid slots from `dependsOn` fields** — conditional fields that failed their condition were previously rendered as invisible but still occupied a grid cell, leaving blank gaps in multi-column layouts. They are now skipped entirely.
- **Duplicate `id` on checkbox/switch inside array rows** — `BooleanField` was forwarding the field `name` as the HTML `id`, causing duplicate IDs when the same sub-field appeared in multiple array rows. The `id` prop is no longer set explicitly, letting Chakra UI manage it.

---

## [1.0.3] - 2026-04-10

### Added

- Button spinner on the submit button while the form is submitting
- `onlyDirty` usage examples in the demo site

---

## [1.0.2] - 2026-04-09

### Fixed

- **Broken TypeScript types** — `dist/index.d.ts` was generated as an empty `export { }`, causing consumers to get `Module 'hookra' has no exported member 'FormBuilder'` (and all other exports). Root cause: `tsconfig.app.json` had `"noEmit": true`, and `vite-plugin-dts` v4 silently failed to roll up declarations because its bundled `@microsoft/api-extractor` is incompatible with TypeScript 6. Fixed by replacing the dts plugin with a dedicated `tsconfig.lib.json` (`emitDeclarationOnly: true`) and running `tsc --project tsconfig.lib.json` as part of the build step.
- **Inflated consumer bundle** — `@chakra-ui/react`, `@emotion/react`, and `react-hook-form` were listed under `dependencies` instead of `peerDependencies`. Although the library build already marked them external, having them in `dependencies` caused package managers to treat them as owned by hookra, preventing deduplication in the consumer's app. Moved to `peerDependencies`.
- **Unminified library output** — the library was shipped without minification (`minify: false`). Enabled minification, reducing the ES bundle from 43 kB to 31.9 kB and the CJS bundle from 49 kB to 23.2 kB.

---

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
