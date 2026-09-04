# Codex Handoff — SoN Insights Part 1 + Five-Part Series Navigation

## Goal

Publish Part 1 of the Signal over Noise Insights series **Stop Writing Your Presentation Like a Report** and add reusable series navigation that supports all five parts as they are published.

Part 1:

**Turn Abstract Nouns Back Into Actions**

Publication date: **2026-09-01**

Use the existing Signal over Noise 11ty structure and visual system. Adapt paths/components to the actual repo. Do not redesign unrelated site areas.

---

## Package contents

- `article/turn-abstract-nouns-back-into-actions.md` — approved Part 1 Markdown and front matter
- `series/stop-writing-your-presentation-like-a-report.json` — canonical five-part series manifest
- `assets/images/turn-abstract-nouns-back-into-actions/` — deploy-ready WebP images
- `assets/source-png/` — approved source PNGs
- `IMAGE_MAP.md` — filenames, sizes, alt text, and placements

---

## First step: inspect the repo

Before changing anything:

1. Confirm the current 11ty source directory and post conventions.
2. Confirm the existing Insights collection, post layout, image pipeline, CTA component, and draft handling.
3. Reuse existing patterns where possible.
4. Adapt this package to the repo instead of forcing the example paths below.

Likely affected areas include:

- `src/insights/`
- `src/insights/insights.11tydata.js`
- `src/_includes/layouts/insight-post.njk`
- `src/_includes/components/`
- `src/_data/` or equivalent data directory
- `src/assets/images/insights/`

---

# Part 1 implementation

## Article

Add the approved Markdown file to the Insights content collection using the repo's existing filename/location convention.

Target public URL:

`/insights/turn-abstract-nouns-back-into-actions/`

The supplied Markdown intentionally contains two implementation markers:

- `SERIES_NAV`
- `SERIES_PREV_NEXT`

Replace these with reusable series-navigation rendering. Do not hard-code the five link states into the article body.

If the repo/template engine makes insertion at the exact marker locations impractical, preserve the intended UX:

- full five-part series navigator near the top of the article, ideally after the opening intro
- compact Previous / Next series navigation near the bottom, before the CTA

Do not leave the HTML comments visible in final rendered output.

## Draft state

The supplied article has:

`draft: true`

Keep it true while implementing/testing. Change to `draft: false` only when the user is ready to publish Part 1.

Do not expose draft articles in production or the Insights index.

---

# Five-part series behavior — REQUIRED

## Canonical series data

Use one central manifest for the series. The included JSON may be used directly or converted into the repo's preferred 11ty data format.

Series:

1. **Turn Abstract Nouns Back Into Actions** — Sep 1, 2026
2. **Unpack Dense Noun Stacks** — Sep 4, 2026
3. **Make the Actor Obvious** — Sep 8, 2026
4. **Repeat Key Words When Clarity Matters** — Sep 11, 2026
5. **Build Recovery Points Into Spoken Language** — Sep 15, 2026

## Critical publishing logic

The manifest defines the complete series and scheduled dates.

**Do not treat a date in the manifest as proof that the article is published.**

For each part, determine whether it is live by cross-referencing the normal production `collections.insights` collection (or equivalent production-safe published-post source).

Behavior:

- Current article: show **You are here**; no self-link required.
- Published article: render a normal link to its permalink.
- Not-yet-published article: render title plus **Coming September X**; do not create a dead link.
- Draft articles must remain absent from the normal Insights index.
- When a future part changes from draft to published, its series-nav entry should become a link automatically without manually editing older articles.

This is the key requirement.

## Top series navigator

Clearly identify:

- series name: **Stop Writing Your Presentation Like a Report**
- current position: **Part X of 5**
- all five part titles
- current-part state
- links for live parts
- upcoming labels for unpublished parts

The series must be unmistakable to a reader who lands directly on Part 3, Part 4, etc.

## Bottom navigation

Render compact series controls:

- Previous part
- Next part

If the adjacent part is published, link it.

If the next part is not yet published, show its title and **Coming September X** without a dead link.

Part 1 has no previous part.

No dedicated public series landing page is required at this stage.

---

# Front matter extension

The article uses structured series metadata:

```yaml
series:
  name: "Stop Writing Your Presentation Like a Report"
  slug: "stop-writing-your-presentation-like-a-report"
  part: 1
  totalParts: 5
```

