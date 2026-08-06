---
name: monorepo-setup
description: Create a monorepo structure (backend, frontend, docs, devops) in the project root. Use when starting a new project, migrating from multiple repos to monorepo, or when the user mentions "monorepo", "estrutura", "estruturação", "setup". Handles both fresh projects and consolidation of existing repos.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [setup, monorepo, structure, scaffolding, backend, frontend]
metadata:
  source: Custom skill
  adapted-for: opencode
---

# Monorepo Setup

Cria estrutura monorepo padronizada no diretório raiz do projeto.

## Estrutura Alvo

```
{{PROJECT_NAME}}/
├── backend/
│   ├── src/
│   ├── tests/
│   ├── compose.yaml
│   ├── .env.example
│   ├── pom.xml | package.json | pyproject.toml | go.mod
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── README.md
├── docs/
│   ├── guidelines/          # Padrões de desenvolvimento
│   │   ├── AI_GUIDELINES.md
│   │   ├── BACKEND_GUIDELINES.md
│   │   ├── FRONTEND_GUIDELINES.md
│   │   ├── BRANCHING_STRATEGY.md
│   │   ├── LOG_SESSION_GUIDELINES.md
│   │   ├── PROJECT_STRUCTURE.md
│   │   ├── FEATURE_PLANNING_GUIDELINES.md
│   │   └── README.md
│   ├── rfc/                 # Especificações técnicas
│   ├── adr/                 # Decisões arquiteturais
│   ├── logs/                # Logs de sessão
│   └── audit/               # Auditorias
├── devops/
│   ├── docker/
│   │   ├── docker-compose.yaml
│   │   └── docker-compose.dev.yaml
│   ├── scripts/
│   │   └── start.sh | start.bat
│   ├── ci/
│   │   └── (copiar de .github/workflows/)
│   └── .env
├── .opencode/
│   ├── agents/
│   ├── skills/
│   └── package.json
├── .github/
│   ├── pull_request_template.md
│   └── workflows/
├── AGENTS.md
├── opencode.json
├── SKELETON.md
└── README.md
```

## Processo

### 1. Perguntar Stack

Pergunte ao usuário qual stack usar:

- **Backend**: Java/Spring, Python/FastAPI, Node.js, Go, .NET, PHP/Laravel
- **Frontend**: React/Vue/Angular/Next.js/Svelte
- **DB**: PostgreSQL, MySQL, SQLite, MongoDB
- **Banco de dados**: qual ORM/migration tool?

### 2. Criar Diretórios

```bash
mkdir -p backend/src backend/tests
mkdir -p frontend/src frontend/public
mkdir -p docs/{guidelines,rfc,adr,logs,audit}
mkdir -p devops/{docker,scripts,ci}
```

### 3. Inicializar Backend

Baseado na stack escolhida:

| Stack | Arquivo | Comando |
|-------|---------|---------|
| Java/Spring | `pom.xml` | Criar com `spring-boot-starter-*` |
| Python/FastAPI | `pyproject.toml` | Criar com `uv init` |
| Node.js/Express | `package.json` | Criar com `npm init` |
| Go | `go.mod` | Criar com `go mod init` |
| .NET | `*.csproj` | Criar com `dotnet new webapi` |

### 4. Inicializar Frontend

| Stack | Arquivo | Comando |
|-------|---------|---------|
| React+Vite | `package.json` | Criar com `npm create vite@latest` |
| Vue | `package.json` | Criar com `npm create vue@latest` |
| Angular | `angular.json` | Criar com `ng new` |
| Next.js | `package.json` | Criar com `create-next-app` |
| Svelte | `package.json` | Criar com `npm create svelte@latest` |

### 5. Configurar DevOps

- `docker-compose.yaml`: serviços do backend + banco
- `docker-compose.dev.yaml`: ambiente de desenvolvimento
- `scripts/start.sh`: script de inicialização
- `.env.example`: variáveis de ambiente

### 6. Copiar Guidelines

Copiar `~/.config/opencode/guidelines/` para `docs/guidelines/` e substituir placeholders `{{VARIAVEL}}` pelos valores da stack escolhida.

### 7. Configurar .opencode/

```bash
# Symlinks para config global
ln -sf ~/.config/opencode/agents .opencode/agents
ln -sf ~/.config/opencode/skills .opencode/skills
```

### 8. Criar Config

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"]
}
```

### 9. Criar .github/

Copiar PR template e CI workflow, adaptando para a stack escolhida.

## Caso Especial: Repos Separados

Se o usuário já tem repos separados (backend repo, frontend repo, docs repo):

1. Criar o monorepo como destino
2. Copiar conteúdo de cada repo para a pasta correspondente
3. **Docs**: mover para `docs/` (não para a raiz)
4. **DevOps**: mover scripts de infra para `devops/`
5. Consolidar `.github/` no monorepo
6. Manter histórico git: `git subtree` ou `git merge --allow-unrelated-histories`

## After Hook

Após criar a estrutura, rode:
1. `quality-gate` → congele baseline do novo projeto
2. `domain-modeling` → construa CONTEXT.md
3. Pergunte se quer customizar os placeholders dos guidelines
