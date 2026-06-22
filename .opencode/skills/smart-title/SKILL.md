---
name: smart-title
description: Auto-generates meaningful session titles for opencode conversations using AI. Watches conversation, generates descriptive titles, updates on idle.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [productivity, session, organization]
metadata:
  source: https://github.com/Tarquinen/opencode-smart-title
  adapted-for: opencode
---

# Smart Title

Auto-generates meaningful session titles for opencode conversations.

## When to Use

- Always active — runs silently in background
- Useful when you have many sessions and need to find them later
- Saves manual session renaming effort

## How It Works

1. Watches conversation as it progresses
2. After a pause (idle), generates a short descriptive title
3. Updates the session title automatically
4. Uses the authenticated AI provider — no extra API keys

## Configuration

Configure via `.opencode/smart-title.jsonc`:

```jsonc
{
  "enabled": true,
  "debug": false,
  "updateThreshold": 1
}
```

- `updateThreshold`: how many idle events before update (1 = update every pause)
- `model`: optionally specify a model override

## Integration

- **handoff**: After handoff, session title reflects the new goal
- **napkin**: Session title can inform napkin entries about what was worked on
