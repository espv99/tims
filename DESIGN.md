---
name: Ingeniería en Tecnologías de la Información, Sede Morona Santiago
description: Official site of the program at ESPOCH. Navy authority, gold as the seal.
colors:
  midnight-institute: "#001b55"
  midnight-institute-soft: "#1a3a85"
  mine-gold: "#d79b05"
  mine-gold-deep: "#c48a04"
  page-white: "#ffffff"
  ink-night: "#020817"
  slate-wash: "#f1f5f9"
  slate-ink: "#64748b"
  hairline: "#e2e8f0"
  night-surface: "#1e293b"
  night-muted: "#94a3b8"
  midnight-text: "#bfdbfe"
  midnight-text-subtle: "#93c5fd"
  alert-red: "#c52020"
  alert-red-night: "#f87272"
typography:
  display:
    fontFamily: "Poppins, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw + 1rem, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  headline:
    fontFamily: "Poppins, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-institute}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.midnight-institute-soft}"
  button-cta:
    backgroundColor: "{colors.mine-gold}"
    textColor: "{colors.midnight-institute}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-cta-hover:
    backgroundColor: "{colors.mine-gold-deep}"
  button-outline:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  input:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  card:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.mine-gold}"
    textColor: "{colors.midnight-institute}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Ingeniería en Tecnologías de la Información, Sede Morona Santiago

## 1. Overview

**Creative North Star: "The Faculty Lectern"**

A lectern is where a department speaks with authority and without raising its voice. The site works the same way: deep navy sets the institutional tone, gold appears only where something is being certified, announced or offered, and the content (real projects, real people, real outcomes) does the persuading. Surfaces are flat and tonal. Structure comes from hairlines, generous spacing and blocks of color, never from decoration.

The system serves four audiences on small screens: applicants judging credibility, students looking for news, faculty and authorities checking institutional facts, and companies looking for outreach projects. It therefore favors legibility and calm hierarchy over spectacle. It explicitly rejects the generic university portal (stock banners, carousels, logo walls, bureaucratic copy), the SaaS/startup template (gradients, identical icon cards, hero metrics) and cliché hacker aesthetics (green terminal text, neon).

**Key Characteristics:**
- Navy-led, gold as a seal: the accent is rare on purpose.
- Flat and tonal elevation; depth through color blocks and hairline borders.
- One body family (Inter), one display voice (Poppins), strong weight contrast.
- Light and dark themes both supported; layouts must survive Spanish and English copy at mobile width.
- WCAG AA is the floor, not a goal.

## 2. Colors

A committed navy with a single gold accent over cool, barely tinted neutrals.

