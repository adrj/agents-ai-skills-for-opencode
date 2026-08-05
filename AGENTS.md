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

## Data & Migrations

| Task | Subagent |
|---|---|
| Database optimization/query tuning | postgres-pro |
| Code/data migration planning | migration |

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

## Before Writing Code
- If the user describes a new feature or change **without an existing spec/RFC** → invoke `grilling`
- After `grilling` completes successfully → invoke `rfc-write` to generate the specification
- If `CONTEXT.md` does not exist → invoke `domain-modeling` to build the glossary

## During Implementation
- When making a **business rule decision** that affects domain behavior → pause and ask the user (do NOT silently assume domain rules) — this is the `grilling` pattern
- When a new domain concept is named → invoke `domain-modeling` to update `CONTEXT.md`

## Before Committing / Creating PRs
- After implementing a feature → invoke `quality-gate` to verify no regressions
- If quality gate fails → delegate fixes to `qa-engineer` for simple issues, `refactorer` for structural issues
- After fixes → re-run `quality-gate` until it passes

## For Existing Projects (First-Time Setup)
- User asks to set up quality baseline or audit existing project → invoke `architecture-audit`
- Audit generates report → ask user which candidates to explore → `grilling` on selected candidate → `rfc-write` for RFCs retroactively

## Model Tier Strategy

| Tier | Model | Used For | Cost |
|------|-------|----------|------|
| Free | `opencode/deepseek-v4-flash-free` | Mechanical fixes, lint, DevOps config | $0 |
| Go Flash | `opencode-go/deepseek-v4-flash` | Standard development, language agents | Low |
| Go Pro | `opencode-go/deepseek-v4-pro` | Heavy analysis, specs, complex frameworks | Medium |
| Go Qwen | `opencode-go/qwen3.7-plus` | Strategy, product, planning | Medium |
