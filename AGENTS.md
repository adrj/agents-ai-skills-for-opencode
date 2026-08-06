# General Instructions

Before responding to any request, first assess which available skills and subagents are relevant to the task at hand. Cross-reference the user's request against the specialized agents and skills defined in this file — if a specialist exists for the domain, language, or concern mentioned, delegate the work to them rather than handling it directly. Skills provide workflow instructions and should be loaded when the task matches their description. This ensures each task is handled by the most capable agent, producing higher quality results with less effort.

When in doubt about which agent to use, prefer delegating to a specialist over handling the work yourself. Always check both the subagent tables below and the available skills list before starting any substantive work.

# Agent Delegation Rules

The following subagents are available. Delegate tasks to them based on the type of work requested.

## Language-Specific Code

Delegate **immediately** when the user mentions a specific language or framework:

| Trigger | Subagent | Why |
|---|---|---|
| Java/JVM/Spring/Hibernate | java-architect | Spring, JVM tuning, design patterns |
| Spring Boot/microservices | spring-boot-engineer | WebFlux, Security, Data JPA |
| Python | python-pro | Typing, asyncio, packaging |
| TypeScript | typescript-pro | Strict typing, generics, inference |
| Rust | rust-engineer | Ownership, lifetimes, unsafe |
| Go/Golang | golang-pro | Goroutines, channels, concurrency |
| React/JSX | react-specialist | Hooks, server components, Suspense |
| Next.js | nextjs-developer | App Router, Server Actions, ISR |
| C#/.NET | csharp-developer | ASP.NET Core, EF Core, LINQ |
| Kotlin | kotlin-specialist | Coroutines, KMP, DSLs |
| PHP | php-pro | PHP 8.x, Composer, PSR |
| Django | django-developer | ORM, REST framework, Celery |
| FastAPI | fastapi-developer | Pydantic, DI, WebSockets |
| Angular | angular-architect | Signals, standalone, NgRx |
| Vue.js/Nuxt | vue-expert | Composition API, Pinia |
| Flutter/Dart | flutter-expert | Widgets, state management |
| Swift/iOS/macOS | swift-expert | SwiftUI, Combine, async/await |
| C/C++ | cpp-pro | C++20/23, RAII, templates |
| Elixir/Phoenix | elixir-expert | OTP, GenServer, distributed |
| JavaScript | javascript-pro | ES2024+, async, Web APIs |
| PostgreSQL / SQL in general | postgres-pro | Extensions, tuning, window functions, CTEs, optimization |

## General Development

| Task | Subagent | Falls back to |
|---|---|---|
| Frontend/UI code | react-specialist, vue-expert, angular-architect, nextjs-developer | javascript-pro |
| Backend/server-side code | python-pro, golang-pro, java-architect, csharp-developer, etc. | Language-specific agent |
| API design / OpenAPI specs | api-designer | — |
| Code refactoring / tech debt | refactorer | — |
| Code review of changes | code-reviewer | — |
| Debugging errors/crashes | error-detective | — |
| Performance profiling | performance-engineer | — |

## DevOps & Infrastructure

| Task | Subagent |
|---|---|
| Docker/Dockerfiles | docker-expert |
| Kubernetes/Helm | kubernetes |
| Terraform/IaC | terraform |
| CI/CD pipelines | ci-pipeline |
| Deployment/release | deployment-engineer |

## Data & Web

| Task | Subagent |
|---|---|
| Database optimization/query tuning | postgres-pro |
| Code/data migration planning | migration |
| Web scraping, navigation, downloads | web-scraper |

## Quality & Security

| Task | Subagent |
|---|---|
| Test automation | test-automator |
| Accessibility audit | accessibility-tester |
| Security audit/threat model | security-auditor |

## Documentation & Planning

| Task | Subagent |
|---|---|
| Documentation/README | docs-writer, technical-writer |
| Prompt engineering | prompt-engineer |
| Git workflow/conflicts | git-workflow |

## Specification & Quality

