# Signal over Noise Current Todo

This is the canonical working list for the current site pass. Older planning docs stay useful as source material, but new open work should be added here first.

Last updated: 2026-05-04

## Current Review Snapshot

- Local route checks passed for `/`, `/services/`, `/process/`, `/proof/`, `/workshops/`, `/diagnostic/`, `/scan/`, `/contact/`, `/get-started/`, `/packages/`, and `/privacy/`.
- `node --check assets/site.js` passed.
- HTML tag-balance checks passed across the current route files.
- Pa11y HTMLCS WCAG2AA reported no issues across the main route set when run with the installed Chrome path.
- Local HTML `src`, `href`, and `srcset` targets resolved.
- `git diff --check` currently fails because modified PDF files are being scanned as text.

## Immediate Site Work

- [ ] Final-approve the "How it works" images.
  - Current state: four responsive process cards exist on the homepage.
  - Current review: local image references resolve and the section renders on desktop/mobile.
  - Need: Ben/final visual approval that these are launch-ready, not just functional.
- [x] Replace the remaining Workshops page visual placeholder with a real or final fallback visual.
  - Current review: the old obvious Workshops placeholder block is gone and workshop-specific visuals are in place.
- [ ] Review the Proof page against the updated homepage proof treatment.
  - Current review: readable diagnostic preview images are present, before/after slide comparisons render, and the page uses the `See the Work` positioning.
  - Need: manually verify PDF modal/open/download interactions and confirm the page does not repeat artifacts awkwardly.
- [x] Remove Featured Offers price placeholders.
  - Current review: no `Starting at $___`, `$___`, or `___` pricing placeholders were found in current HTML.
  - Note: final pricing still needs business approval before launch if prices are public.
- [ ] Confirm founder/team section assets.
  - Ben is visually prominent on the homepage.
  - Andrew is intentionally smaller, but the final headshot/portrait choice still needs approval.
  - Leave room for future collaborators.

## Forms, Routing, And Tracking

- [ ] Fix duplicated Tally `originPage` in rendered iframe URLs.
  - Finding: final rendered iframe `src` duplicates `originPage` after Tally widget loading.
  - Confirmed on `/diagnostic/`, `/scan/`, `/contact/`, and `/get-started/`.
  - Risk: form attribution may be wrong or inconsistent in Tally submissions.
- [ ] QA all Tally-backed forms end to end.
  - Toolkit form: `/scan`
  - Diagnostic form: `/diagnostic`
  - Workshop inquiry form: `/contact`
  - Get Started form: `/get-started`
  - Confirm submit behavior, mobile usability, redirect/thank-you behavior, and internal notification routing.
- [ ] Confirm hidden fields and source attribution.
  - Current site passes `source` and `originPage` into Tally embeds/links.
  - Do this after fixing the duplicate `originPage` issue.
  - Verify the values arrive correctly in Tally submissions.
- [ ] Confirm every primary CTA destination across desktop and mobile.
  - Header diagnostic CTA
  - Homepage hero CTAs
  - Proof/See the Work CTA
  - Final CTA band
  - Services/process/workshops CTAs
  - Get Started CTAs
- [ ] Choose and install the analytics setup.
  - Current site has `data-track` hooks.
  - Need: decide analytics provider and verify events are actually captured.

## Copy And Content

- [ ] Do a final in-layout copy pass after visual changes settle.
  - Read the homepage, services, process, proof, workshops, scan, thanks, and privacy pages in the browser.
  - Look for duplicated phrases, old labels, weak placeholders, and unclear CTA language.
- [ ] Run a final AI-copy analysis pass on live/go-live copy only.
  - Source: `docs/Signal_Over_Noise_Design_Updates_3.md`, "Setup / todo list".
- [ ] Ben manual copy pass.
  - Source: `docs/Signal_Over_Noise_Design_Updates_3.md`, "Setup / todo list".
- [ ] Confirm whether `/packages/` should remain direct-link only, be redirected, or be removed.
  - Current direction: packages are de-emphasized and conceptually folded into Services.
  - Current review: `/packages/` is a lightweight pointer page to Services and Get Started.

## Social Media

- [ ] Manually verify final handle availability during account/page creation.
  - Source: `docs/social-media-plan.md`.
  - First-choice candidates include `signalovernoisepresentations`, `signalovernoisecoaching`, `signalovernoise.coach`, `sonpresentations`, and `signalnoisepresent`.
- [ ] Decide which channels launch first.
  - Recommended default: LinkedIn first, then YouTube or Instagram only if capacity exists.
- [ ] Draft the first 30 days of posts from the social plan.
  - Source: `docs/social-media-plan.md`, "First 30 Days".

## QA / Launch Checks

- [ ] Add or verify PDF binary handling for Git.
  - Finding: `git diff --check` currently reports trailing whitespace inside modified PDF binaries.
  - Likely fix: add/verify `.gitattributes` so PDF files are treated as binary.
- [ ] Re-run `git diff --check` after PDF binary handling is fixed.
- [ ] Contrast and readability audit.
- [ ] Mobile QA on all primary pages.
- [ ] CTA routing QA.
- [ ] Form submit QA.
- [ ] Footer/global chrome consistency QA.
- [ ] Confirm alt text on meaningful images.
- [ ] Confirm heading hierarchy.
- [ ] Confirm no unresolved dummy links or visible planning language remain.
- [ ] Confirm privacy page exists, is linked, and is current enough for launch.

## Source Docs

- `docs/Signal_Over_Noise_Design_Updates_3.md`
  - Best source for the prior setup/todo list, visual direction, proof strategy, and implementation order.
- `docs/Builder_Spec_v2.md`
  - Best source for page-by-page structure and pre-launch checklist.
- `docs/social-media-plan.md`
  - Current social media plan, handle research, and first 30-day content outline.
