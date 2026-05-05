# Signal over Noise Privacy Page QA Report

## Summary
- Status: Complete for repo-controlled privacy-page expansion.
- Fixes applied: Expanded `/privacy/` into a plain-English Privacy Policy covering collection, use, presentation materials, service providers, routing data, sharing, retention, access/correction/deletion requests, children/students, updates, and contact.
- Remaining risks: Provider language is intentionally cautious. Ben should confirm the exact hosting provider and whether analytics are currently active before launch.

## Page sections added
- [x] Intro
- [x] Information we collect
- [x] How we use information
- [x] Presentation materials and uploaded files
- [x] Forms and service providers
- [x] Routing and analytics information
- [x] Sharing information
- [x] Retention
- [x] Access/correction/deletion requests
- [x] Children/students
- [x] Policy updates
- [x] Contact

## Contact emails
- Privacy email: `privacy@signal-over-noise.coach`
- General email: `hello@signal-over-noise.coach`

## Material handling language
- Added? Yes
- Notes: The policy says submitted scripts, decks, delivery recordings, links, and related materials are used to review requests, prepare feedback, plan support, or respond to inquiries. It also says materials are not published, sold, or shared as public examples without permission, while avoiding an overbroad confidentiality guarantee.

## Third-party tools language
- Tally: Listed for form submissions.
- Google Workspace: Listed for email and communication.
- Cloudflare: Listed for domain and DNS services.
- Hosting: Listed cautiously as website hosting services, such as GitHub Pages or another static hosting provider.
- Analytics: Listed cautiously as analytics or routing tools that may help understand site use.

## QA commands run
- command: `Invoke-WebRequest -Uri 'http://localhost:8080/privacy/' -UseBasicParsing -MaximumRedirection 5`
- result: Pass; status `200`; title `Privacy Policy | Signal over Noise`.
- command: `node --check assets/site.js; node --check _server.js; node --check scripts/forms-routing-qa.js; node --check scripts/launch-responsive-qa.js`
- result: Pass.
- command: `git diff --check`
- result: Pass; Git printed expected LF-to-CRLF working-copy normalization warnings only.
- command: Inline Node local-link sweep over all HTML `href` and `src` references.
- result: Pass; checked 12 HTML files; broken local references: 0.
- command: `$env:QA_BASE_URL='http://localhost:8080'; $env:NODE_PATH=(npm root -g); node scripts/forms-routing-qa.js`
- result: Pass; report generated at `.qa-screenshots/forms-routing-qa-2026-05-05/forms-routing-results.json`; Failures: 0.
- command: Inline Playwright browser check for `/privacy/` at 1280px and 390px.
- result: Pass; `/privacy/` returned `200`, footer Privacy resolved to `/privacy/`, both contact emails appeared, no horizontal overflow was detected, and minimum main text size was `14px`.

## Remaining manual review
- [ ] Ben should confirm hosting provider wording.
- [ ] Ben should confirm analytics wording.
- [ ] Legal review later if needed.
