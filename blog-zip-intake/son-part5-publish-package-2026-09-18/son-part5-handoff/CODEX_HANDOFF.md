# Codex Handoff — Publish Part 5 and Close the Series

## Goal

Publish Part 5 of the Signal over Noise Insights series:

**Stop Writing Your Presentation Like a Report**  
**Part 5: Build Recovery Points Into Spoken Language**

This is the finale. The series navigation should now show all five parts as published.

## Files

- `build-recovery-points-into-spoken-language.md`
- `series-manifest.md`
- `IMAGE_MAP.md`
- `assets/images/build-recovery-points-into-spoken-language/hero.webp`
- `assets/images/build-recovery-points-into-spoken-language/og.webp`
- `assets/images/build-recovery-points-into-spoken-language/inline-recovery-points.webp`
- `assets/images/build-recovery-points-into-spoken-language/inline-series-recap.webp`

`source/` contains original generated PNGs for reference only.

## Article behavior

Use the supplied Markdown as approved final copy.

Do not:
- rewrite the article
- alter CTA scope
- invent proof, client examples, metrics, or outcomes
- redesign unrelated pages
- change existing global copy

## Series behavior

Use the existing series component/data model if present.

Part 5 must render:
- Parts 1–4 as live links
- Part 5 as current / `You are here`
- Previous link to Part 4
- no Next link
- no remaining `Coming [date]` labels

If series data is centralized, update it so all five parts are published.

Verify existing Parts 1–4 slugs against the repo before linking.

## Image placement

### Hero
`hero.webp` — 1600×900  
Alt: `A presentation script marked with clear verbal checkpoints that help listeners follow the speaker's argument.`

### OG
`og.webp` — 1200×630  
Use for Open Graph/social metadata.

### Inline 1
`inline-recovery-points.webp` — 1200×800  
Place after the opening explanation of why audiences lose the thread.  
Alt: `Audience member confused without recovery points compared with a listener following clear verbal checkpoints.`

### Inline 2
`inline-series-recap.webp` — 1200×800  
Place after the five-part series recap and before the full-series self-check.  
Alt: `Five-part series recap showing the five shifts from report-style writing to presentation-ready spoken language.`

## CTA

Use exactly:

**Request a Free Presentation Diagnostic**

URL:

`/free-presentation-diagnostic/`

## Date

Publication date: `2026-09-18`

Do not backdate to September 15.

## Draft state

The supplied file uses `draft: false`.

If the repo uses a different production flag, adapt to the current convention.

## Acceptance criteria

- [ ] Site builds successfully.
- [ ] Part 5 publishes under the established Insights URL convention.
- [ ] Part 5 appears on the Insights index.
- [ ] Hero renders without clipping the title/series treatment.
- [ ] OG metadata uses the supplied OG image.
- [ ] Both inline images render cleanly.
- [ ] Supplied alt text is used.
- [ ] Parts 1–4 are live links.
- [ ] Part 5 is marked current.
- [ ] Previous points to Part 4.
- [ ] No Next link appears.
- [ ] No `Coming [date]` states remain anywhere in this series.
- [ ] Series navigation is template/data-driven, not duplicated manually in the article body.
- [ ] Free Presentation Diagnostic CTA works.
- [ ] Existing navigation, footer, typography, brand colors, and unrelated pages remain unchanged.

## Final QA after build

1. Open Part 5 on desktop.
2. Open it on mobile.
3. Verify hero readability.
4. Verify series navigation at top and bottom.
5. Click Parts 1–4.
6. Click the Free Presentation Diagnostic CTA.
7. Verify no future/unpublished state remains.
8. Check the Insights index card.
9. Verify OG title/image metadata.
