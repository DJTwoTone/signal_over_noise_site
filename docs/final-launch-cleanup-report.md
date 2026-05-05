# Signal over Noise Final Launch Cleanup Report

## Summary
- Status: Complete for repo-controlled launch cleanup items.
- Fixes applied: Diagnostic boundary copy tightened, Paid Support separated from Workshop Inquiry, Toolkit button labels verified, Workshop Inquiry top and bottom CTAs confirmed, proof captions shortened, and visitor-facing "source" language removed from proof buttons.
- Remaining risks: Diagnostic Tally form and Tally confirmation copy are not controlled in this repo. The current Tally text should be updated manually to include the complete diagnostic boundary language.

## Diagnostic boundary fixes
- Pages updated: `/diagnostic/`, `/thanks/`, `/`, `/proof/`, `/services/`, and `/process/`.
- Exact copy added: "The free diagnostic gives you 3&ndash;5 specific fixes and a recommended next step. It is not a full rewrite, full deck redesign, complete audit, or rehearsal plan. If paid support is the right next step, we'll say that clearly and separately."
- Tally/manual items: Update the Diagnostic Tally form intro and post-submit confirmation to include "complete audit" and the paid-support separation sentence. Browser QA confirmed the current Tally confirmation is visible, but the wording still lives in Tally rather than the static repo.

## Paid Support / Workshop route separation
- Changes made: `/get-started/` now uses "presentation, script, deck, rehearsal, sprint, or coaching package" and adds a note that team training or custom workshops should use the workshop inquiry route.
- Remaining concerns: None in repo-controlled copy found by source sweep.

## CTA label fixes
- Toolkit labels standardized: Source sweep found no remaining button variants for "Get the Signal over Noise Presenter Toolkit" or "Get the Toolkit"; visible Toolkit buttons use "Get the Presenter Toolkit."
- Other CTA changes: Added top and bottom `/contact/` anchor CTAs labeled "Ask About a Workshop."

## Proof polish
- Captions shortened: Internal support, retrieval quiz, and ShiftPilot proof captions were tightened.
- Labels/buttons changed: "Academic Results" changed to "Academic Research." "Open Source Script" buttons changed to "View Original Script."

## Workshop Inquiry visibility
- Top CTA/form: `/contact/` now has a top "Ask About a Workshop" button and the workshop Tally form has `id="workshop-form"`.
- Bottom CTA/form: `/contact/` now has a bottom Workshop Inquiry CTA band linking back to the same form.
- Notes: No new route was created; workshop CTAs stay on `/contact/`.

## QA commands run
- command: `node --check assets/site.js; node --check _server.js; node --check scripts/forms-routing-qa.js; node --check scripts/launch-responsive-qa.js`
- result: Pass.
- command: `git diff --check`
- result: Pass; Git printed expected LF-to-CRLF working-copy normalization warnings only.
- command: `$env:QA_BASE_URL='http://localhost:8080'; node scripts/forms-routing-qa.js`
- result: Initial run failed because local Node could not resolve the Playwright package.
- command: `$env:QA_BASE_URL='http://localhost:8080'; $env:NODE_PATH=(npm root -g); node scripts/forms-routing-qa.js`
- result: Pass; report generated at `.qa-screenshots/forms-routing-qa-2026-05-05/forms-routing-results.json`; Failures: 0.
- command: Inline Node local-link sweep over all HTML `href` and `src` references.
- result: Pass; checked 12 HTML files; broken local references: 0.

## Launch recommendation
- P0: Update Tally-controlled Diagnostic form/confirmation wording to include the full boundary language, including "complete audit" and paid support being named separately.
- P1: Re-run the forms-routing QA after the Tally copy update so the captured confirmation text reflects the final public wording.
- P2: Continue with privacy/legal-ish content next, since the technical and copy cleanup pass is now narrowed to the remaining non-repo Tally item.
