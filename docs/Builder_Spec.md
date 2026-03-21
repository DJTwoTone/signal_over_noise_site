# Builder_Spec

## Build Overview
Build a mobile-first, premium editorial multi-page marketing site for Signal over Noise inside Pencil. The site must support two connected funnels:

1. **Workshop QR funnel**
   - `/scan` captures leads via the Signal over Noise Presenter Toolkit
   - `/thanks` promotes the Free Presentation Diagnostic

2. **General site funnel**
   - Homepage and core pages promote the Free Presentation Diagnostic first
   - Toolkit remains a secondary lead-capture path

The build should launch quickly, allow placeholders where needed, and stay easy for Ben to update.

## Page-by-Page Breakdown

### 1. Home `/`
#### Primary job
Establish the offer, the audience, the positioning, and the next step.

#### CTA priority
- Primary: Request a Free Presentation Diagnostic
- Secondary: Get the Signal over Noise Presenter Toolkit

#### Recommended sections
1. Hero
2. Audience / who it’s for
3. How Signal over Noise helps
4. Pathways / service overview
5. How it works
6. Proof / credibility teaser
7. Featured offers / package preview
8. Final CTA

#### Notes
Do not overload the homepage with every package detail. Use it to route, not explain everything.

---

### 2. Scan `/scan`
#### Primary job
Convert workshop QR traffic into email leads.

#### CTA priority
- Primary: Get the Signal over Noise Presenter Toolkit
- Secondary: Request a Free Presentation Diagnostic

#### Recommended sections
1. Hero with toolkit value and opt-in form
2. Toolkit contents
3. Why this matters / workshop follow-up framing
4. Tailored feedback block introducing diagnostic
5. Light founder credibility strip

#### Notes
This page should feel like a focused campaign page, not a mini-homepage.

---

### 3. Thanks `/thanks`
#### Primary job
Turn toolkit opt-ins into diagnostic interest.

#### CTA priority
- Primary: Book / Request Your Free Presentation Diagnostic

#### Recommended sections
1. Submission confirmation
2. Check-your-inbox message
3. Diagnostic offer block
4. What the diagnostic includes
5. Review type explanation: script / slides / video performance
6. CTA to diagnostic request flow
7. Light trust block

---

### 4. Services `/services`
#### Primary job
Help visitors identify the kind of help they need.

#### Recommended sections
1. Intro
2. Pathway cards
3. Service mapping under each pathway
4. “How to choose” guidance
5. Diagnostic CTA

#### Pathways
- Clarify the message
- Improve the deck
- Rehearse the delivery
- Prepare for a high-stakes presentation
- Build long-term presentation skill
- Train the team

---

### 5. Process `/process`
#### Primary job
Reduce uncertainty by showing a structured, professional method.

#### Recommended sections
1. Process overview
2. Step 1: Diagnostic
3. Step 2: Recommendation
4. Step 3: Refinement / rehearsal / sprint / coaching
5. Step 4: Delivery-ready presentation
6. Preparation expectations
7. CTA

---

### 6. Proof `/proof`
#### Primary job
Build trust honestly using credibility, sample artifacts, and process transparency.

#### Recommended sections
1. Founder credibility
2. Sample review mockup
3. Before / after slide examples
4. Audience / use-case examples
5. Institution / organization references where approved
6. Method as proof

#### Rule
No fabricated testimonials, outcomes, or endorsements.

---

### 7. Packages `/packages`
#### Primary job
Make the offer feel buyable without overcommitting to rigid pricing too early.

#### Recommended sections
1. Intro
2. Pathway chooser
3. Named package blocks
4. “Best for” guidance
5. Pricing approach explanation
6. CTA

#### Named packages
- Presentation Diagnostic
- Message Refinement
- Slide Refinement
- Presentation Rehearsal
- Presentation Sprint
- Presentation Coaching
- Custom Workshops & Team Training

---

### 8. Workshops `/workshops`
#### Primary job
Position workshops as a credible current or near-future offer and support custom training inquiries.

#### Recommended sections
1. Workshops overview
2. Core themes: script / slides / delivery
3. Audience fit
4. Delivery / format options
5. Contact us about custom workshops and team training

---

### 9. Privacy `/privacy`
#### Primary job
Provide required privacy information in a simple, usable format.

---

## Component Inventory
- Header / navigation
- Footer
- Hero section
- CTA button set
- Light opt-in form
- Diagnostic request / application form block
- Credibility strip
- Pathway card grid
- Package card grid
- Process step sequence
- Proof artifact block
- Before / after comparison block
- Founder bio card set
- Workshop topic block
- Final CTA band

## Section Purpose and Content Requirements

### Hero
Must communicate:
- what Signal over Noise does
- who it is for
- why it matters
- what action to take next

### Audience section
Must frame the audience respectfully:
- professionals presenting in English and multilingual settings
- experts and teams presenting to international, multilingual, or mixed-language audiences

### Pathway section
Must help users self-identify by need, not by jargon.

### Diagnostic section
Must explain that the diagnostic is a tailored review with consult follow-up, not a bait-and-switch.

### Proof sections
Must use real credibility, sample artifacts, process clarity, and approved references only.

## Copy / Content Needs
### Tier 1: must be real now
- Homepage hero
- Homepage value proposition
- Homepage service summary
- `/scan`
- `/thanks`
- Main CTA language
- Package names and short descriptions

### Tier 2: strong enough for v1, refine later
- Services page copy
- Process page copy
- Packages page copy
- Workshops page copy

### Tier 3: can stay lean initially
- Privacy details beyond baseline
- Expanded founder bios
- Deep FAQ-style explanations

