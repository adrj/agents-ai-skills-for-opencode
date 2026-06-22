# Compatibility Notes

Detailed compatibility analysis of each tool with OpenCode.

---

## claude-mem (thedotmack/claude-mem)

**Status: Not compatible**

**Why:** claude-mem is a complete Claude Code plugin system that depends on:
- Claude Code hook system (`/plugin install`, `SessionStart`, `PostToolUse`, etc.)
- Its own worker service on port 37777 (Bun)
- Claude Code's exclusive `/plugin marketplace` system
- Integration with `claude agent-sdk`

OpenCode has no equivalent of the Claude Code plugin system. There is no way to port claude-mem without rewriting the entire architecture.

**OpenCode alternative:** The `napkin` skill (ported here) solves persistent memory more simply — a markdown file per repo that grows with learnings.

---

## obra/superpowers skills

**Status: Compatible (with adaptation)**

**What works:** The skills are `SKILL.md` files with YAML frontmatter — exactly the format OpenCode supports. Ported:
- `systematic-debugging`
- `test-driven-development`
- `finishing-a-branch`

**What doesn't work:**
- Cross-references between skills (`superpowers:test-driven-development`) don't work in OpenCode — the agent must load each skill separately
- Some auxiliary files (`root-cause-tracing.md`, `testing-anti-patterns.md`) were omitted for simplicity — can be added as extra files in the skill folder

**Superpowers skills not yet ported:**
- `brainstorming` — directly portable
- `dispatching-parallel-agents` — relevant for OpenCode's Task tool
- `executing-plans` — portable
- `receiving-code-review` / `requesting-code-review` — portable
- `subagent-driven-development` — very relevant for OpenCode
- `using-git-worktrees` — portable
- `verification-before-completion` — portable
- `writing-plans` — portable
- `writing-skills` — portable (meta-skill for creating new skills)

---

## interface-design (Dammyjay93/interface-design)

**Status: Partially compatible**

**What works:** The skill itself was ported — the design system content, persistent decisions via `system.md`, and the workflow are fully portable.

**What doesn't work:**
- `/interface-design:status`, `/interface-design:audit`, `/interface-design:extract` are Claude Code commands, not OpenCode commands
- The plugin system (`.claude-plugin/`) doesn't exist in OpenCode
- Automatic session hooks don't exist in OpenCode (skill must be activated explicitly)

**Workaround:** Explicitly ask the agent: "Use the interface-design skill and load system.md if it exists."

---

## microsoft/playwright-mcp

**Status: Fully compatible**

playwright-mcp is a standard MCP server. OpenCode supports MCPs natively via `opencode.json`. Configuration is trivial.

The playwright-mcp docs already include an OpenCode example:

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

**Important note from playwright-mcp docs:**
> For coding agents, the Playwright CLI with SKILLS is more token-efficient than MCP. MCP is better for long agentic loops with persistent browser state.

---

## firecrawl CLI

**Status: Fully compatible**

The `firecrawl-web` skill teaches the agent to use the Firecrawl CLI. No Claude Code-specific dependencies.

**Prerequisite:** User must install and authenticate CLI:
```bash
npm install -g firecrawl-cli
firecrawl login
```

---

## blader/napkin

**Status: Fully compatible (adapted)**

The original napkin skill uses `.claude/napkin.md` — we adapted it to `.opencode/napkin.md` to follow OpenCode conventions. Behavior is identical.

**Key difference:** In the original Claude Code, the skill activated automatically via session hooks. In OpenCode, the skill must be in the available skills list and the agent loads it on demand. The "auto-activates every session" instruction in SKILL.md guides the agent to always check the napkin, but there's no technical automation guarantee like Claude Code.

**Workaround:** Add to your project's `AGENTS.md`:
```markdown
Before starting any task, read `.opencode/napkin.md` if it exists.
```
