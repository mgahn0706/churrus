# Churrus Crime Scene

An online cooperative mystery game by Churrus (추러스). Players explore a case, collect clues, question suspects, and work out what happened. The app contains several self-contained scenarios with clue, text, and interrogation game modes.

## Run locally

Requires Node.js 20.9 or newer and npm. Run these commands from this directory:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000/scenarios](http://localhost:3000/scenarios). The root URL redirects there. No environment variables are required for local development.

To run a production build locally:

```bash
npm run build
npm run start
```

## Project layout

| Path | Purpose |
| --- | --- |
| `src/app/scenarios/` | App Router pages for the catalog, rules, scenarios, answers, and other flows |
| `src/fixtures/index.ts` | Scenario catalog, game type factories, and fixture validation |
| `src/fixtures/<scenario>/` | Clues, suspects, dialogue, prologues, and other scenario content |
| `src/components/InGame/` | Shared clue game interface |
| `src/components/InTextGame/` | Shared text game interface |
| `src/components/InInterrogationGame/` | Shared interrogation game interface |
| `src/features/interrogation/` | Interrogation engine and content tools |
| `src/types/` | Shared scenario and clue types |
| `public/image/scenario/<scenario>/` | Scenario images, maps, and clue assets |

The catalog lives at `/scenarios`. A scenario's game page is `/scenarios/scenario/<id>`; scenario-specific answer or submit pages live under that route. The app currently supports `CLUE`, `TEXT`, and `INTERROGATION` scenarios.

## Add or edit a scenario

1. Add or update the scenario entry in `src/fixtures/index.ts`. Its `id`, `gameType`, `places`, and image paths determine how the scenario is loaded.
2. Keep the scenario content in `src/fixtures/<id>/` and connect it from `src/app/scenarios/scenario/<id>/page.tsx` using the matching scenario factory.
3. Put public assets under `public/image/scenario/<id>/`. Clue game maps use `map/<id>-<place>.png`, where `<place>` matches an entry in the catalog's `places` array.
4. For clue games, define each clue in its fixture with an ID, image, description, and `x`/`y` percentage coordinates. A basic clue's `place` is a map name; an additional clue's `place` is its parent clue's numeric ID. Define transitions between maps in `movePlaceButtons`.
5. Run the checks below. `createClueScenario` validates clue IDs, parent links, map names, transitions, and interrogation references at load time.

### Circus clue position editor

Open the [circus admin page](http://localhost:3000/scenarios/scenario/circus/admin) to select the auditorium, indoor, or outdoor map. Drag a marker, click the map to move the selected clue, or enter exact `x`/`y` percentages. The sidebar also edits each clue's name, description, location label, map or parent clue, and basic or additional type. The additional clues tab previews the selected parent clue and lets you drag its child markers; those coordinates are percentages of the full clue dialog. The editor keeps an unsaved draft in browser storage.

In local development, **변경 저장** writes the edited clues directly to `src/fixtures/circus/clues.ts`. On a deployed site, download the updated `clues.ts`, replace that file in the repository, and redeploy to make the changes visible to all players.

## Checks

```bash
npm run lint
npm run test:interrogation
npx tsc --noEmit --incremental false
npm run build
```

The `bee`, `anagram`, `puzzle`, and `connections` scripts are content generation tools, not part of the normal development loop.

## Optional environment variables

| Variable | Use |
| --- | --- |
| `GOOGLE_SITE_VERIFICATION` | Adds a Google site verification tag to page metadata |
| `PSYCHIC_ADMIN_SESSION_SECRET` | Sets the session signing secret for the psychic admin page |
