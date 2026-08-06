# SKELETON.md — Usando Este Projeto como Template

Este repositório foi projetado para servir como **skeleton reutilizável** — um ponto de partida completo para iniciar novos projetos com OpenCode.

---

## Instalação Rápida (Toda Máquina)

Para disponibilizar skills, agents e instruções para **todos os projetos** nesta máquina:

```bash
# Clone o skeleton
git clone https://github.com/adrj/agents-ai-skills-for-opencode.git ~/opencode-skeleton

# Sincronize skills (novas) e agents (refatorados) para o config global
cp -r ~/opencode-skeleton/.opencode/skills/grilling ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/grill-me ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/grill-with-docs ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/rfc-write ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/quality-gate ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/domain-modeling ~/.config/opencode/skills/
cp -r ~/opencode-skeleton/.opencode/skills/architecture-audit ~/.config/opencode/skills/
cp ~/opencode-skeleton/.opencode/agents/*.md ~/.config/opencode/agents/
cp ~/opencode-skeleton/AGENTS.md ~/.config/opencode/AGENTS.md
```

**Resultado**: skills e agents disponíveis globalmente. Qualquer projeto herda o fluxo spec-first + quality gate.

### Bootstrap de Novo Projeto (30 segundos)

```bash
# A partir de qualquer diretório
bash <(curl -s https://raw.githubusercontent.com/adrj/agents-ai-skills-for-opencode/master/bootstrap.sh) /caminho/do/projeto
```

Ou localmente:
```bash
~/.config/opencode/skeleton-bootstrap /caminho/do/projeto
```

**O que o script faz:**
- Cria `opencode.json` → aponta para `AGENTS.md`
- Cria `AGENTS.md` → árvore de decisão sistêmica
- Link simbólico `.opencode/agents` → global (sempre atualizado)
- Link simbólico `.opencode/skills` → global (sempre atualizado)
- Copia `.github/` → PR template + CI pipeline
- Copia `docs/guidelines/` → padrões de desenvolvimento

**O que o agente faz na primeira execução:**
1. Detecta `baseline.json` ausente → `quality-gate` (auto-audit + freeze)
2. Detecta `CONTEXT.md` ausente → `domain-modeling` (constrói glossário)
3. Projeto pronto para desenvolvimento spec-first

---

## O Que Este Skeleton Contém

```
agents-ai-skills-for-opencode/
├── .opencode/
│   ├── agents/             # 44 agentes especialistas (4 tiers de modelo)
│   ├── skills/             # 43 skills (incluindo grilling, rfc-write, quality-gate)
│   └── manifest.json       # Índice central de skills e metadados
├── docs/
│   └── guidelines/         # 7 documentos padronizados de desenvolvimento
│       ├── README.md       # Índice de guidelines
│       ├── AI_GUIDELINES.md
│       ├── BACKEND_GUIDELINES.md
│       ├── FRONTEND_GUIDELINES.md
│       ├── BRANCHING_STRATEGY.md
│       ├── LOG_SESSION_GUIDELINES.md
│       ├── PROJECT_STRUCTURE.md
│       └── FEATURE_PLANNING_GUIDELINES.md
├── mcp/
│   ├── playwright.json     # Configuração MCP Playwright
│   └── README.md
├── opencode.json           # Configuração do OpenCode
├── AGENTS.md               # Regras de delegação de agentes
└── SKELETON.md             # Este arquivo
```

---

## Como Usar em um Novo Projeto

### Passo 1: Copiar o Skeleton

```bash
# Clone este repositório como base
git clone https://github.com/adrj/agents-ai-skills-for-opencode.git meu-novo-projeto
cd meu-novo-projeto

# Remover o histórico git do skeleton (opcional)
rm -rf .git
git init
```

### Passo 2: Substituir Placeholders

Os documentos em `docs/guidelines/` usam placeholders no formato `{{VARIAVEL}}`. Substitua todos pelos valores do seu projeto:

