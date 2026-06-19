# Search Console Admin Notes - Signal over Noise

## Property

- Property type: Domain
- Domain: signal-over-noise.coach
- Canonical URL: https://signal-over-noise.coach
- Verification method: DNS TXT
- Verification status: Manual check required
- Verification record: Manual entry, do not commit private account-specific value unless already public in DNS

## Repo Audit Findings

- Framework/static setup: Static HTML site, no app framework found.
- Source directory: Repo root route folders and root `index.html`.
- Public/static directory: `assets/`, `img/`, `downloads/`, route folders, `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml`.
- Build command: `npm run build`, which runs `node scripts/build-dist.js`.
- Output directory: `dist/`.
- Route/page files: `index.html` plus route-level `index.html` files under `services/`, `diagnostic/`, `toolkit/`, `workshops/`, `proof/`, `contact/`, `get-started/`, `thanks/`, `process/`, `privacy/`, and deprecated redirect route `packages/`.
- Metadata/head configuration: Per-page `<head>` tags in each HTML route. Future i18n SEO helper is `scripts/i18n-finalize-seo.js`.
- Shared chrome/forms: `assets/site.js` mounts shared navigation, footer, tracked route links, and Tally embeds.

## Sitemap

- Sitemap URL: https://signal-over-noise.coach/sitemap.xml
- Exists in repo: yes
- Submitted in Search Console: Manual check required
- Search Console sitemap status: Manual check required

## Homepage URL Inspection

- URL: https://signal-over-noise.coach/
- Live URL test: Manual check required
- Indexing status: Manual check required
- Request indexing completed: Manual check required
- Notes from repo audit:
  - Homepage has visible text describing Signal over Noise as presentation support for professionals and teams presenting in English or across languages.
  - Business purpose is clear: presentation message, deck, delivery, diagnostic, paid support, and workshops.
  - Primary CTAs are visible: `Request a Free Presentation Diagnostic`, `Get the Presenter Toolkit`, and `Request Paid Support`.
  - Title and meta description exist.
  - Canonical URL is set to `https://signal-over-noise.coach/`.
  - No obvious homepage `noindex` found.
  - `robots.txt` allows crawling.
  - Important content is present as text, with supporting images and alt text.

## Important URL Inspection List

| Page | URL | Exists in repo | Ready for inspection | Manual Search Console status | Notes |
|---|---|---:|---|---|---|
| Home | https://signal-over-noise.coach/ | yes | yes | Manual check required in Google Search Console | Clear purpose, title, description, canonical, CTAs, text content, and internal links. |
| Services | https://signal-over-noise.coach/services/ | yes | yes | Manual check required in Google Search Console | Pricing/support route page with title, description, canonical, CTAs, and internal links. |
| Diagnostic | https://signal-over-noise.coach/diagnostic/ | yes | yes | Manual check required in Google Search Console | Free diagnostic form route with title, description, canonical, CTA, and proof link. |
| Toolkit | https://signal-over-noise.coach/toolkit/ | yes | yes | Manual check required in Google Search Console | Presenter Toolkit form route with title, description, canonical, CTA, and diagnostic link. |
| Workshops | https://signal-over-noise.coach/workshops/ | yes | yes | Manual check required in Google Search Console | Workshop overview page with title, description, canonical, CTAs, and internal links. |
| Proof | https://signal-over-noise.coach/proof/ | yes | yes | Manual check required in Google Search Console | Sample work/proof page with title, description, canonical, sample images, scripts, and diagnostic CTA. |
| Contact | https://signal-over-noise.coach/contact/ | yes | yes | Manual check required in Google Search Console | Workshop inquiry form route with title, description, canonical, and form CTA. |
| Get Started | https://signal-over-noise.coach/get-started/ | yes | yes | Manual check required in Google Search Console | Paid support form route with title, description, canonical, and free diagnostic fallback CTA. |
| Thanks | https://signal-over-noise.coach/thanks/ | yes | yes | Manual check required in Google Search Console | Toolkit confirmation page with title, description, canonical, and diagnostic CTA. |
| Thanks Diagnostic | https://signal-over-noise.coach/thanks-diagnostic/ | no | no | Manual check required in Google Search Console | Missing / not yet created. |
| Thanks Toolkit | https://signal-over-noise.coach/thanks-toolkit/ | no | no | Manual check required in Google Search Console | Missing / not yet created. |
| Thanks Workshop | https://signal-over-noise.coach/thanks-workshop/ | no | no | Manual check required in Google Search Console | Missing / not yet created. |

