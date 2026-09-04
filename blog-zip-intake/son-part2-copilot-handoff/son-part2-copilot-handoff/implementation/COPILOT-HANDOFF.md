# Copilot Handoff — Publish Series Part 2 + Retrofit Part 1

## Goal

Publish **Part 2: Unpack Dense Noun Stacks** and make the minimum Part 1 changes needed for consistent series navigation, answer visibility, metadata, CTA routing, and current image treatment.

## First: inspect the repo

Before editing:
1. Find the current Insights post source path.
2. Find Part 1's Markdown/source file.
3. Confirm the current post layout and series-navigation behavior.
4. Confirm the current canonical Free Presentation Diagnostic route.
5. Confirm the existing image pipeline and required image naming.
6. Find the official Signal over Noise logo/brand lockup asset and existing footer treatment.
7. Confirm how draft exclusion is handled.
8. Confirm whether current front matter already supports the fields in the supplied Part 2 file.

Adapt to the repo. Do not force an old proposed structure if the site already has one.

## Part 2

Use:

`content/part-2-unpack-dense-noun-stacks.md`

### Content rule
The article body is **LOCKED**.

Allowed changes:
- replace `__VERIFY_CANONICAL_DIAGNOSTIC_ROUTE_IN_REPO__`
- adapt front matter syntax to actual repo conventions
- adapt series-navigation markup if the layout/component handles it
- adapt image paths to actual repo conventions
- add required component shortcodes/includes without rewriting prose
- fix an obvious implementation typo only if necessary

Do not stylistically rewrite or shorten the article.

## Part 1

Follow:

`implementation/PART-1-RETROFIT.md`

Do not broadly rewrite Part 1.

## Series navigation

Follow:

`implementation/SERIES-NAVIGATION.md`

Published parts must be linked.
Current part must be identified.
Future parts must be visible as Upcoming but not linked.

## Images

Source/reference images are in:

`assets/part-2-sources/`

Follow:

- `implementation/ASSET-MANIFEST.md`
- `implementation/TEACHING-VISUAL-SPEC.md`

The supplied source PNGs are **not final exports**.

### Hero and OG
Preserve the approved composition and subject.
Use deterministic brand treatment using the repo's official Signal over Noise asset(s).
Do not treat AI-rendered brand text as a substitute for the official lockup.

### Inline teaching visual
Rebuild exact lettering deterministically from the visual reference.
Use the exact text in `TEACHING-VISUAL-SPEC.md`.

## Canonical diagnostic route

The live `/free-presentation-diagnostic/` route has previously redirected to `/diagnostic/`.

Do not hard-code either based only on this note.

Inspect the current repo/site configuration and use the actual canonical route consistently in Part 1, Part 2, and series CTA components.

## Likely files affected

Actual paths must be verified in the repo. Likely categories:

- Part 1 Markdown/content file
- new Part 2 Markdown/content file
- series navigation data/component if one exists
- image assets under the Insights image directory
- possibly post layout/component only if required to support current metadata/navigation
- metadata/structured-data logic only if current fields are not already supported

## Do not change

- Homepage/service-page copy
- service pricing
- diagnostic scope
- unrelated navigation
- global typography or colors
- other Insights articles
- existing site structure unless required for this task
- article copy beyond the explicit retrofit/implementation allowances

## Acceptance criteria

### Build/content
- Site builds successfully.
- Part 2 publishes at `/insights/unpack-dense-noun-stacks/`.
- Draft behavior matches current production conventions.
- Part 1 still publishes at its existing URL.
- No existing URLs break.

### Series
- Part 1 links to Part 2 once Part 2 is published.
- Part 2 links back to Part 1.
- Both show all five series titles.
- Parts 3–5 are marked Upcoming and are not dead links.
- Current article is visibly identified.

### CTA
- Part 1 and Part 2 use the repo's canonical Free Presentation Diagnostic route.
- CTA wording stays within approved public scope.

### Images
- Part 2 hero is final 1600×900 WebP.
- Part 2 OG is final 1200×630 WebP.
- Inline teaching visual is final 1200×900 WebP.
- Hero/OG use the official deterministic Signal over Noise brand treatment.
- Exact instructional text is not left as unreliable AI lettering.
- Alt text is present and useful.
- Image file sizes meet current site targets where practical.

### Metadata
- Part 2 has the current required editorial/search/answer fields supported by the repo.
- Part 1 is retrofitted only as needed to match the current schema.
- Structured data remains valid.
- No obsolete reviewer/VP routing fields are introduced.

### QA
- Run the normal build/test/lint checks used by the repo.
- Check desktop and mobile article layouts.
- Check social/OG metadata.
- Check internal links.
- Check there are no broken asset paths.
