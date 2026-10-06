# Part 2 deployment package

This package contains only **Five Questions to Test the Claim on Your Data Slide** and its three referenced WebP images. The folder paths mirror the website repository, so merge `content/` and `assets/` into the site repository before running your normal build and deployment process.

## Publication metadata

The article front matter currently has `date: 2026-10-05` and `updated: 2026-10-05`. Those are the prepared publication dates from the checked package. If you deploy on another date, update them to the actual publication date before building.

## Included files

- `content/insights/five-questions-data-slide.md` — Part 2 article.
- `assets/images/insights/five-questions-data-slide/hero.webp` — article hero.
- `assets/images/insights/five-questions-data-slide/inline-01-four-line-review.webp` — inline four-line review graphic.
- `assets/images/insights/five-questions-data-slide/og.webp` — social preview image.

The article links to Part 1 at `/insights/accurate-chart-overstates-case/` and its diagnostic CTA at `/diagnostic/`.

## Checks recorded

- Production build passed.
- Search readiness and homepage article ordering passed.
- International-language routing passed on isolated rerun.
- Full Pa11y accessibility route scan passed with zero axe violations.
- The article route returned HTTP 200 in local preview; HTMLCS WCAG2AA and axe reported no issues.
- Desktop and mobile screenshots were visually inspected; no clipping or horizontal overflow was found.
- Canonical, social metadata, BlogPosting metadata, article date, cross-links, and sitemap entry were verified.
- Voice/Stop Slop score: **43/50**, above the 35/50 pass threshold.

This ZIP is for manual deployment. It does not publish or deploy the article.
