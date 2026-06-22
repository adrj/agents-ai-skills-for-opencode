---
name: adr-write
description: Capture and maintain Architecture Decision Records to document technical choices, context, and consequences
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [architecture, decisions, documentation, workflow]
metadata:
  source: https://github.com/weisser-dev/awesome-opencode
  adapted-for: opencode
---

# ADR Write

## What I Do

- Capture significant architecture decisions with context and rationale
- Structure decisions using the ADR format (Context, Decision, Consequences)
- Maintain a numbered, chronological index of all ADRs
- Link related ADRs and track superseded decisions

## When to Use

Use this skill when you need to:
- Document a significant architecture or design decision
- Record why a particular approach was chosen over alternatives
- Capture context and trade-offs for future reference
- Onboard new team members to past design decisions
- Track evolution of architecture over time

## ADR Format

```markdown
# ADR-{NNNN}: {Title}

## Status

{Proposed | Accepted | Deprecated | Superseded by ADR-{NNNN}}

## Context

What is the issue motivating this decision?
What forces are at play (technical, schedule, organizational)?
What constraints exist?

## Decision

What is the change being proposed or made?
What is the approach? Be specific about the "what" and "how".

## Consequences

### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2

### Neutral
- Note 1

## Alternatives Considered

### Alternative 1: {Name}
- **Pros:** ...
- **Cons:** ...
- **Why rejected:** ...

### Alternative 2: {Name}
- **Pros:** ...
- **Cons:** ...
- **Why rejected:** ...
```

## Process

1. **Identify**: Recognize when a decision warrants an ADR
   - Significant architectural choices
   - Technology or framework selections
   - API design decisions
   - Data model changes
   - Security or compliance decisions

2. **Create**: Generate the ADR file
   - Place in `docs/adr/` or `.opencode/adr/`
   - Use sequential numbering: `ADR-0001-title.md`
   - Include the status, context, decision, and consequences

3. **Review**: Validate completeness
   - Is the context sufficient for someone new to understand?
   - Are alternatives documented with rejection reasons?
   - Are consequences honest about trade-offs?

4. **Maintain**: Update status as decisions evolve
   - Mark as deprecated when superseded
   - Link to the superseding ADR

## Rules

- One ADR per significant decision
- Write for readers 6 months in the future who know nothing about the context
- Be honest about trade-offs and negative consequences
- Avoid vague language: be specific about what was decided
- Keep ADRs focused on the decision, not implementation details
- Accept that some decisions will be wrong; ADRs capture the rationale at the time
