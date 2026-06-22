---
name: finishing-a-branch
description: Use when completing a feature branch before creating a PR. Ensures tests pass, code is clean, commits are organized, and PR description is thorough.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [git, workflow, pr, quality, collaboration]
metadata:
  source: https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch
  adapted-for: opencode
---

# Finishing a Development Branch

## Overview

Before creating a PR, ensure the branch is truly ready: tests pass, code is clean, history is organized, and the PR description tells the full story.

## Checklist Before Creating PR

### 1. Verify Tests Pass

```bash
# Run the full test suite
npm test
# or
pytest
# or whatever the project uses

# Check for linting issues
npm run lint
```

All tests must pass. No exceptions. Fix failures before proceeding.

### 2. Review Your Changes

```bash
git diff main...HEAD
```

Review every line you changed:
- Does the code do what you intended?
- Are there any debugging artifacts (`console.log`, `print`, `debugger`)?
- Any commented-out code that shouldn't be there?
- Any TODOs that should be resolved before merging?

### 3. Organize Commits

Clean commit history tells the story of your work:

```bash
git log main...HEAD --oneline
```

Each commit should:
- Have a clear, descriptive message
- Represent a logical unit of work
- Not include "WIP", "fix typo", "oops" messages

If history is messy, consider squashing or reordering commits (only if not already pushed, or coordinate with team).

### 4. Check for Security Issues

- No hardcoded secrets, API keys, or passwords
- No sensitive data in logs
- Environment variables used correctly
- Dependencies updated to non-vulnerable versions

### 5. Update Documentation

If you changed behavior:
- Update relevant README sections
- Update inline code comments
- Update API documentation if applicable
- Update CHANGELOG if the project maintains one

### 6. Self-Review Checklist

- [ ] Tests pass (all of them)
- [ ] No debugging artifacts left
- [ ] No commented-out code
- [ ] No hardcoded secrets
- [ ] Documentation updated
- [ ] Commit history is clean and meaningful

## Writing the PR Description

A good PR description includes:

```markdown
## What

Brief description of what this PR does.

## Why

Context: why was this change needed? What problem does it solve?

## How

Key implementation decisions and trade-offs made.

## Testing

How was this tested? Any edge cases verified?

## Screenshots (if UI changes)

Before/After screenshots if applicable.

## Checklist

- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or breaking changes documented)
```

## Creating the PR

```bash
# Push branch
git push -u origin HEAD

# Create PR (using gh CLI)
gh pr create --title "feat: your feature title" --body "$(cat pr-description.md)"
```

## After Creating PR

- Respond to review comments promptly
- Make requested changes in new commits (don't force-push unless agreed)
- Re-request review after addressing feedback
- Keep the branch up to date with main if it drifts
