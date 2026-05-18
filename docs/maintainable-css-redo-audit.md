# Maintainable CSS Redo Audit

Date: May 19, 2026

Worktree: `C:\Users\djtwo\Documents\SignOverNoise_site-css-redo`

Branch: `codex/maintainable-css-redo`

## Summary

This pass refactored the shared stylesheet for maintainability while preserving the current static-site behavior and visual direction.

The implementation touched `assets/styles.css` only. No HTML, JavaScript, content, routing, forms, assets, deployment config, or production settings were changed.

## CSS Structure Changed

- Added explicit cascade layers: `reset`, `tokens`, `base`, `components`, `utilities`, and `overrides`.
- Consolidated the duplicate `:root` token declarations into one token block.
- Kept the existing class API intact so all pages continue to use the same HTML classes.
- Kept most component rules in their existing relative order to avoid redesigning the site while improving ownership.
- Moved utility/accessibility rules into clearer ownership:
  - `.is-hidden`
  - `.skip-link`
  - `prefers-reduced-motion`
- Preserved Tally embed rules, including visible overflow and route-specific iframe height behavior.

## Verification Results

### Build

Original baseline:

- Command: `npm run build`
- Result: passed
- Dist output: 142 files, 40,084,840 bytes

CSS redo worktree:

- Command: `npm run build`
- Result: passed
- Dist output: 142 files, 40,091,879 bytes

The dist byte-size difference is expected because the shared CSS file was reorganized and layered. The file count did not change.

### Responsive QA

Original baseline:

- Command: `NODE_PATH=C:\Users\djtwo\AppData\Roaming\npm\node_modules node scripts\launch-responsive-qa.js`
- Result: 1,212 checks, 0 failures
- Screenshots: 36

CSS redo worktree:

- Command: `NODE_PATH=C:\Users\djtwo\AppData\Roaming\npm\node_modules node scripts\launch-responsive-qa.js`
- Result: 1,212 checks, 0 failures
- Screenshots: 36

Both runs matched on the important behavior checks:

- Horizontal overflow: 0 failures
- Console warnings/errors: 0 failures
- Local request failures: 0 failures
- HTTP failures: 0 failures
- Tally form samples: 404
- Tally missing iframe src: 0
- Tally configured/iframe heights:
  - `diagnostic:900:900`
  - `getStarted:900:900`
  - `toolkit:720:720`
  - `workshop:820:820`

### Static Diff Check

- Command: `git diff --check`
- Result: passed after whitespace cleanup

## Screenshot Comparison

Compared the 36 fixed QA screenshots from the original baseline against the 36 fixed QA screenshots from the CSS redo.

- Exact file matches: 29
- Binary differences: 7

Screenshots with binary differences:

- `diagnostic-fixed-375.png`
- `diagnostic-fixed-768.png`
- `get-started-fixed-375.png`
- `home-fixed-375.png`
- `packages-fixed-375.png`
- `proof-fixed-1440.png`
- `proof-fixed-375.png`

Observed visual difference:

- The most obvious inspected difference was lazy image loading in tall page screenshots. In one captured homepage run, a homepage pathway comic image loaded into the page where the baseline capture showed the same lazy image area unloaded/collapsed.
- This appears tied to screenshot capture timing/cache/lazy-loading behavior, not to a QA-detected layout break. The full sweep still reported 0 overflow, console, request, HTTP, and form failures.
- `proof-fixed-1440.png` differed only minimally in sampled pixels during inspection, consistent with normal image/font/rendering variation.

## What Did Not Change

- Page routes and redirect behavior were not changed.
- `assets/site.js` was not changed.
- Tally mount behavior was not changed.
- Form iframe heights stayed identical in the QA output.
- Navigation, page content, copy, and asset references were not changed.
- No new dependency was added.
- No commit, push, or deploy was performed.

## Assessment

The CSS redo improved stylesheet maintainability without producing any automated responsive QA failures. The remaining screenshot differences should be reviewed visually before adopting the refactor, but the evidence points to lazy image/render timing differences rather than a broken layout.

Recommended next step: review the 7 differing screenshots side by side, especially the mobile/tall-page captures, then decide whether to keep the layered CSS refactor as-is or make lazy image sizing more deterministic before merging it back.
