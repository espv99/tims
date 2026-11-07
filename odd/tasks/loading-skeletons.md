# loading-skeletons

**Objective:** Show skeleton loaders on every client-fetched view so users never see an empty or jumping page while data loads.

**Problem:** There is no `loading.tsx`, skeleton or spinner anywhere in `src`. Client pages that `fetch` render blank/empty until data arrives.

**Scope:** `/timeline`, `/admin/news`, `/admin/events`, `/admin/teachers`, `/admin/users`, and the `/login` submit state. Skeletons (not spinners) for lists/tables; button pending state for login.

**Constraints:** Spanish UI copy only where text is visible/aria; Prettier (no semicolons, single quotes, 120 cols); no new deps; do not touch `pnpm-lock.yaml` / `package-lock.json` (`npm run lint` may invoke pnpm and rewrite it, so use `npx eslint` / `npx tsc --noEmit`).

## Tasks
- [x] T1 Skeleton primitive `src/components/ui/skeleton.tsx` (shadcn style, `animate-pulse`, `aria-hidden`) - commit 9523f01
- [x] T2 `/timeline` skeleton cards while loading - commit 204dd18 (existing local SkeletonCard rebuilt on the primitive, matching loaded card footprint)
- [x] T3 Admin lists skeletons: news, events, teachers, users - commit 2715d73 (local PageSkeleton replaces the text-only loading return)
- [x] T4 `/login` pending state on submit button - already implemented (`disabled={loading}` + `t('submitting')` text, es/en keys exist); no code change, closed in the doc commit

## Acceptance
- Each view shows a skeleton with the same layout footprint as loaded content while `loading` is true, and hides it on success or error.
- `npx tsc --noEmit` and `npx prettier --check` pass on touched files.
- One Conventional Commit per task on `feat/loading-skeletons`.

## Checks
No test suite exists: RED/GREEN exception. Proportionate checks: typecheck, prettier, visual check of loading state.

## Route
Delegated direct: one writer (4 tasks, 6+ non-trivial files; reading prepares the write).

## Progress / evidence
Route: delegated direct (one writer, 4 tasks, 6+ files).
- `npx tsc --noEmit`: clean. `npx prettier --check` on touched files: pass. `npx eslint` on touched files: only pre-existing warnings (no-img-element, no-console), none introduced.
- Visual check of loading state: not performed (no browser run by the writer).
