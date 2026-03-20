# Notas de Compatibilidade

Análise detalhada de compatibilidade de cada ferramenta com OpenCode.

---

## claude-mem (thedotmack/claude-mem)

**Status: Não compatível**

**Por quê:** O claude-mem é um plugin system completo do Claude Code que depende de:
- Sistema de hooks do Claude Code (`/plugin install`, `SessionStart`, `PostToolUse`, etc.)
- Worker service próprio rodando na porta 37777 (Bun)
- Sistema `/plugin marketplace` exclusivo do Claude Code
- Integração com `claude agent-sdk`

O OpenCode não tem equivalente ao sistema de plugins do Claude Code. Não existe forma de portar o claude-mem sem reescrever toda a arquitetura.

**Alternativa para OpenCode:** A skill `napkin` (portada aqui) resolve o problema de memória persistente de forma mais simples — um arquivo markdown por repo que cresce com aprendizados.

---

## obra/superpowers skills

**Status: Compatível (com adaptação)**

**O quê funciona:** As skills são arquivos `SKILL.md` com frontmatter YAML — exatamente o formato que o OpenCode suporta. Foram portadas:
- `systematic-debugging`
- `test-driven-development`
- `finishing-a-branch`

**O que não funciona:**
- Referências cruzadas entre skills (`superpowers:test-driven-development`) não funcionam no OpenCode — o agente precisa carregar cada skill separadamente
- Alguns arquivos auxiliares (`root-cause-tracing.md`, `testing-anti-patterns.md`) foram omitidos por simplificação — podem ser adicionados como arquivos extras na pasta da skill

**Skills disponíveis no superpowers não portadas aqui:**
- `brainstorming` — pode ser portada diretamente
- `dispatching-parallel-agents` — relevante para OpenCode que tem Task tool
- `executing-plans` — portável
- `receiving-code-review` / `requesting-code-review` — portáveis
- `subagent-driven-development` — muito relevante para OpenCode
- `using-git-worktrees` — portável
- `verification-before-completion` — portável
- `writing-plans` — portável
- `writing-skills` — portável (meta-skill para criar novas skills)

---

## interface-design (Dammyjay93/interface-design)

**Status: Parcialmente compatível**

**O quê funciona:** A skill em si foi portada — o conteúdo de design system, decisões persistentes via `system.md`, e o workflow são completamente portáveis.

**O que não funciona:**
- Comandos `/interface-design:status`, `/interface-design:audit`, `/interface-design:extract` são comandos do Claude Code, não do OpenCode
- O sistema de plugins (`.claude-plugin/`) não existe no OpenCode
- Hooks automáticos de sessão não existem no OpenCode (a skill precisa ser ativada explicitamente)

**Workaround:** Solicite explicitamente ao agente: "Use a skill interface-design e carregue o system.md se existir".

---

## microsoft/playwright-mcp

**Status: Totalmente compatível**

O playwright-mcp é um MCP server padrão. O OpenCode suporta MCPs nativamente via `opencode.json`. A configuração é trivial.

A própria documentação do playwright-mcp já inclui exemplo para OpenCode:

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

**Nota importante da documentação do playwright-mcp:**
> Para coding agents, o Playwright CLI com SKILLS é mais eficiente em tokens que o MCP. O MCP é melhor para loops agênticos com estado persistente do browser.

---

## firecrawl CLI

**Status: Totalmente compatível**

A skill `firecrawl-web` ensina o agente a usar o CLI do Firecrawl. Não há dependências de sistema específicas do Claude Code.

**Pré-requisito:** O usuário precisa instalar e autenticar o CLI:
```bash
npm install -g firecrawl-cli
firecrawl login
```

---

## blader/napkin

**Status: Totalmente compatível (adaptada)**

A skill napkin original usa `.claude/napkin.md` — adaptamos para `.opencode/napkin.md` para seguir a convenção do OpenCode. O comportamento é idêntico.

**Diferença importante:** No Claude Code original, a skill era ativada automaticamente via hooks de sessão. No OpenCode, a skill precisa estar na lista de skills disponíveis e o agente a carrega sob demanda. A instrução "ativa toda sessão" no SKILL.md orienta o agente a sempre consultar o napkin, mas não há garantia técnica de automação como no Claude Code.

**Workaround:** Adicione ao seu `AGENTS.md` do projeto:
```markdown
Antes de começar qualquer tarefa, leia `.opencode/napkin.md` se existir.
```
