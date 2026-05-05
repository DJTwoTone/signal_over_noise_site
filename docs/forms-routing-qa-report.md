# Signal over Noise Forms / Routing QA Report

## Summary

- Status: Passed local forms/routing QA on `http://localhost:8080`.
- Fixes applied: Added route-specific hidden/context params, UTM preservation, `referring_page`, `cta_clicked`, duplicate-safe Tally URL building, and CTA-aware form-route hydration.
- Remaining risks: Tally email evidence confirms several hidden fields for `/get-started`, but capture remains unconfirmed for the other forms. The `/get-started` email did not show `utm_medium`, `utm_content`, or `utm_term`, so those fields may still need to be added inside Tally.

## Hidden field implementation

- Helper/function updated: `buildTallyUrl(baseUrl, routeContext)` in `assets/site.js`.
- Params passed: `source_page`, `route_type`, `cta_clicked`, `offer_context`, `page_variant`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referring_page`, `workshop_followup`.
- Legacy params preserved: `source`, `originPage`.
- UTM preservation: Confirmed with `utm_source=qa`, `utm_medium=test`, `utm_campaign=hidden_field_check`, `utm_content=form_route`, `utm_term=forms_routing`.
- CTA clicked handling: Confirmed query value `cta_clicked=qa_test` reached each embedded Tally iframe; hydrated CTA links also pass route-specific `cta_clicked` values.
- Duplicate param prevention: Confirmed each required param, plus legacy `source` and `originPage`, appeared exactly once in final iframe URLs.

## Tally email capture evidence

- Source reviewed: `C:\Users\djtwo\Downloads\Gmail - New Tally Form Submission for Getting Started with Signal over Noise.pdf`.
- Scope: The PDF contains five Tally notification emails for the `/get-started` paid-support form, generated during QA retests on May 5, 2026.
- Confirmed captured in `/get-started` Tally emails: `source_page`, `route_type`, `cta_clicked`, `offer_context`, `page_variant`, `utm_source`, `utm_campaign`, `referring_page`, `workshop_followup`.
- Not visible in the `/get-started` Tally emails: `utm_medium`, `utm_content`, `utm_term`.
- Legacy context fields not visible in the emails: `source`, `originPage`.
- Interpretation: The website is passing all planned params into the iframe URL, but Tally only emails fields that exist in the form/submission schema. Add or verify the missing UTM hidden fields inside Tally.

## Route context map

| Route | route_type | offer_context | source_page | workshop_followup |
|---|---|---|---|---|
| `/diagnostic/` | `free_diagnostic` | `diagnostic_first` | `/diagnostic` | `false` |
| `/scan/` | `toolkit` | `workshop_followup` | `/scan` | `true` |
| `/get-started/` | `paid_support` | `paid_support_route` | `/get-started` | `false` |
| `/contact/` | `workshop_inquiry` | `workshop_route` | `/contact` | `false` |

## Form routing reports

## Form routing report: `/diagnostic/`

- Form provider: Tally
- Tally form URL: `https://tally.so/embed/7RoLkz`
- Final iframe URL: `https://tally.so/embed/7RoLkz?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&source=main-site&originPage=%2Fdiagnostic&cta_clicked=qa_test&source_page=%2Fdiagnostic&route_type=free_diagnostic&offer_context=diagnostic_first&page_variant=desktop_v1_launch&workshop_followup=false&referring_page=http%3A%2F%2Flocalhost%3A8080%2Fproof%2F`
- Hidden/context params present in iframe URL: all required params present once.
- Could fields be filled successfully? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded generic Tally confirmation: "Thanks for completing this form!"
- Is confirmation visible and unclipped? Yes
- Final page URL: `http://localhost:8080/diagnostic/?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&cta_clicked=qa_test`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/forms-routing-qa-2026-05-05/diagnostic-before.png`, `.qa-screenshots/forms-routing-qa-2026-05-05/diagnostic-after.png`
- Issues found: Thank-you is generic; hidden-field storage in Tally is unconfirmed.
- Fix applied: Website now passes full route and campaign context.
- Retest result: Passed

## Form routing report: `/scan/`

- Form provider: Tally
- Tally form URL: `https://tally.so/embed/aQG1EZ`
- Final iframe URL: `https://tally.so/embed/aQG1EZ?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&source=workshop-qr&originPage=%2Fscan&cta_clicked=qa_test&source_page=%2Fscan&route_type=toolkit&offer_context=workshop_followup&page_variant=desktop_v1_launch&workshop_followup=true&referring_page=http%3A%2F%2Flocalhost%3A8080%2Fproof%2F`
- Hidden/context params present in iframe URL: all required params present once.
- Could fields be filled successfully? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded custom Tally confirmation for the Presenter Toolkit.
- Is confirmation visible and unclipped? Yes
- Final page URL: `http://localhost:8080/scan/?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&cta_clicked=qa_test`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/forms-routing-qa-2026-05-05/scan-before.png`, `.qa-screenshots/forms-routing-qa-2026-05-05/scan-after.png`
- Issues found: Hidden-field storage in Tally is unconfirmed.
- Fix applied: Website now passes full route and campaign context.
- Retest result: Passed

## Form routing report: `/get-started/`

- Form provider: Tally
- Tally form URL: `https://tally.so/embed/Ek8bV2`
- Final iframe URL: `https://tally.so/embed/Ek8bV2?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&source=get-started-page&originPage=%2Fget-started&cta_clicked=qa_test&source_page=%2Fget-started&route_type=paid_support&offer_context=paid_support_route&page_variant=desktop_v1_launch&workshop_followup=false&referring_page=http%3A%2F%2Flocalhost%3A8080%2Fproof%2F`
- Hidden/context params present in iframe URL: all required params present once.
- Could fields be filled successfully? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded custom Tally confirmation for paid support requests.
- Is confirmation visible and unclipped? Yes
- Final page URL: `http://localhost:8080/get-started/?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&cta_clicked=qa_test`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/forms-routing-qa-2026-05-05/get-started-before.png`, `.qa-screenshots/forms-routing-qa-2026-05-05/get-started-after.png`
- Issues found: `/get-started` email capture confirms most hidden fields, but does not show `utm_medium`, `utm_content`, or `utm_term`.
- Email capture follow-up: `/get-started` emails confirm `source_page`, `route_type`, `cta_clicked`, `offer_context`, `page_variant`, `utm_source`, `utm_campaign`, `referring_page`, and `workshop_followup`.
- Fix applied: Website now passes full route and campaign context.
- Retest result: Passed

## Form routing report: `/contact/`

- Form provider: Tally
- Tally form URL: `https://tally.so/embed/gDLqe4`
- Final iframe URL: `https://tally.so/embed/gDLqe4?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&source=workshops-page&originPage=%2Fcontact&cta_clicked=qa_test&source_page=%2Fcontact&route_type=workshop_inquiry&offer_context=workshop_route&page_variant=desktop_v1_launch&workshop_followup=false&referring_page=http%3A%2F%2Flocalhost%3A8080%2Fproof%2F`
- Hidden/context params present in iframe URL: all required params present once.
- Could fields be filled successfully? Yes
- Could submit button be reached? Yes
- What happened after submit? Embedded custom Tally confirmation for workshop inquiries.
- Is confirmation visible and unclipped? Yes
- Final page URL: `http://localhost:8080/contact/?utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&cta_clicked=qa_test`
- Console errors: None recorded
- Network errors: None recorded
- Screenshots captured: `.qa-screenshots/forms-routing-qa-2026-05-05/contact-before.png`, `.qa-screenshots/forms-routing-qa-2026-05-05/contact-after.png`
- Issues found: Hidden-field storage in Tally is unconfirmed.
- Fix applied: Website now passes full route and campaign context.
- Retest result: Passed

