# Ready-to-go handoff: AI Can Make Your Presentation Fluent Without Making the Decision Visible

Prepared: 2026-09-21
Status: Ready for implementation handoff

## Goal

Publish the first Insight Desk article in the four-post path, showing how a presentation can sound polished while leaving the decision, recommendation, or next action unclear.

## Package contents

- `content/ai-can-make-your-presentation-fluent-without-making-the-decision-visible.md` — approved article draft and front matter.
- `assets/hero.webp` — article hero image.
- `assets/og.webp` — dedicated social/OG image.
- `assets/inline-01.webp` — realistic slide mockup showing a buried ask.
- `assets/inline-02.webp` — realistic slide mockup showing a visible recommendation and approval ask.
- `assets/source-approved/` — approved PNG source files for future edits or alternate exports.
- `handoff/brief.md` — editorial brief and visual requirements.
- `handoff/qa.md` — final content, voice, SEO, claim, and image QA.
- `handoff/editorial-kanban.md` — current four-post path and status.

## Implementation map

Copy the article into the canonical Insight Desk content location in the website repository and preserve the front matter. The article should render at:

`/insights/ai-presentation-decision-visible/`

Copy the four WebP files into:

`/assets/images/insights/ai-presentation-decision-visible/`

The article's primary CTA is `Get a Free Presentation Diagnostic` and the verified current route is `/diagnostic/`.

## Required checks before publishing

- Confirm the article is included in the Insight Desk collection and the production draft filter behaves correctly.
- Confirm hero, OG, and both inline images render with the supplied alt text and dimensions.
- Confirm both inline slides retain the visible disclaimer: `ILLUSTRATIVE EXAMPLE — NOT CLIENT WORK`.
- Run the site build, Insight Desk build, search/readiness checks, and whitespace checks.
- Preview the article on desktop and mobile.
- Create the companion LinkedIn post after the implementation preview confirms the slide crops.

## Do not change

- The article's core argument, examples, or disclosure language.
- The CTA destination, unless the canonical site route changes.
- Service pricing, diagnostic scope, navigation, footer, brand colors, typography, or unrelated site structure.
- The conceptual examples into client work, measured outcomes, or claims about what AI can never do.

## Source of truth

The content draft, brief, QA report, and approved assets in this package are the source of truth for this implementation.
