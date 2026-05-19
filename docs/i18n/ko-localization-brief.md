# Korean Localization Brief

This document defines the recommended standards for a full Korean mirror under /ko/.

## 1) URL and Site Structure

- Use a path-based structure: /ko/ for Korean pages.
- Mirror all current English routes one-to-one.
- Keep English pages unchanged.
- Set Korean page language to ko.

Recommended route mapping:

- / -> /ko/
- /services/ -> /ko/services/
- /process/ -> /ko/process/
- /proof/ -> /ko/proof/
- /workshops/ -> /ko/workshops/
- /diagnostic/ -> /ko/diagnostic/
- /get-started/ -> /ko/get-started/
- /contact/ -> /ko/contact/
- /toolkit/ -> /ko/toolkit/
- /thanks/ -> /ko/thanks/
- /privacy/ -> /ko/privacy/
- /packages/ -> /ko/packages/

## 2) Brand and Terminology Best Practices

Recommended for Korean startup and international business audiences:

- Keep brand names in English: Signal over Noise, Mallang Lingo Club.
- Keep product names in English when they are branded assets: Presenter Toolkit.
- Use Korean for task labels and action text.
- Add a Korean explanation on first mention where needed.

Term suggestions:

- Free Presentation Diagnostic -> 무료 프레젠테이션 진단
- Request Paid Support -> 유료 지원 요청
- Workshop Inquiry -> 워크숍 문의
- Sample Work -> 샘플 작업
- Presentation Sprint -> 프레젠테이션 스프린트
- Ongoing Coaching Package -> 지속 코칭 패키지

Tone guidance:

- Use polite neutral business Korean.
- Avoid slang and heavy honorific over-formality.
- Keep sentence length short and scannable.
- Prefer direct CTA verbs: 요청하기, 문의하기, 확인하기.

## 3) SEO and Metadata Best Practices

Use these for best international SEO outcomes:

- Translate page title and meta description for each Korean page.
- Add canonical to each page language version itself.
- Add hreflang for both language variants on each mirrored page.

Example hreflang set for the home page:

- hreflang en -> https://your-domain/
- hreflang ko -> https://your-domain/ko/
- hreflang x-default -> https://your-domain/

Concrete example using a real domain pattern:

- English home: https://signalovernoise.site/
- Korean home: https://signalovernoise.site/ko/
- English services: https://signalovernoise.site/services/
- Korean services: https://signalovernoise.site/ko/services/

Example hreflang block:

- en: https://signalovernoise.site/services/
- ko: https://signalovernoise.site/ko/services/
- x-default: https://signalovernoise.site/services/

Repeat this pattern on every route pair.

## 4) Bilingual Tally Form Copy (EN + KO)

Recommended short labels for mixed-language forms:

- Full name / 이름
- Work email / 업무용 이메일
- Company or organization / 회사 또는 기관
- Presentation date / 발표 예정일
- Audience and context / 청중 및 발표 맥락
- What feels hardest right now? / 지금 가장 어려운 점은 무엇인가요?
- Link or upload your draft / 초안 링크 또는 파일 업로드
- Preferred support type / 희망 지원 유형

Recommended bilingual helper text:

- Please answer in Korean or English. / 한국어 또는 영어로 작성하셔도 됩니다.
- Share what you already have. Rough drafts are fine. / 현재 자료를 공유해 주세요. 초안도 괜찮습니다.

Recommended consent line:

- I agree to be contacted about this request. / 본 요청 관련 연락에 동의합니다.

## 5) QA and Review Workflow

- Translation pass 1: initial draft aligned to glossary.
- Translation pass 2: reviewer edits for tone and clarity.
- Functional QA: links, forms, redirects, and route context.
- SEO QA: title, description, canonical, hreflang.
- Accessibility QA: lang attribute, alt text translation quality, heading order.

## 6) Decision Summary Captured

- Scope: full mirror.
- URL strategy: /ko/ mirror routes.
- Copy source: no existing Korean copy; translation required.
- Tone target: international Korean business/startup standard.
- Forms: bilingual EN + KO copy, user will update form backend manually.
- Reviewers: site owner + external reviewer.
