# Part 1 Retrofit

## Existing page

https://signal-over-noise.coach/insights/turn-abstract-nouns-back-into-actions/

## Rule

Do **not** rewrite the article.

Part 1 already works editorially. This is a compatibility/update pass only.

## Required changes

### 1. Add an early short-answer block

Place this near the beginning after the existing setup around starting with the verbs, in the most natural location supported by the source:

> **Short answer:** If an important action is hidden inside an abstract noun, turn it back into a verb and make the actor clear. Presentation language is easier to follow when listeners can hear who did what and what changed.

Do not otherwise rewrite the surrounding copy.

### 2. Update series navigation

Part 2 is no longer upcoming once published.

Use the complete five-part series:

1. Turn Abstract Nouns Back Into Actions
2. Unpack Dense Noun Stacks
3. Make the Actor Obvious
4. Repeat Key Words When Clarity Matters
5. Build Recovery Points Into Spoken Language

Behavior:
- Part 1 = current item on Part 1 page
- Part 2 = linked after Part 2 publishes
- Parts 3–5 = Upcoming, not linked
- remove/update any stale wording such as Part 2 being 'Coming September 4' after publication

### 3. CTA route

Verify the canonical Free Presentation Diagnostic route in the current repo and update Part 1 if it currently points through an unnecessary redirect.

Do not change diagnostic scope language.

### 4. Front matter / metadata compatibility

Inspect Part 1's source metadata.

Where the current Insights schema supports them, retrofit the same classes of metadata now used by Part 2:
- businessPurpose
- answerVisibility
- claimRisks
- skillChecksNeeded
- structuredData
- current image metadata fields

Do not add obsolete `vpReviewNeeded` fields.

Do not invent new claims or proof.

Suggested answer-visibility short answer should use the exact Short answer above.

### 5. Hero / OG current brand treatment

Do not regenerate Part 1 artwork from scratch.

Inspect the current hero/OG against the repo's current official Signal over Noise brand-lockup treatment.

If current production standards require the official deterministic logo + tagline treatment and Part 1 predates it:
- preserve the existing art
- add/update the deterministic brand footer/lockup using repo assets
- re-export to the site's current production image specs
- do not rely on AI-rendered logo text

### 6. Inline images

Leave Part 1 inline teaching visuals alone unless there is a concrete production problem such as:
- wrong path
- broken image
- missing alt text
- invalid dimensions
- file-size problem

No visual redesign is requested.

## Pass condition

Part 1 should look and read essentially the same after this retrofit, except:
- short answer is now visible
- series state is current
- Part 2 is linked
- CTA route is canonical
- metadata/branding align with the current site
