# Analytics Admin Notes - Signal over Noise

## GA4 Setup

- GA4 property name: Signal over Noise Website
- Measurement ID: G-VWSJGBW70Y
- Data stream URL: https://signal-over-noise.coach
- Install method: Manual gtag.js snippets, with a shared fallback in `assets/site.js` for public pages without an inline tag
- Install status: Site-side tracking implemented; property-side receipt still needs verification
- Realtime verification: Manual check required
- Enhanced Measurement: Manual check required in GA4
- Search Console linked to GA4: Manual check required

## Pages Covered

- /
- /services/
- /diagnostic/
- /toolkit/
- /workshops/
- /proof/
- /contact/
- /get-started/
- /thanks/
- /privacy/
- /process/
- /packages/
- /about/
- /insights/
- /terms/
- /ko/
- /ko/services/
- /ko/diagnostic/
- /ko/toolkit/
- /ko/workshops/
- /ko/proof/
- /ko/contact/
- /ko/get-started/
- /ko/thanks/
- /ko/privacy/
- /ko/process/
- /ko/packages/
- /ko/about/
- /ko/insights/
- /ko/terms/

## Verification Steps for Owner

1. Deploy the site through Cloudflare Pages.
2. Open https://signal-over-noise.coach in an incognito/private window.
3. Visit several pages:
   - /
   - /services/
   - /diagnostic/
   - /toolkit/
   - /workshops/
   - /proof/
   - /contact/
   - /get-started/
4. Open Google Analytics.
5. Go to Reports -> Realtime.
6. Confirm at least 1 active user appears.
7. Confirm page_view events are appearing.
8. Mark verification as complete in this document.

## Site event plan

- `page_view`: standard GA4 page measurement.
- `select_content`: primary route CTA clicks, tagged with `route_type`, `item_id`, `source`, and `origin_page`.
- `form_view`: Tally iframe loads, tagged with `form_type`, `route_type`, `source`, and `origin_page`. This is a form-view proxy, not an interaction-start event.
- `select_content` with `content_type=proof_sample`: diagnostic sample opens.
- `proof_compare` with `content_type=before_after_comparison`: first interaction with each comparison.
- `generate_lead`: dedicated diagnostic, paid-support, and workshop confirmation pages; `form_type` distinguishes each route.

In GA4, mark `generate_lead` as a key event and build a simple funnel from `select_content` (route CTA) through `form_view` to `generate_lead`. True Tally form starts/submission events require Tally's form-event integration with Google Tag Manager or a Tally custom domain; this site currently uses direct gtag.js and dedicated thank-you redirects instead.

## Green / Yellow / Red Checklist

### Green

- [ ] GA4 property created
- [ ] Web stream created for https://signal-over-noise.coach
- [x] GA4 tag installed on all public pages
- [ ] Build passes
- [ ] Site deployed after GA4 install
- [ ] GA4 Realtime shows traffic
- [ ] Enhanced Measurement enabled
- [ ] Search Console linked to GA4
- [ ] `generate_lead` marked as a key event in GA4
- [x] Analytics notes documented

### Yellow

- [ ] GA4 installed but not yet showing Realtime data
- [x] Dedicated confirmation pages emit a form-typed `generate_lead` event
- [x] Primary route CTA, form-view, proof sample, and comparison events are sent through gtag.js
- [ ] Search Console is not linked yet
- [x] Dedicated thank-you pages are in use for diagnostic, paid support, and workshop inquiries

### Red

- [ ] GA4 tag missing
- [ ] GA4 tag duplicated
- [ ] GA4 installed on only some public pages
- [ ] Wrong Measurement ID
- [ ] Wrong domain in data stream
- [ ] No conversion/key event tracking
- [ ] Tally redirects do not lead back to the canonical domain

## Manual Verification Still Required

- Confirm GA4 Realtime receives visits after deployment.
- Confirm `select_content`, `form_view`, and `generate_lead` appear with the expected route parameters.
- Confirm Enhanced Measurement is enabled in GA4.
- Confirm Search Console is linked to GA4.
- Mark `generate_lead` as a key event in GA4.
