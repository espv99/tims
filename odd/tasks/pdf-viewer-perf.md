# pdf-viewer-perf

**Objective:** Make the landing-page PDF viewer cheap for low-bandwidth mobile users without changing what it shows.

**Problem (from 2026-11-07 audit):** `src/sections/landingpage/pdfReader.tsx` loads the pdf.js worker from `//unpkg.com` (third-party origin, no SRI), the viewer mounts at page load (`PdfReaderWrapper.tsx` dynamic import has no gate), every page renders at `800 * scale` px, the scroll region is not keyboard reachable, and touch targets are under 44px.

**Scope:** `src/sections/landingpage/pdfReader.tsx`, `PdfReaderWrapper.tsx`, the worker asset under `public/`, `next.config.ts` only if the worker needs wiring.

**Constraints:** keep download link and zoom controls; Spanish/English strings via existing i18n (`messages/*.json`); no new deps; do not touch lockfiles; Prettier style; use `npx tsc --noEmit` / `npx eslint` (not `npm run lint`).

## Tasks
- [x] T1 Self-host the pdf.js worker (match installed `pdfjs-dist` version), drop the unpkg URL — worker copied from pdfjs-dist@4.8.69 (version react-pdf resolves) to public/pdf.worker.min.mjs; tsc/prettier ok; no unpkg refs
- [x] T2 Mount the viewer only when it nears the viewport (IntersectionObserver), with a fixed-height placeholder to avoid layout shift — IntersectionObserver (200px margin, disconnect on hit) in PdfReaderWrapper; skeleton keeps 520px; tsc/eslint/prettier ok
- [x] T3 Render only pages near the viewport and size pages to the container width instead of `800 * scale` — per-page IntersectionObserver (600px margin) with fixed-size slots; width from ResizeObserver x scale; checked at 320px in browser: no page overflow, zoom scrolls inside the region, nothing fetched before the section nears the viewport
- [x] T4 A11y: scroll region `tabIndex=0` + `role="region"` + `aria-label`, controls and download link at least 44px tall — region/tabIndex/aria-label (viewerLabel in es+en), min-h-11 on controls and download link; tsc/eslint ok

## Acceptance
- No request to unpkg; worker served from own origin.
- Before the section is near the viewport, no pdf.js/react-pdf code or PDF bytes are fetched.
- No horizontal page overflow at 320px; zoom still works.
- `npx tsc --noEmit` and `npx prettier --check` pass. One Conventional Commit per task.

## Checks
No test suite: RED/GREEN exception. Typecheck, prettier, eslint, and a network check of the loaded page if a browser is available.

## Route
Delegated direct: one writer (reading prepares the write; 2+ non-trivial files).

## Progress / evidence
(none yet)
