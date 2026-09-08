# Codex / GitHub Copilot Handoff — SoN Insights Part 3

## Goal

Publish **Part 3 of 5: “Make the Actor Obvious”** and update the existing series navigation so Parts 1–3 link to each other correctly.

This is a content implementation task, not a site redesign.

## Package contents

- `make-the-actor-obvious.md` — final publish-ready article
- `assets/make-the-actor-obvious/hero.webp` — 1600×900
- `assets/make-the-actor-obvious/og.webp` — 1200×630
- `assets/make-the-actor-obvious/inline-01-before-after.webp` — 1200×900
- `assets/make-the-actor-obvious/inline-02-actor-examples.webp` — 1200×900
- `SERIES_NAV_UPDATES.md`
- `QA_REPORT.md`
- `editorial/repurposing/make-the-actor-obvious.repurpose.md`

## Likely repo targets

Adapt to the real repository structure. Do not force these paths if the project uses another convention.

Likely article target:

`src/insights/make-the-actor-obvious.md`

Likely image target:

`src/assets/images/insights/make-the-actor-obvious/`

Also locate the existing posts with these slugs:

- `turn-abstract-nouns-back-into-actions`
- `unpack-dense-noun-stacks`

## Required implementation

1. Add the final Part 3 Markdown file using the existing Insights post convention.
2. Copy all four WebP assets into the post-specific image directory.
3. If the site uses a custom image shortcode/component rather than ordinary Markdown images, adapt the two inline image calls to the existing pipeline without changing their placement or alt-text meaning.
4. Confirm the hero renders from the `heroImage` front matter.
5. Confirm the page metadata supports the current structured `ogImage` object and uses its `src` for social sharing.
6. Update Parts 1 and 2 using `SERIES_NAV_UPDATES.md`.
7. Make the Part 1–3 navigation changes in the same deploy as Part 3.
8. Preserve Parts 4 and 5 as upcoming/non-links.
9. Run the normal 11ty build and any repo lint/content checks.
10. Check the final rendered page at desktop and mobile widths.

## Link verification

Expected internal routes:

- `/insights/turn-abstract-nouns-back-into-actions/`
- `/insights/unpack-dense-noun-stacks/`
- `/insights/make-the-actor-obvious/`
- `/free-presentation-diagnostic/`

Verify that the first two routes match the existing repo before editing. If the actual Part 2 slug differs, fix Part 3 and the series navigation to use the real route rather than creating a duplicate route.

## Image behavior

Final asset dimensions are already normalized:

| Asset | Dimensions |
|---|---:|
| hero.webp | 1600 × 900 |
| og.webp | 1200 × 630 |
| inline-01-before-after.webp | 1200 × 900 |
| inline-02-actor-examples.webp | 1200 × 900 |

Use the existing responsive-image pipeline if present.

Requirements:
- preserve aspect ratio
- include width/height in rendered HTML
- lazy-load inline images if that is the site's current behavior
- do not lazy-load the primary hero if the current performance pattern treats it as the LCP image
- preserve meaningful alt text
- do not hotlink the source PNG files

## Acceptance criteria

- [ ] 11ty build succeeds.
- [ ] Part 3 publishes at `/insights/make-the-actor-obvious/`.
- [ ] `draft: false` is respected in the production build.
- [ ] Hero appears correctly and does not crop the headline/branding.
- [ ] OG metadata points to `og.webp`.
- [ ] Both inline teaching images render in the intended locations.
- [ ] Inline images are readable on desktop and do not overflow on mobile.
- [ ] Part 1 series list links Part 3.
- [ ] Part 2 series list links Part 3.
- [ ] Part 2 direct Next link points to Part 3.
- [ ] Part 3 links Parts 1 and 2 correctly.
- [ ] Parts 4 and 5 remain labelled upcoming and are not dead links.
- [ ] CTA points to `/free-presentation-diagnostic/`.
- [ ] No unrelated navigation, pricing, service, homepage, or footer copy changes.
- [ ] No CMS, taxonomy page, or sitewide redesign work is introduced.

## Do not change

- The approved Part 3 prose unless required to fix a rendering-only issue.
- The article title or slug.
- The Free Presentation Diagnostic scope.
- Existing service pricing.
- Existing site-wide navigation labels.
- Parts 4–5 titles.
- Existing Part 1 or Part 2 body copy.
- Brand system or global CSS unless a genuine existing bug blocks the article.

## Final verification

After build:
1. Open Part 1, Part 2, and Part 3.
2. Click every series link.
3. Check the Part 3 CTA.
4. Inspect the hero and two inline visuals at mobile width.
5. Inspect the generated OG metadata.
6. Confirm there are no 404s or duplicate series posts.