## Important Page Inspect Readiness

| Route | Exists | Likely purpose | Title/meta status | Canonical status | CTA status | Internal link status | Notes | Search Console manual inspection status |
|---|---:|---|---|---|---|---|---|---|
| `/` | yes | Homepage and primary service overview | Present | `https://signal-over-noise.coach/` | Clear primary and secondary CTAs | Linked from brand, nav, footer, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/services` | yes | Service and pricing options | Present | `https://signal-over-noise.coach/services/` | Paid support, diagnostic, workshop, partner class CTAs | Linked in nav, footer, homepage, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/diagnostic` | yes | Free presentation diagnostic request | Present | `https://signal-over-noise.coach/diagnostic/` | Form anchor and sample work CTA | Linked from nav CTAs, homepage, services, proof, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/toolkit` | yes | Presenter Toolkit request | Present | `https://signal-over-noise.coach/toolkit/` | Form anchor and diagnostic CTA | Linked from homepage and sitemap; minimal chrome page | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/workshops` | yes | Workshop and team training page | Present | `https://signal-over-noise.coach/workshops/` | Workshop and diagnostic CTAs | Linked in nav, footer, homepage/services, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/proof` | yes | Sample work and credibility page | Present | `https://signal-over-noise.coach/proof/` | Diagnostic CTA | Linked in nav, footer, homepage, diagnostic, and sitemap | Proof-heavy page with before/after and sample diagnostics. | Manual check required in Google Search Console |
| `/contact` | yes | Workshop inquiry form route | Present | `https://signal-over-noise.coach/contact/` | Form/inquiry CTA | Linked from workshop CTAs, services, shared route links, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/get-started` | yes | Paid support request form route | Present | `https://signal-over-noise.coach/get-started/` | Form anchor and diagnostic fallback CTA | Linked from homepage, services, shared route links, and sitemap | Ready from repo audit; Google status unknown. | Manual check required in Google Search Console |
| `/thanks` | yes | Toolkit confirmation page | Present | `https://signal-over-noise.coach/thanks/` | Diagnostic CTA | Included in sitemap; minimal chrome page | Confirmation page is indexable in repo unless Search Console says otherwise. | Manual check required in Google Search Console |
| `/thanks-diagnostic` | no | Diagnostic confirmation page | Missing / not yet created | Missing / not yet created | Missing / not yet created | Missing / not yet created | Do not inspect until route exists. | Manual check required in Google Search Console |
| `/thanks-toolkit` | no | Toolkit confirmation variant | Missing / not yet created | Missing / not yet created | Missing / not yet created | Missing / not yet created | Do not inspect until route exists. | Manual check required in Google Search Console |
| `/thanks-workshop` | no | Workshop inquiry confirmation page | Missing / not yet created | Missing / not yet created | Missing / not yet created | Missing / not yet created | Do not inspect until route exists. | Manual check required in Google Search Console |

## Canonical Checks

