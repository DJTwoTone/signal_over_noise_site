# QA Report — Part 3: Make the Actor Obvious

Status: **Publish-ready**

## Content

- Human Voice Pass: PASS
- Tightening pass: PASS
- Clear practical problem: PASS
- Not reduced to a generic passive-voice grammar lesson: PASS
- Distinction preserved: passive voice is not inherently wrong; hidden actors are a problem when they obscure meaning, ownership, or responsibility.
- Examples are illustrative and make no client claims.
- Humor is light and aimed at presentation habits, not ESL speakers.
- Part 1 / Part 2 continuity is explicit.
- Part 4 handoff is clear without overexplaining the next article.

## CTA

- CTA name: `Free Presentation Diagnostic`
- Button/link wording: `Request a Free Presentation Diagnostic`
- Route: `/free-presentation-diagnostic/`
- Scope language stays within approved boundaries: practical expert feedback on a deck, script, or short practice video plus a recommended next step.
- No invented timing, pricing, guaranteed outcome, full rewrite, or default live-call promise.

## Front matter

- Required core 11ty fields present.
- Current Insights metadata pattern aligned: `answerVisibility`, `claimRisks`, structured `ogImage`, `inlineImages`, `structuredData`, and repurposing companion are included.
- `tags` remains limited to the `insights` collection.
- Editorial classification uses category/topics/audience/contentType.
- `draft: false` for publish-ready handoff.
- `imagePlan.count` corrected to 4.
- Hero and OG paths match final asset names.
- Alt text is contextual and not keyword-stuffed.

## Series navigation

Part 3 is correct in the packaged Markdown.

Parts 1 and 2 must be updated in the same deploy:
- Part 3 changes from upcoming/plain text to a live link.
- Part 2's direct Next link becomes Part 3.
- Parts 4 and 5 remain upcoming.

See `SERIES_NAV_UPDATES.md`.

## Image QA

### hero.webp
- Final size: 1600 × 900
- Purpose: article hero
- Text and before/after concept are readable.
- Strong visual connection to the article.
- Final 16:9 crop protects the headline and teaching content and avoids leaving a partially clipped source logo at the bottom edge.

Alt:
`A presentation script being edited so unclear actions are connected to the people and teams responsible for them.`

### og.webp
- Final size: 1200 × 630
- Purpose: OG/social preview
- Headline remains large and readable.
- Before/after visual remains understandable at social-card scale.
- Source composition required only a negligible center crop.

### inline-01-before-after.webp
- Final size: 1200 × 900
- Purpose: single-concept teaching visual
- Shows the core transformation from agentless language to a named actor.
- Best placement: immediately after the first “Who decided?” example.

Alt:
`Before-and-after comparison showing a vague passive sentence rewritten so the project team is clearly named as the actor.`

### inline-02-actor-examples.webp
- Final size: 1200 × 900
- Purpose: multi-example teaching/recap visual
- Adds value beyond inline-01 by showing several actor/ownership patterns.
- Best placement: after the ownership/responsibility section.

Alt:
`Five before-and-after presentation sentences showing vague actions rewritten with clear actors such as the project team, engineering team, support team, client, and trainers.`

## Implementation limitation checked

The repo itself is not in this package, so existing Part 1 and Part 2 filenames cannot be safely assumed. Codex/GitHub Copilot should locate those files by their canonical slugs before editing. Do not create duplicate posts just because a guessed filename does not exist.
