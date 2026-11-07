# board-members

## Objective
Replace the hardcoded "Por definir" board cards on `/club` and `/consejo-estudiantil` with members managed from the admin panel (like Teacher).

## Decisions
- Fixed roles: one holder per role per body (PRESIDENT, VICE_PRESIDENT, SECRETARY, TREASURER, MEMBER). Bodies: CLUB, COUNCIL.
- A role with no holder keeps showing the existing "Por definir" text, so nothing breaks while data is loaded.
- Optional photo via `SupabaseUpload` (compressed, <= 512 KB, maxDimension 800), rendered with `next/image`.

## Scope
Prisma model + hand-written migration; `/api/board` (GET public, PUT upsert by body+role, DELETE clear; ADMIN/EDITOR for mutations); `/admin/board` page + sidebar link + es/en messages; public pages read from DB; CLAUDE.md route/model docs.
Out of scope: applying the migration to production (user runs `prisma migrate deploy`), free-form roles.

## Tasks
- [x] T1 Schema + migration + `/api/board` — route: delegated direct; tsc/eslint/prettier clean, migration applied on local Postgres, `prisma migrate diff` shows no drift
- [x] T2 Admin page `/admin/board`, sidebar link, messages es/en — route: delegated direct; tsc/eslint/prettier clean, es/en key sets identical; browser e2e recorded under T3
- [x] T3 Public pages `/club` and `/consejo-estudiantil` read members; CLAUDE.md docs — route: delegated direct; tsc/eslint/prettier clean, `next build` passes; prod build e2e on local DB-only Supabase: admin set Club president, shown on /club, /consejo-estudiantil unaffected, clear restores fallback; EDITOR PUT/DELETE 200, unauthenticated PUT/DELETE 401, invalid input 400. Photo upload NOT verified (storage excluded). No test suite: RED/GREEN n/a. Commits: T1 2aa51fa, T2 c1df421

## Acceptance
tsc, eslint, prettier clean on touched files; build passes; migration applies on a local Postgres; end-to-end: set a member in admin, it appears on the public page; clearing it restores "Por definir".

## Progress / evidence
(none yet)
