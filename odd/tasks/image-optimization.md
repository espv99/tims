# image-optimization

**Objective:** Every image uploaded through the admin ends up small (<= 512 KB), in a web format, and is served optimized, starting with teacher profile photos.

**Problem:** `SupabaseUpload` accepts any `image/*` and `video/*` of any size and uploads it as is; `/api/storage/sign` does not validate type; images are rendered with raw `<img>` and `next.config.ts` has no `images` config.

**Scope (in):**
- T1 Client-side compression in `SupabaseUpload`: decode, resize (default max side 1600 px, teacher photos 800 px via prop), encode WebP in a quality loop until <= 512 KB (shrink dimensions if quality alone is not enough), upload as `image/webp` with a `.webp` name. Only JPEG, PNG and WebP inputs; clear Spanish/English error if the file is not decodable or cannot reach 512 KB. Videos removed from the picker.
- T2 Server validation in `/api/storage/sign`: extension whitelist (webp, jpg, jpeg, png), 400 otherwise.
- T3 `next/image` for rendering: `images.remotePatterns` built from `NEXT_PUBLIC_SUPABASE_URL` (path `/storage/v1/object/public/**`), replace raw `<img>` for the public teacher photo and the admin previews/thumbnails; keep local dev (127.0.0.1 Supabase) working.
- T4 Docs: CLAUDE.md Storage section documents the 512 KB limit and the bucket setup (`media`, public, file size limit 512 KB, allowed MIME types).

**Out of scope:** changing the remote bucket settings (the user does that in the Supabase dashboard), Supabase image transformations (paid plan), video uploads.

**Constraints:** no new dependencies (native canvas / createImageBitmap); keep Prettier style; i18n for every new visible string in both messages files; do not touch lockfiles; verify with `npx tsc --noEmit`, `npx eslint <files>`, `npx prettier --check <code files>` (not `npm run lint`).

## Tasks
- [x] T1 Compression util + SupabaseUpload integration (limit, WebP, maxDimension prop, no video) -- tsc, prettier, eslint (0 errors) clean; messages key sets identical; commit PLACEHOLDER1
- [x] T2 Whitelist validation in /api/storage/sign -- tsc, prettier, eslint clean; 400 behaviour exercised in the end-to-end check; commit PLACEHOLDER2
- [ ] T3 next/image config and usages
- [ ] T4 CLAUDE.md storage docs

## Acceptance
- A 4 MB phone JPEG uploaded for a teacher ends as a WebP <= 512 KB with max side 800 px.
- A non-image or undecodable file shows a clear error and uploads nothing.
- `/api/storage/sign` rejects a non-whitelisted extension with 400.
- Public teacher photo renders through `next/image` in a production build.
- `tsc`, `eslint`, `prettier` clean on touched files; `next build` passes. One Conventional Commit per task.

## Checks
No test suite: RED/GREEN exception. Typecheck, lint, prettier, build, and a real upload against the local Supabase stack with Storage enabled if feasible; otherwise report it as NOT verified.

## Route
Delegated direct: one writer (4 tasks, 8+ files; reading prepares the write).

## Progress / evidence
(none yet)
