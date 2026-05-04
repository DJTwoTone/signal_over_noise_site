# Signal over Noise Technical Launch QA Report

## Summary
- Launch technical status: Clear for technical launch from the checked local site state.
- Major fixes applied: Tally iframe clipping/height fixes, direct Tally iframe `src` mounting to prevent duplicate `originPage`, `/packages` redirect behavior, responsive QA automation, and live form submission verification.
- Remaining risks: Production hosting should be configured to mirror the local `/packages` 301 if the deployed host does not run `_server.js`. Pa11y was run on the homepage through the static helper; responsive/browser/link/form checks covered the full route set.

## Build / test commands run
- command: `node --check assets/site.js`
- result: Passed.
- command: `node --check _server.js`
- result: Passed.
- command: `node --check scripts/launch-responsive-qa.js`
- result: Passed.
- command: HTML tag-balance check across route `index.html` files
- result: Passed through the static-site helper for 12 files.
- command: `git diff --check`
- result: Passed; Git printed CRLF normalization warnings only.
- command: `curl.exe -I http://localhost:8080/packages` and `curl.exe -I http://localhost:8080/packages/`
- result: Both returned `301 Moved Permanently` with `Location: /services/`.
- command: `$env:NODE_PATH='C:\Users\djtwo\AppData\Roaming\npm\node_modules'; node scripts\launch-responsive-qa.js`
- result: Passed; 1,212 checks, 0 failures.
- command: Playwright link/CTA check
- result: Passed; 248 local links checked, 0 broken links, 0 CTA destination failures.
- command: Static-site QA helper with Pa11y HTMLCS and axe on `http://localhost:8080/`
- result: Passed; no homepage Pa11y issues found, desktop/mobile screenshots captured.

## Route QA
| Route | Status | Notes |
|---|---|---|
| `/` | Pass | Local route loaded; no responsive overflow. |
| `/services` | Pass | Local route loaded; no broken local links or CTA failures. |
| `/process` | Pass | Local route loaded; no responsive overflow. |
| `/proof` | Pass | Local route loaded; proof PDF links resolved in link QA. |
| `/workshops` | Pass | Local route loaded; workshop CTA resolves to `/contact/`. |
| `/diagnostic` | Pass | Tally iframe loads at 900px and submitted successfully with dummy data. |
| `/scan` | Pass | Tally iframe loads at 720px and submitted successfully with dummy data. |
| `/thanks` | Pass | Local route loaded; no responsive overflow. |
| `/get-started` | Pass | Tally iframe loads at 900px and submitted successfully with dummy data. |
| `/contact` | Pass | Tally iframe loads at 820px and submitted successfully with dummy data. |
| `/privacy` | Pass | Local route loaded; privacy links resolved. |
| `/packages` | Pass | Local preview returns 301 to `/services/`; static fallback page also redirects/canonicalizes. |

## Responsive QA
| Route | Widths checked | Issues found | Fixed? |
|---|---:|---|---|
| All launch routes | Fixed widths 320, 360, 375, 390, 414, 430, 480, 540, 640, 768, 834, 900, 1024, 1112, 1280, 1366, 1440, 1536, 1728, 1920 plus 320-1920 sweep in 20px increments | 0 horizontal overflow failures, 0 local request failures, 0 real console failures | Yes |

## Form submit reports

## Form submit report: `/diagnostic`

- Form provider: Tally
- Form embedded as: direct iframe `src`
- Test data used: `Codex Test User`, `codex-test+signal-over-noise@example.com`, dummy presentation context, `2099-12-31`, and `https://example.com/dummy-presentation-test`
- Could fields be filled successfully? Yes
- Could required fields be identified? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded Tally confirmation: "Thanks for completing this form!"
- Final URL after submit: `http://localhost:8080/diagnostic/`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/launch-technical-qa-2026-05-04/forms/diagnostic-before.png`, `.qa-screenshots/launch-technical-qa-2026-05-04/forms/diagnostic-after.png`
- Issues found: Initial automation missed the radio choice; provider-side validation asked for Review Type.
- Fix applied: Kept site fix in place; retested with direct radio input selection. Iframe height is 900px and no duplicate `originPage` remains.
- Retest result: Passed

## Form submit report: `/scan`

- Form provider: Tally
- Form embedded as: direct iframe `src`
- Test data used: `Codex Test User`, `codex-test+signal-over-noise@example.com`, and dummy challenge text
- Could fields be filled successfully? Yes
- Could required fields be identified? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded Tally confirmation: "Thanks for completing this form!"
- Final URL after submit: `http://localhost:8080/scan/`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/launch-technical-qa-2026-05-04/forms/scan-before.png`, `.qa-screenshots/launch-technical-qa-2026-05-04/forms/scan-after.png`
- Issues found: None after iframe height fix.
- Fix applied: Iframe height set to 720px and form container overflow no longer clips the iframe.
- Retest result: Passed

