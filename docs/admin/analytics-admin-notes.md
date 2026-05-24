# Analytics Admin Notes - Signal over Noise

## GA4 Setup

- GA4 property name: Signal over Noise Website
- Measurement ID: G-VWSJGBW70Y
- Data stream URL: https://signal-over-noise.coach
- Install method: Manual gtag.js snippet in static HTML pages
- Install status: Installed in repo / Manual verification required
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

## Temporary Key Event Plan

Until dedicated thank-you pages exist, use the existing generic thank-you page:

- Event name: lead_thank_you_view
- Based on: page_view
- Condition: page_location contains /thanks/

Later, create dedicated thank-you pages:

- /thanks-diagnostic/ -> diagnostic_submit
- /thanks-toolkit/ -> toolkit_signup
- /thanks-workshop/ -> workshop_inquiry_submit

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
- [ ] At least one key event created
- [x] Analytics notes documented

### Yellow

- [ ] GA4 installed but not yet showing Realtime data
- [x] Generic /thanks/ page is the only conversion page
- [ ] Form submissions are not clearly separated by form type
- [ ] CTA click events are not yet custom-tracked
- [ ] Search Console is not linked yet
- [x] Dedicated thank-you pages do not exist yet

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
- Confirm Enhanced Measurement is enabled in GA4.
- Confirm Search Console is linked to GA4.
- Create and verify the planned key event in GA4.