## Intake field QA

| Form | Expected fields present? | Missing/uncertain fields | Notes |
|---|---|---|---|
| Diagnostic | Yes | None visible | Boundary copy is present. |
| Toolkit | Yes | None visible | Helper copy is present. |
| Paid Support | Yes | None visible | Paid-scope expectation copy is present. |
| Workshop Inquiry | Yes | None visible | Intro/helper copy and workshop intake fields are present. |

## Thank-you behavior

| Form | Confirmation behavior | Custom? | Clipped? | Notes |
|---|---|---|---|---|
| Diagnostic | Embedded Tally confirmation | No | No | Customize in Tally before launch if possible. |
| Toolkit | Embedded Tally confirmation | Yes | No | Matches recommended toolkit copy. |
| Paid Support | Embedded Tally confirmation | Yes | No | Matches recommended paid-support copy. |
| Workshop Inquiry | Embedded Tally confirmation | Yes | No | Matches recommended workshop inquiry copy. |

## Link / CTA QA

- Broken links: None found in focused form-route CTA check.
- CTA routing issues: None. `43` hydrated CTA route checks passed.
- Fixes: Added `data-get-started-link` hydration for paid-support CTAs and `data-cta-clicked` values to meaningful CTA links.
- Packages route: `/packages` and `/packages/` landed on `/services/` in browser QA.
- Privacy links: Confirmed present through shared header/footer and focused route scan.

## Build/test commands run

- command: `node --check assets/site.js`
- result: Passed.
- command: `node --check _server.js`
- result: Passed.
- command: `node --check scripts/launch-responsive-qa.js`
- result: Passed.
- command: `node --check scripts/forms-routing-qa.js`
- result: Passed.
- command: `$env:NODE_PATH='C:\Users\djtwo\AppData\Roaming\npm\node_modules'; node scripts\forms-routing-qa.js`
- result: Passed; `0` failures. Evidence JSON: `.qa-screenshots/forms-routing-qa-2026-05-05/forms-routing-results.json`.
- command: focused Playwright responsive form check at `375px` and `1440px` for `/diagnostic/`, `/scan/`, `/get-started/`, and `/contact/`
- result: Passed; `8` checks, `0` failures.
- command: `curl.exe -I http://localhost:8080/packages` and `curl.exe -I http://localhost:8080/packages/`
- result: Passed; both returned `301 Moved Permanently` with `Location: /services/`.
- command: `$env:NODE_PATH='C:\Users\djtwo\AppData\Roaming\npm\node_modules'; node scripts\launch-responsive-qa.js`
- result: Timed out after 10 minutes before writing a fresh JSON report; partial screenshots were captured, but this run is not counted as a completed pass.
- command: `git diff --check`
- result: Passed; Git printed CRLF normalization warnings only.
