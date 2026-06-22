---
name: handoff
description: Creates focused handoff prompts for continuing work in a new opencode session. Analyzes conversation, extracts key context, and generates a continuation prompt with file references.
license: MIT
compatibility: opencode
min_version: 1.2.15
scope: [global]
tags: [workflow, session, continuity, memory]
metadata:
  source: https://github.com/joshuadavidthomas/opencode-handoff
  adapted-for: opencode
---

# Handoff

Create focused handoff prompts for continuing work in new sessions.

## When to Use

- When you need to continue work in a fresh session
- When switching contexts and want to preserve progress
- Before closing a long session to retain key context

## Workflow

When the user asks to handoff or says "continue later":

1. **Analyze current conversation** — extract key decisions, relevant files, current state
2. **Generate focused prompt** — include `@file` references so next session loads context
3. **Write handoff to file** — save to `.opencode/handoff.md`
4. **Summarize what was saved** — tell the user what context will carry over

## Handoff File Format

Save to `.opencode/handoff.md`:

```markdown
# Handoff: <goal>

## Goal
<what needs to be done>

## Context
- Current state: <what's done, what's pending>
- Key decisions: <architectural or design decisions made>

## Files
- @<filepath> — <why it's relevant>
- @<filepath> — <why it's relevant>

## Next Steps
1. <step 1>
2. <step 2>

## Session Reference
Continuing from session <id>. Use read_session or reference napkin for details.
```

## Integration

- **napkin**: Log recurring patterns learned during the session
- **agent-memory** / **opencode-mem**: Store detailed context before handoff
- **finishing-a-branch**: Use before creating PR to document remaining work

## Example

```
User: I need to continue this later. Let's handoff.
Agent: [analyzes session, writes .opencode/handoff.md]
Saved handoff to .opencode/handoff.md — includes auth flow decisions,
the 3 files being modified, and next steps for token refresh.
```