| Placeholder | Substituir por |
|-------------|---------------|
| `{{PROJECT_NAME}}` | Nome do seu projeto/ecossistema |
| `{{APP_NAME}}` | Nome da aplicação (slug) |
| `{{APP_REPO}}` | Nome do repositório |
| `{{BACKEND_LANG}}` | Linguagem do backend (Java, Python, Go, etc.) |
| `{{BACKEND_FRAMEWORK}}` | Framework backend (Spring Boot, FastAPI, etc.) |
| `{{FRONTEND_LIB}}` | Biblioteca frontend (React, Vue, etc.) |
| `{{UI_LIBRARY}}` | Design system / UI library |
| `{{DB_ENGINE}}` | Banco de dados (PostgreSQL, MySQL, etc.) |
| `{{MIGRATION_TOOL}}` | Ferramenta de migração (Flyway, Alembic, etc.) |
| `{{E2E_TOOL}}` | Ferramenta de teste E2E (Playwright, Cypress, etc.) |
| `{{BASE_PACKAGE}}` | Pacote base do backend |
| `{{BACKEND_PORT}}` | Porta do servidor backend |
| `{{FRONTEND_PORT}}` | Porta do servidor frontend |
| `{{DB_PORT}}` | Porta do banco de dados |

**Comando rápido para substituir todos os placeholders de uma vez:**

```bash
# Adapte os valores abaixo para o seu projeto
PROJECT_NAME="Meu Projeto"
APP_NAME="meu-app"
APP_REPO="meu-app-repo"

find docs/guidelines/ -name "*.md" -exec sed -i \
  -e "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" \
  -e "s/{{APP_NAME}}/$APP_NAME/g" \
  -e "s/{{APP_REPO}}/$APP_REPO/g" \
  {} +
```

### Passo 3: Adaptar Exemplos de Código

Os documentos contêm exemplos de código ilustrativos (Java/React). Adapte-os para refletir seu stack real:

- **Backend**: Se usa Python/FastAPI em vez de Java/Spring, reescreva os exemplos de Entity, Service, Controller
- **Frontend**: Se usa Vue/Svelte em vez de React, adapte os exemplos de páginas e componentes
- **UI Library**: Substitua referências à biblioteca de componentes pela sua

### Passo 4: Ajustar Estrutura de Diretórios

Atualize `PROJECT_STRUCTURE.md` e diagramas de diretórios nos outros documentos para refletir a estrutura real do seu projeto.

### Passo 5: Configurar GitHub

O skeleton inclui arquivos de configuração do GitHub:

```
.github/
├── pull_request_template.md    # Template de PR com checklist de qualidade
└── workflows/
    └── ci.yml                  # Pipeline: lint → test → quality-gate
```

**Branch protection rules** (configurar manualmente no GitHub):

Em Settings → Branches → Add rule para `main` e `develop`:
- Require a pull request before merging
- Require approvals (mínimo 1)
- Require status checks to pass: `quality-gate`
- Do not allow bypassing the above settings

### Passo 6: Remover ou Adaptar Documentos

Nem todos os documentos se aplicam a todos os projetos:

| Se seu projeto... | Ação |
|-------------------|------|
| É apenas backend | Remova `FRONTEND_GUIDELINES.md` ou marque como `status: not-applicable` |
| É apenas frontend | Remova `BACKEND_GUIDELINES.md` ou marque como `status: not-applicable` |
| Não usa monorepo | Simplifique `PROJECT_STRUCTURE.md` |
| Usa stack diferente | Adapte `BACKEND_GUIDELINES.md` e `FRONTEND_GUIDELINES.md` |

---

## Workflow Padrão (Spec-First + Quality Gate)

Este skeleton implementa o fluxo **spec-first com quality gate**:

```
Usuário descreve feature nova
         │
         ▼
   [grilling] ← dispara automaticamente
   Entrevista implacável sobre plano/design
         │
         ▼
   [rfc-write] ← dispara automaticamente após grilling
   Gera especificação técnica agnóstica (docs/rfc/)
         │
         ▼
   [domain-modeling] ← atualiza CONTEXT.md durante o processo
         │
         ▼
   Implementação ← agentes seguem a spec como source of truth
         │
         ▼
   [quality-gate] ← dispara antes do commit
   Verifica métricas vs baseline, bloqueia regressões
         │
         ▼
   Commit + PR
```

### Para Projetos Existentes

```
   [architecture-audit]
   Escaneia código → relatório HTML de candidatos
         │
         ▼
   Usuário escolhe candidato
         │
         ▼
   [grilling] → entrevista focada no módulo
         │
         ▼
   [rfc-write] → gera RFCs retroativas
         │
         ▼
   [quality-gate] → congela baseline atual
```

### Modelos e Custos

