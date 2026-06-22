# agents-skills-for-opencode

Curated skills and subagents for [OpenCode](https://opencode.ai), adapted from the best community repositories.

---

## Agent Model Mapping

Each subagent runs on an optimized model for its task tier. Configure your `opencode.json` or agent files accordingly.

| Tier | Model | Subagents |
|------|-------|-----------|
| **Free** 🆓 | `deepseek/deepseek-v4-flash` | frontend-jr, accessibility-tester, db-optimizer, docker-expert, ci-pipeline, test-automator, error-detective, api-designer, deployment-engineer, migration, git-workflow, docs-writer |
| **Light** 💰 | `qwen/qwen3.6-plus`, `minimax/m3`, `mimo/mimo-v2.5-pro` | kubernetes, terraform, prompt-engineer |
| **Medium** 💰 | `qwen/qwen3.7-plus`, `glm/glm-5.1` | backend, code-reviewer, refactorer |
| **Heavy** 💰💰 | `deepseek/deepseek-v4-pro`, `glm/glm-5.2` | frontend-sr, security-auditor, performance-engineer |

**Total:** 12 free 🆓 | 6 paid 💰 | 3 heavy 💰💰

### Model Aliases (for quick substitution)

```bash
# Examples: swap all agents to a different model tier
sed -i 's/deepseek\/deepseek-v4-flash/<new-free-model>/g' .opencode/agents/*.md
sed -i 's/qwen\/qwen3.7-plus/<new-medium-model>/g' .opencode/agents/*.md
```

---

## Skills (natively compatible)

OpenCode discovers skills via `SKILL.md` with YAML frontmatter.

| Skill | Source | Tags | Purpose |
|-------|--------|------|---------|
| `adr-write` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `architecture`, `decisions` | Architecture Decision Records |
| `api-contract` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `api`, `design`, `openapi` | REST/GraphQL API design with OpenAPI |
| `changelog-generate` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `git`, `changelog`, `release` | CHANGELOG.md generation (Keep a Changelog) |
| `ci-pipeline` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `ci`, `cd`, `devops` | CI/CD pipeline generation |
| `dependency-audit` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `security`, `dependencies` | CVE, license, and unused dep scanning |
| `deploy` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `deploy`, `devops` | Rolling, blue/green, canary strategies |
| `docker-optimize` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `docker`, `containers` | Multi-stage builds, layer caching, security |
| `env-setup` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `environment`, `onboarding` | Dev environment bootstrap, .env.example |
| `error-triage` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `debugging`, `errors` | Stack trace parsing and root cause diagnosis |
| `git-release` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `git`, `release`, `versioning` | Semantic version releases from git history |
| `incident-postmortem` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `incident`, `sre` | Blameless postmortem with timeline |
| `migration` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `migration`, `database` | Database/framework migration with rollback |
| `performance-profile` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `performance`, `profiling` | N+1, complexity, caching hotspot analysis |
| `pr-review` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `review`, `quality` | Structured PR review with checklist |
| `test-patterns` | [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) | `testing`, `patterns` | Test generation following project conventions |
| `napkin` | [blader/napkin](https://github.com/blader/napkin) | `memory`, `learning` | Per-repo persistent error and pattern runbook |
| `systematic-debugging` | [obra/superpowers](https://github.com/obra/superpowers) | `debugging`, `quality` | Root cause investigation before fixes |
| `test-driven-development` | [obra/superpowers](https://github.com/obra/superpowers) | `testing`, `tdd` | Red-green-refactor cycle |
| `interface-design` | [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | `ui`, `design` | Persistent UI design decisions across sessions |
| `finishing-a-branch` | [obra/superpowers](https://github.com/obra/superpowers) | `git`, `workflow` | PR readiness checklist |
| `firecrawl-web` | [Firecrawl CLI](https://docs.firecrawl.dev/sdks/cli) | `web`, `search` | Web scraping and search via CLI |
| `dev-cli-tools` | curated (dev.to, awesome-cli-apps) | `cli`, `devtools` | Essential CLI tools per stack |
| `agent-memory` | [awesome-opencode/agent-memory](https://github.com/joshuadavidthomas/opencode-agent-memory) | `memory`, `persistence` | Self-editable persistent memory blocks |
| `dynamic-context-pruning` | [awesome-opencode/dynamic-context-pruning](https://github.com/Tarquinen/opencode-dynamic-context-pruning) | `tokens`, `optimization` | Token optimization by pruning obsolete output |
| `opencode-mem` | [awesome-opencode/opencode-mem](https://github.com/tickernelz/opencode-mem) | `memory`, `vector` | Vector database persistent memory |
| `context-analysis` | [awesome-opencode/context-analysis](https://github.com/IgorWarzocha/Opencode-Context-Analysis-Plugin) | `tokens`, `analysis` | Detailed token usage and cost analysis |
| `opencode-roadmap` | [awesome-opencode/opencode-roadmap](https://github.com/IgorWarzocha/Opencode-Roadmap) | `planning`, `coordination` | Strategic roadmap and multi-agent coordination |
| `pocket-universe` | [awesome-opencode/pocket-universe](https://github.com/spoons-and-mirrors/pocket-universe) | `subagent`, `async` | Resilient async subagent pocket universes |
| `subtask2` | [awesome-opencode/subtask2](https://github.com/spoons-and-mirrors/subtask2) | `orchestration`, `tasks` | Advanced flow control and parallel execution |
| `tokenscope` | [awesome-opencode/tokenscope](https://github.com/ramtinJ95/opencode-tokenscope) | `tokens`, `cost` | Comprehensive token tracking and reporting |
| `shell-strategy` | [JRedeker/opencode-shell-strategy](https://github.com/JRedeker/opencode-shell-strategy) | `shell`, `terminal` | Non-TTY safe command execution |
| `handoff` | [joshuadavidthomas/opencode-handoff](https://github.com/joshuadavidthomas/opencode-handoff) | `session`, `continuity` | Cross-session handoff prompts |
| `opencode-snippets` | [JosXa/opencode-snippets](https://github.com/JosXa/opencode-snippets) | `prompts`, `productivity` | Inline text expansion with #snippets |
| `smart-title` | [Tarquinen/opencode-smart-title](https://github.com/Tarquinen/opencode-smart-title) | `session`, `organization` | Auto-generated session titles |
| `simple-memory` | [cnicolov/opencode-plugin-simple-memory](https://github.com/cnicolov/opencode-plugin-simple-memory) | `memory`, `git` | Git-versioned daily logfmt memory |
| `stop-slop` | [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | `writing`, `editing` | Remove AI writing patterns from prose |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `react`, `performance` | 70 React/Next.js performance rules |

---

## Subagents (specialist agents with dedicated models)

21 subagents adapted from [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode). Each runs on its optimal model and temperature. Invoke with `@name` in chat.

| Subagent | Model | Tier | Role |
|---|---|---|---|
| `frontend-jr` | DeepSeek V4 Flash | 🆓 | Simple components, markup, styles |
| `frontend-sr` | DeepSeek V4 Pro | 💰💰 | Complex frontend architecture, state, SSR |
| `accessibility-tester` | DeepSeek V4 Flash | 🆓 | WCAG compliance, accessibility auditing |
| `backend` | Qwen3.7 Plus | 💰 | REST APIs, business logic, auth |
| `db-optimizer` | DeepSeek V4 Flash | 🆓 | Query plans, indexes, schema design |
| `docker-expert` | DeepSeek V4 Flash | 🆓 | Multi-stage Dockerfiles, compose |
| `ci-pipeline` | DeepSeek V4 Flash | 🆓 | GitHub Actions, GitLab CI |
| `test-automator` | DeepSeek V4 Flash | 🆓 | Unit, integration, e2e tests |
| `code-reviewer` | GLM-5.1 | 💰 | PR review with structured checklist |
| `security-auditor` | DeepSeek V4 Pro | 💰💰 | IAM, encryption, compliance hardening |
| `performance-engineer` | GLM-5.2 | 💰💰 | Hot paths, N+1 queries, caching |
| `refactorer` | GLM-5.1 | 💰 | Behavior-preserving code refactoring |
| `error-detective` | DeepSeek V4 Flash | 🆓 | Stack trace analysis, error patterns |
| `api-designer` | DeepSeek V4 Flash | 🆓 | OpenAPI spec, schemas, versioning |
| `deployment-engineer` | DeepSeek V4 Flash | 🆓 | Rolling update, blue/green, canary |
| `kubernetes` | Qwen3.6 Plus | 💰 | K8s manifests, helm, cluster config |
| `terraform` | MiniMax M3 | 💰 | IaC with Terraform/OpenTofu |
| `migration` | DeepSeek V4 Flash | 🆓 | SQL migrations with rollback |
| `git-workflow` | DeepSeek V4 Flash | 🆓 | Branching strategies, conventional commits |
| `prompt-engineer` | MiMo-V2.5-Pro | 💰 | Prompt design, few-shot, CoT |
| `docs-writer` | DeepSeek V4 Flash | 🆓 | ADRs, changelogs, postmortems, READMEs |

---

## MCP Servers

| MCP | Source | Status | Use |
|-----|--------|--------|-----|
| `playwright` | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | ✅ Compatible | Browser automation via MCP |

### Incompatible / Requires Different Adaptation

| Tool | Source | Status | Reason |
|------|--------|--------|--------|
| `claude-mem` | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ❌ Claude Code-specific | Plugin system, hooks, and worker service exclusive to Claude Code |
| `interface-design plugin` | [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | ⚠️ Partial | Skill was ported, but `/plugin` commands and hooks don't exist in OpenCode |

---

## How to Use Skills

### Global Installation (all projects)

```bash
# Clone this repo
git clone https://github.com/your-user/agents-skills-for-opencode.git

# Copy skills to OpenCode global directory
cp -r .opencode/skills/* ~/.config/opencode/skills/

# Or for Claude compatibility
cp -r .opencode/skills/* ~/.claude/skills/
```

### Per-Project Installation

Copy the `.opencode/` folder to your project root:

```bash
cp -r .opencode/ /path/to/your/project/
```

OpenCode will auto-discover skills and agents on startup.

### Activating Default Instructions

This repo includes an `AGENTS.md` with general instructions that tell the agent to consider all available skills and subagents before handling requests. To activate it:

**If `opencode.json` doesn't exist in your project root, create it:**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"]
}
```

**If it already exists but lacks `instructions`, add the field:**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"],
  // ... existing fields
}
```

The `instructions` field accepts an array of file paths (relative to the config file). All referenced files are loaded into the system prompt before every request. You must restart opencode after changing config files.

### Using Subagents

Subagents are placed in `.opencode/agents/`. OpenCode reads them automatically. Invoke them in chat:

```
@docker-expert review this Dockerfile
@error-detective analyze this crash log
@code-reviewer review the latest PR
```

---

## Where to Find More Skills

### [skills.sh](https://skills.sh) — Central directory for AI agent skills

**skills.sh** is the official directory of skills compatible with OpenCode and 20+ other agents (Claude Code, Cursor, Cline, Copilot, etc).

**Quick install:**
```bash
npx skills add <owner/repo>
```

**Features:**
- Popular skills leaderboard
- Search by category (frontend, backend, cloud, etc)
- Multi-agent compatible
- Community-verified skills

**Popular skill collections:**
- `vercel-labs/agent-skills` — Vercel/React best practices
- `anthropics/skills` — Official Anthropic skills
- `obra/superpowers` — Debugging, TDD, brainstorming
- `microsoft/azure-skills` — Azure
- `expo/skills` — React Native/Expo
- `supabase/agent-skills` — PostgreSQL/Supabase

---

## Skill Details

### napkin — Persistent error memory

Maintains `.opencode/napkin.md` per repo with accumulated learnings across sessions. The agent reads and maintains it every session.

**Auto-activates every session.** After 3-5 sessions in the same project, behavior improves significantly.

**Generated file:** `.opencode/napkin.md`

---

### systematic-debugging — Methodical debugging

Enforces root cause investigation before any fix. Avoids the guess-and-check cycle that wastes hours.

**When to activate:** Any bug, test failure, unexpected behavior.

**Golden rule:** 3+ failed fixes without resolution means an architectural problem — don't attempt fix #4.

---

### test-driven-development — Rigorous TDD

Ensures no production code is written without a failing test first.

**When to activate:** Any new feature, bugfix, refactoring.

**Absolute rule:** Write test → watch fail → write code → watch pass.

---

### interface-design — Consistent UI with memory

Creates and maintains `system.md` with design decisions (spacing, colors, depth). Subsequent sessions load it automatically.

**When to activate:** Any UI work — dashboards, apps, admin panels.

**Generated file:** `.interface-design/system.md`

---

### finishing-a-branch — PR checklist

Ensures the branch is truly ready before creating a PR: tests, linting, commit history, no secrets, updated docs.

**When to activate:** Before creating any PR.

---

### firecrawl-web — Web scraping and search

Firecrawl CLI access for scraping, web search, URL mapping, and AI-powered research.

**Prerequisite:** `npm install -g firecrawl-cli && firecrawl login`

**When to activate:** When you need URL content, web research, or site crawling.

---

### dev-cli-tools — CLI tools guide for dev projects

Complete CLI reference organized by context: universal, per stack (Node, Python, Docker, APIs, Cloud) and per scenario. Includes install commands, useful aliases, and a new machine checklist.

**When to activate:**
- Setting up a new project environment
- User asks "what tools should I install?"
- Onboarding a new developer
- Recommending stack-specific tools

**Categories covered:**
- Git & versioning (`gh`, `lazygit`, `git-delta`)
- Search & navigation (`ripgrep`, `fd`, `fzf`, `bat`, `eza`, `zoxide`)
- Node.js (`fnm`, `pnpm`, `tsx`, `npm-check-updates`, `np`, `release-it`)
- Python (`uv`, `ruff`, `pyenv`, `httpie`, `rich`)
- Java/Spring Boot (`sdkman`, JDK Temurin, `mvnd`, `spring` CLI, `quarkus`, `jbang`, `flyway`)
- Docker/K8s (`lazydocker`, `k9s`, `ctop`, `dive`)
- APIs (`httpie`, `xh`, `hurl`, `websocat`, `curlie`)
- Databases (`pgcli`, `mycli`, `usql`)
- Cloud (`awscli`, `ngrok`, `mkcert`, `cloudflared`, `gitleaks`)
- Security (`gitleaks`, `trufflehog`, `age`, `op`)
- Data (`jq`, `fx`, `gron`, `dasel`, `visidata`)

---

### agent-memory — Self-editable persistent memory

Persistent, self-editable memory blocks inspired by Letta agents. Allows the agent to maintain memory across sessions and modify it during operation.

**When to activate:**
- Remembering information across multiple sessions
- Creating persistent notes or documentation
- Storing complex information that doesn't fit in napkin
- Building a knowledge base that grows over time

---

### dynamic-context-pruning — Context optimization

Optimizes token usage by eliminating obsolete tool outputs from conversation context, reducing token consumption while maintaining relevant context.

**When to activate:**
- Long conversations with many tool calls
- When token usage becomes a concern
- Maintaining performance while reducing costs
- Working with models with limited context windows

---

### opencode-mem — Vector memory system

Persistent memory system with vector database for long-term context retention across sessions, dual memory scopes, web interface, and auto-capture.

**When to activate:**
- Long-term context retention across sessions
- Complex projects requiring context retention
- Auto-capturing important information
- Searching historical context and decisions

---

### context-analysis — Context and token analysis

Detailed token usage analysis for AI sessions, helping understand consumption patterns, track costs, and identify optimization opportunities.

**When to activate:**
- Understanding token consumption patterns
- When cost monitoring becomes important
- Optimizing session efficiency
- Comparing approaches for token efficiency

---

### opencode-roadmap — Strategic planning

Strategic roadmap planning and multi-agent coordination with timeline management, milestone tracking, and resource allocation.

**When to activate:**
- Planning complex projects with multiple components
- Coordinating work across multiple agents or team members
- Visualizing project timelines and dependencies
- Managing resource allocation and capacity planning

---

### pocket-universe — Resilient async agents

Plugin that extends OpenCode's native subagent paradigm to provide resilient, async, closed-loop agents that can block main thread execution.

**When to activate:**
- Running long or complex tasks asynchronously
- Isolating risky operations in a controlled environment
- Creating closed systems that operate continuously
- When blocking main thread execution is needed for critical operations

---

### subtask2 — Advanced orchestration

Orchestration system extending OpenCode's `/commands` into a powerful system with granular flow control, parallel execution, and advanced error handling.

**When to activate:**
- Orchestrating complex multi-step workflows
- Granular control over execution flow and conditions
- Parallel execution of independent tasks
- Advanced error handling and recovery mechanisms

---

### tokenscope — Token analysis and cost tracking

Comprehensive token analysis and cost tracking for OpenCode sessions, offering detailed insights into usage patterns, provider costs, and optimization opportunities.

**When to activate:**
- Detailed token consumption pattern analysis
- When cost tracking and budget management is important
- Optimizing token usage across sessions
- Comparing costs across different AI providers

---

### shell-strategy — Non-interactive shell strategy

Teaches the agent to avoid interactive commands that hang in non-TTY environments. Includes non-interactive flags for npm, apt, git, pip, docker, and others.

**Tags:** `shell`, `terminal`, `reliability`

**When to activate:** Whenever the agent runs shell commands. Active globally.

---

### handoff — Session handoff

Creates focused continuity prompts for resuming work in a new session. Analyzes the conversation, extracts key decisions and relevant files, and generates a continuation prompt.

**Tags:** `session`, `continuity`, `memory`

**When to activate:** Before ending a long session or when switching context.

**Generated file:** `.opencode/handoff.md`

---

### opencode-snippets — Prompt snippets

Inline text expansion via `#snippet`. Create reusable, composable blocks with shell substitution (`` !`cmd` ``) and append/prepend blocks.

**Tags:** `prompts`, `productivity`, `composition`

**Directory:** `~/.config/opencode/snippet/*.md` or `.opencode/snippet/*.md`

---

### smart-title — Auto session titles

Generates descriptive session titles automatically using AI. Observes the conversation and updates the title when the agent becomes idle.

**Tags:** `session`, `organization`

**Config:** `.opencode/smart-title.jsonc`

---

### simple-memory — Git-versioned memory

Persistent memory based on daily logfmt files in `.opencode/memory/`. Can be committed to git for team visibility. Lightweight alternative to `opencode-mem`.

**Tags:** `memory`, `git`, `collaboration`

**Files:** `.opencode/memory/YYYY-MM-DD.logfmt`

**Types:** `decision`, `learning`, `preference`, `blocker`, `context`, `pattern`

---

### stop-slop — Remove AI writing patterns

Eliminates obvious AI-generated text markers: filler phrases, formulaic structures, passive voice, unnecessary adverbs, false agency, and "em dash reveals".

**Tags:** `writing`, `editing`, `docs`, `quality`

**When to activate:** When reviewing READMEs, docs, release notes, blog posts, commit messages.

---

### vercel-react-best-practices — React/Next.js performance

70 React and Next.js performance rules categorized by impact, maintained by Vercel. Covers waterfall elimination, bundle optimization, server-side performance, data fetching, re-renders, and JavaScript patterns.

**Tags:** `react`, `nextjs`, `performance`, `frontend`

**When to activate:** When writing, reviewing, or refactoring React/Next.js code.

---

## MCP: Playwright

Browser automation via MCP. Best for long agentic loops with persistent browser state.

**Installation:** See `mcp/README.md` for detailed instructions.

**Quick config** — add to project `opencode.json` or global `~/.config/opencode/opencode.json`:

```json
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest"],
      "enabled": true
    }
  }
}
```

---

## Repository Structure

```
agents-skills-for-opencode/
├── .opencode/
│   ├── agents/                        # 21 specialist subagents
│   │   ├── frontend-jr.md
│   │   ├── frontend-sr.md
│   │   ├── accessibility-tester.md
│   │   ├── backend.md
│   │   ├── db-optimizer.md
│   │   ├── docker-expert.md
│   │   ├── ci-pipeline.md
│   │   ├── test-automator.md
│   │   ├── code-reviewer.md
│   │   ├── security-auditor.md
│   │   ├── performance-engineer.md
│   │   ├── refactorer.md
│   │   ├── error-detective.md
│   │   ├── api-designer.md
│   │   ├── deployment-engineer.md
│   │   ├── kubernetes.md
│   │   ├── terraform.md
│   │   ├── migration.md
│   │   ├── git-workflow.md
│   │   ├── prompt-engineer.md
│   │   └── docs-writer.md
│   └── skills/
│       ├── manifest.json              # Index of all skills with tags and metadata
│       ├── adr-write/SKILL.md
│       ├── api-contract/SKILL.md
│       ├── changelog-generate/SKILL.md
│       ├── ci-pipeline/SKILL.md
│       ├── dependency-audit/SKILL.md
│       ├── deploy/SKILL.md
│       ├── docker-optimize/SKILL.md
│       ├── env-setup/SKILL.md
│       ├── error-triage/SKILL.md
│       ├── git-release/SKILL.md
│       ├── incident-postmortem/SKILL.md
│       ├── migration/SKILL.md
│       ├── napkin/SKILL.md
│       ├── systematic-debugging/SKILL.md
│       ├── test-driven-development/SKILL.md
│       ├── interface-design/SKILL.md
│       ├── finishing-a-branch/SKILL.md
│       ├── firecrawl-web/SKILL.md
│       │   └── commands.md
│       ├── dev-cli-tools/SKILL.md
│       ├── agent-memory/SKILL.md
│       ├── dynamic-context-pruning/SKILL.md
│       ├── opencode-mem/SKILL.md
│       ├── context-analysis/SKILL.md
│       ├── opencode-roadmap/SKILL.md
│       ├── pocket-universe/SKILL.md
│       ├── performance-profile/SKILL.md
│       ├── pr-review/SKILL.md
│       ├── shell-strategy/SKILL.md
│       ├── simple-memory/SKILL.md
│       ├── smart-title/SKILL.md
│       ├── stop-slop/SKILL.md
│       ├── subtask2/SKILL.md
│       ├── test-patterns/SKILL.md
│       ├── tokenscope/SKILL.md
│       └── vercel-react-best-practices/SKILL.md
├── mcp/
│   ├── playwright.json
│   └── README.md
├── docs/
│   ├── compatibility-notes.md
│   └── project-types-guide.md
└── README.md
```

---

## Contributing

Found a useful skill? Open a PR with:
1. The skill in `.opencode/skills/<name>/SKILL.md`
2. Correct frontmatter: `name`, `description`, `source`, `tags`, `scope`, `min_version`
3. Entry in `manifest.json`
4. Compatibility note in README

---

## References

- [OpenCode Skills Docs](https://opencode.ai/docs/skills/)
- [awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) — Official plugin catalog
- [obra/superpowers](https://github.com/obra/superpowers)
- [blader/napkin](https://github.com/blader/napkin)
- [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design)
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- [Firecrawl CLI Docs](https://docs.firecrawl.dev/sdks/cli)
- [JRedeker/opencode-shell-strategy](https://github.com/JRedeker/opencode-shell-strategy)
- [joshuadavidthomas/opencode-handoff](https://github.com/joshuadavidthomas/opencode-handoff)
- [JosXa/opencode-snippets](https://github.com/JosXa/opencode-snippets)
- [Tarquinen/opencode-smart-title](https://github.com/Tarquinen/opencode-smart-title)
- [cnicolov/opencode-plugin-simple-memory](https://github.com/cnicolov/opencode-plugin-simple-memory)
- [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode)

---

## Source Projects

The skills in this repository were adapted from:

### awesome-opencode (main collection)
- [tickernelz/opencode-mem](https://github.com/tickernelz/opencode-mem)
- [IgorWarzocha/Opencode-Context-Analysis-Plugin](https://github.com/IgorWarzocha/Opencode-Context-Analysis-Plugin)
- [IgorWarzocha/Opencode-Roadmap](https://github.com/IgorWarzocha/Opencode-Roadmap)
- [Tarquinen/opencode-dynamic-context-pruning](https://github.com/Tarquinen/opencode-dynamic-context-pruning)
- [Tarquinen/opencode-smart-title](https://github.com/Tarquinen/opencode-smart-title)
- [spoons-and-mirrors/pocket-universe](https://github.com/spoons-and-mirrors/pocket-universe)
- [spoons-and-mirrors/subtask2](https://github.com/spoons-and-mirrors/subtask2)
- [ramtinJ95/opencode-tokenscope](https://github.com/ramtinJ95/opencode-tokenscope)
- [joshuadavidthomas/opencode-agent-memory](https://github.com/joshuadavidthomas/opencode-agent-memory)
- [joshuadavidthomas/opencode-handoff](https://github.com/joshuadavidthomas/opencode-handoff)
- [JRedeker/opencode-shell-strategy](https://github.com/JRedeker/opencode-shell-strategy)
- [JosXa/opencode-snippets](https://github.com/JosXa/opencode-snippets)
- [cnicolov/opencode-plugin-simple-memory](https://github.com/cnicolov/opencode-plugin-simple-memory)
- [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)

### weisser-dev/awesome-opencode
- [weisser-dev/awesome-opencode](https://github.com/weisser-dev/awesome-opencode) — adr-write, api-contract, changelog-generate, ci-pipeline, dependency-audit, deploy, docker-optimize, env-setup, error-triage, git-release, incident-postmortem, migration, performance-profile, pr-review, test-patterns

### Other projects
- [obra/superpowers](https://github.com/obra/superpowers) — systematic-debugging, test-driven-development, finishing-a-branch
- [blader/napkin](https://github.com/blader/napkin) — napkin
- [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) — interface-design
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — playwright MCP
