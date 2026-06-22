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
| SQL queries | sql-pro | Window functions, CTEs, optimization |
| PostgreSQL | postgres-pro | Extensions, replication, tuning |

## General Development

| Task | Subagent |
|---|---|
| Frontend/UI code (any framework) | frontend-jr |
| Complex frontend architecture | frontend-sr |
| Backend/server-side code | backend |
| API design / OpenAPI specs | api-designer |
| Code refactoring / tech debt | refactorer |
| Code review of changes | code-reviewer |
| Debugging errors/crashes | error-detective |
| Performance profiling | performance-engineer |

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
| Database optimization/query tuning | db-optimizer |
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
| Documentation/README | docs-writer |
| Prompt engineering | prompt-engineer |
| Git workflow/conflicts | git-workflow |

## Invocation Instructions

- Reference subagents by name **without @**: "error-detective investigate this crash"
- Do NOT use `@` prefix in agent instructions (`@` is only for manual user invocation)
- For language-specific work, always delegate to the matching specialist
- For error/bug investigation, use error-detective first before attempting fixes
- For code review, always delegate to code-reviewer before merging