| Task | Subagent | Model |
|---|---|---|
| Technical specification / RFC generation | spec-writer | opencode-go/deepseek-v4-pro |
| Code quality fixes (lint, duplication, coverage) | qa-engineer | opencode/deepseek-v4-flash-free |

## Business & Product

| Task | Subagent |
|---|---|
| Requirements gathering, user stories, specs | business-analyst |
| Product strategy, roadmap, feature prioritization | product-manager |
| Project planning, risk tracking, timeline management | project-manager |
| Technical writing, API docs, tutorials | technical-writer |

## Invocation Instructions

- Reference subagents by name **without @**: "error-detective investigate this crash"
- Do NOT use `@` prefix in agent instructions (`@` is only for manual user invocation)
- For language-specific work, always delegate to the matching specialist
- For error/bug investigation, use error-detective first before attempting fixes
- For code review, always delegate to code-reviewer before merging
- **CRITICAL**: After completing any major feature, refactor, or API change, delegate to project-manager to update documentation and project records

# Auto-Invocation Rules (Skills)

The following skills trigger automatically based on context. Do NOT wait for the user to manually invoke them.

## Systemic Decision Tree

Before ANY significant action, evaluate the situation using this decision tree. Always prefer the spec-first path.

### Phase 0: Project Assessment (runs once per project or when context shifts)

```
Is this a NEW project or a first interaction?
├── Check if .opencode/ exists
│   ├── NO  → "Este projeto não tem o skeleton configurado. Quer que eu configure?"
│   │        └── Copy .opencode/ from skeleton (agents, skills, manifest)
│   └── YES → continue
├── Check if opencode.json exists
│   ├── NO  → Create opencode.json pointing to AGENTS.md
│   └── YES → continue
├── Check if .github/ exists
│   ├── NO  → Create .github/pull_request_template.md + .github/workflows/ci.yml
│   └── YES → continue
├── Check CONTEXT.md exists
│   ├── NO  → invoke domain-modeling (build glossary from codebase + README)
│   └── YES → ready for Phase 1
├── Check docs/guidelines/ exists
│   ├── NO  → Copy from ~/.config/opencode/guidelines/ (global template)
│   │        └── Offer to customize placeholders {{VARIAVEL}} for this project
│   └── YES → ready for Phase 1
└── Check quality-gate/baseline.json exists
    ├── NO  → invoke quality-gate (auto-audit → fix → freeze baseline)
    └── YES → ready for Phase 1
```

### Phase 1: Specification (always before code)

```
Is there a spec/RFC for this feature?
├── NO → invoke grill-with-docs (interview + build docs simultaneously)
│        └── after completion → invoke rfc-write (generate formal spec)
└── YES → read the spec and proceed to Phase 2
```

### Phase 2: Implementation (test-driven, code generation)

```
Does the spec define clear contracts?
├── YES → invoke test-driven-development first
│        └── Write the test → watch it fail → write minimal code → watch it pass
│        └── Delegate implementation to language-specific agent
└── NO  → invoke grilling on the ambiguous parts first
```

### Phase 3: Quality Gate (before commit/PR)

```
invoke quality-gate
├── PASS → commit or create PR
└── FAIL → check regression type:
    ├── Lint/format → delegate to qa-engineer (free, mechanical fix)
    ├── File size/complexity → delegate to refactorer (structural fix)
    ├── Coverage gap → delegate to test-automator (add missing tests)
    │   └── Agent writes tests → re-run quality-gate
    └── After fixes → re-run quality-gate until PASS
```

### Phase 4: Review (before merge)

