# Feature: supabase-migration

**Objective:** Move DB to Supabase Postgres (keep Prisma), replace NextAuth with Supabase Auth, replace Cloudinary with Supabase Storage.
**Branch:** feat/supabase-migration
**Delivery strategy:** ask-on-risk. Push/PR/merge are the user's decisions.
**Tests:** none exist in the project; checks = `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Design
- Keep `public.User` (Prisma) as profile table; `User.id` = `auth.users.id` (uuid string). Role lives in `User.role`.
- `src/auth.ts` keeps exporting `auth()` returning `{ user: { id, role, name, email } } | null`, backed by `@supabase/ssr`, so API routes change minimally.
- Middleware refreshes the Supabase session cookie.
- User creation: Supabase admin API (service role) then `prisma.user.create` with the same id.
- Storage: public bucket `media`; server route signs an upload URL (role ADMIN/EDITOR), client uploads with `uploadToSignedUrl`.
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` (pooler), `DIRECT_URL`.

## Tasks
- [x] T1 Deps + Supabase clients (browser/server/admin) + middleware + `.env.example`
- [x] T2 Auth swap: `src/auth.ts`, login page, providers, replace `useSession` usages, sidebar sign-out, remove `/api/auth/[...nextauth]`
- [x] T3 Prisma schema cleanup (drop password, Account, Session, VerificationToken, cloudinary fields), users API via admin API, seed script
- [x] T4 Storage: `/api/storage/sign`, `SupabaseUpload` component replacing `CloudinaryUpload`, remove settings Cloudinary UI and sign route
- [x] T5 Docs: update CLAUDE.md + migration notes; remove unused deps (next-auth, bcryptjs)

## Route declaration
Delegated direct: one writer (T1-T5 touch 20+ non-trivial files).

## Progress / evidence
- T1 afd25d0: `npx tsc --noEmit` clean.
- T2 5a000d2: `npx tsc --noEmit` clean; eslint only reports the pre-existing `semi` rule conflict (repo style has no semicolons). pnpm-lock.yaml also updated (repo carries both lockfiles).
- T3 b89f577: `prisma validate` OK, `prisma generate` OK, tsc clean. Hand-written migration `20261019000000_supabase_auth_cleanup` (not executed). Cloudinary sign route removed here so the commit compiles.
- T4 6ed6129: tsc clean. Settings page, nav entry and i18n removed.
- T5: bcryptjs/@types/bcryptjs removed, CLAUDE.md updated; `npm run build` OK with placeholder env.
- No test suite exists, so no RED/GREEN evidence.
- Open: `next-auth` stays in package.json because `types/next-auth.d.ts` (outside the writer's edit surface) augments it. Delete both together, plus README.md `AUTH_SECRET` mentions.

## Manual steps (user)
Create the Supabase project, fill `.env` from `.env.example`, create public bucket `media`, run `npx prisma migrate deploy`, run `npx prisma db seed`.
