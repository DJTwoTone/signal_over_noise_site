# Signal over Noise — Trust-First Site Rebuild Kanban

Working branch: `codex/trust-first-site-rebuild`  
Commit status: no commit made; preserve unrelated local changes.

## Working rules

- [x] Work from the current tree on a `codex/` branch.
- [x] Preserve unrelated `.vscode/tasks.json` and `blog-zip-intake` changes.
- [ ] Review the complete diff with Ben before any commit.
- [ ] Present changed files, behavioral summary, validation, and uncommitted diff after each stage.

## Stage 1 — Factual source pack and approvals

### Approved

- [x] Ben’s public name, role, experience timeline, teaching/tutoring history, theater direction, strengths, presentation types, cross-border scope, and LinkedIn.
- [x] Three anonymized proof stories: investor pitch, internal operations, academic research presentation.
- [x] Qualitative outcomes and concise before → after summaries.
- [x] Supporting artifacts may be published with anonymized permission and labeled appropriately.
- [x] Free diagnostic policy: Ben reviews every submission; reply within 48 hours; 3–5 fixes plus next step; slides/scripts/outlines/short delivery samples accepted; redacted/partial material accepted; no purchase obligation.
- [x] Privacy: free files deleted within 30 days; paid files deleted 90 days after final delivery; contact details reviewed quarterly; earlier deletion via `privacy@signal-over-noise.coach`.
- [x] Submitted materials currently accessed only by Ben; Ben is sole privacy contact.
- [x] Tally is the external form provider and may process/store submissions outside Korea; link to Tally policy.
- [x] NDA available on request.
- [x] No public AI-training/model-use claim.
- [x] Primary offers in EN and KO: Focused Coaching / Review Session (₩150,000), Presentation Sprint (from ₩375,000), Deck Building (from ₩1,200,000).
- [x] USD may be shown approximately; KRW authoritative; refresh manually and confirm current equivalent at inquiry/checkout.
- [x] Deck Building intake: audience, desired decision/action, deadline required; source data/evidence, story/script, assets, style, references, constraints, and context optional.
- [x] Andrew removed from public site.
- [x] Approved replacement headshot installed; no public AI-generation disclosure.

### Still to approve or clarify

- [ ] Named clients, institutions, credentials, or permission-cleared testimonial quotes.
- [x] USD display rule: refresh weekly and round displayed equivalents to the nearest $10; KRW remains authoritative.
- [ ] Any additional Tally subprocessors or verified processing destinations.
- [ ] Deck Building intake wording and final required/optional field list.
- [x] Paid-offer scope approved at a high level: Focused Coaching (60-minute session, pre-review, action plan); Presentation Sprint (script, deck, rehearsal minimum; flexible scope); Deck Building (intake-led story/slide build and handoff; scope revisions/turnaround/extras before work).
- [x] Set default revision limits and turnaround language: Coaching clarification email within 7 days; Sprint normally 1–3 weeks, two revisions, one rehearsal; Deck Building normally 2–4 weeks, two revisions, editable + presentation-ready handoff. Rush/extras scoped separately.

## Stage 2 — Immediate blockers

- [x] Homepage typo and above-fold CTA corrected.
- [x] Korean Insights route restored.
- [x] Legacy diagnostic redirects added.
- [x] `/about/` and `/terms/` pages added with non-soft-200 content.
- [ ] Re-run production route/redirect checks after final copy changes.

## Stage 3 — EN/KO conversion architecture

- [x] Concise navigation and cross-border sales-presentation positioning added.
- [x] Three primary paid routes and starting prices added to Services architecture.
- [x] Mallang partner route kept separate.
- [ ] Ensure all three offers have complete, matching EN/KO scope copy.
- [x] Add initial approximate USD displays and build-time updater; refresh weekly; KRW authoritative.
- [ ] Schedule the production build weekly (hosting/CI scheduler) so the updater runs automatically.
- [x] Draft the Deck Building intake document; publish/connect it to the paid-support handoff after form routing is ready.

## Stage 4 — Proof and trust

- [x] About Ben section and approved experience/promise language added.
- [x] Three anonymized case studies with before → after summaries added.
- [x] Artifacts labeled as anonymized/illustrative where appropriate.
- [x] Andrew removed from public proof pages.
- [x] Privacy retention, access, Tally, NDA, and deletion contact copy added in EN/KO.
- [ ] Normalize compact KO About markup safely and bring all approved bio copy into parity.
- [ ] Confirm all public artifact labels and image alt text.

