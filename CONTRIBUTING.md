# Contributing to Hookra

Thank you for your interest in contributing to Hookra! This guide will help you get started.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/manipratap2/hookra/issues) to avoid duplicates.

When filing a bug report, include:

- **A clear, descriptive title**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Your environment** (OS, Node.js version, browser, React version)
- **A minimal reproduction** (CodeSandbox, StackBlitz, or a repo link)

### Suggesting Features

Feature requests are welcome. Please open an issue with:

- A clear description of the feature
- The use case it solves
- Any API design ideas you have in mind

### Pull Requests

1. **Fork** the repository and create your branch from `main`.
2. **Install dependencies**: `npm install`
3. **Make your changes** in the `src/` directory.
4. **Ensure type safety**: `npm run typecheck`
5. **Ensure code quality**: `npm run lint`
6. **Build the library**: `npm run build`
7. **Test your changes** using the demo app: `npm run dev`
8. **Commit** with a clear, conventional message (see below).
9. **Push** your branch and open a PR.

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add rating field component
fix: resolve validation on nested array fields
docs: update README with slider examples
refactor: simplify condition evaluation logic
chore: update dependencies
```

## Development Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/hookra.git
cd hookra

# Install dependencies
npm install

# Start the dev server (includes demo site)
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Build the library
npm run build
```

### Project Structure

```
src/
  index.ts              # Public API exports
  types/                # TypeScript type definitions
  components/
    FormBuilder.tsx      # Main form component
    FieldRenderer.tsx    # Routes fields to their components
    FieldWrapper.tsx     # Labels, errors, helper text
    fields/             # Individual field components
  logic/                # Validation, conditions, defaults
  registry/             # Field component registry
  utils/                # Shared utilities
demo/                   # Demo site (not published to npm)
```

### Key Guidelines

- **TypeScript** is required for all source code. Strict mode is enabled.
- **No `any` types** unless absolutely necessary (and document why).
- Keep field components **self-contained** — each file handles one field type.
- Follow existing patterns when adding new field types.
- Do not add new dependencies without discussion in an issue first.

## Adding a New Field Type

1. Create `src/components/fields/YourField.tsx`
2. Add the type to `FieldType` union in `src/types/schema.ts`
3. Register it in `src/registry/defaultRegistry.ts`
4. Handle default values in `src/logic/buildDefaultValues.ts` (if needed)
5. Export it from `src/index.ts`
6. Add a demo schema in `demo/schemas/`

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
