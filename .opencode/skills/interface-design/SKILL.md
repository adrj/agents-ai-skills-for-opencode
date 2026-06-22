---
name: interface-design
description: Use when building UI components, dashboards, apps or admin panels. Applies principle-based design with persistent memory of decisions across sessions for consistent interfaces.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [ui, design, frontend, consistency]
metadata:
  source: https://github.com/Dammyjay93/interface-design
  adapted-for: opencode
---

# Interface Design

**Craft · Memory · Consistency**

Build interfaces with intention. Remember decisions across sessions. Maintain systematic consistency.

*For interface design — dashboards, apps, tools, admin panels. Not for marketing sites.*

## How It Works

When you build UI with this skill:

**If `.interface-design/system.md` exists:**
1. Read the file and apply established patterns
2. State design choices before each component
3. Build consistently following the system
4. Offer to save new patterns

**If no `system.md` exists:**
1. Assess project context (colors, spacing signals, component density)
2. Suggest design direction and ask for confirmation
3. State design choices before each component
4. Offer to save decisions to `.interface-design/system.md`

## Design Directions

| Direction | Feel | Best For |
|-----------|------|----------|
| **Precision & Density** | Tight, technical, monochrome | Developer tools, admin dashboards |
| **Warmth & Approachability** | Generous spacing, soft shadows | Collaborative tools, consumer apps |
| **Sophistication & Trust** | Cool tones, layered depth | Finance, enterprise B2B |
| **Boldness & Clarity** | High contrast, dramatic space | Modern dashboards, data-heavy apps |
| **Utility & Function** | Muted, functional density | GitHub-style tools |
| **Data & Analysis** | Chart-optimized, numbers-first | Analytics, BI tools |

## System File Format

Save design decisions to `.interface-design/system.md`:

```markdown
# Design System

## Direction
Personality: Precision & Density
Foundation: Cool (slate)
Depth: Borders-only

## Tokens
### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 24, 32

### Colors
--foreground: slate-900
--secondary: slate-600
--accent: blue-600

## Patterns
### Button Primary
- Height: 36px
- Padding: 12px 16px
- Radius: 6px

### Card Default
- Border: 0.5px solid
- Padding: 16px
- Radius: 8px
```

## Core Principles

**Decisions compound.** A spacing value chosen once becomes a pattern. A depth strategy becomes an identity.

**Consistency beats perfection.** A coherent system with "imperfect" values beats a scattered interface with "correct" ones.

**Memory enables iteration.** When you can see what you decided and why, you can evolve intentionally instead of drifting accidentally.

## Per-Component Workflow

Before building each component:
1. State which design tokens will be used
2. Confirm they match the established system
3. Build the component
4. Note any new patterns worth saving

## Commands to Suggest

When the user asks about design status or audit:
- `/interface-design:status` — Show current system summary
- `/interface-design:audit <path>` — Check code against system
- `/interface-design:extract` — Extract patterns from existing code
