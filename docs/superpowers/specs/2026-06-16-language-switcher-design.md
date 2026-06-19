# Language Switcher Design

Date: 2026-06-16

## Goal

Make the existing header language selector read clearly as a switch while keeping the current EN/KO behavior, placement, and lightweight footprint.

## Scope

- Restyle the existing header language control only.
- Keep the control limited to `EN` and `KO`.
- Preserve the current localized navigation behavior and stored language preference behavior.
- Do not add supporting labels, helper text, or dropdown behavior.

## Recommended Approach

Use a segmented pill switch with two equal segments inside a shared capsule.

- The outer capsule keeps the control visually grouped.
- The active language appears as a filled segment with stronger contrast.
- The inactive language remains visible but quieter.
- Hover and focus states should remain obvious and accessible.
- Motion should be restrained: short transition timing for color, background, and slight positional emphasis.

## Interaction Details

- The current language should be obvious at a glance from the switch styling alone.
- The control should continue to work as two standard links so routing and SEO assumptions remain unchanged.
- Keyboard focus must remain visible on each language option.
- Animation should be subtle and fast, intended as polish rather than decoration.

## Implementation Notes

- Update switcher markup in `assets/site.js` only if small styling hooks are needed.
- Implement most of the change in `assets/styles.css`.
- Keep the mobile version visually consistent with the desktop version.
- Avoid touching route logic or head metadata scripts because this change is presentational only.

## Verification

- Check the English homepage in the local browser.
- Check the Korean homepage in the local browser.
- Check a narrow/mobile viewport to confirm the switch still fits the header cleanly.
