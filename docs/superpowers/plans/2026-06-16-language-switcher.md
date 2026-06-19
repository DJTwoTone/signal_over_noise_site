# Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing EN/KO header language control into a clearer segmented pill switch without changing routing behavior.

**Architecture:** Keep the control as two standard links rendered by `assets/site.js`, then use targeted CSS in `assets/styles.css` to create the segmented switch appearance, active-state emphasis, and restrained motion. Verification stays focused on browser inspection and the existing language-routing check because this is a presentational change.

**Tech Stack:** Static HTML, shared header rendering in `assets/site.js`, shared site CSS in `assets/styles.css`, local Node preview server, existing i18n QA script

---

### Task 1: Add styling hooks to the shared switcher markup

**Files:**
- Modify: `assets/site.js`

- [ ] **Step 1: Add switcher-specific option classes and current-state hooks**

Update the switcher markup so each language link has a dedicated switcher option class while keeping `data-language-switch` and `aria-current` intact.

- [ ] **Step 2: Verify the header still renders**

Run: load `http://localhost:8080/`
Expected: header renders with `EN` and `KO` links present

### Task 2: Restyle the control as a segmented pill switch

**Files:**
- Modify: `assets/styles.css`

- [ ] **Step 1: Replace the slash-style language control styles**

Add switcher-specific styles for the capsule, equal-width segments, active-state fill, hover/focus states, and short transitions.

- [ ] **Step 2: Verify desktop layout**

Run: inspect `http://localhost:8080/`
Expected: switch reads clearly as a segmented control and active language is obvious

- [ ] **Step 3: Verify mobile layout**

Run: inspect a narrow viewport
Expected: mobile header/menu version still fits cleanly and remains readable

### Task 3: Run behavior checks

**Files:**
- Test: `scripts/i18n-routing-qa.js`

- [ ] **Step 1: Run the existing i18n routing QA**

Run: `npm run check:i18n-routing`
Expected: PASS

- [ ] **Step 2: Recheck both language homepages in the browser**

Run: visit `http://localhost:8080/` and `http://localhost:8080/ko/`
Expected: active segment is correct on each page and the switch still navigates normally
