---
name: ko-cta-optimizer
description: "Generate and rank Korean CTA rewrites from English source copy for South Korea web marketing. Use for headlines, button labels, and supporting microcopy when you need high-conversion, natural Korean options instead of literal translations."
argument-hint: "Paste section copy and goal (for example: lead capture, consultation booking, or download)"
user-invocable: true
disable-model-invocation: false
---

# Korean CTA Optimizer

## What This Skill Produces
- 5 ranked Korean CTA variant sets per section.
- Each set includes headline, button label, and support microcopy.
- A concise rationale with conversion intent and linguistic tradeoffs.

## When to Use
- You need conversion-focused Korean CTA options, not direct translation.
- Existing CTA copy sounds flat, generic, or too literal in Korean.
- You want alternatives tuned for intent such as booking, inquiry, trial, or download.

## Defaults
- Voice: friendly marketing.
- Locale: South Korea standard web copy.
- Adaptation: aggressive transcreation for impact.
- Brand terms: mixed usage as appropriate.

## Required Inputs
- Source section text in English.
- Conversion goal: consult, purchase, subscribe, download, diagnose, etc.
- Audience: role, familiarity, and urgency level.
- Offer type: free, paid, limited-time, evergreen.

## Optional Inputs
- Existing Korean draft.
- Character limits for headline and button.
- Forbidden words or legal constraints.
- Preferred emotional tone: trust, urgency, clarity, relief, confidence.

If required inputs are missing, ask before finalizing.

## Korean CTA Standards
- Prefer specific action verbs over abstract nouns.
- Keep button copy short and scannable.
- Pair action with user benefit when space allows.
- Avoid vague literal choices when a concrete Korean action verb is available.
- Maintain factual accuracy while maximizing motivational force.

## Workflow
1. Identify conversion mechanics
- Extract primary action, value proposition, friction, and urgency from source.
- Determine one core conversion action for the section.

2. Set persuasion angle
- Pick one dominant angle: speed, certainty, relief, proof, exclusivity, simplicity.
- Choose fallback angle in case legal or factual limits reduce claim strength.

3. Build CTA skeleton
- Draft one action-forward headline.
- Draft one button label with concrete user action.
- Draft one supporting line that reduces hesitation.

4. Generate five variant sets
- Produce 5 full sets with distinct persuasion angles.
- Keep each set internally consistent in tone and promise level.
- Ensure each set is culturally natural in South Korea web context.

5. Rank variants
- Score each set on: clarity, motivation, credibility, specificity, scanability.
- Rank from 1 (best) to 5.

6. Risk and compliance pass
- Remove unverifiable overpromises.
- Flag legal sensitivity in pricing, health, legal, and guarantee claims.
- Provide safer alternates if a line is risky.

7. Final polish
- Tighten for rhythm and brevity.
- Normalize style consistency across headline, button, and support line.

## Branching Logic
- If section type is hero:
  - Emphasize primary benefit and immediate action.
- If section type is pricing:
  - Emphasize transparency and low-risk next step.
- If section type is form submit:
  - Reduce anxiety and clarify what happens next.
- If section type is download/resource:
  - Emphasize practical outcome and delivery speed.
- If audience awareness is low:
  - Use simpler claims and stronger clarity.
- If audience awareness is high:
  - Use sharper differentiation and stronger action verbs.

## Ranking Rubric
Use 1-5 score for each criterion and compute total out of 25.
- Clarity: Is the next action obvious?
- Motivation: Does this increase desire to click?
- Credibility: Is claim strength believable?
- Specificity: Is outcome concrete rather than generic?
- Scanability: Is it short and easy to parse quickly?

## Output Format
Return in this structure:
1. Section summary
- Goal, audience, and constraints used.

2. Ranked variants (1-5)
- Variant number and total score.
- Headline.
- Button label.
- Support microcopy.
- Why this works (1-2 bullets).

3. Risk flags
- Any risky wording and safer alternatives.

4. Recommendation
- Best default option.
- One challenger option for A/B test.

## Prompt Pattern
Use this invocation shape:
- Section type: <hero | pricing | form | download | other>
- Source text: <paste English>
- Goal: <conversion objective>
- Audience: <who>
- Constraints: <char limits, legal notes, forbidden terms>
- Existing Korean draft: <optional>

## Completion Checklist
- Five distinct variant sets are present.
- Ranking rubric applied consistently.
- No unverifiable promises in final recommendation.
- Best default and challenger are clearly identified.
