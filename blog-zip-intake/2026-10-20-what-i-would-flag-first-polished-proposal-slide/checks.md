# Review checks — 2026-10-20

## Decision

The article is promising and ready for final editorial review. The checked package is not publication-ready because the article is still a draft, the planned date may need to change, and the slide/deck workflow requires a 40 Slides review before public use.

## Editorial value — 15/16

| Area | Score | Finding |
|---|---:|---|
| Audience urgency | 2/2 | A polished proposal can request a commitment that exceeds its evidence. |
| Practical value | 2/2 | The reader checks the ask, separates observations from predictions, and chooses a bounded next step. |
| Expertise | 2/2 | The piece prioritizes evidence-to-commitment fit before visual polish. |
| Specificity | 2/2 | A disclosed handoff example shows the overreach and a limited-trial alternative. |
| Credibility | 2/2 | The example is marked as illustrative; the review prompt is not presented as a validated scorecard. |
| Business fit | 2/2 | The Free Presentation Diagnostic matches the reader who wants an outside review. |
| Differentiation | 2/2 | It differs from the live decision-visibility and chart-claim articles. |
| Shipping readiness | 1/2 | Draft preview checks pass; actual release date, live route, and specialist visual review remain open. |

## Voice and Stop Slop — 43/50

| Dimension | Score |
|---|---:|
| Directness | 9/10 |
| Rhythm | 8/10 |
| Trust | 9/10 |
| Authenticity | 8/10 |
| Density | 9/10 |

The review removed a string of punchy negative fragments, tightened the right-sized recommendation, and kept the claim within the synthetic example’s evidence. The copy uses direct address and concrete review questions without adding client results or invented claims.

## SEO and content system — pass after fixes

- Search intent: help a presenter judge whether a proposal slide asks for a commitment proportionate to its evidence.
- Title, description, slug, category, topics, audience, CTA, proof notes, review field, hero/OG data, and image plan are present.
- Added the required `vpReviewNeeded: []` field.
- Updated the answer-visibility target to four review questions, matching the article body.
- The hero alt now describes the illustrative scene. The inline image has concise alt text and is embedded at the planned point in the article.
- Related links to the decision-visibility article, chart-claim article, and diagnostic resolve to existing site sources/pages.
- No FAQ schema or keyword stuffing was added.

## Image integrity and visual QA — pass

- Hero: 1600×900, 80,654 bytes. OG: 1200×630, 53,568 bytes. Inline: 1600×900, 82,272 bytes.
- Title and supporting text use deterministic SVG overlays. The generated hero background contains no generated copy or logo.
- The before/after graphic uses the same two handoff observations in both panels and visibly says `ILLUSTRATIVE EXAMPLE — NOT CLIENT WORK`.
- The images contain no client material, performance data, fabricated results, or fake brand marks.
- The three WebP files were opened and visually inspected at their target sizes. The OG crop was checked separately.
- The generated scene is an illustrative review setting, not a documentary image of a real client or event.
- The 40 Slides visual review is still required before public use of this slide teardown.

## 11ty preview and release-safety checks — pass

- Draft preview build compiled the article to `/insights/what-i-would-flag-first-polished-proposal-slide/`.
- Rendered draft HTML has `noindex, nofollow`, the expected canonical, BlogPosting JSON-LD, one H1, the hero and inline images with alt text, and the diagnostic CTA.
- The article’s internal links and three referenced image files resolve.
- Production-mode Insights build passed and excluded the draft from its output, homepage article block, Insights index, and Insights sitemap.
- Editorial and site article sources match exactly.

## Remaining release gates

1. Review the full copy and visual package.
2. Obtain 40 Slides review before using the synthetic teardown publicly.
3. Set the actual publication date and verify the live canonical route after release preparation.
4. Prepare social copy only after the article is finalized and its canonical URL is live.

A full site build and automated Pa11y/axe scan were not run in this draft-only pass. The targeted 11ty build and rendered-markup checks above cover the article’s current state.
