# agents-skills-to-opencode

Skills e MCPs mapeados para uso com [OpenCode](https://opencode.ai). Curado a partir dos melhores repositórios da comunidade, adaptados para o formato nativo do OpenCode.

---

## Avaliação: O que serve para OpenCode?

### Skills (compatíveis nativamente)

OpenCode suporta skills via `SKILL.md` com frontmatter YAML. As skills abaixo foram portadas e estão prontas para uso.

| Skill | Origem | Status | Uso |
|-------|--------|--------|-----|
| `napkin` | [blader/napkin](https://github.com/blader/napkin) | ✅ Compatível | Memória persistente de erros e aprendizados por repo |
| `systematic-debugging` | [obra/superpowers](https://github.com/obra/superpowers) | ✅ Compatível | Debugging metódico com investigação de causa raiz |
| `test-driven-development` | [obra/superpowers](https://github.com/obra/superpowers) | ✅ Compatível | TDD rigoroso — teste primeiro, sempre |
| `interface-design` | [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | ✅ Compatível | Design de UI com memória de decisões entre sessões |
| `finishing-a-branch` | [obra/superpowers](https://github.com/obra/superpowers) | ✅ Compatível | Checklist antes de criar PR |
| `firecrawl-web` | [firecrawl CLI](https://docs.firecrawl.dev/sdks/cli) | ✅ Compatível | Web scraping e pesquisa via CLI |
| `dev-cli-tools` | curado (dev.to, awesome-cli-apps) | ✅ Compatível | Guia de CLIs essenciais por stack — Git, Node, Python, Docker, APIs |

### MCP Servers

| MCP | Origem | Status | Uso |
|-----|--------|--------|-----|
| `playwright` | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | ✅ Compatível | Browser automation via MCP |

### Não compatíveis / requer adaptação diferente

| Ferramenta | Origem | Status | Motivo |
|------------|--------|--------|--------|
| `claude-mem` | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ❌ Específico Claude Code | Plugin system, hooks e worker service exclusivos do Claude Code. Sem equivalente direto no OpenCode. |
| `interface-design plugin` | [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | ⚠️ Parcial | A skill foi portada, mas os comandos `/plugin` e hooks do Claude Code não existem no OpenCode. |

---

## Como usar as Skills

### Instalação global (todas as ferramentas, todos os projetos)

```bash
# Clone este repo
git clone https://github.com/seu-usuario/agents-skills-to-opencode.git

# Copie as skills para o diretório global do OpenCode
cp -r .opencode/skills/* ~/.config/opencode/skills/
# ou para compatibilidade Claude
cp -r .opencode/skills/* ~/.claude/skills/
```

### Instalação por projeto

Copie a pasta `.opencode/` para a raiz do seu projeto:

```bash
cp -r .opencode/ /caminho/do/seu/projeto/
```

O OpenCode vai descobrir automaticamente as skills ao subir.

### Uso no OpenCode

O agente carrega skills sob demanda. Você pode solicitar explicitamente:

> "Use a skill systematic-debugging para investigar esse erro"

Ou deixar o agente escolher com base na descrição das skills disponíveis.

---

## Detalhes das Skills

### napkin — Memória persistente de erros

Mantém um arquivo `.opencode/napkin.md` por repo com aprendizados acumulados entre sessões. O agente lê e cuida do arquivo a cada sessão.

**Ativa automaticamente toda sessão.** Após 3-5 sessões no mesmo projeto, o comportamento melhora significativamente.

**Arquivo gerado:** `.opencode/napkin.md`

---

### systematic-debugging — Debugging metódico

Força investigação de causa raiz antes de qualquer fix. Evita o ciclo de tentativa-e-erro que desperdiça horas.

**Quando ativar:** Qualquer bug, falha de teste, comportamento inesperado.

**Regra de ouro:** Se tentou 3+ fixes sem resolver, é problema de arquitetura — não tente o fix #4.

---

### test-driven-development — TDD rigoroso

Garante que nenhum código de produção é escrito sem um teste falhando primeiro.

**Quando ativar:** Qualquer nova feature, bugfix, refatoração.

**Regra absoluta:** Escreva o teste → veja falhar → escreva código → veja passar.

---

### interface-design — UI consistente com memória

Cria e mantém um `system.md` com decisões de design (espaçamento, cores, profundidade). Sessões subsequentes carregam o sistema automaticamente.

**Quando ativar:** Qualquer trabalho de UI — dashboards, apps, admin panels.

**Arquivo gerado:** `.interface-design/system.md`

---

### finishing-a-branch — Checklist de PR

Garante que a branch está realmente pronta antes de criar PR: testes, linting, histórico de commits, sem secrets, documentação atualizada.

**Quando ativar:** Antes de criar qualquer PR.

---

### firecrawl-web — Web scraping e pesquisa

Acesso ao Firecrawl CLI para scraping, busca web, mapeamento de URLs e pesquisa com IA.

**Pré-requisito:** `npm install -g firecrawl-cli && firecrawl login`

**Quando ativar:** Quando precisar de conteúdo de URLs, pesquisa web, ou crawling de sites.

---

### dev-cli-tools — Guia de CLIs para projetos dev

Referência completa de CLIs organizadas por contexto: universais, por stack (Node, Python, Docker, APIs, Cloud) e por situação. Inclui comandos de instalação, aliases úteis e checklist de máquina nova.

**Quando ativar:**
- Ao configurar ambiente de um novo projeto
- Quando o usuário pergunta "que ferramentas instalar"
- Ao onboarding de um novo desenvolvedor
- Para recomendar ferramentas específicas por stack

**Categorias cobertas:**
- Git & versionamento (`gh`, `lazygit`, `git-delta`)
- Busca e navegação (`ripgrep`, `fd`, `fzf`, `bat`, `eza`, `zoxide`)
- Node.js (`fnm`, `pnpm`, `tsx`, `ncu`)
- Python (`uv`, `ruff`, `pyenv`)
- Java/Spring Boot (`sdkman`, JDK Temurin, `mvnd`, `spring` CLI, `quarkus`, `jbang`, `flyway`)
- Docker/K8s (`lazydocker`, `k9s`, `ctop`, `dive`)
- APIs (`httpie`, `xh`, `hurl`, `websocat`)
- Bancos de dados (`pgcli`, `mycli`, `usql`)
- Cloud (`awscli`, `ngrok`, `mkcert`, `cloudflared`)
- Segurança (`gitleaks`, `trufflehog`, `age`)
- Dados (`jq`, `fx`, `gron`, `dasel`, `visidata`)

---

## MCP: Playwright

Automação de browser via MCP. Melhor para loops agênticos longos com estado persistente.

**Instalação:** Veja `mcp/README.md` para instruções detalhadas.

**Configuração rápida** — adicione ao `opencode.json` do projeto ou ao global `~/.config/opencode/opencode.json`:

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

## Estrutura do Repositório

```
agents-skills-to-opencode/
├── .opencode/
│   └── skills/
│       ├── napkin/SKILL.md
│       ├── systematic-debugging/SKILL.md
│       ├── test-driven-development/SKILL.md
│       ├── interface-design/SKILL.md
│       ├── finishing-a-branch/SKILL.md
│       ├── firecrawl-web/SKILL.md
│       └── dev-cli-tools/SKILL.md
├── mcp/
│   ├── playwright.json
│   └── README.md
├── docs/
│   └── compatibility-notes.md
└── README.md
```

---

## Contribuindo

Encontrou uma skill útil? Abra um PR com:
1. A skill em `.opencode/skills/<nome>/SKILL.md`
2. Frontmatter correto com `name`, `description`, `source` nos metadata
3. Nota de compatibilidade no README

---

## Referências

- [OpenCode Skills Docs](https://opencode.ai/docs/skills/)
- [obra/superpowers](https://github.com/obra/superpowers)
- [blader/napkin](https://github.com/blader/napkin)
- [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design)
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- [Firecrawl CLI Docs](https://docs.firecrawl.dev/sdks/cli)
