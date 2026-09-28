# Codex handoff — Insight Desk Part 4

## Goal

Add and publish **Part 4 of 5: “Repeat Key Words When Clarity Matters”** in the Signal over Noise Insight Desk, using the supplied article draft and image assets. Keep the existing series navigation coherent so Parts 1–4 link correctly and Part 5 remains an upcoming, non-link item.

This is a focused content implementation task, not a redesign.

## Current behavior

- The live repository contains Parts 1–3 of the series:
  - `turn-abstract-nouns-back-into-actions`
  - `unpack-dense-noun-stacks`
  - `make-the-actor-obvious`
- The central series manifest already defines Part 4 with slug `repeat-key-words-when-clarity-matters` and date `2026-09-11`.
- Existing Part 2 and Part 3 prose still describe Part 4 as “upcoming.” Verify whether Part 1 is rendered from the central series manifest before changing it.
- The canonical Free Presentation Diagnostic route in the current site is `/diagnostic/`. Do not introduce or preserve the obsolete `/free-presentation-diagnostic/` route in the new article.
- The current checkout had an existing unrelated modification to `.vscode/tasks.json` when this package was prepared. Preserve it; do not reset, overwrite, or include it in the article change.

## Desired behavior

- The article publishes at:
  - `/insights/repeat-key-words-when-clarity-matters/`
- The article uses the existing Insight Desk layout, metadata, hero-image handling, OG metadata, and series navigation conventions.
- The article explains when deliberate repetition improves spoken English clarity, when it becomes filler, and how to run the five-minute repetition pass.
- The article’s primary CTA is **Request a Free Presentation Diagnostic** linking to `/diagnostic/`.
- The article links back to Part 3 and keeps Part 5 labelled upcoming/non-clickable.
- Previous series navigation is updated in the same implementation where the repository currently hard-codes stale “upcoming” references, so no public Part 2 or Part 3 page points at an already-published article as upcoming.

## Package contents

- Draft article: `working/drafts/repeat-key-words-when-clarity-matters.md`
- Editorial brief: `working/briefs/repeat-key-words-when-clarity-matters.md`
- Repurposing: `working/repurposing/repeat-key-words-when-clarity-matters.repurpose.md`
- Hero source: `working/images/repeat-key-words-when-clarity-matters/hero-source-approved.png`
- OG source: `working/images/repeat-key-words-when-clarity-matters/og-source-approved.png`
- Final hero: `working/images/repeat-key-words-when-clarity-matters/hero.webp` (1600×900, title text included)
- Final OG: `working/images/repeat-key-words-when-clarity-matters/og.webp` (1200×630, title and SoN Insights lockup included)
- Inline 1 source/final: `working/images/repeat-key-words-when-clarity-matters/inline-01-anchor-word-contrast-source-approved.png` / `inline-01-anchor-word-contrast.webp` (1200×900)
- Inline 2 source/final: `working/images/repeat-key-words-when-clarity-matters/inline-02-four-useful-moments-source-approved.png` / `inline-02-four-useful-moments.webp` (1200×900)

## Likely repo targets

Verify the real structure before editing. Expected current paths:

- `content/insights/repeat-key-words-when-clarity-matters.md`
- `assets/images/insights/repeat-key-words-when-clarity-matters/hero.webp`
- `assets/images/insights/repeat-key-words-when-clarity-matters/og.webp`
- `assets/images/insights/repeat-key-words-when-clarity-matters/inline-01-anchor-word-contrast.webp`
- `assets/images/insights/repeat-key-words-when-clarity-matters/inline-02-four-useful-moments.webp`
- `content/insights/unpack-dense-noun-stacks.md` — stale Part 4 reference if hard-coded
- `content/insights/make-the-actor-obvious.md` — stale Part 4 reference if hard-coded
- `content/insights/turn-abstract-nouns-back-into-actions.md` or the central series renderer — verify only; change only if required by the existing navigation implementation

## Required implementation

1. Inspect the current Insight Desk front matter and layout conventions.
2. Add the supplied Markdown article with `draft: false` for production, preserving the supplied title, description, slug, series metadata, and CTA.
3. Copy the supplied WebP hero, OG, and two inline assets into the post-specific image directory.
4. Confirm the hero is sourced from `heroImage` and the OG metadata uses `ogImage.src`.
5. Update stale Part 4 “upcoming” references in existing series navigation to point to the new article route, while keeping Part 5 upcoming and non-clickable.
6. Preserve the article’s illustrative examples as examples; do not add client names, results, statistics, testimonials, or unsupported research claims.
7. Run the relevant build and search/content checks.
8. Inspect the rendered article at desktop and mobile widths if the existing preview workflow supports it.

## Acceptance criteria

- [ ] `content/insights/repeat-key-words-when-clarity-matters.md` exists and follows the current repository schema.
- [ ] Production build excludes no intended article because of an accidental draft flag.
- [ ] Article route is `/insights/repeat-key-words-when-clarity-matters/`.
- [ ] Hero renders without a broken path or harmful crop.
- [ ] OG metadata points to `og.webp`.
- [ ] Hero asset is 1600×900 WebP with the exact title treatment.
- [ ] OG asset is 1200×630 WebP with the exact title and SoN Insights lockup.
- [ ] Both inline teaching images are 1200×900 WebP and render in the intended article locations.
- [ ] Part 3 links to Part 4; Part 5 remains an upcoming/non-link item.
- [ ] Any stale Part 4 “upcoming” text in Part 2/3 navigation is updated in the same deploy.
- [ ] Primary CTA label is “Request a Free Presentation Diagnostic” and its URL is `/diagnostic/`.
- [ ] No use of “Free Presentation Scan” or `/free-presentation-diagnostic/` is introduced by this change.
- [ ] No unrelated service, pricing, navigation, language-routing, or global CSS changes are included.
- [ ] Existing unrelated `.vscode/tasks.json` worktree changes remain untouched.

## Validation

Run from the canonical repository, adapting only if the current scripts differ:

```bash
npm run build
npm run build:insights
npm run check:search
git diff --check
```

Also verify these routes in the built/preview output:

- `/insights/repeat-key-words-when-clarity-matters/`
- `/insights/make-the-actor-obvious/`
- `/insights/unpack-dense-noun-stacks/`
- `/diagnostic/`

## Do not change

- Existing article prose except the minimum series-navigation update required to replace a stale Part 4 “upcoming” reference.
- The five-part series title, order, or Part 5 title.
- The diagnostic’s public scope or form behavior.
- Korean language-routing behavior.
- Site-wide navigation, pricing, services, or global styling.
- The pre-existing `.vscode/tasks.json` modification.
