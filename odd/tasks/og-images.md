# og-images

## Objective
Each public page gets its own Open Graph / Twitter card (title, description, image) so shared links and Google previews show the right page.

## Why
Today there is no OG image at all, and per-page titles don't reach the social cards (they inherit the home's `openGraph`). `twitter:card` is `summary_large_image` but has no image.

## Decisions
- Images are generated with `next/og` `ImageResponse` from `opengraph-image.tsx` files (no new dependency, no binary assets): brand blue `#001b55` background, gold `#d79b05` accent, page title large, program name + "ESPOCH Sede Morona Santiago" small, `public/logo.png` embedded (read with fs, data URI). 1200x630.
- One shared renderer in `src/lib/og-image.tsx`; one `opengraph-image.tsx` per segment: root (home + fallback), `timeline`, `club`, `consejo-estudiantil`, `personal-docente`. Titles come from the existing `seo.*` messages (crawlers send no locale cookie, so Spanish is expected).
- A shared `pageMetadata({ title, description, path })` helper in `src/app/metadata.ts` returns title, description, canonical, and a full `openGraph` + `twitter` block (page-level `openGraph` replaces the root one entirely, so it must carry type, locale, siteName, url, title, description). The 4 pages use it.
- Twitter image: make sure `twitter:image` is emitted (twitter-image file or equivalent); verify in the HTML.

## Scope
`src/lib/og-image.tsx`, `src/app/**/opengraph-image.tsx` (+ twitter-image if needed), `src/app/metadata.ts`, the 4 page files, messages only if a missing string is needed.
Out of scope: changing titles/descriptions already shipped, new fonts files, admin/login pages.

## Tasks
- [x] T1 Shared renderer + 5 image routes + `pageMetadata` helper + pages wired

## Acceptance
tsc/eslint/prettier clean on touched files; build passes; for each of the 5 pages the HTML has `og:image` and `twitter:image` with absolute URLs under `https://timacas.vercel.app` (or NEXT_PUBLIC_SITE_URL), `og:title` equals the page title, and the image URL returns 200 `image/png` of 1200x630; images look right (view at least two via Playwright screenshot or by saving the PNG and opening it).

## Progress / evidence
- T1 route: delegated direct (writer; 2+ non-trivial files). No test suite exists, so RED/GREEN does not apply.
- T1 evidence: tsc, eslint (0 errors) and prettier clean; next build passes; the 5 pages emit og:title/description/image and twitter:image (absolute https://timacas.vercel.app URLs; twitter:image comes from opengraph-image automatically, so no twitter-image files); all 5 images 200 image/png 1200x630; home and consejo-estudiantil/club PNGs viewed, accents render and nothing is clipped.
- Engram mirror pending.
