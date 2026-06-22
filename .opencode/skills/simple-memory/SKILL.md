---
name: simple-memory
description: Git-based persistent memory for opencode. Stores daily logfmt files that can be committed, reviewed, and shared by team members. Lightweight alternative to vector databases.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [memory, persistence, collaboration, git]
metadata:
  source: https://github.com/cnicolov/opencode-plugin-simple-memory
  adapted-for: opencode
---

# Simple Memory

Lightweight, git-based persistent memory for opencode. Stores memories as daily logfmt files in `.opencode/memory/` that can be committed, reviewed, and shared by the team.

## When to Use

- Alternative to `opencode-mem` or `agent-memory` when you want version-controlled memory
- Team projects where memory should be reviewable via git
- Simpler setup than vector database solutions

## Core Concepts

Memories are stored in `.opencode/memory/YYYY-MM-DD.logfmt`:

```
ts=2026-06-21T10:00:00.000Z type=decision scope=api content="Use REST over GraphQL" tags=architecture
```

## Memory Types

| Type | When |
|------|------|
| `decision` | Architectural or design decisions |
| `learning` | Things learned during development |
| `preference` | User or project preferences |
| `blocker` | Current blockers or issues |
| `context` | General context information |
| `pattern` | Recurring patterns or conventions |

## Commands

The agent can perform these operations via the plugin tools:

| Command | Description |
|---------|-------------|
| `memory_remember` | Store a new memory |
| `memory_recall` | Retrieve memories by scope, type, or search |
| `memory_update` | Update an existing memory |
| `memory_forget` | Delete a memory |
| `memory_list` | List all scopes and types |
| `memory_export` | Export as jsonl/json/logfmt |
| `memory_import` | Import from jsonl/json/logfmt |
| `memory_compact` | Remove duplicates, rewrite chronologically |

If the plugin is not installed, maintain memory manually:
- Create files in `.opencode/memory/YYYY-MM-DD.logfmt`
- Use consistent logfmt format
- Commit to git for team visibility

## Best Practices

- Store decisions, not transient data
- Tag memories for discoverability
- Use `memory_compact` periodically
- Commit `.opencode/memory/` to git for team sharing
- Use `memory_recall` before making architectural decisions

## Integration

- **napkin**: Use for high-frequency notes; simple-memory for durable records
- **handoff**: Include memory context in handoff prompts
- **finishing-a-branch**: Review memory before PR to capture all context
