# admin-dashboard

**Objective:** Turn `/admin` from a counter page into a useful working panel for staff who publish news and events, modern and professional, in the brand navy and gold.

**Problem:** `src/app/admin/page.tsx` shows a greeting, 4 counter cards and buttons. It does not help the user act on what is pending or upcoming.

**Direction (user-approved):** a work panel, not a SaaS chart dashboard (data is small; `PRODUCT.md` rejects the SaaS template and hero metrics). Contents: upcoming events (next 5 with date), latest news (recent, quick access to edit), compact counters, quick actions ("Nueva noticia", "Nuevo evento"), improved sidebar/topbar built on shadcn conventions and existing tokens.

**Scope:** `src/app/admin/page.tsx`, `src/components/admin/*` (shell, sidebar, new `dashboard/` components), `messages/es.json` and `messages/en.json` (`admin.dashboard` keys).

**Constraints:** product register (design serves the task); no gradients, no glass, no identical icon-card template, no hero metrics; brand tokens only (navy `--primary`, gold accent), light and dark must both work; WCAG 2.1 AA (contrast >= 4.5:1, 44px targets, visible focus); mobile first; Spanish primary + English; Prettier style; no new dependencies; do not touch lockfiles; use `npx tsc --noEmit` and `npx eslint` (not `npm run lint`). Do not invent routes: link only to routes that exist.

## Tasks
- [x] T1 Dashboard data + page layout (server queries: next 5 upcoming events, latest 5 news, counters; role-aware: users counter only for ADMIN) — tsc/prettier/eslint clean; users count query skipped for EDITOR; commit fd29647
- [x] T2 Dashboard components with empty states: counters row, UpcomingEvents, LatestNews, QuickActions — tsc/prettier/eslint clean; es/en dashboard keys added in same commit so it renders; commit c74214a
- [x] T3 Sidebar and topbar polish (active state, responsive, user menu area), keeping existing behavior — aria-current, 44px targets, focus rings, Escape closes drawer, hidden drawer not focusable; tsc/prettier/eslint clean; commit 37dd36f
- [x] T4 i18n keys in es and en for everything new; no hardcoded strings — shell/sidebar aria labels moved to admin.nav; removed unused dashboard.title/manage* keys (rg: zero references); dashboard keys were added in T2 commit; commit HASH4

## Acceptance
- `/admin` shows upcoming events, latest news, counters and quick actions; empty states when there is no data.
- EDITOR never sees links to ADMIN-only routes.
- Light and dark themes both legible; layout works at 320px without horizontal scroll.
- `npx tsc --noEmit`, `npx prettier --check` (touched code files) and `npx eslint` pass. One Conventional Commit per task.

## Checks
No test suite: RED/GREEN exception. Typecheck, prettier, eslint. A browser check needs an authenticated admin session; report honestly if it was not possible.

## Route
Delegated direct: one writer (4 tasks, 6+ non-trivial files; reading prepares the write).

## Progress / evidence
Route: delegated direct. Verification: tsc, prettier (touched code files), eslint clean. No browser check (no authenticated admin session). Contrast pairs: foreground/card, muted-foreground/card and /muted-50 hover, primary/card, foreground/muted (date block).
