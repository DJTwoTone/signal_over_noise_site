---
name: en-ko-pragmatic-translation
description: "Optimize English-to-Korean translations for pragmatic equivalence, politeness, implicature, discourse flow, and natural Korean style. Use when translating UI copy, marketing pages, technical docs, or CTAs where literal translation sounds unnatural or changes intent."
argument-hint: "Paste source text, target audience, and tone (for example: neutral/formal/friendly)"
user-invocable: true
disable-model-invocation: false
---

# English to Korean Pragmatic Translation Optimizer

## What This Skill Produces
- A revised Korean translation that preserves meaning and intent, not just wording.
- A short rationale for key pragmatic choices.
- A risk list for terms or sentences that may need human review.

## When to Use
- English source text has implied meaning, tone, persuasion, hedging, or social nuance.
- Literal translation sounds stiff, ambiguous, or culturally off in Korean.
- You need consistent tone across pages such as home, services, pricing, and forms.

## Inputs
- Source English text.
- Existing Korean draft (if any).
- Audience profile: user type, region, age range, expertise.
- Relationship and politeness target: formal, polite-neutral, friendly.
- Channel: website hero, CTA, email, legal note, help text, error message.

If any input is missing, ask for it before finalizing.

## Project Defaults
- Voice default: friendly marketing tone.
- Locale default: South Korea standard web copy.
- Brand-term policy default: mixed usage as appropriate.
  - Keep high-recognition brand/product words in English when that improves scanability.
  - Use Korean phrasing for explanatory context and supporting copy.
  - On first mention, allow mixed form when clarity benefits (English + Korean context).
- Adaptation strategy default: aggressive transcreation for conversion impact, while preserving factual truth.

## Korean CTA Standard
- Use short, action-forward verb phrases.
- Prefer immediate benefit framing over abstract labels.
- In most web contexts, concise polite-neutral imperative style is standard.
- Friendly marketing can soften directness, but CTA still needs clear action.
- Avoid awkward literal copies such as generic "제출" when a more specific verb exists.

Common CTA patterns:
- Start action: 시작하기, 무료로 시작하기
- Learn action: 자세히 보기, 사례 보기
- Commit action: 지금 신청하기, 상담 신청하기
- Conversion action: 진단받기, 견적 받기, 문의하기
- Retrieval action: 다운로드하기, 가이드 받기

## Workflow
1. Define communicative intent
- Identify the speech act for each sentence: inform, request, promise, warn, invite, reassure, etc.
- Mark primary intent and secondary tone goal.

2. Set politeness and stance
- Choose ending style and register based on audience and channel.
- Decide whether the voice should be distant, neutral, or conversational.
- Default to friendly marketing voice unless legal/compliance context requires stricter formality.

3. Map pragmatics before wording
- Identify implicature, presupposition, and hedging in the English.
- Decide what should be explicit in Korean versus left implicit.
- Preserve persuasive force without over-amplifying claims.

4. Restructure for Korean discourse
- Reorder clauses to fit Korean information flow (context before focal point).
- Convert unnatural noun-heavy English phrasing into verb-friendly Korean structure.
- Split overloaded English sentences when needed for readability.

5. Resolve lexical and cultural fit
- Choose terminology that is idiomatic for Korean users in the given domain.
- Replace culturally narrow metaphors or idioms with functional Korean equivalents.
- Keep brand terms stable; localize surrounding language.

6. Handle grammar and omission strategically
- Use topic/subject marking intentionally for clarity and emphasis.
- Apply natural omission where Korean allows it without losing meaning.
- Avoid overusing explicit pronouns copied from English.

7. Calibrate persuasion and risk
- For marketing copy, prioritize high-conversion phrasing and adaptive transcreation.
- Keep claims assertive but fact-safe; do not introduce unverifiable promises.
- For compliance, pricing, or legal content, prefer precision over flourish.
- Flag terms with legal or medical risk for human review.

8. Final QA pass
- Read for naturalness, coherence, and rhythm.
- Check consistency of tone, honorific level, and key terminology.
- Verify CTA force: clear, specific, and culturally natural.

## Branching Logic
- If channel is legal, policy, or pricing details:
  - Prioritize explicit precision and traceability.
  - Minimize idiomatic compression that could create ambiguity.
- If channel is marketing headline or CTA:
  - Prioritize impact and immediacy.
  - Use aggressive adaptive rephrasing instead of literal mapping.
  - Prefer specific action verbs and benefit-led CTA wording.
- If audience is mixed or unknown:
  - Default to South Korea polite-neutral web register and avoid slang.
- If source sentence contains layered implicature or irony:
  - Preserve intent first, then style.
  - Provide one alternative phrasing and explain tradeoff.

## Quality Criteria
A translation is complete only if all checks pass:
- Intent equivalence: the Korean line performs the same social action as the English.
- Pragmatic equivalence: politeness, stance, and implied meaning are preserved or intentionally adapted.
- Naturalness: reads like originally written Korean, not translated English.
- Domain fit: terminology matches context and expected user knowledge.
- Consistency: stable terms and register across the whole text.
- Safety: risky claims, legal ambiguity, or culturally sensitive wording are flagged.

## Output Format
Return results in this structure:
1. Optimized Korean translation
2. Key decisions (3-7 bullets)
3. Risk flags and alternatives
4. Terminology table (only if 3+ domain terms appear)

## Prompt Pattern
Use this invocation shape:
- Source text: <paste English>
- Existing Korean draft: <optional>
- Audience: <who>
- Channel: <where it appears>
- Tone target: <formal | polite-neutral | friendly>
- Constraints: <length, terminology, forbidden words, legal notes>

## Completion Checklist
- Intent and tone identified per segment.
- Register choice justified.
- Discourse flow adapted for Korean readability.
- At least one ambiguity/risk scan completed.
- Final output follows the required structure.
