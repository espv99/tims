# timeline-server-render

## Objective
Render `/timeline` data on the server instead of fetching `/api/news` and `/api/events` from the browser after hydration.

## Why
The page is a client component that fetches on mount: blank/skeleton first paint, extra round trips, no SEO content. Moving the queries to a server component sends the content in the first HTML.

## Scope
- `src/app/timeline/page.tsx` becomes an async server component that queries Prisma directly (same filters/order as the API routes: news with `publishedAt IS NOT NULL`, ordered newest first; events as the current page uses them).
- The interactive part (filter chips, list) moves to a client component that receives the data as props. Keep the current look, i18n and a11y.
- Add `loading.tsx` using the existing `SkeletonCard` so navigation still shows skeletons while the server renders.
- Serialize dates safely across the server/client boundary (ISO strings), keep the item shape the page already uses.
- Page must not break if the DB query fails (empty state like today) and must not be statically frozen (dynamic or short revalidate).
Out of scope: changing API routes (other code uses them), new filters, redesign.

## Tasks
- [x] T1 Server component + client list + loading.tsx (route: delegated direct; commit: see git log for `perf(timeline): render news and events on the server`, hash cannot be self-recorded)

## Acceptance
tsc, eslint, prettier clean on touched files; build passes and `/timeline` is dynamic or revalidated; the first HTML contains the news/event titles (curl); filters still work in a browser; no console errors.

## Progress / evidence
- T1 evidence: tsc clean; eslint 0 errors (1 no-console warning for the catch log); prettier clean; `next build` passes with /timeline as dynamic; production `next start` first HTML contains all 6 seeded titles (curl); filters All/News/Events work in a browser with no console errors/warnings; with the DB stopped the page returns 200 with the empty state. Not verified: Spanish locale in browser (same component, same i18n keys). No test suite: RED/GREEN not applicable.
- Engram mirror pending, the host session had ended when this was created.
