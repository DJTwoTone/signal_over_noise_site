# Trust-first source pack and external-form handoff

This repository implements the safe on-site structure. Complete the following facts in writing before publishing stronger claims or reconfiguring external forms.

## Facts to approve

- Ben's public bio: named roles, institutions or clients, years/volume of work, public profile URL, and approved headshot.
- Two case studies: permission status, accurate client label, stakes, intervention, result, and approved quote.
- Testimonials: name/title/organization permission and final wording.
- Diagnostic policy (approved): Ben reviews every diagnostic submission himself and replies within 48 hours for the free diagnostic, with 3–5 specific fixes plus a recommended next step. Accepted material includes slides, scripts, outlines, and short delivery samples; redacted or partial versions are acceptable. The diagnostic carries no obligation to purchase further support.
- File policy (approved retention): free diagnostic files are deleted within 30 days after the review reply; paid-project files are deleted 90 days after final delivery unless earlier deletion is requested or a contract requires otherwise; inquiry/contact details are reviewed quarterly and kept only as long as needed. Earlier deletion requests are accepted via privacy@signal-over-noise.coach. Submitted materials are currently accessed only by Ben. Ben is the sole privacy contact. Tally is the external form provider and may process/store submissions under its own policies, including potentially outside Korea. NDA available on request. No public AI-training or model-use claim is approved at this stage.
- Paid offers: delivery mode, duration, material limit, inclusions, revisions/rehearsals, turnaround, exclusions, and each starting price.

## Pricing reference — approved public structure

Use three primary paid routes on the public Services page: Focused Coaching / Review Session (₩150,000 per 60-minute session), Presentation Sprint (from ₩375,000 per presentation/event), and Deck Building (from ₩1,200,000 per deck). Keep script work, ongoing coaching, workshops, and custom support as secondary or fit-conversation routes.

All three primary offers should be presented in both English and Korean.

About-page core promise: “I help people turn presentation noise into a message their audience can hear, trust, and act on.”

Experience claim: “Ben brings more than 15 years of experience teaching, coaching, editing, and directing presentations.”

Differentiators: make AI-assisted work sound unmistakably human; read the room from both sides; connect ideas across disciplines; turn complicated problems into a clear, workable path forward.

Public timeline: university teaching began in 2010; executive and company tutoring began in 2009.

Case-study convention: keep the three examples anonymized and label each one explicitly as “Anonymized client work.”

Proof may use qualitative stakes, intervention, and outcomes without client names or numeric results.

Each case study should include a concise before → after statement while remaining explicitly anonymized.

Label supporting material that is not a publishable client original as “Illustrative / anonymized artifact.”

Existing before/after artifacts have permission for anonymized publication; retain the anonymized/illustrative label.

Keep positive-feedback outcomes as plain case-study outcomes only; do not turn them into unattributed testimonials or quotations.

Korean pages may show approximate USD equivalents for international visitors; KRW remains authoritative and USD should not imply a fixed exchange rate.

Maintain displayed USD figures with a weekly refresh, rounded to the nearest $10, then confirm the current equivalent at inquiry or checkout; KRW remains authoritative.

The repository updater is `scripts/update-usd-prices.mjs` and runs before `npm run build`; production still needs a weekly hosting/CI schedule to invoke that build.

Focused Coaching / Review Session: materials vary by project and are generally due at least 48 hours before the 60-minute session; the client leaves with a full action plan.

Presentation Sprint: scope and timing depend on goals, current state, and deadline; fixed duration is not promised.

Minimum Sprint deliverables are script, deck, and rehearsal support; the scope may expand based on the engagement.

Presentation Sprint public price is from ₩375,000; final quote depends on scope and deadline.

Deck Building intake generally needs source data, desired outcome, expected style, available assets, and the script/story the deck is built around. Create a client-facing intake document before finalizing the form flow.

Deck Building public price is from ₩1,200,000; final quote follows intake and scope review.

Approved paid-offer scope: Focused Coaching is one 60-minute session with pre-review and an action plan; Presentation Sprint flexes to goals/current state/deadline with script, deck, and rehearsal as the minimum; Deck Building is intake-led and includes agreed story/slide build and handoff, with revisions, slide count, turnaround, and extras scoped before work begins.

Default delivery rules: Coaching is scheduled after materials arrive and includes one brief clarification email within 7 days; Sprint normally runs 1–3 weeks with two revision rounds and one rehearsal; Deck Building normally runs 2–4 weeks with two revision rounds and editable plus presentation-ready handoff. Rush work, extra rehearsals, new research, unprovided assets, and major scope changes are quoted separately.

Deck Building intake must capture intended audience, desired decision/action, and deadline or presentation date.

Request additional source data/evidence, script or story, assets, expected style, references, constraints, and context as optional fields; the form should not block submission when these are unavailable.

## Tally changes to make in Tally

The site intentionally retains the current Tally form IDs because replacement IDs and form field definitions are not in this repository.

1. Duplicate the Diagnostic and Paid Support forms into dedicated English and Korean versions; record the resulting IDs in `assets/site.js`.
2. Diagnostic flow: context (presentation type, audience, date, main concern) → upload or share link with redaction guidance → name and email. Use **Email**, never **Work email**.
3. Paid-support flow: a short fit qualifier first; send scope recommendation or booking after submission.
4. Add matching hidden fields for `source`, `originPage`, `cta_clicked`, `source_page`, `route_type`, `offer_context`, `page_variant`, `workshop_followup`, and language.
5. Configure localized thank-you destinations and response templates; verify a submission from each EN/KO form reaches the intended notification workflow.

## Confirmed current Tally forms

- Free Presentation Diagnostic: https://tally.so/r/7RoLkz
- Getting Started with Signal over Noise: https://tally.so/r/Ek8bV2
- Workshop Inquiry: https://tally.so/r/gDLqe4
- Notification recipient: Ben receives notifications.
- Tally workspace check: all three current forms are present and active; no replacement form is needed at this stage.
- Diagnostic form field check: verified from editor capture. Includes name/email, material type, upload or link, topic, audience, deadline, concern, privacy acknowledgement, attribution fields, and bilingual thank-you page. Email label is now corrected.
- Getting Started form field check: verified from editor capture. Includes name/email, organization/role, support type, presentation type, timeline, materials, current problem, desired outcome, upload/link, privacy acknowledgement, attribution fields, and bilingual thank-you page. Preserve routing from broad choices into the three primary offers versus secondary/custom routes.
- Workshop Inquiry form field check: verified from editor capture. Includes name/email, organization, role/title, participant count, audience, presentation context, support needs, target date/timeline, preferred format, existing materials, desired outcome, attribution fields, and bilingual thank-you page.
