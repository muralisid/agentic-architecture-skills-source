# Visual-first reader test protocol

Use this protocol before promoting a guide release. Test the production build, not a design file. Participants must be unfamiliar with the repository and may not receive a glossary or verbal explanation before the timed tasks.

## Participants

Recruit at least two CIO/CTO participants and two enterprise-architecture participants. A participant may work in an adjacent leadership role when their normal responsibilities match the path being tested. Record role and prior agent-architecture experience; do not record confidential employer data in the repository.

## Five-minute orientation test

Start each participant on the guide home page and allow five minutes of unguided reading. Then remove the guide from view and ask the participant to:

1. Explain the target state in their own words. Pass when they say that agents execute bounded routine work, deterministic systems authorize consequential actions, and humans retain intent and accountability.
2. Distinguish the fourteen estate layers from the seven agent-system planes. Pass when they describe layers as the enterprise landscape and planes as the operating architecture that crosses it.
3. Select the closest enterprise archetype and name the structural constraint that drove the choice. Pass when the choice and reason agree with the archetype grid.
4. Name the next decision in the journey. Pass when they choose readiness after archetype, or explain why they are returning to an earlier prerequisite.

Do not award a pass for repeating labels without explaining the distinction.

## Guided framework test

Give the participant one fictional scenario and allow them to use the guide and worksheets. Use the labelled Northstar example only for a practice round; use a different fictional workload for the scored round.

The participant must:

1. Complete all 24 readiness questions and report the six-value profile without adding a grand total.
2. State the autonomy ceiling and identify the specific weak dimensions that bind it.
3. Route a use case through evaluability, deterministic-zone, and grounding gates in that order.
4. Produce one of four explicit portfolio outcomes: admit for prioritisation, make evaluable, redesign or reject, or prepare grounding.
5. Answer the nine roadmap factors, apply the more-restrictive-wins rule, and identify the current stage plus the evidence needed to leave it.

Pass requires correct sequencing and a defensible output; speed alone does not count.

## Visual and accessibility matrix

Test every figure in the manifest at 320, 768, and 1280 CSS pixels. At each width test light and dark themes, then repeat every figure at 200% browser zoom. Verify:

- No page-level horizontal overflow, overlap, clipped labels, or unreadably reduced text.
- Any intentionally scrollable table has a visible boundary and remains keyboard reachable.
- Meaning never depends on color alone.
- Caption, takeaway, evidence badge, sources, and long description agree with the visual.
- Zoom controls, disclosures, worksheet radios, checkboxes, inputs, reset actions, and print actions work by keyboard.
- Reduced-motion mode removes non-essential movement without removing state feedback.
- Print preserves figures, long descriptions, worksheet results, and the static HTML tables beneath visual summaries.

Run one screen-reader pass with VoiceOver/Safari or NVDA/Firefox. Confirm heading order, landmark names, figure labels, long descriptions, table headers, worksheet groups, live result announcements, and skip navigation.

## Automated release gates

Run from `site/`:

```text
npm run validate
npm run types:check
npm run build
```

Validation must fail for missing figure alt text, caption, meaningful long description, evidence status, review date, required sources on data-bearing figures, an invalid SVG viewBox, a missing SVG export, a broken local image reference, legacy taxonomy collisions, or a publication-held technique appearing in generated content.

## Observation record

For each task, record pass/fail, the participant's exact navigation path, the first point of hesitation, any term they misinterpreted, and the change they recommend. Record the build identifier and viewport. Do not coach during a timed task; note the prompt that would have unblocked the participant.

A release passes when every participant completes all four five-minute outcomes and the full guided sequence. Treat the first shared failure across two participants as a design defect. Fix it and repeat with fresh participants.

Human participant results are intentionally not pre-filled. The automated build and browser checks do not substitute for the required two CIO/CTO and two enterprise-architecture participants, and the guide must not be promoted as reader-tested until a completed observation record is attached to the release.
