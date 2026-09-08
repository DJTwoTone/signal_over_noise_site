# Series Navigation Updates — Part 3 Release

## Goal

Publish Part 3 without leaving stale “upcoming” references in Parts 1–2.

Series title:

**Make Your Presentation English Easier to Follow**

## Canonical series order

1. `/insights/turn-abstract-nouns-back-into-actions/` — Turn Abstract Nouns Back Into Actions
2. `/insights/unpack-dense-noun-stacks/` — Unpack Dense Noun Stacks
3. `/insights/make-the-actor-obvious/` — Make the Actor Obvious
4. Repeat Key Words When Clarity Matters — upcoming
5. Build Recovery Points Into Spoken Language — upcoming

## Part 1

Locate the existing series navigation block.

Required change:
- Part 3 must become a live link to `/insights/make-the-actor-obvious/`.
- Part 4 and Part 5 remain marked upcoming.
- Preserve Part 1 as the current article.
- Do not change the article body or unrelated metadata.

If Part 1 has a Previous/Current/Next block, its direct `Next` should remain Part 2.

## Part 2

Locate the existing series navigation block.

Required change:
- Part 3 must become a live link to `/insights/make-the-actor-obvious/`.
- Part 4 and Part 5 remain marked upcoming.
- Preserve Part 2 as the current article.

If Part 2 has a Previous/Current/Next block:
- Previous: Part 1
- Current: Part 2
- Next: `[Part 3 — Make the Actor Obvious](/insights/make-the-actor-obvious/)`

## Part 3

The packaged Markdown already contains:
- live links to Parts 1 and 2
- Part 3 marked current
- Parts 4 and 5 marked upcoming
- Previous link to Part 2
- upcoming Next label for Part 4

## Safety check

Make all Part 1–3 navigation changes in the same deploy that publishes Part 3 so no public page points to a 404.