## Stage 5 — Diagnostic and paid-support flows

- [x] Diagnostic page copy reflects Ben review, 48-hour reply, accepted formats, redaction guidance, and no obligation.
- [x] Attribution hooks and language parameters added to site-side Tally embeds.
- [ ] Decide whether separate Korean forms are needed; current Tally forms already include EN/KO titles and are active.
- [x] Verify Diagnostic field set from the Tally editor capture; email label corrected to “Email / 이메일.”
- [x] Verify Getting Started field set from the editor capture: name, email, organization/role, support type, presentation type, timeline, materials, current problem, desired outcome, upload/link, privacy acknowledgement, attribution fields, and bilingual thank-you page.
- [x] Verify Workshop Inquiry field set from the editor capture: name, email, organization, role/title, participant count, audience, presentation context, support needs, target date/timeline, preferred format, existing materials, desired outcome, attribution fields, and bilingual thank-you page.
- [ ] Keep the form’s broader support choices routed into the three primary offers versus secondary/custom routes.
- [x] Confirm current Tally forms and notification routing: Diagnostic `https://tally.so/r/7RoLkz`, Getting Started `https://tally.so/r/Ek8bV2`, Workshop Inquiry `https://tally.so/r/gDLqe4`; Ben receives notifications.
- [ ] Add/verify hidden fields: `source`, `originPage`, `cta_clicked`, `source_page`, `route_type`, `offer_context`, `page_variant`, `workshop_followup`, and language.
- [ ] Configure localized thank-you destinations and reply/notification templates.
- [ ] Connect Deck Building intake to the paid-support handoff.
- [ ] Run real EN/KO submission tests once external Tally forms are available.

## Stage 6 — Visual, accessibility, SEO, measurement

- [x] Responsive hierarchy and core visual updates applied.
- [x] Route-specific social metadata added for primary routes.
- [x] JSON-LD/hreflang foundations added.
- [x] Funnel events for CTA/form starts and thank-you pages added.
- [ ] Replace remaining generic/AI-looking imagery with approved authentic work imagery where available.
- [ ] Complete responsive QA across EN/KO routes.
- [ ] Complete accessibility checks: headings, landmarks, keyboard, focus, contrast, alt text, form labels (script now covers core EN/KO routes plus Insights).
- [ ] Complete SEO checks: title/description, canonical, hreflang, social images, schema, sitemap.
- [ ] Complete attribution QA across homepage, services, diagnostic, proof, workshops, and KO equivalents.

## Stage 7 — Social and distribution

### X

- [x] Claim X handle: `@signal____noise`.
- [x] Set up X professional profile and business description.
- [x] Create X profile image and banner in the Signal over Noise visual system.
- [x] Seed the account with relevant presentation, communication, AI, and Korea/startup accounts/topics.
- [x] Publish and pin an introduction post that explains Signal over Noise and points to the Free Presentation Diagnostic.

### Meta

- [ ] Create/claim Instagram account. **Blocked:** Meta registration/setup is currently not working; retry later rather than repeatedly triggering anti-abuse checks.
- [ ] Create Signal over Noise Facebook Page through Ben’s existing Facebook account.
- [ ] Connect Facebook and Instagram in Meta Business Suite / Accounts Center once both are available.

### Other channels

- [ ] Create/complete LinkedIn company page.
- [ ] Create/complete YouTube channel.
- [ ] Create Bluesky account and evaluate using `signal-over-noise.coach` as the domain-based handle.

### Social system

- [ ] Standardize display name, bio, description, CTA, links, and location rules across platforms.
- [ ] Standardize reusable profile/avatar, banner, and social-card image assets.
- [ ] Define the Insights article → social repurposing workflow.
- [ ] Prepare the first 5–10 launch posts from existing Insights content and diagnostic/proof material.
- [ ] Establish a lightweight publishing cadence that does not create a content treadmill.
- [ ] Track only useful signals: posts shipped, repurposed assets, CTA clicks, diagnostic form starts, and diagnostic submits.

## Verification gates

- [x] `npm run build` passed.
- [x] `npm run check:i18n-routing` passed.
- [x] `npm run check:search` passed.
- [x] `node --check assets/site.js` passed.
- [x] `git diff --check` passed.
- [x] Local route checks passed for core EN/KO routes; legacy paths returned 301.
- [ ] Re-run all checks after remaining implementation work.
- [ ] Review complete uncommitted diff with Ben.
- [ ] Wait for explicit approval before committing.