Support this without turning `series` into a new public 11ty tag/collection unless the existing architecture genuinely needs one.

Keep:

```yaml
tags:
  - insights
```

Use `category`, `topics`, `audience`, and `contentType` for editorial classification.

Do not add public tag/topic pages.

---

# Images

Deploy to the equivalent of:

`src/assets/images/insights/turn-abstract-nouns-back-into-actions/`

Files:

- `hero.webp` — 1600×900
- `og.webp` — 1200×630
- `inline-hidden-action.webp` — 1200×900
- `inline-report-to-presentation.webp` — 1200×800

Use the existing image pipeline if one exists.

Requirements:

- preserve the approved crops and overlaid text
- include explicit width/height or equivalent responsive-image metadata to prevent layout shift
- do not regenerate the approved images
- do not add invented metrics, client claims, or fake proof
- hero and OG already contain approved title/series/brand treatment

### Alt text

Hero:

> A photorealistic presentation-review desk with the article title overlaid beside annotated report language being rewritten as clearer actions.

Inline 1:

> A marked-up report beside notes separating a dense statement into the actor, action, and result.

Inline 2:

> A three-stage workspace showing dense report language becoming clearer written language and then presentation-ready language.

OG is social metadata and does not need body-image alt text.

---

# CTA

Use the existing Free Presentation Diagnostic destination:

`/free-presentation-diagnostic/`

Exact CTA label for this article:

**Request a Free Presentation Diagnostic**

Do not redefine diagnostic scope, invent deliverables, imply a live call, or alter existing diagnostic copy elsewhere on the site.

---

# Visual behavior

Match the existing Signal over Noise site and Insights styling:

- warm editorial consulting feel
- cream / ivory
- deep navy
- muted gold
- pale blue accents where already used
- serif display hierarchy
- rounded cards/panels
- subtle shadows
- premium but human

The series navigator should look like a native SoN editorial component, not a generic documentation sidebar or SaaS widget.

---

# Do not change

- Existing homepage/service/diagnostic copy
- Existing service pricing
- Navigation labels
- Footer copy
- Existing brand colors or typography system
- Existing Insights articles except where a reusable series component must be made available to them
- Existing taxonomy behavior
- Existing CTA destinations unless repo verification proves the supplied route is stale
- Unrelated layout or responsive behavior

No CMS.
No public tag pages.
No broad site redesign.
No invented proof.

---

# Acceptance criteria

## Article

- [ ] Part 1 builds successfully at `/insights/turn-abstract-nouns-back-into-actions/`.
- [ ] Article title, description, category, date, hero, body, inline images, and CTA render correctly.
- [ ] Hero uses approved 1600×900 asset.
- [ ] OG metadata uses approved 1200×630 asset.
- [ ] Inline images render in the approved article positions with correct alt text and dimensions.
- [ ] `draft: true` excludes the article from production until explicitly switched to false.

## Series navigation

- [ ] Series is clearly labeled **Stop Writing Your Presentation Like a Report**.
- [ ] Article displays **Part 1 of 5**.
- [ ] All five part titles are visible from day one.
- [ ] Part 1 is marked **You are here**.
- [ ] Parts 2–5 show `Coming [date]` while unpublished.
- [ ] Unpublished parts have no dead links.
- [ ] When a future article becomes published, old series pages automatically link to it without editing the old Markdown.
- [ ] Bottom Previous / Next behavior works using the same central data.
- [ ] Only production-published posts appear as normal `/insights/` cards.

## Regression

- [ ] Existing Insights pages still build.
- [ ] Existing navigation/footer remain unchanged.
- [ ] Existing responsive behavior remains intact.
- [ ] No public tag/topic pages are introduced.
- [ ] Production build/test command passes.

---

# Final verification before merge/publish

1. Run the repo's normal build/test/lint commands.
2. Preview Part 1 on desktop and mobile.
3. Verify series-nav states with only Part 1 published.
4. Temporarily test a second part as production-visible to confirm its link appears automatically, then return it to draft/unpublished state if Part 2 is not ready.
5. Confirm no future/draft article appears in `/insights/`.
6. Confirm no broken links or image paths.
7. Report files changed, commands run, and any deviations from this handoff.
