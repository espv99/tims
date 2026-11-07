# audit-p2

**Objective:** Close the mechanical, low-risk P2 findings of the 2026-11-07 impeccable audit.

**Scope (in):**
- T1 Headings and aria: `CardTitle` can render a heading (`as` prop, default stays `div`); club and consejo-estudiantil use `h2`; decorative "◎" glyph gets `aria-hidden`.
- T2 Form control border contrast: raise `--input` (light and dark) so input/textarea borders reach >= 3:1 against their background (WCAG 1.4.11).
- T3 Hardcoded Spanish in the hero video (title and fallback text) moved to i18n; teacher photo `<img>` gets width/height, `loading="lazy"`, `decoding="async"` (no `next/image`: remote hosts not configured).
- T4 Remove unnecessary `'use client'` from Header, Footer, Video and `ui/card.tsx` where no hook/browser API needs it.
- T5 Global `prefers-reduced-motion` fallback in `globals.css` (no animation/transition beyond instant).

**Scope (out, reported only):** "Por definir" board roles (needs real content), video captions (needs a caption file and knowing if the video has speech), client-side timeline fetch (larger refactor), landing imagery and repeated icon rows (design decisions).

**Constraints:** brand tokens only; light and dark both legible; Spanish primary + English; no new dependencies; do not touch lockfiles; Prettier style; verify with `npx tsc --noEmit`, `npx eslint <files>`, `npx prettier --check <code files>` (not `npm run lint`); `next build` must still pass with the local env overrides.

## Tasks
- [x] T1 CardTitle heading + club/council h2 + aria-hidden glyph (tsc, eslint, prettier clean)
- [x] T2 --input contrast >= 3:1 (light and dark), computed not estimated (light 1.23->3.21, dark 1.37->3.16; border-input also used by button outline and admin/users selects)
- [ ] T3 Video i18n strings + teacher photo attributes
- [ ] T4 Drop unnecessary 'use client'
- [ ] T5 prefers-reduced-motion fallback

## Acceptance
- club/council pages expose h1 then h2 headings; no heading skips.
- Input border contrast measured >= 3:1 in both themes.
- `next build` passes; tsc, eslint, prettier clean on touched files. One Conventional Commit per task.

## Checks
No test suite: RED/GREEN exception. Typecheck, prettier, eslint, build, computed contrast values.

## Route
Delegated direct: one writer (5 tasks, 10+ files; reading prepares the write).

## Progress / evidence
Route: delegated direct.