| Item | Expected | Actual | Status | Notes |
|---|---|---|---|---|
| Homepage canonical | `https://signal-over-noise.coach/` | `https://signal-over-noise.coach/` | Green | Absolute apex canonical in source. |
| Page canonical URLs | Absolute apex URLs for existing pages | Absolute apex URLs in source route HTML | Green | Includes English and Korean route files currently present in source. |
| Deprecated `/packages` canonical | `https://signal-over-noise.coach/services/` | `https://signal-over-noise.coach/services/` | Green | Preserves `noindex, follow` redirect behavior. |
| Sitemap URLs | Apex URLs only | Apex URLs only | Green | `sitemap.xml` uses `https://signal-over-noise.coach`. |
| robots.txt sitemap reference | `Sitemap: https://signal-over-noise.coach/sitemap.xml` | `Sitemap: https://signal-over-noise.coach/sitemap.xml` | Green | Crawling is allowed. |
| Open Graph URLs | Apex URLs if present | No route-level Open Graph URL tags found | Yellow | No conflicting OG URLs found; OG metadata could be added later if desired. |
| Twitter/social URLs | Apex URLs if present | No route-level Twitter URL tags found | Yellow | No conflicting Twitter URLs found; social metadata could be added later if desired. |
| Hardcoded `www` references | none | none found in source scan | Green | Keep apex as canonical. |
| Hardcoded `pages.dev` references | none | none found in source scan | Green | Manual Search Console should still check indexed Pages.dev URLs. |
| `http://` references | No canonical public HTTP URLs | Local QA/server URLs and SVG namespace/DTD references only | Green | Local `http://localhost:8080` references are not canonical issues. |

## AI Search Readiness

- [x] Important content is visible as text - Homepage, service, diagnostic, workshop, proof, and CTA content are HTML text, not image-only.
- [x] Homepage clearly says who the business helps - Professionals and teams presenting across international and multilingual contexts.
- [x] Homepage clearly says what the business does - Presentation diagnostics, message/deck/delivery support, paid support, workshops, and toolkit.
- [x] Homepage has a clear CTA - Free diagnostic is the main CTA, with toolkit and paid support as supporting CTAs.
- [x] Important pages are internally linked - Main routes are linked through shared nav/footer, homepage sections, CTAs, and sitemap.
- [x] Images have useful alt text - Most meaningful images have specific alt text; decorative icons/images are empty or hidden.
- [x] Page titles are specific - Existing important pages have unique titles.
- [x] Headings are logical - Pages use one clear hero H1 and section/card headings.
- [x] No important content is trapped inside Canva screenshots/images only - Core offer and proof context are expressed as HTML text.
- [x] Sample/proof content exists or is clearly marked as needed - Proof page and homepage proof sections include sample diagnostic and before/after work.
- [ ] FAQ exists or is marked as needed - Services has practical pricing questions, but a fuller FAQ could be added later if Search Console or AI search needs suggest it.
- [x] No duplicate canonical confusion - Canonicals, sitemap, and robots use the apex domain. Manual Search Console checks still need to confirm Google-selected canonicals.

## Green / Yellow / Red Checklist

### Green

- [ ] Domain property verified in Google Search Console
- [ ] DNS TXT verification record exists in Cloudflare
- [ ] Homepage live URL test passes
- [x] Sitemap exists
- [ ] Sitemap submitted
- [ ] Important pages inspected
- [x] No obvious indexing blockers
- [x] Canonical URL is consistently https://signal-over-noise.coach
- [x] robots.txt allows crawling
- [x] sitemap uses canonical apex URLs

### Yellow

- [ ] Search Console verified, but sitemap missing
- [ ] Homepage can be inspected, but not indexed yet
- [x] Some important pages do not exist yet
- [ ] Some metadata is missing
- [ ] Some images need better alt text
- [x] FAQ/proof/sample diagnostic content is incomplete
- [x] Search Console has not processed data yet

### Red

- [ ] Cannot verify property
- [ ] Live URL test fails
- [ ] Pages blocked by robots.txt
- [ ] Pages marked noindex
- [ ] Wrong canonical URL
- [ ] Site indexed through pages.dev
- [ ] Site indexed through www instead of apex
- [ ] Sitemap contains wrong or broken URLs
- [ ] Important pages are unreachable through internal links

## Manual Follow-up Steps

1. Open Google Search Console.
2. Verify the Domain property for signal-over-noise.coach.
3. Submit sitemap.xml if it exists.
4. Inspect https://signal-over-noise.coach/.
5. Test live URL.
6. Request indexing once.
7. Inspect important pages.
8. Update this document with actual Search Console results.
