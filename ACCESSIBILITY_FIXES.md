# Quick Implementation Guide - Accessibility Improvements

## Priority 1: Add Motion Preference Support (5 minutes)

**File:** `assets/styles.css`

Add this at the END of the file to disable animations for users who prefer reduced motion:

```css
/* Motion preferences - WCAG 2.5.4 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Why:** Protects users with vestibular disorders and motion sensitivity from animated transitions.

**Test:**
- Windows: Settings > Ease of Access > Display > Show animations
- macOS: System Preferences > Accessibility > Display > Reduce motion
- DevTools: Rendering tab > Emulate CSS media feature prefers-reduced-motion: reduce

---

## Priority 2: Add Skip Link (10 minutes)

**File:** `index.html` (and all other HTML files)

**Step 1:** Add skip link as first element in `<body>`:

```html
<body data-site-root="./" data-page="home" data-origin-page="/" data-source-context="main-site">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div data-site-header></div>
  <main id="main" class="page">
    <!-- existing content -->
  </main>
  <div data-site-footer></div>
</body>
```

**Step 2:** Add `id="main"` to the main element (shown above)

**Step 3:** Add CSS to `assets/styles.css`:

```css
/* Skip link - WCAG 2.4.1 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--brand-blue);
  color: var(--text-on-dark);
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 500;
  z-index: 1000;
}

.skip-link:focus-visible {
  top: 0;
}
```

**Test:**
- Open homepage
- Press Tab once
- You should see "Skip to main content" button appear at top-left
- Press Enter to jump to main content
- Verify all pages have this

---

## Priority 3: Verify Tally Form Accessibility (15 minutes)

**Contact:** Tally support to verify form embeds meet accessibility standards

**Verification Checklist:**
- [ ] All form inputs have associated labels
- [ ] Required fields are marked and announced
- [ ] Error messages are associated with fields
- [ ] Form is keyboard navigable (Tab, Enter, Space)
- [ ] Form works with screen readers (test with NVDA)
- [ ] Placeholder text is not used as labels

**Testing Steps:**
1. Install NVDA screen reader (free): https://www.nvaccess.org/
2. Open diagnostic or contact form page
3. Use NVDA to tab through the form
4. Verify each input label is announced
5. Try submitting with invalid data; verify error announcements

**If Issues Found:**
- Document the specific field and issue
- Request Tally accessibility improvements
- Consider custom form as fallback

---

## Optional: Add Landmark IDs (10 minutes)

**File:** All HTML files

This enables advanced screen reader navigation (faster landmark jumping).

**Add to header (in renderHeader function or markup):**
```html
<header id="header" class="site-header">
  <!-- existing nav content -->
</header>
```

**Add to main:**
```html
<main id="main" class="page">
```

**Add to footer (in renderFooter function or markup):**
```html
<footer id="footer" class="site-footer">
  <!-- existing footer content -->
</footer>
```

**Test with NVDA:**
- Open page with NVDA running
- Press `R` to cycle through landmarks
- You should hear "banner" (header), "main", "contentinfo" (footer)

---

## Testing After Implementation

### Quick Verification Checklist

```bash
# Run automated tests
cd c:\Users\djtwo\Documents\SignOverNoise_site
npx pa11y http://localhost:8080 --reporter csv
npx pa11y http://localhost:8080/diagnostic/ --reporter csv
```

### Manual Keyboard Test
- [ ] Page loads, skip link appears on Tab press
- [ ] Skip link jumps to main content when activated
- [ ] All pages pass pa11y tests
- [ ] At 400% zoom, content doesn't break

### Motion Preference Test
- [ ] Enable motion reduction in OS settings
- [ ] Revisit page
- [ ] Verify all animations/transitions are disabled or nearly instantaneous

---

## Files to Modify

| File | Change | Impact |
|---|---|---|
| `assets/styles.css` | Add motion media query at END | Low effort, high value |
| `index.html` | Add skip link, id="main" | Medium effort, high value |
| `diagnostic/index.html` | Add skip link, id="main" | Repeat same pattern |
| `contact/index.html` | Add skip link, id="main" | Repeat same pattern |
| `(all other pages)` | Add skip link, id="main" | Scale across all pages |

---

## Rollout Timeline

**Phase 1 (This week):** Motion preferences + skip links
**Phase 2 (Next week):** Landmark IDs + Tally verification
**Phase 3 (Ongoing):** Screen reader testing with NVDA

---

## Questions?

Refer back to `ACCESSIBILITY_AUDIT_REPORT.md` for detailed reasoning and WCAG references for each recommendation.
