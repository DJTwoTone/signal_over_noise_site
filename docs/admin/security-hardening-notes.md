# Security Hardening Notes

## Repo-managed headers

This static site uses the Cloudflare Pages `_headers` file copied into `dist/` by `scripts/build-dist.js`.

The repo intentionally does not set `Strict-Transport-Security`. Keep HSTS in the Cloudflare dashboard so the live site has a single source of truth for that policy.

## Deferred isolation headers

Do not add global `Cross-Origin-Embedder-Policy: require-corp` without a separate browser validation pass. The site uses third-party Tally embeds, Google Analytics, Google Fonts, local PDF iframes, and social preview assets; COEP can break those integrations.

Do not add global `Cross-Origin-Resource-Policy` without confirming externally shared images, social previews, embeds, and cross-origin asset use are unaffected.