## Form Specs

### Toolkit opt-in form (`/scan`)
Recommended fields:
- First name
- Email
- Optional: biggest presentation challenge

Required behaviors:
- Submit successfully on mobile
- Trigger inline success state
- Redirect to `/thanks`
- Add subscriber to chosen email system
- Send internal notification

### Diagnostic request flow
Recommended sequence:
1. Short application form
2. Redirect to booking tool

Recommended fields:
- First name
- Email
- Role / company
- Presentation context
- Presentation date
- Diagnostic type
- Upload or link field
- Biggest challenge
- Goal for the presentation

Diagnostic types:
- Slide Deck Diagnostic
- Script Diagnostic
- Video Performance Diagnostic

## CTA Behavior
### Default site CTA logic
- Homepage: diagnostic first, toolkit second
- `/scan`: toolkit first, diagnostic second
- `/thanks`: diagnostic first
- Services / Packages / Process: diagnostic-focused CTA
- Workshops: custom inquiry CTA

### CTA naming
- Get the Signal over Noise Presenter Toolkit
- Request a Free Presentation Diagnostic
- Contact us about custom workshops and team training

## SEO Requirements
### Baseline v1
- Unique page titles
- Unique meta descriptions
- Strong H1 per page
- Clear internal linking
- Clean readable URLs
- Logical heading hierarchy
- Basic Open Graph setup if possible

### Initial keyword / theme direction
- presentation coaching
- presentation support
- slide refinement
- multilingual presentation support
- English presentation coaching
- presentation rehearsal
- workshop presentation training

Do not force awkward keyword stuffing.

## Accessibility Requirements
- Target AA where practical
- Sufficient color contrast
- Clear focus states
- Semantic heading order
- Button and link clarity
- Mobile-friendly tap targets
- Alt text for meaningful images
- Avoid relying on color alone for meaning
- Keep forms simple and labeled clearly

## Mobile / Responsive Behavior
- Mobile-first layouts
- CTA visible and obvious early
- Form fields stacked cleanly
- Tight but readable spacing
- Hero not overly tall on phones
- Navigation simple and finger-friendly
- Proof examples must remain legible on smaller screens

## Analytics / Event Tracking Suggestions
Minimum tracking goals:
- Page views
- Primary CTA clicks
- Toolkit form submissions
- Diagnostic request submissions
- `/thanks` page views as conversion confirmation
- Workshop inquiry CTA clicks

Track later if needed:
- Package card clicks
- Scroll depth on homepage
- Internal link usage between pages

## Trust / Proof Placements
### Homepage
- Light founder credibility
- Sample artifact teaser
- Optional before / after preview

### `/scan`
- Light founder trust strip only

### `/thanks`
- Light trust reinforcement only

### `/services`
- Minimal proof, mostly clarity

### `/process`
- Process transparency acts as trust

### `/proof`
- Full proof stack

### `/packages`
- “Best for” clarity over proof overload

### `/workshops`
- Teaching / training credibility

## Asset List
### Available / expected
- Wordmark
- Square icon
- Podium mark
- Brand board
- Founder names
- Draft page architecture
- Toolkit asset titles

### Needed
- Founder headshots
- Founder bios
- Sample review mockup
- Before / after slide examples
- Approved organization references or logos
- Final package blurbs
- Final CTA microcopy
- Final workshop description copy
- Final privacy copy if custom

## Placeholder Inventory
Build with placeholders where needed and keep a visible replacement list.

### Placeholder locations
- Homepage founder section
- Homepage proof teaser
- Proof page headshots
- Proof page bios
- Proof page sample review mockup
- Proof page before / after examples
- Any institutional logo strip
- Packages pricing language
- Diagnostic turnaround language
- Workshops page details
- TidyCal link
- Form/email integration references
- Analytics IDs

## Acceptance Criteria
- All v1 routes are live
- Navigation works
- Mobile experience is usable and polished enough to launch
- `/scan` converts visitors into toolkit leads
- `/thanks` pushes the diagnostic clearly
- Diagnostic path is visible and understandable
- Package structure is understandable
- Placeholders are obvious internally and tracked for replacement
- No fabricated proof is used
- Editing remains manageable for Ben

## QA / Pre-Launch Checklist
- Check all links and buttons
- Test all forms on mobile and desktop
- Confirm redirects to `/thanks`
- Confirm email capture works
- Confirm internal notifications work
- Confirm diagnostic path works end-to-end
- Review typography hierarchy
- Check color contrast
- Check responsive layout
- Check spelling / naming consistency
- Check placeholder list
- Remove any accidental fake or temporary claims
- Confirm privacy page is present
- Confirm analytics installed if ready

## Recommended Build Order
1. Lock page skeletons and navigation
2. Build homepage structure
3. Build `/scan`
4. Build `/thanks`
5. Build services / process / packages pages
6. Build proof page
7. Build workshops page
8. Add privacy page
9. Insert placeholders where required
10. Add real assets as available
11. Final QA and launch

## Handoff Notes for AI Tools / Builder Workflow
- Prioritize structure and conversion logic before polish
- Use placeholders rather than stalling the build
- Keep the homepage broad and uncluttered
- Keep `/scan` campaign-focused
- Keep `/thanks` conversion-focused
- Use the brand system with restraint: blue-led, ruled lines, selective gold, strong typography
- Avoid overdecorating sections
- Build for easy editing by one person
- Keep future route expansion in mind without adding those pages yet
- Future planned routes to note:
  - `/contact`
  - `/resources`
  - `/faq`
  - `/case-studies`
  - `/diagnostic`
  - `/coaching`
  - `/custom-workshops`
  - `/insights`
