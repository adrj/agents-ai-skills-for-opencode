---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [react, nextjs, performance, frontend, optimization]
metadata:
  source: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
  adapted-for: opencode
---

# Vercel React Best Practices

Performance optimization guide for React and Next.js, maintained by Vercel. 70 rules across 8 categories, prioritized by impact.

## Priority 1: Eliminating Waterfalls (CRITICAL)

| Rule | Action |
|------|--------|
| Check before await | Check cheap sync conditions before awaiting flags/remote values |
| Defer await | Move await into branches where actually used |
| Parallel awaits | Use Promise.all() for independent operations |
| Partial dependencies | Use better-all for partial dependencies |
| API routes | Start promises early, await late |
| Suspense boundaries | Use Suspense to stream content |

## Priority 2: Bundle Size (CRITICAL)

| Rule | Action |
|------|--------|
| Barrel imports | Import directly, avoid barrel files |
| Analyzable paths | Prefer statically analyzable import paths |
| Dynamic imports | Use next/dynamic for heavy components |
| Defer third-party | Load analytics/logging after hydration |
| Conditional loads | Load modules only when feature is active |
| Preload | Preload on hover/focus for perceived speed |

## Priority 3: Server-Side Performance (HIGH)

| Rule | Action |
|------|--------|
| Auth actions | Authenticate server actions like API routes |
| React.cache() | Use for per-request deduplication |
| LRU cache | Use for cross-request caching |
| Dedup props | Avoid duplicate serialization in RSC props |
| Hoist static I/O | Fonts, logos to module level |
| No shared module state | Avoid module-level mutable state in RSC/SSR |
| Minimize serialization | Minimize data passed to client components |
| Parallel fetching | Restructure components to parallelize fetches |
| after() | Use after() for non-blocking operations |

## Priority 4: Client Data Fetching (MEDIUM-HIGH)

- Use SWR for automatic request deduplication
- Deduplicate global event listeners
- Use passive listeners for scroll
- Version and minimize localStorage data

## Priority 5: Re-render Optimization (MEDIUM)

- Defer state reads — don't subscribe to state only used in callbacks
- Memo expensive components — extract into memo()'d components
- Hoist default non-primitive props
- Use primitive dependencies in effects
- Subscribe to derived booleans, not raw values
- Derive state during render, not in effects
- Use functional setState for stable callbacks
- Pass function to useState for expensive init
- Avoid memo for simple primitives
- Split hooks with independent dependencies
- Put interaction logic in event handlers
- Use startTransition for non-urgent updates
- Use useDeferredValue to keep input responsive
- Use refs for transient frequent values
- Don't define components inside components

## Priority 6: Rendering (MEDIUM)

- Animate div wrapper, not SVG element
- Use content-visibility for long lists
- Extract static JSX outside components
- Reduce SVG coordinate precision
- Use Activity component for show/hide
- Use ternary, not && for conditionals
- Prefer useTransition for loading state
- Use React DOM resource hints for preloading

## Priority 7: JavaScript Performance (LOW-MEDIUM)

- Group CSS changes via classes or cssText
- Build Map for repeated lookups
- Cache object properties in loops
- Cache function results in module-level Map
- Cache localStorage/sessionStorage reads
- Combine filter/map into one loop
- Check array length before expensive comparison
- Return early from functions
- Hoist RegExp creation outside loops
- Use loop for min/max instead of sort
- Use Set/Map for O(1) lookups
- Use toSorted() for immutability
- Use flatMap to map and filter in one pass
- Defer non-critical work to requestIdleCallback

## Priority 8: Advanced Patterns (LOW)

- Don't put useEffectEvent results in effect deps
- Store event handlers in refs
- Initialize app once per app load
- useLatest for stable callback refs

## How to Use

Read individual rule files from source repo for detailed code examples:
```
https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules/
```
