# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.15] - 2026-04-17

### Fixed

- **`checkboxgroup` / `multiselect` / `checkboxcard` — only first option selectable** — all `Checkbox.Root` instances rendered inside a `Field.Root` (Chakra/Ark UI) inherited the same `ids.hiddenInput` from the enclosing field context, causing every checkbox label's `htmlFor` to point to the same hidden input. Clicking any option therefore always fired on the first input in the DOM. Fixed by passing a unique `ids.hiddenInput` (`${name}-cb-${optValue}`) to each `Checkbox.Root` / `CheckboxCard.Root` so labels resolve to the correct input.

- **`pin` / `otp` field — slots beyond the first showing "undefined"** — the value passed to `PinInput.Root` was constructed with `String(value).split('')`, producing a shorter array than `length`. When `syncInputElements` ran after any state change, it called `setInputValue(input, undefined)` for out-of-range slots, which the browser serialised to the string `"undefined"`. Fixed by always passing a padded array of exactly `length` empty strings: `Array.from({ length }, (_, i) => String(value ?? '')[i] ?? '')`.

---

## [1.0.14] - 2026-04-16

### Fixed

- **Dark mode borders (re-applied)** — the `gray.200` → `{ base: 'gray.200', _dark: 'gray.700' }` fix for section boxes (`FormBuilder`), object group boxes (`ObjectField`), and array item cards (`ArrayField`), plus the array `#N` index counter contrast fix, were documented in the 1.0.12 changelog but were never actually committed to the tree (they remained in the working directory). This release commits those fixes so they land in the published package.
- **`ColorField` — `variant: 'chakra'` implementation (re-applied)** — likewise, the `ColorFieldSchema.variant: 'chakra'` feature documented in the 1.0.12 changelog (full Chakra `ColorPicker` with gradient area, hue/alpha sliders, hex input) was never committed. This release commits the implementation so it is actually usable from the published package.
- **`ColorField` native border token (re-applied)** — the `var(--chakra-colors-gray-200)` → `var(--chakra-colors-border)` swap for the native swatch's border, so it adapts automatically to dark/light mode.

---

## [1.0.13] - 2026-04-16

### Added

- **`pin` field — Chakra `PinInput`** — digit-by-digit code entry for PINs and OTPs. Supports `length` (default 4), `mask` (hides characters like a password), and `otp` (enables browser OTP autocomplete). Schema type: `PinFieldSchema`.

- **`rating` field — Chakra `RatingGroup`** — star-based rating input. Supports `count` (default 5), `allowHalf` (0.5-step increments), readOnly, and disabled states. Schema type: `RatingFieldSchema`.

- **`editable` field — Chakra `Editable`** — click-to-edit inline text with a pencil trigger and confirm/cancel actions. Supports `multiline` (renders a resizable textarea) and `placeholder`. Schema type: `EditableFieldSchema`.

- **`segmented` field — Chakra `SegmentGroup`** — pill-style segmented selector with animated indicator. Accepts `options`/`optionsFrom` (same as `radio`). Schema type: `SegmentedFieldSchema`.

- **`tags` field — Chakra `TagsInput`** — free-form tag entry; press Enter to add, click × to remove. Supports `placeholder`, `max` (max tags, also validated), and `allowDuplicates`. Schema type: `TagsFieldSchema`.

- **`checkboxcard` field — Chakra `CheckboxCard`** — multi-choice card selectors with optional descriptions per option. Supports `direction: 'row' | 'column'` and `options`/`optionsFrom`. Schema type: `CheckboxCardFieldSchema`.

- **`radiocard` field — Chakra `RadioCard`** — single-choice card selectors with optional descriptions per option. Supports `direction: 'row' | 'column'` and `options`/`optionsFrom`. Schema type: `RadioCardFieldSchema`.

- **`SelectFieldSchema.variant: 'chakra'`** — the `select` field now accepts `variant: 'chakra'` to render a full Chakra `Select` with floating listbox instead of the native `<select>`. The default `variant: 'native'` behaviour is unchanged.

- **`file` field upgraded to Chakra `FileUpload`** — the `file` field now renders Chakra's `FileUpload.Root` with a drag-and-drop dropzone, selected-file list with previews and per-file delete, instead of a plain `<input type="file">`. All existing `FileFieldSchema` props (`accept`, `multiple`, `maxSize`) continue to work as before.

- **New demo — "New Chakra Form Components"** — interactive example (`/examples?section=new-chakra-fields`) with dedicated sections for every new field type: PIN, rating, editable, segmented, tags, radio cards, checkbox cards, Chakra Select, and the upgraded file upload dropzone.

