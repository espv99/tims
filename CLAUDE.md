# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TIMS is a university department website for ESPOCH's Information Technology Engineering program (Ingeniería en Tecnologías de la Información). It's a Next.js 15 App Router application with a public-facing site and an admin CMS for managing news and events. All UI is in Spanish.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint

# Database
npx prisma generate     # Regenerate Prisma client after schema changes
npx prisma migrate dev  # Apply schema migrations
npx prisma db seed      # Create the admin in Supabase Auth + User row (admin@tims.com / admin123 by default)
npx prisma studio       # Open Prisma Studio GUI
```

No test suite exists in this project.

## Environment Variables

See `.env.example`. Required in `.env`:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase project (Settings > API)
- `SUPABASE_SERVICE_ROLE_KEY` — server-only; used for user admin and signed upload URLs
- `DATABASE_URL` — Supabase pooled connection (Supavisor); `DIRECT_URL` — direct connection used by `prisma migrate`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — optional, used by the seed (defaults to admin@tims.com / admin123)

Supabase setup: create a public Storage bucket named `media`, then `npx prisma migrate deploy` and `npx prisma db seed`.

## Architecture

**Stack:** Next.js 15 (App Router) · TypeScript · PostgreSQL · Prisma ORM · Supabase (Postgres, Auth, Storage) · Tailwind CSS 4 · shadcn/ui

### Key Conventions

- `@/*` path alias maps to `./src/*`
- Prettier: 120-char line width, single quotes, trailing commas
- SVGs imported via `@svgr/webpack` as React components (`next.config.ts`)
- ESLint errors are ignored during builds (`next.config.ts`)
- Global styles in `src/styles/globals.css` and `src/styles/brand.css`

### Route Structure

| Path | Description |
|---|---|
| `/` | Landing page (public) |
| `/timeline` | News + Events combined view (public, client component, fetches from API) |
| `/club` | Club info (public) |
| `/consejo-estudiantil` | Student council page (public) |
| `/login` | Credentials login |
| `/admin` | Admin dashboard (ADMIN role only) |
| `/admin/news` | News CRUD |
| `/admin/events` | Events CRUD |

### Authentication & Authorization

Supabase Auth (email + password) via `@supabase/ssr` cookies. Three roles in the schema: `USER`, `EDITOR`, `ADMIN`. The role lives in the Prisma `User` table, whose `id` equals the Supabase `auth.users.id`.

- `src/auth.ts` exports `auth()`, which validates the cookie with `supabase.auth.getUser()` and returns `{ user: { id, role, name, email } }` (null if there is no session or profile row)
- `src/middleware.ts` refreshes the Supabase session cookie; Supabase clients live in `src/utils/supabase/` (`client`, `server`, `admin` = service role, server-only)
- Admin layout (`src/app/admin/layout.tsx`) server-side redirects unless `role` is `ADMIN` or `EDITOR`; `/admin/users` is ADMIN only
- API mutation routes check `session.user.role` via `auth()`
- `src/components/session-provider.tsx` exposes `useSession()` (fetches `/api/me`) for client components; `providers.tsx` wraps the app with `ThemeProvider` and that provider
- Users are created/deleted through the Supabase admin API plus the matching `User` row (`/api/users`)

### Storage

Images upload to the public Supabase bucket `media`. `/api/storage/sign` (ADMIN/EDITOR) returns a signed upload URL; `SupabaseUpload` (`src/components/admin/supabase-upload.tsx`) uploads directly from the browser and returns the public URL.

### API Routes

RESTful JSON APIs under `src/app/api/`. Pattern: `/api/news/route.ts` (collection) + `/api/news/[id]/route.ts` (single resource). Same pattern for events.

### Database

Prisma schema at `prisma/schema.prisma`. Key content models: `News` and `Event`. `User` has a `role` enum. Authentication tables live in Supabase's `auth` schema, not in Prisma.

News has an optional `publishedAt` field — the schema supports drafts, but the admin UI always sets `publishedAt: new Date()` on create, so draft functionality is not currently exposed. The public GET `/api/news` only returns records where `publishedAt IS NOT NULL`.

The Prisma client is a dev-cached singleton in `src/lib/prisma.ts` to avoid connection pool exhaustion during hot reloads.
