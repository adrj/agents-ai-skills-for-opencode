---
name: opencode-snippets
description: Instant inline text expansion for prompts using #snippet syntax. Write once, reuse everywhere. Composable, shell-enabled, DRY for prompt engineering.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [workflow, productivity, prompts, composition]
metadata:
  source: https://github.com/JosXa/opencode-snippets
  adapted-for: opencode
---

# Opencode Snippets

Instant inline text expansion for prompts. Type `#snippet` anywhere and it expands.

## When to Use

- You type the same instructions repeatedly (code review, commit style, etc.)
- You want composable, reusable prompt building blocks
- You want shell output injected into prompts: `` !`git status` ``

## How It Works

Create markdown files in `~/.config/opencode/snippet/` or `.opencode/snippet/`:

**`~/.config/opencode/snippet/careful.md`:**
```
Think step by step. Double-check before committing.
```

Then type `#careful` anywhere in your message — it expands inline.

## Features

### Aliases
Frontmatter defines multiple triggers:
```yaml
---
aliases: [cp, pick]
---
```

### Shell Substitution
```
Current branch: !`git branch --show-current`
```
`` !`cmd` `` injects output only; `` !>`cmd` `` shows `$ cmd` then output.

### Composition
Snippets can include other snippets: `#base-style #security-checklist`

### Append/Prepend Blocks
Long reference material goes at end of message:
```
Use Jira MCP
<append>
## Jira MCP Usage
customfield_16570 => Acceptance Criteria
</append>
```

## Where to Store

| Scope | Path |
|-------|------|
| Global | `~/.config/opencode/snippet/*.md` |
| Project | `.opencode/snippet/*.md` |
| Both | `snippet/` or `snippets/` |

## Best Practices

- Use `#snippets` for **context injection**, `/slash` commands for **actions**
- Snippets compose: `#tdd #careful` for TDD with extra caution
- Keep each snippet focused on one concern
- Use `!>\`cmd\`` when the LLM needs to trust the output more
