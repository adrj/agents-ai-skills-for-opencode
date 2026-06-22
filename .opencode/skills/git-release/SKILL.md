---
name: git-release
description: Create consistent releases with changelogs, version bumps, and release notes from git history
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [git, release, versioning, workflow, collaboration]
metadata:
  source: https://github.com/weisser-dev/awesome-opencode
  adapted-for: opencode
---

# Git Release

## What I Do

- Analyze merged PRs and commits since the last release tag
- Draft release notes grouped by category (Features, Fixes, Breaking Changes, etc.)
- Propose a semantic version bump based on commit types
- Generate a copy-pasteable `gh release create` command
- Optionally update CHANGELOG.md

## When to Use

Use this skill when you are preparing a tagged release.
Ask clarifying questions if the target versioning scheme is unclear.

## Process

1. Find the latest release tag: `git describe --tags --abbrev=0`
2. List commits since that tag: `git log <tag>..HEAD --oneline`
3. Categorize commits by type (feat, fix, breaking, chore, docs)
4. Determine version bump:
   - **BREAKING CHANGE** or `!` suffix -> Major
   - `feat:` -> Minor
   - `fix:` -> Patch
5. Draft release notes in this format:

```markdown
## [vX.Y.Z] - YYYY-MM-DD

### Breaking Changes
- Description (#PR)

### Features
- Description (#PR)

### Bug Fixes
- Description (#PR)

### Other
- Description (#PR)
```

6. Provide the release command:
```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes-file release-notes.md
```

## Conventions

- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Follow [Semantic Versioning](https://semver.org/)
- Include PR numbers in release notes where available
- Credit contributors when possible