- **Updated "All Field Types" demo** — the existing `all-fields` example now includes all new field types alongside the original set, giving a single at-a-glance reference for the full field library (25+ types).

---

## [1.0.12] - 2026-04-16

### Added

- **`ColorFieldSchema.variant` — Chakra UI color picker** — the `color` field now accepts `variant: 'chakra'` to render a full Chakra UI `ColorPicker` (gradient area, hue/alpha sliders, hex input, swatch trigger) instead of the compact native browser swatch. The default `variant: 'native'` behaviour is unchanged.

### Fixed

- **Dark mode borders** — section boxes (`FormBuilder`), object group boxes (`ObjectField`), and array item cards (`ArrayField`) were using hard-coded `gray.200` borders that remained light-gray in dark mode, causing poor contrast. They now use `{ base: 'gray.200', _dark: 'gray.700' }` so borders invert correctly with the colour scheme.
- **`ColorField` native border** — replaced the hard-coded `var(--chakra-colors-gray-200)` CSS variable with `var(--chakra-colors-border)`, the Chakra v3 semantic border token that adapts automatically to dark/light mode.
- **Array item index label** — the `#N` counter text inside array cards now uses `{ base: 'gray.600', _dark: 'gray.400' }` instead of the fixed `gray.600` that became illegible in dark mode.

---

## [1.0.11] - 2026-04-13

### Fixed

- **`ArrayField` now correctly populates rows via `fillFrom`** — when `onFill` returns an array value for an `array`-type field, `ArrayField` detects the external `setValue` call and invokes `useFieldArray`'s `replace()` to sync its internal row state. Previously, `setValue` wrote the data into the RHF store but `useFieldArray` was unaware, so the UI showed no rows despite the values being present. The fix uses `useWatch` on the array field's own path and an effect that calls `replace()` whenever the store length diverges from `useFieldArray`'s tracked length — covering both "fill from API" and "reset to empty" scenarios without interfering with normal append/remove operations.

---

## [1.0.10] - 2026-04-13

### Fixed

- **`useRef` calls moved to top level** — all `useRef` initializations that were previously inside conditional branches or nested callbacks have been hoisted to the top level of their respective hooks/components, satisfying the `react-hooks/rules-of-hooks` lint rule and ensuring stable ref identity across renders.
- **`useWatch` dependency arrays corrected** — stale or missing entries in `useEffect` and `useCallback` dependency arrays that referenced `useWatch`-derived values have been corrected to include all consumed values, eliminating `react-hooks/exhaustive-deps` warnings and preventing subtle stale-closure bugs.
- **Removed stale `eslint-disable` directives** — inline `// eslint-disable-next-line` comments that suppressed rules no longer violated (after the two fixes above) have been deleted. Leaving them in place caused ESLint to error with `"unused eslint-disable directive"` under the project's `reportUnusedDisableDirectives` setting.

---

## [1.0.9] - 2026-04-13

### Performance

- **Scoped `useWatch` subscriptions — zero whole-form re-renders** — `FieldRenderer`, `SectionBlock`, and the top-level fields grid previously called `useWatch()` with no arguments, subscribing every component to the entire form store. Any value change (including values written by `fillFrom`) triggered a re-render of every field in the form. Each component now computes the exact field paths referenced in its `dependsOn` condition tree via the new `extractConditionFields` utility and calls `useWatch({ name: [...paths] })`, subscribing only to the values it actually needs. Fields with no `dependsOn` make zero subscriptions. On a 100-field form this reduces re-renders from O(N) per value change to O(1) — only the fields whose conditions reference the changed value re-render.
- **Stable `conditionValues` reference** — `FieldRenderer` now holds a ref to the previous condition-values snapshot and returns the same object reference when the values haven't changed (shallow equality per key). This prevents downstream `useMemo`/`useEffect` hooks from running on unrelated store ticks where subscribed values are unchanged.
- **`extractConditionFields` utility** — pure recursive function that walks a `Condition` tree (simple, compound `all`/`any`/`not`) and returns a deduplicated list of all `field` paths referenced. Exported for advanced consumers.
- **`TopLevelFields` component** — the inline fields grid that was previously rendered directly inside `FormBuilder` (and subscribed to the full form store via `form.watch()`) is now a dedicated component with its own scoped `useWatch`, isolating re-renders to the fields that have `dependsOn` conditions.
- **Removed `form.watch()` from `FormBuilder`** — the last whole-form subscription at the `FormBuilder` level has been eliminated. `FormBuilder` itself no longer re-renders on any field value change.

---

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
