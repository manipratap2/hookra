# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.8] - 2026-04-13

### Added

- **`fillFrom` — declarative API-driven field population** — any field can now declare a `fillFrom` config that watches a trigger field's value and calls a user-supplied `onFill` async fetcher whenever that value changes. The fetcher returns a `Record<string, unknown>` that is merged into the form, either for a specific list of `targets` field names or for all returned keys (`targets: '*'`). This makes it trivial to implement patterns like "select a country → auto-fill phone prefix, currency and city" or "select a product category → auto-fill name, price and description" without any bespoke wiring.
  - `FillFrom` type on `BaseField.fillFrom` — `trigger`, `targets` (`string[]` or `'*'`), `debounce` (ms, default 300).
  - `onFill?: FillFetcher` prop on `FormBuilder` — the consumer owns the fetch logic (auth headers, caching, retry, etc.); the library makes no HTTP requests itself.
  - `useFillFrom` hook exported for advanced custom-field consumers.
  - `FillFetcher` and `UseFillFromOptions` types exported from the package root.
  - **Loading indicator** — a `<Spinner>` appears inline next to the field label while a fill fetch is in flight, giving users immediate feedback without blocking interaction.
  - **Performance design**: AbortController cancels superseded in-flight requests; debounce prevents hammering the API on rapid changes; a stable `lastFetchedValue` ref prevents re-fetches caused by unrelated re-renders; `useCallback` memoises the `setValue` loop; the hook is a zero-cost no-op when `fillFrom` is absent.
  - **Demo**: new "API Field Population" interactive example under the Conditional category shows two independent `fillFrom` triggers with a mock fetcher that simulates real network latency.

### Fixed

- **`buildValidationRules` — shadowed `v` parameter** — the inner `setValueAs` arrow used `v` as a parameter name, shadowing the outer `const v: FieldValidation` binding. Renamed to `raw` to eliminate the shadowing and make the intent clear.
- **`buildValidationRules` — redundant double-cast in rule value extraction** — `(v.minLength as { value: number }).value ?? v.minLength` re-asserted the same union type twice. Replaced with a clean `typeof raw === 'object' && 'value' in raw ? raw.value : raw` guard shared by all four numeric rules (minLength, maxLength, min, max).
- **`ArrayField` — redundant required indicator check** — the table-header required asterisk guard was `sf.required || (typeof sf.required === 'string' && sf.required)`, where the second clause is always a subset of the first (`string` is already truthy). Simplified to `sf.required`.
- **`FormBuilder` — stale `mergedDefaults` closure on ref reset** — the `useImperativeHandle` reset function and the Reset button both captured `mergedDefaults` from the initial render. If `schema` or `externalDefaults` changed after mount, `ref.reset()` and the Reset button would restore the original defaults instead of the current ones. Both now recompute `{ ...buildDefaultValues(schema), ...externalDefaults }` at call time. The intermediate `schemaDefaults` / `mergedDefaults` variables have been removed.

---

## [1.0.7] - 2026-04-11

### Fixed

- **`DateField` readOnly no longer opens the native date/time picker** — HTML5 date, time, and datetime-local inputs ignore the `readOnly` attribute when it comes to the browser's picker popup. Clicks and keyboard input are now blocked via `onClickCapture`, `onKeyDownCapture`, and `pointer-events: none` when the field is read-only, so the displayed value is fully locked.
- **`SelectField` readOnly now preserves the field value in the form payload** — previously, readOnly on a select fell back to `disabled`, which excludes the value from form submission. Native `<select>` has no readOnly attribute, so interaction is now blocked via `pointer-events: none` and `tabIndex={-1}` without disabling the element. The selected value is correctly included on submit.
- **`ColorField` readOnly no longer opens the native color picker** — same root cause as DateField: the native color picker opens on click regardless of `disabled`/`readOnly`. Fixed with `pointer-events: none` when `readOnly` or `field.readOnly` is set.

### Changed

- **CI: Node.js matrix updated to Node 24 only** — removed Node 22 from the CI matrix; Node 24 is the project's minimum and sole supported version.

### Performance

- **Removed `lucide-react` from the library bundle** — `ArrayField` and `ObjectField` previously imported 4 icons from `lucide-react`, bundling the entire icon library into the consumer's output. The 4 icons (Plus, Trash2, ChevronDown, ChevronUp) are now inlined as lightweight SVG components. No API or visual change.
- **Tighter tree-shaking** — Rollup `treeshake.moduleSideEffects: false` and `propertyReadSideEffects: false` added to the library build config for more aggressive dead-code elimination.

---

## [1.0.6] - 2026-04-11

### Fixed

- **Multi-column layouts now render correctly on all screen sizes** — the grid system was fundamentally broken: named widths (`half`, `third`, etc.) and numeric spans were computed relative to the section's `columns` count, collapsing everything to 1 column in `columns: 1` sections and producing incorrect spans elsewhere. The grid now uses a fixed 12-column CSS grid; named widths map to stable 12-col fractions (`half` = span 6, `third` = span 4, etc.), numeric widths are treated as 12-col spans, and un-sized fields default to `12 ÷ columns` (e.g. 4 columns in a 3-col section). All previous schemas remain valid.
- **`ObjectField` columns now collapse to single-column on mobile** — the nested `SimpleGrid` inside object fields was using a fixed column count with no responsive breakpoint, causing multi-column sub-fields to remain side-by-side on narrow viewports.
- **`Textarea` not stretching to full width** — the `<Textarea>` component and its wrapper `<Box>` now explicitly set `width="100%"`.
- **All input components now reliably fill their grid cell** — `NumberInput`, `DateField`, `FileField`, `SelectField`, `SliderField`, and `TextField` (with prefix/suffix group) all lacked explicit `width="100%"`, causing them to render at intrinsic/shrink-wrapped widths in certain grid configurations. Fixed across all field types.
- **`FieldWrapper` (`Field.Root`) now always stretches to full cell width** — without `width="100%"` on the outer `Field.Root`, the label + input stack could shrink inside its grid cell.

---

## [1.0.5] - 2026-04-11

### Changed

- **Responsive multi-column forms** — `FormBuilder`'s grid now collapses to a single column on mobile (`base`) and restores the configured column count on `sm+`. Previously, multi-column layouts were fixed-width on all screen sizes.
- **Full-width fields on mobile** — all `gridColumn` spans are reset to `1 / -1` on mobile, preventing fields from rendering at fractional widths on small screens.
- **Responsive section padding** — `SectionBlock` border padding scales down on mobile for a tighter fit.

### Fixed

- **Sliders squeezed in multi-column layouts** — sliders in `widgetsSchema`, `settingsSchema`, and `onlyDirtySchema` now have `width: "full"` so they always span the full row regardless of the section's column count.
- **Examples page layout on mobile** — container padding, vertical spacing, demo card header/body padding, and the example title heading are all tuned for small screens. Prev/next navigation wraps cleanly on narrow viewports.

---

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