## Form submit report: `/contact`

- Form provider: Tally
- Form embedded as: direct iframe `src`
- Test data used: `Codex Test User`, `codex-test+signal-over-noise@example.com`, `Technical QA Test`, group size `6 - 15`, custom workshop focus, `This month`, and dummy inquiry notes
- Could fields be filled successfully? Yes
- Could required fields be identified? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded Tally confirmation: "Thanks for completing this form!"
- Final URL after submit: `http://localhost:8080/contact/`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/launch-technical-qa-2026-05-04/forms/contact-before.png`, `.qa-screenshots/launch-technical-qa-2026-05-04/forms/contact-after.png`
- Issues found: Initial automation typed into dropdown-style fields instead of selecting provider options; Tally correctly rejected the required fields.
- Fix applied: Retested by selecting actual dropdown options. Iframe height is 820px and no clipping was observed.
- Retest result: Passed

## Form submit report: `/get-started`

- Form provider: Tally
- Form embedded as: direct iframe `src`
- Test data used: `Codex Test User`, `codex-test+signal-over-noise@example.com`, `Technical QA Test`, Presentation Sprint, Business presentation, 2-3 weeks, Deck, dummy support note, and `https://example.com/dummy-presentation-test`
- Could fields be filled successfully? Yes
- Could required fields be identified? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded Tally confirmation: "Thanks for completing this form!"
- Final URL after submit: `http://localhost:8080/get-started/`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/launch-technical-qa-2026-05-04/forms/get-started-before.png`, `.qa-screenshots/launch-technical-qa-2026-05-04/forms/get-started-after.png`
- Issues found: None after iframe height fix.
- Fix applied: Iframe height set to 900px and form container overflow no longer clips the iframe.
- Retest result: Passed

## Overflow / readability findings
- Issue: Tally forms could appear clipped because the shared `.tally-embed-container` used `overflow: hidden` and the default iframe height was too short.
- Page: `/diagnostic`, `/scan`, `/contact`, `/get-started`
- Fix: Removed clipping overflow from the Tally container, added route-specific iframe heights, and kept the embed visually framed.
- Issue: Tally widget script duplicated `originPage` in final rendered iframe URLs.
- Page: `/diagnostic`, `/scan`, `/contact`, `/get-started`
- Fix: Mounted iframes with direct `src` and fixed launch heights instead of using the Tally widget script mutation path.

## Link / CTA QA
- Broken links found: None in 248 checked local links.
- Fixed links: `/packages` now redirects to `/services/`; CTA checks confirmed diagnostic, paid-support/get-started, workshop, toolkit, proof, privacy, and services/pricing routes resolve as expected.
- Remaining questions: None for local route behavior.

## Packages route
- Final behavior: `/packages` and `/packages/` return `301 Moved Permanently` to `/services/` in local preview.
- Notes: `packages/index.html` also includes `noindex`, canonical to `../services/`, meta refresh, and JS fallback redirect for static hosting contexts.

## Screenshots
- Responsive screenshots and JSON: `.qa-screenshots/launch-technical-qa-2026-05-04/responsive-results.json`
- Form submission evidence: `.qa-screenshots/launch-technical-qa-2026-05-04/forms/`
- Link/CTA evidence: `.qa-screenshots/launch-technical-qa-2026-05-04/link-cta-results.json`
- Static helper screenshots: `.qa-screenshots/launch-technical-qa-2026-05-04/static-helper/desktop.png`, `.qa-screenshots/launch-technical-qa-2026-05-04/static-helper/mobile.png`
- Route screenshots are local QA evidence and are not required site assets.

## Remaining recommendations
- P0: None from this pass.
- P1: Mirror the `/packages` 301 in the production host configuration if deployment does not use `_server.js`.
- P2: Keep the live Tally dummy submissions identifiable and remove them from Tally if desired after launch QA review.
