# Series Navigation — Stop Writing Your Presentation Like a Report

## Canonical series order

| Part | Title | Status at Part 2 publish | Link behavior |
|---|---|---|---|
| 1 | Turn Abstract Nouns Back Into Actions | Published | Link |
| 2 | Unpack Dense Noun Stacks | Published/current depending page | Link except when current |
| 3 | Make the Actor Obvious | Upcoming | Plain text / Upcoming |
| 4 | Repeat Key Words When Clarity Matters | Upcoming | Plain text / Upcoming |
| 5 | Build Recovery Points Into Spoken Language | Upcoming | Plain text / Upcoming |

## Known URL

Part 1:
`/insights/turn-abstract-nouns-back-into-actions/`

Part 2 target:
`/insights/unpack-dense-noun-stacks/`

## Upcoming publishing dates already shown on Part 1

- Part 3: September 8, 2026
- Part 4: September 11, 2026
- Part 5: September 15, 2026

Keep these dates only if they still match the current publishing plan.

## Behavior

Every article in the series should make it obvious that:
- this is a five-part series
- which part the reader is viewing
- which earlier parts are available
- which later parts are upcoming

### On Part 1 after Part 2 publishes

- Part 1: current
- Part 2: linked
- Parts 3–5: Upcoming, no links

### On Part 2

- Part 1: linked
- Part 2: current
- Parts 3–5: Upcoming, no links

## Implementation preference

If the repo already has a reusable series component/data pattern, use it.

If not, create the smallest reusable data-driven implementation necessary so future Parts 3–5 can change from `upcoming` to `published` without rewriting navigation in five separate articles.

Do not build public tag pages, a CMS, or a large editorial system for this.
