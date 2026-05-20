# Korean Conversion Copy QA Checklist (EN <-> KO)

Use this as the final reviewer handoff for launch-quality Korean conversion copy.

## Scope

Routes to verify:
- /
- /services/
- /process/
- /proof/
- /workshops/
- /diagnostic/
- /get-started/
- /contact/
- /toolkit/
- /thanks/
- /privacy/
- /packages/
- /ko/ mirrors for each route above

## Core Conversion Terms (Must Stay Consistent)

Preferred Korean terms:
- Presenter Toolkit -> 발표자 툴킷
- Free Presentation Diagnostic -> 무료 프레젠테이션 진단
- Request Paid Support -> 유료 지원 요청
- Ask About a Workshop -> 워크숍 문의하기
- Services and Pricing -> 서비스 및 가격
- Privacy -> 개인정보처리방침

Check for and replace inconsistent variants:
- 도구 키트 -> 툴킷
- 워크샵 -> 워크숍
- Start free (if vague in KO) -> 무료 진단으로 시작

## CTA Parity Checks

For each EN/KO page pair, confirm:
- Primary CTA intent matches (same action and destination).
- Secondary CTA intent matches (same action and destination).
- CTA hierarchy is preserved (do not swap urgency/importance).
- Link target parity is exact (including #anchors where used).
- CTA length remains scannable on mobile (no forced awkward wrapping).

## Form Conversion Checks

For pages with Tally embeds or request flows:
- Pre-form expectation copy explains what happens next.
- Submission confidence copy is concrete (timeline/next-step clarity).
- High-stakes disclaimer remains clear but not alarming.
- Any bilingual helper text stays intentionally bilingual.
- No untranslated English fragments remain in Korean body copy.

## SEO Snippet Checks

Per KO page:
- Title is natural Korean and conversion-focused.
- Meta description is natural Korean and action-oriented.
- Canonical points to KO route.
- hreflang includes en, ko, x-default with correct pair mapping.

## Trust and Tone Checks

- Tone is direct, calm, and practical (no hype, no overclaim).
- "You" voice in Korean feels respectful and natural.
- Claims are specific (diagnostic output, support boundaries, next step).
- No machine-literal phrasing that lowers trust.

## Final Launch Pass

1. Run build: npm run build
2. Open EN/KO route pairs side-by-side.
3. Validate CTA parity and term consistency.
4. Validate forms and next-step clarity.
5. Validate SEO snippets and hreflang/canonical tags.
6. Record final sign-off with reviewer name/date.

## Sign-off Log

- Reviewer: Copilot i18n Agent
- Date: 2026-05-20
- Blocking issues found: No
- If Yes, issue links: N/A
