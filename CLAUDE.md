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
npx prisma db seed      # Seed default admin user (admin@tims.com / admin123)
npx prisma studio       # Open Prisma Studio GUI
```

## Architecture

**Stack:** Next.js 15 (App Router) · TypeScript · PostgreSQL · Prisma ORM · NextAuth v5 · Tailwind CSS 4 · shadcn/ui

### Key Conventions

- `@/*` path alias maps to `./src/*`
- Prettier: 120-char line width, single quotes, trailing commas
- SVGs imported via `@svgr/webpack` as React components
- ESLint errors are ignored during builds (`next.config.ts`)

### Route Structure

| Path | Description |
|---|---|
| `/` | Landing page (public) |
| `/timeline` | News + Events combined view (public) |
| `/club` | Club info (public) |
| `/login` | Credentials login |
| `/admin` | Admin dashboard (ADMIN role only) |
| `/admin/news` | News CRUD |
| `/admin/events` | Events CRUD |

### Authentication & Authorization

NextAuth v5 with JWT + Credentials provider. Three roles: `USER`, `EDITOR`, `ADMIN`.

- Auth config lives in `src/auth.ts`
- JWT callback injects `role` into the token; session callback exposes it
- Admin layout (`src/app/admin/layout.tsx`) performs server-side redirect if role ≠ ADMIN
- API routes validate `session.user.role === 'ADMIN'` before mutations

### API Routes

RESTful JSON APIs under `src/app/api/`. All mutations require authentication; destructive operations require ADMIN role. Pattern: `/api/news/route.ts` (collection) + `/api/news/[id]/route.ts` (single resource).

### Component Organization

- `src/sections/` — large page-section components (header, footer, landing page blocks)
- `src/components/ui/` — shadcn/ui primitives (Button, Card, Input, etc.)
- `src/components/` — app-level wrappers (e.g., `providers.tsx` for SessionProvider)

### Database

Prisma schema at `prisma/schema.prisma`. Key models: `User` (with role enum), `News` (with optional `publishedAt`), `Event`. News is only shown publicly when `publishedAt` is set.

The Prisma client is a dev-cached singleton in `src/lib/prisma.ts` to avoid connection pool exhaustion during hot reloads.
