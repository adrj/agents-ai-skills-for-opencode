---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior. Always find root cause before proposing fixes. Random fixes waste time and create new bugs.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [debugging, troubleshooting, workflow, quality]
metadata:
  source: https://github.com/obra/superpowers/tree/main/skills/systematic-debugging
  adapted-for: opencode
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## When to Use

Use for ANY technical issue:
- Test failures
- Bugs in production
- Unexpected behavior
- Performance problems
- Build failures
- Integration issues

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes

## The Four Phases

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits, new dependencies

4. **Gather Evidence in Multi-Component Systems**

   Add diagnostic instrumentation at each component boundary:
   - Log what data enters component
   - Log what data exits component
   - Verify environment/config propagation

5. **Trace Data Flow**
   - Where does bad value originate?
   - What called this with bad value?
   - Keep tracing up until you find the source

### Phase 2: Pattern Analysis

1. **Find Working Examples** — Locate similar working code in same codebase
2. **Compare Against References** — Read reference implementation COMPLETELY
3. **Identify Differences** — List every difference, however small
4. **Understand Dependencies** — What settings, config, environment?

### Phase 3: Hypothesis and Testing

1. **Form Single Hypothesis** — State clearly: "I think X is the root cause because Y"
2. **Test Minimally** — Make the SMALLEST possible change to test hypothesis
3. **Verify Before Continuing** — Did it work? Yes → Phase 4. No → form NEW hypothesis
4. **When You Don't Know** — Say "I don't understand X". Don't pretend to know.

### Phase 4: Implementation

1. **Create Failing Test Case** — Simplest possible reproduction
2. **Implement Single Fix** — Address root cause, ONE change at a time
3. **Verify Fix** — Tests pass? No other tests broken?
4. **If Fix Doesn't Work** — STOP. Count: How many fixes tried?
   - If < 3: Return to Phase 1
   - **If ≥ 3: Question the architecture. Discuss with human before more fixes.**

## Red Flags - STOP and Follow Process

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It's probably X, let me fix that"
- "One more fix attempt" (when already tried 2+)

**ALL of these mean: STOP. Return to Phase 1.**

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "One more fix attempt" (after 2+) | 3+ failures = architectural problem. Question pattern. |
