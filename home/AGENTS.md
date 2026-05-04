# AGENTS.md

This file defines repository-specific guidance for Codex and other coding agents working in this project. Apply these rules by default unless the user explicitly asks for something different.

## Project Shape

- Stack: Next.js `pages` router, React 18, TypeScript, MUI.
- TypeScript is `strict`; keep types explicit when they improve readability or protect data boundaries.
- Use the `@/` path alias for imports from `src`.
- Main code lives under `src/pages`, `src/components`, `src/hooks`, and `src/features/<feature-name>`.

## Naming Conventions

- Use `camelCase` for variables, functions, props, hook return values, and local helpers.
- Use `PascalCase` for React components, type aliases, and interfaces.
- Use `UPPER_SNAKE_CASE` for module-level constants that are true constants, especially configuration-like values such as `BACKGROUND_COLOR` or `MAX_VISIBLE`.
- Prefix hooks with `use`, e.g. `useLocalStorage`, `useRecommendedQuiz`.
- Keep scenario, fixture, and data identifiers in existing project style, usually `camelCase` with descriptive suffixes like `schoolClues`, `durePrologue`, `bluemoonAnswerConfig`.

## Files and Exports

- Follow existing file naming patterns:
  - Components: `PascalCase.tsx`
  - Hooks: `useSomething.ts`
  - Types/fixtures/utils: existing local convention in each folder
  - Next pages: `index.tsx`, `[...id].tsx`, `answer.tsx`, `submit.tsx`, etc.
- Default export is standard for page components and many leaf UI components in this repo. Do not refactor to named exports unless there is a local reason.
- Use named exports for shared types, fixtures, and reusable constants where that is already the pattern.

## Component Conventions

- Keep page files thin when possible. Put reusable or feature-specific UI into `src/features/.../components` or `src/components`.
- Separate large UI blocks into smaller components when a file starts carrying multiple distinct responsibilities.
- Prefer small local helper components inside the same file only when they are tightly coupled and not reused elsewhere.
- Type component props explicitly with `interface` or inline object types. Reuse shared domain types when they already exist.

## Styling Conventions

- Prefer MUI primitives and the `sx` prop, matching the current codebase style.
- Use responsive objects/arrays for mobile behavior instead of branching markup when a layout-only change is enough.
- Preserve desktop behavior when making mobile fixes unless the user asks for broader redesign.
- Reuse existing color tokens/constants in a file before introducing new ones.

## State and Data

- Prefer `const` by default. Use `let` only when reassignment is required.
- Keep derived values as local `const`s near their usage.
- Avoid unnecessary `useMemo`/`useCallback`; only use them when there is a clear render or dependency reason.
- Keep API response shapes typed at the boundary, as seen in files like `src/pages/api/getCluesWithKeyword.ts`.

## Project Organization

- Put feature-specific logic, fixtures, and components under the relevant `src/features/<feature-name>` directory.
- Keep generic shared UI in `src/components`.
- Keep reusable hooks in `src/hooks` unless they are tightly bound to a single feature.
- Avoid creating new top-level patterns when an established feature-local pattern already exists.

## Editing Rules

- Match the existing local style before applying generic preferences.
- Keep changes focused; do not opportunistically rename files, symbols, or folders across the repo.
- Preserve current public routes and storage keys unless the task requires changing them.
- Do not introduce a new architecture layer or abstraction for small tasks.

## Validation

- For targeted UI or file changes, prefer narrow validation first.
- Useful commands:
  - `npm run lint`
  - `npx eslint <file-paths>`
  - `npm run build`
- Existing repo-wide lint warnings may already exist. Do not treat unrelated pre-existing warnings as part of the task unless the user asks.

## When Unsure

- Copy the nearest established pattern from the same feature.
- Prefer consistency with neighboring files over idealized style-guide purity.