| Etapa | O que faz | Modelo | Custo |
|-------|-----------|--------|-------|
| grilling | Entrevista sobre regras de negócio | Main agent | — |
| rfc-write | Orquestra → @spec-writer | Go Pro | Médio |
| quality-gate (script) | Coleta métricas | Zero AI | $0 |
| quality-gate (fix) | Corrige violações | @qa-engineer (Free) | $0 |
| refatoração complexa | Quebra arquivos, extrai módulos | @refactorer (Go Flash) | Baixo |
| code review final | Revisão de PR | @code-reviewer (Go Pro) | Médio |

---

## Estrutura de Guidelines

### Formato Padrão

Todos os documentos de guideline seguem uma estrutura consistente:

```yaml
---
title: Título do Documento
category: backend | frontend | process | project | ai
version: 1.0.0
last_updated: YYYY-MM-DD
status: stable | draft | deprecated
summary: Descrição de uma linha do propósito
---
```

### Categorias

| Categoria | Documentos | Quando usar |
|-----------|-----------|-------------|
| `ai` | AI_GUIDELINES.md | Sempre — guia principal para IAs |
| `backend` | BACKEND_GUIDELINES.md | Projetos com backend |
| `frontend` | FRONTEND_GUIDELINES.md | Projetos com frontend |
| `process` | BRANCHING_STRATEGY.md, LOG_SESSION_GUIDELINES.md, FEATURE_PLANNING_GUIDELINES.md | Qualquer projeto |
| `project` | PROJECT_STRUCTURE.md | Projetos multi-repositório |

---

## Componentes Reutilizáveis (Sem Modificação)

Estes componentes do skeleton são **genéricos e funcionam em qualquer projeto** sem necessidade de alteração:

| Componente | Descrição |
|------------|-----------|
| `.opencode/agents/` | 42 agentes especialistas cobrindo 30+ linguagens/frameworks |
| `.opencode/skills/` | 37 skills para debugging, TDD, CI/CD, docs, memória, etc. |
| `opencode.json` | Configuração base do OpenCode |
| `AGENTS.md` | Regras de delegação automática de agentes |
| `mcp/playwright.json` | Configuração MCP para testes E2E |

---

## Atualizando o Skeleton

Quando você melhora ou adiciona guidelines no seu projeto, considere contribuir de volta:

1. Generalize o conteúdo (remova detalhes específicos do seu projeto)
2. Use placeholders `{{VARIAVEL}}` para valores configuráveis
3. Mantenha o formato YAML padronizado
4. Atualize `docs/guidelines/README.md` se adicionar novos documentos

---

## Verificação Rápida

Após adaptar o skeleton para seu projeto, verifique:

- [ ] Todos os placeholders `{{VARIAVEL}}` foram substituídos
- [ ] Exemplos de código refletem seu stack real
- [ ] Estrutura de diretórios nos diagramas corresponde ao seu projeto
- [ ] Portas e variáveis de ambiente estão corretas
- [ ] Documentos não aplicáveis foram removidos ou marcados
- [ ] Links cruzados entre documentos funcionam
- [ ] `opencode.json` aponta para `AGENTS.md`
- [ ] `.opencode/` está presente na raiz do projeto

---

## Exemplo: Projeto React + FastAPI

Se você está iniciando um projeto com React + FastAPI + PostgreSQL, faria:

```bash
# 1. Copiar skeleton
git clone https://github.com/adrj/agents-ai-skills-for-opencode.git meu-app
cd meu-app

# 2. Substituir placeholders
find docs/guidelines/ -name "*.md" -exec sed -i \
  -e 's/{{PROJECT_NAME}}/Meu App/g' \
  -e 's/{{APP_NAME}}/meu-app/g' \
  -e 's/{{BACKEND_LANG}}/Python/g' \
  -e 's/{{BACKEND_FRAMEWORK}}/FastAPI/g' \
  -e 's/{{FRONTEND_LIB}}/React/g' \
  -e 's/{{UI_LIBRARY}}/Material UI/g' \
  -e 's/{{DB_ENGINE}}/PostgreSQL/g' \
  -e 's/{{MIGRATION_TOOL}}/Alembic/g' \
  {} +

# 3. Adaptar exemplos de código backend para Python/FastAPI
# 4. Ajustar estrutura de diretórios nos diagramas
# 5. Iniciar o projeto!
```

---

## Referências

- [OpenCode Docs](https://opencode.ai/docs/)
- [skills.sh](https://skills.sh) — Diretório central de skills para agentes de IA
- [awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) — Catálogo oficial de plugins
