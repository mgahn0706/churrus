---
name: crime-scene-scenario-scaffold
description: Scaffold a new CLUE or TEXT crime-scene scenario in the suspect-web/crime-scene Next.js repository from basic catalog and cast information. Use when adding scenario fixtures, routes, metadata, asset paths, and scenarioCatalog registration; not for writing a complete mystery or importing a structured quiz ZIP or PDF.
---

# Crime Scene Scenario Scaffold

Create a compiling, deliberately incomplete scenario skeleton that follows the repository's current conventions. Preserve story details supplied by the user. Do not invent the culprit, method, motive, clues, or solution unless asked.

## Confirm the target

Use this skill only when the repository contains `src/fixtures/index.ts`, `src/types/index.ts`, and `src/app/scenarios/scenario/`. Otherwise ask for the correct repository.

Before editing, read `src/types/index.ts`, `src/types/answerPage.ts`, `src/fixtures/index.ts`, one recently completed scenario of the requested `gameType`, and `src/libs/scenarioMetadata.ts` when present. Current repository patterns override examples in this skill.

## Gather the basics

Obtain or safely derive:

- route `id` and camelCase symbol prefix
- Korean and English titles
- creators and `CLUE` or `TEXT` game type
- description, theme color, histories, and places
- background image path or attached image
- suspect and victim name, age, gender, job, short description, and profile image path when available
- optional emoji for `TEXT`

Do not block scaffolding on a complete prologue, clues, answers, final arguments, or culprit information. If an image is unavailable, use the agreed expected path, keep `isInDevelopment: true`, and report the missing asset. Never silently reuse another scenario's image.

## Scaffold

Read [references/repository-contract.md](references/repository-contract.md) for the file set and type-specific invariants.

Register the scenario and its suspect/victim imports in `scenarioCatalog`. New skeletons default to `isInDevelopment: true` unless explicitly launch-ready. Catalog order controls `episodeNumber`; preserve requested placement or append by default.

Use compiling empty collections for content not supplied. Use concise comments or neutral draft copy for intentionally unfinished story content, and never encode a fabricated answer. Do not create empty image files.

Add a scenario `layout.tsx` using `createScenarioMetadata(id)` when available. For `TEXT`, adapt the nearest current submit page: options must match the supplied cast, additional questions retain order, the local-storage key equals the id, and the answer route uses that id.

## Verify

Run configured formatting and `npm run build`. Check that:

- the id is unique and accepted by `ScenarioId`
- exported symbols and imports agree
- place names and clue references satisfy the current factories
- `TEXT` keyword mappings reference existing clue ids
- expected assets exist, reporting any missing paths
- generated HTML has `<scenario title> | 협동 크라임씬` when metadata support exists

Report created files, build status, missing story sections, and missing assets. Compiling alone is not grounds to set `isInDevelopment: false`.
