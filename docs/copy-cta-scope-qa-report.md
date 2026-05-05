# Signal over Noise Copy / CTA / Scope QA Report

## Summary

- Status: Implemented focused copy, CTA, and diagnostic-scope updates.
- Fixes applied: Standardized public CTA labels, reframed `/get-started` as paid support, added diagnostic boundary copy, clarified proof sample scope, added short proof captions, tightened process/services language, and added workshop fit/outcome language.
- Remaining risks: Proof sample service tiers are not confirmed, so proof cards use the conservative `Sample Review` label instead of claiming a free or paid tier.

## CTA label changes

| Old label | New label | Page(s) |
|---|---|---|
| Submit Diagnostic Request | Request a Free Presentation Diagnostic | `/diagnostic` |
| Send Request | Request Paid Support | `/get-started` |
| Get Started | Request Paid Support | Home, Services, Process, shared nav |
| Get Started for Paid Support | Request Paid Support | `/services` |
| Ask About a Team Workshop | Ask About a Workshop | `/workshops` |
| See the Work | View Sample Work | Home, Diagnostic, shared nav |
| View Diagnostic / View Related Diagnostic | View Sample Diagnostic | `/proof` |
| Explore Services | View Services and Pricing | Home |

## Route/destination verification

| CTA | Destination | Status |
|---|---|---|
| Request a Free Presentation Diagnostic | `/diagnostic` | Passed |
| Request Paid Support | `/get-started` | Passed |
| Ask About a Workshop | `/contact` | Passed |
| Get the Presenter Toolkit | `/scan` | Passed |
| View Sample Work | `/proof` | Passed |
| View Services and Pricing | `/services` | Passed |

## Diagnostic scope language

- Pages updated: Home, `/diagnostic`, `/services`, `/proof`, `/thanks`.
- Boundary line added: "The free diagnostic gives 3-5 specific fixes and a recommended next step. It is not a full rewrite, full deck redesign, or rehearsal plan."
- Remaining concerns: None in public copy found during text sweep.

## Get Started / Paid Support changes

- Headline: `Request paid presentation support.`
- Supporting copy: The page now states this route is for people who already know they want help with a presentation, script, deck, rehearsal, coaching, or team workshop.
- CTA: `Request Paid Support`
- Remaining concerns: None.

## Proof sample scope labels

| Sample | Label used | Notes |
|---|---|---|
| Internal support review | Sample Review | Conservative label because exact service tier is not confirmed in repo. |
| Retrieval quiz research results | Sample Review | Conservative label because exact service tier is not confirmed in repo. |
| ShiftPilot investor pitch | Sample Review | Conservative label because exact service tier is not confirmed in repo. |

## Proof caption changes

| Page/section | Caption added | Notes |
|---|---|---|
| `/proof` Corporate Support before/after | Improved: takeaway title, cleaner hierarchy, clearer operational evidence. | Short comparison caption added below slider. |
| `/proof` Academic Results before/after | Improved: stronger headline claim, less visual noise, clearer evidence. | Short comparison caption added below slider. |
| `/proof` Investor Pitch before/after | Improved: traction story, grouped proof points, cleaner decision path. | Short comparison caption added below slider. |

## Workshop / Toolkit changes

- Workshop Best For line: Added near the top of `/workshops`.
- Participants leave with block: Added to the workshops fit section.
- Toolkit clarification line: Already present on `/scan` and confirmed in Tally form copy from the previous QA pass.

## Build/test commands run

- command: `node --check assets/site.js`
- result: Passed.
- command: `node --check _server.js`
- result: Passed.
- command: `node --check scripts/forms-routing-qa.js`
- result: Passed.
- command: `node --check scripts/launch-responsive-qa.js`
- result: Passed.
- command: `$env:NODE_PATH='C:\Users\djtwo\AppData\Roaming\npm\node_modules'; node scripts\forms-routing-qa.js`
- result: Passed; `0` failures. Hidden-field and CTA query behavior remained intact.
- command: focused Playwright CTA text/destination check across 10 routes
- result: Passed; `0` failures. Checked diagnostic, paid-support, workshop, toolkit, proof, and services CTAs.
- command: `curl.exe -I http://localhost:8080/packages` and `curl.exe -I http://localhost:8080/packages/`
- result: Passed; both returned `301 Moved Permanently` with `Location: /services/`.
- command: `git diff --check`
- result: Passed; Git printed CRLF normalization warnings only.

## Manual review needed

- [ ] Talia: diagnostic boundary still safe
- [ ] Vale: CTA/conversion clarity still strong
- [ ] Mira: proof captions do not clutter visual hierarchy
