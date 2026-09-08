# Site Sitemap Automation

Use this skill whenever a change touches page routing or Insights content.

## Trigger Conditions

Run this workflow if any of these files/folders changed:

- content/insights/*.md
- content/insights-index.njk
- content/insights-sitemap.njk
- sitemap.xml
- _redirects
- routes under root or ko pages (for example services/index.html, ko/services/index.html)

## Required Workflow

1. Run:
   npm run sync:sitemaps

2. Validate:
   npm run check:search

3. Build output:
   npm run build

4. Confirm route exists in all sitemap outputs:
- sitemap.xml
- .insights-build/insights-sitemap.xml
- dist/sitemap.xml
- dist/insights-sitemap.xml

## Guardrails

- Do not hand-edit Insights URL lists in sitemap.xml unless sync fails.
- Keep sitemap URLs apex-canonical: https://signal-over-noise.coach/...
- Do not include noindex routes in sitemap.xml.
- If sync fails, fix the failing route or metadata first, then re-run the workflow.

## Notes

- npm run sync:sitemaps runs insights build first, then syncs root sitemap from generated insights sitemap.
- This keeps root and insights sitemap entries consistent over time.
