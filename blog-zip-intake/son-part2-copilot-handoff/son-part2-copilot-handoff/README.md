# Signal over Noise — Series Part 2 Copilot Handoff

## Goal

Publish Part 2 of the five-part Insights series **Stop Writing Your Presentation Like a Report**, while applying a small compatibility retrofit to Part 1 so the series behaves consistently.

This package is the execution source of truth for this task.

## Scope

### Part 2
**Title:** Unpack Dense Noun Stacks  
**Status:** Copy locked. Visual direction approved. Production finishing required.

Copilot should:
1. Add the finalized Part 2 Markdown post.
2. Use the current repo conventions instead of forcing paths from older handoff docs.
3. Add/verify current front matter fields.
4. Implement the five-part series navigation.
5. Link Part 1.
6. Keep Parts 3–5 visible as upcoming until they publish.
7. Add the Free Presentation Diagnostic CTA using the repo's canonical route.
8. Production-finish the approved hero, OG, and teaching visual.
9. Run the 11ty build and relevant checks.

### Part 1 retrofit
**Live URL:** https://signal-over-noise.coach/insights/turn-abstract-nouns-back-into-actions/

Do not rewrite Part 1. Make only the retrofit changes in `implementation/PART-1-RETROFIT.md`.

## Important

- **Do not rewrite the locked Part 2 article body.**
- **Do not redesign the site.**
- **Do not invent new services, claims, pricing, diagnostic scope, or deliverables.**
- **Do not link unpublished Parts 3–5.**
- Use the site's actual existing components, routes, CSS variables, image pipeline, and logo assets.
- The PNGs in `assets/part-2-sources/` are approved visual references/source art, **not final production exports**.

## Files

- `content/part-2-unpack-dense-noun-stacks.md` — locked Part 2 article
- `implementation/COPILOT-HANDOFF.md` — implementation instructions and acceptance criteria
- `implementation/PART-1-RETROFIT.md` — exact changes for Part 1
- `implementation/SERIES-NAVIGATION.md` — series titles, state, and navigation behavior
- `implementation/ASSET-MANIFEST.md` — asset production requirements
- `implementation/TEACHING-VISUAL-SPEC.md` — deterministic inline graphic copy/layout
- `implementation/FINAL-QA-CHECKLIST.md` — final checks before merge/publish
- `assets/part-2-sources/` — approved generated source images

## Final series

1. **Turn Abstract Nouns Back Into Actions**
2. **Unpack Dense Noun Stacks**
3. **Make the Actor Obvious**
4. **Repeat Key Words When Clarity Matters**
5. **Build Recovery Points Into Spoken Language**
