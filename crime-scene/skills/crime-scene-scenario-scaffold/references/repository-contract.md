# Repository contract

Inspect a current neighboring scenario before generating code because types and factories may evolve.

## Shared files and registration

Add a `ScenarioSummary` entry and suspect/victim imports to `src/fixtures/index.ts`. It currently includes `id`, titles, creators, `gameType`, optional `emoji`, background image, color, development state, histories, description, places, suspects, and victims.

Keep the id lowercase and URL-safe. Use it consistently for routes, local storage, and `/image/scenario/<id>/...`. Use camelCase exports even if the id contains a hyphen.

Create:

```text
src/fixtures/<id>/suspects.ts
src/fixtures/<id>/prologue.tsx
src/fixtures/<id>/answer.tsx
src/app/scenarios/scenario/<id>/layout.tsx
src/app/scenarios/scenario/<id>/page.tsx
src/app/scenarios/scenario/<id>/answer/page.tsx
```

The answer route uses `createScenarioAnswerPage`. Its fixture satisfies `ScenarioAnswerConfig`, uses the id as `scenarioKey`, and follows the current `createScenarioReveal` pattern. If the answer is unknown, keep the scenario in development and use neutral draft content instead of choosing one.

`suspects.ts` exports typed `SuspectType[]` and one `VictimType` or a typed array matching the catalog expression. Ask for required cast fields rather than guessing them.

## CLUE

Also create:

```text
src/fixtures/<id>/clues.ts
src/fixtures/<id>/movePlace.ts
```

The page uses `createClueScenario`, `InGameLayout`, and the shared scenario theme.

- Export typed `ClueType[]` and additional questions from `clues.ts`.
- A basic clue uses a catalog place string; an additional clue uses an existing parent clue id.
- Clue ids are unique, and clue locks reference existing ids.
- Movement `from` and `to` values occur in catalog `places`.
- Visual assets live under `public/image/scenario/<id>/`; clue images live under `clues/`.

Empty clues and movement arrays are acceptable only while in development.

## TEXT

Also create:

```text
src/fixtures/<id>/clues.ts
src/fixtures/<id>/additionalQuestions.ts
src/app/scenarios/scenario/<id>/submit/page.tsx
```

The page uses `createTextScenario` and `InTextGame`.

- The prologue is a non-empty `string[]`; the factory rejects an empty prologue.
- Export typed `ClueData[]` and `Record<string, number[]>` keyword mappings.
- Every keyword mapping references an existing clue id.
- A clue with `physicalClueId` also has a non-empty `images` tuple.
- The submit page stores a complete `DetectiveNoteType` under the id and routes to its answer page.
- Suspect dropdown values match names exactly; additional-question ordering is stable.

For a content-light scaffold, use one neutral prologue sentence with empty clues, mappings, and additional questions, and keep the scenario in development.

## Metadata layout

When `src/libs/scenarioMetadata.ts` exists, follow this shape with literal id and route values:

```tsx
import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("<id>");

export default function ScenarioLayout({
  children,
}: LayoutProps<"/scenarios/scenario/<id>">) {
  return children;
}
```

If the helper is absent, copy the nearest scenario layout instead of introducing a metadata architecture during scaffolding.