### Primary
- **Midnight Institute** (#001b55): the brand and the primary action color. Hero and footer surfaces, primary buttons, the wordmark, links in light theme. It is the only blue allowed as a brand color.
- **Midnight Institute Soft** (#1a3a85): hover and pressed state of navy surfaces and buttons; secondary text blocks on navy.

### Secondary
- **Mine Gold** (#d79b05): the seal. Calls to action on navy, the badge above the hero, selected states. Used on 10% or less of any screen.
- **Mine Gold Deep** (#c48a04): hover state of gold.

### Neutral
- **Page White** (#ffffff): page and card background in light theme.
- **Ink Night** (#020817): body text in light theme and page background in dark theme.
- **Slate Wash** (#f1f5f9): muted and secondary surfaces, hover backgrounds.
- **Slate Ink** (#64748b): secondary text, 4.7:1 on white; do not use it on Slate Wash for body copy.
- **Hairline** (#e2e8f0): borders and dividers in light theme.
- **Night Surface** (#1e293b): cards, muted surfaces and borders in dark theme.
- **Night Muted** (#94a3b8): secondary text in dark theme.
- **Midnight Text** (#bfdbfe) and **Midnight Text Subtle** (#93c5fd): secondary and tertiary text on Midnight Institute surfaces (hero subtitle, footer). Tokens `blueti-muted` and `blueti-subtle`; never use stock Tailwind blues for this.
- **Alert Red** (#c52020): destructive actions and error text in light theme (6.2:1 on white). Token `destructive` for fills and `destructive-text` for text.
- **Alert Red Night** (#f87272): error text in dark theme, where Alert Red would sink into the background.

### Named Rules
**The Seal Rule.** Mine Gold marks one thing at a time: the primary invitation or the active state. If gold appears in three places on a screen, two of them are wrong.

**The One Blue Rule.** There is a single brand blue, Midnight Institute. The stock shadcn blue (`hsl(221 83% 53%)`) currently behind `--primary` is drift and must be replaced by it.

**The Gold-On-Navy Rule.** Gold text and gold fills sit on navy (6.7:1). Text on a gold fill is navy, never white (white on gold is 2.4:1 and fails AA).

**The Token Rule.** Colors come from the tokens above (`blueti`, `gold`, `blueti-muted`, `blueti-subtle`, `destructive-text` and the shadcn semantic set). No raw Tailwind palette classes such as `text-blue-200` or `text-gray-700` in components.

**The Dark Navy Rule.** In dark theme, navy is a surface and never a text or border color; it disappears against Ink Night. Switch interactive accents to Mine Gold or to a lightened navy tint.

## 3. Typography

**Display Font:** Poppins (600/700, with Inter and system sans as fallback)
**Body Font:** Inter (variable, with system sans as fallback)

**Character:** Poppins gives headings a confident, rounded geometric presence that reads as welcoming rather than bureaucratic; Inter keeps long Spanish and English text neutral and precise. Poppins is declared in the code as `--font-heading` but headings do not yet use it; this system makes it the heading voice.

### Hierarchy
- **Display** (700, clamp(1.875rem, 4vw + 1rem, 3rem), 1.15): the hero title only. One per page.
- **Headline** (600, 1.5rem, 1.25): section titles.
- **Title** (600, 1.25rem, 1.3): card and list-item titles.
- **Body** (400, 1rem, 1.6): all running text; 1.125rem from `md` up for lead paragraphs. Cap line length at 65 to 75ch.
- **Label** (600, 0.75rem, 0.1em tracking, uppercase): badges and short tags, four words at most.

### Named Rules
**The Heading Voice Rule.** Headings are Poppins, everything else is Inter. No third family.

**The One Kicker Rule.** The uppercase gold badge belongs to the hero. Do not repeat it above every section.

## 4. Elevation

The system is flat and tonal. At rest nothing casts a shadow; depth comes from the contrast between navy blocks and white sections, hairline borders (`1px #e2e8f0`) around cards, and Slate Wash behind secondary content. The only elevation tied to state is the sticky header, which gets a hairline bottom border and a slightly translucent page background.

### Shadow Vocabulary
- **None at rest.** Cards, buttons and inputs carry no shadow; hover on a card changes its border color only.
- **Floating overlays** (`shadow-md` for the mobile menu panel, `shadow-lg` for the language dropdown): the one exception, because an overlay must separate from the page it covers.
- **Focus ring** (`0 0 0 2px #ffffff, 0 0 0 4px <ring>`): the one required glow, on every focusable element via `:focus-visible`.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. If a card needs a shadow to be seen, its border or background is wrong.

## 5. Components

Sober and firm: components look finished and unembellished.

### Buttons
- **Shape:** gently curved (8px).
- **Primary:** Midnight Institute fill, white text, 40px tall, 16px horizontal padding. Hover shifts to Midnight Institute Soft.
- **CTA on navy:** Mine Gold fill, Midnight Institute text, 12px 24px padding. Hover shifts to Mine Gold Deep.
- **Outline:** page background, 1px Hairline border, Ink Night text, 36px tall; hover fills Slate Wash.
- **Focus:** 2px ring with 2px offset, always visible on keyboard focus. Disabled drops to 50% opacity and ignores pointer events.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** page background (white, or Night Surface in dark).
- **Shadow Strategy:** none; see Elevation.
- **Border:** 1px Hairline.
- **Internal Padding:** 24px.

### Inputs / Fields
- **Style:** 1px Hairline stroke, page background, 8px radius, 40px tall.
- **Focus:** 2px ring with offset; no color-only change.
- **Error / Disabled:** error text in Alert Red under the field, never color alone; disabled at 50% opacity.

### Navigation
- Sticky header on a translucent page background with a hairline bottom border. Brand text left (full name from `sm`, "TIMS" on mobile), links right at 14px medium weight with a Slate Wash hover. Language switch and theme toggle sit beside the links; below `md` they sit beside the menu button and links collapse into a panel. The login link is an outline button.

### Badge
- Mine Gold on a navy surface, uppercase Label type, fully rounded. Only in the hero.

### Footer
- A full Midnight Institute block with white text and gold links on hover, three columns from `md`.

## 6. Do's and Don'ts

### Do:
- **Do** let Midnight Institute (#001b55) carry hero, footer and primary actions, and use Mine Gold (#d79b05) as a rare seal.
- **Do** put navy text on gold fills and gold or white text on navy surfaces; check every pair for AA.
- **Do** use real program content (named projects, teachers, learning outcomes) in place of filler.
- **Do** set headings in Poppins and body in Inter, with at least a 1.25 scale step between levels.
- **Do** keep layouts intact at 360px width and in both Spanish and English strings; test long words.
- **Do** keep a visible `:focus-visible` ring and honor `prefers-reduced-motion` on every transition.
- **Do** use `text-wrap: balance` on headings and cap running text at 65 to 75ch.

### Don't:
- **Don't** build a generic university portal: no stock-photo banners, carousels, logo walls or bureaucratic copy.
- **Don't** build a SaaS/startup template: no gradients, no gradient text, no grids of identical icon-and-heading cards, no hero metrics.
- **Don't** use hacker clichés: no green terminal text, neon accents or Matrix effects.
- **Don't** use white text on a gold fill (2.4:1).
- **Don't** introduce a second blue; the shadcn default `hsl(221 83% 53%)` must be retired from `--primary`.
- **Don't** add shadows to cards or buttons at rest, and don't use glassmorphism beyond the sticky header's subtle translucency.
- **Don't** use a colored `border-left` stripe on cards, callouts or list items.
- **Don't** repeat the uppercase gold badge above every section.
- **Don't** use more than two font families or all-caps for sentences.