```
Branch completa, pronto para PR
├── invoke finishing-a-branch (pre-PR checklist)
│   ├── Tests pass?
│   ├── Quality gate passed?
│   ├── No secrets/logs committed?
│   ├── Commits organized + conventional format?
│   └── Docs updated?
│
├── Create PR with template (description, type, checklist, screenshots)
│
├── invoke babysit (agent monitors CI + reviews + quality in loop)
│   ├── Watch CI: fail → fix → push → re-check
│   ├── Watch reviews: comments → address → resolve
│   ├── Watch quality-gate: regression → fix → push
│   └── Max 3 iterations, then escalate to human
│
├── invoke pr-review (delegate to code-reviewer agent)
│   ├── Security scan (iam, secrets, injection)
│   ├── Performance review (N+1, allocations, caching)
│   ├── Architecture compliance (does it follow the spec/RFC?)
│   ├── Test adequacy (are edge cases covered?)
│   └── Returns: approved / changes requested / rejected
│
├── If changes requested → agent fixes → re-review
│
├── CI pipeline runs automatically:
│   ├── lint → test → build → quality-gate
│   └── All must pass before merge allowed
│
├── Merge rules (see BRANCHING_STRATEGY.md):
│   ├── Feature/fix → squash merge (clean history)
│   ├── Release → merge commit (preserve context)
│   ├── Hotfix → merge to main AND back to develop
│   └── Minimum 1 approval required
│
└── After merge:
    ├── Delete source branch
    ├── If release → tag with semantic version
    └── Delegate to project-manager to update docs/roadmap
```

## Skill Trigger Reference

| Context Signal | Skill to Invoke | Auto? |
|---------------|-----------------|-------|
| User describes new feature/change with no spec | `grilling` or `grill-with-docs` | ✅ |
| User has existing domain docs or wants docs built | `grill-with-docs` (interview + CONTEXT.md + ADRs) | ✅ |
| Grilling session completes | `rfc-write` (generate specification) | ✅ |
| `CONTEXT.md` missing at project start | `domain-modeling` (build glossary) | ✅ |
| New domain concept named during conversation | `domain-modeling` (update CONTEXT.md) | ✅ |
| Feature implementation complete | `quality-gate` (verify metrics) | ✅ |
| Quality gate fails with lint/simple issues | Delegate to `qa-engineer` (free tier) | ✅ |
| Quality gate fails with structural issues | Delegate to `refactorer` | ✅ |
| Code review needed before merge | `pr-review` or delegate to `code-reviewer` | ✅ |
| Branch complete, ready for PR | `finishing-a-branch` (pre-PR checklist) | ✅ |
| PR created, needs monitoring | `babysit` (watch CI + reviews + quality in loop) | ✅ |
| Merge conflicts during PR | Delegate to `git-workflow` | ✅ |
| Major feature/refactor/API change complete | Delegate to `project-manager` | ✅ |
| First time setting up quality in existing project | `architecture-audit` (scan + baseline) | ✅ |
| Bug, crash, unexpected behavior | `systematic-debugging` + delegate to `error-detective` | ✅ |
| New implementation (feature or bugfix) | `test-driven-development` (test-first cycle) | ✅ |
| Quality gate fails with coverage gap | Delegate to `test-automator` (add missing tests) | ✅ |
| Tests needed for new module/feature | `test-patterns` (follow project conventions) | ✅ |
| UI component, dashboard, admin panel | `interface-design` (design system consistency) | ✅ |
| User explicitly asks for interview | `grill-me` (manual trigger) | Manual |

## Model Tier Strategy

| Tier | Model | Used For | Cost |
|------|-------|----------|------|
| Free | `opencode/deepseek-v4-flash-free` | Mechanical fixes, lint, DevOps config | $0 |
| Go Flash | `opencode-go/deepseek-v4-flash` | Standard development, language agents | Low |
| Go Pro | `opencode-go/deepseek-v4-pro` | Heavy analysis, specs, complex frameworks | Medium |
| Go Qwen | `opencode-go/qwen3.7-plus` | Strategy, product, planning | Medium |

## Cost Optimization Rules

1. **Zero-AI steps first**: quality-check.js (deterministic) before delegating to any agent
2. **Free tier for mechanical tasks**: lint fixes, formatting, simple duplication → `qa-engineer` ($0)
3. **Pro only when needed**: specs, security audit, complex framework analysis → `spec-writer`, `code-reviewer`, `security-auditor`
4. **Reuse context**: after grilling generates decisions, pass them to rfc-write — don't re-interview
5. **Batch quality fixes**: if quality-gate finds multiple violations, fix all before re-running
