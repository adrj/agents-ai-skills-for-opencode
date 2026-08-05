---
title: Índice de Guidelines
category: meta
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Índice do diretório de guidelines — referência central para todos os padrões de desenvolvimento do projeto.
---

# Guidelines de Desenvolvimento

Este diretório contém os padrões, convenções e guias que regem o desenvolvimento de software no ecossistema **{{PROJECT_NAME}}**. Todos os documentos seguem o mesmo formato padronizado com frontmatter YAML.

---

## Índice de Documentos

| Documento | Categoria | Descrição |
|-----------|-----------|-----------|
| [AI_GUIDELINES.md](./AI_GUIDELINES.md) | `ai` | Guia principal para agentes de IA — stack, arquitetura, convenções e fluxo de trabalho |
| [BACKEND_GUIDELINES.md](./BACKEND_GUIDELINES.md) | `backend` | Padrões de backend — Clean Architecture, entities, gateways, services, controllers, DTOs, migrations |
| [FRONTEND_GUIDELINES.md](./FRONTEND_GUIDELINES.md) | `frontend` | Padrões de frontend — estrutura de diretórios, API services, páginas, autenticação, erros |
| [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md) | `process` | Estratégia de branches — Git Flow simplificado, Conventional Commits, PRs, versionamento |
| [LOG_SESSION_GUIDELINES.md](./LOG_SESSION_GUIDELINES.md) | `process` | Logs de sessão — formato de documentação de atividades de desenvolvimento |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | `project` | Estrutura do ecossistema — repositórios, configuração de ambiente, portas, troubleshooting |
| [FEATURE_PLANNING_GUIDELINES.md](./FEATURE_PLANNING_GUIDELINES.md) | `process` | Planejamento de features — documentos de feature, plano, sprint e checklist |

---

## Formato Padrão

Todos os documentos de guideline seguem uma estrutura consistente:

### Frontmatter YAML

```yaml
---
title: Título do Documento
category: backend | frontend | process | project | ai
version: 1.0.0
last_updated: YYYY-MM-DD
status: stable | draft | deprecated
summary: Descrição de uma linha do propósito do documento
---
```

### Estrutura do Corpo

- **Título principal** (`#`) com descrição breve do escopo
- **Seções numeradas** (`## 1.`, `## 2.`, etc.) com subtópicos (`### 1.1`)
- **Separadores** (`---`) entre seções principais
- **Tabelas** para dados estruturados (referência rápida)
- **Blocos de código** com linguagem especificada para exemplos
- **Placeholders** `{{VARIAVEL}}` para valores específicos do projeto
- **Referências cruzadas** entre documentos relacionados

---

## Como Usar Este Diretório

### Para Desenvolvedores

1. **Iniciando no projeto**: Leia `AI_GUIDELINES.md` e `PROJECT_STRUCTURE.md` primeiro
2. **Trabalhando no backend**: Consulte `BACKEND_GUIDELINES.md`
3. **Trabalhando no frontend**: Consulte `FRONTEND_GUIDELINES.md`
4. **Planejando features**: Siga `FEATURE_PLANNING_GUIDELINES.md`
5. **Versionando código**: Siga `BRANCHING_STRATEGY.md`
6. **Documentando sessões**: Use o template de `LOG_SESSION_GUIDELINES.md`

### Para IAs

Os agentes de IA devem:
1. Ler `AI_GUIDELINES.md` como ponto de partida
2. Consultar os documentos específicos conforme a tarefa
3. Seguir os placeholders `{{VARIAVEL}}` que serão substituídos pelos valores do projeto-alvo

### Adaptação para Novos Projetos

Este diretório de guidelines foi projetado como um **skeleton reutilizável**. Para usar em um novo projeto:

1. Substitua todos os placeholders `{{VARIAVEL}}` pelos valores do seu projeto
2. Ajuste exemplos de código para refletir seu stack tecnológico
3. Remova ou adapte seções que não se aplicam ao seu contexto
4. Mantenha o formato YAML e a estrutura de seções

Veja [`SKELETON.md`](../../SKELETON.md) na raiz do repositório para instruções completas.

---

## Categorias

| Categoria | Documentos | Propósito |
|-----------|-----------|-----------|
| `ai` | AI_GUIDELINES.md | Instruções para agentes de IA no desenvolvimento |
| `backend` | BACKEND_GUIDELINES.md | Padrões de código, arquitetura e API do servidor |
| `frontend` | FRONTEND_GUIDELINES.md | Padrões de código, componentes e UI do cliente |
| `process` | BRANCHING_STRATEGY.md, LOG_SESSION_GUIDELINES.md, FEATURE_PLANNING_GUIDELINES.md | Fluxos de trabalho, versionamento e documentação |
| `project` | PROJECT_STRUCTURE.md | Configuração do ambiente, repositórios e infraestrutura |

---

## Placeholders Disponíveis

Os seguintes placeholders são usados nos documentos e devem ser substituídos ao adaptar para um novo projeto:

| Placeholder | Descrição | Exemplo |
|-------------|-----------|---------|
| `{{PROJECT_NAME}}` | Nome do projeto/ecossistema | `Meu App` |
| `{{APP_NAME}}` | Nome da aplicação | `meu-app` |
| `{{APP_REPO}}` | Nome do repositório da aplicação | `meu-app-repo` |
| `{{BACKEND_LANG}}` | Linguagem do backend | `Java` |
| `{{BACKEND_LANG_VERSION}}` | Versão da linguagem | `21` |
| `{{BACKEND_FRAMEWORK}}` | Framework backend | `Spring Boot` |
| `{{BACKEND_FRAMEWORK_VERSION}}` | Versão do framework | `4.0.6` |
| `{{FRONTEND_LIB}}` | Biblioteca frontend | `React` |
| `{{FRONTEND_LIB_VERSION}}` | Versão da biblioteca | `19.x` |
| `{{FRONTEND_LANG}}` | Linguagem do frontend | `TypeScript` |
| `{{FRONTEND_BUILD_TOOL}}` | Build tool frontend | `Vite` |
| `{{UI_LIBRARY}}` | Biblioteca de componentes UI | `Material UI` |
| `{{DB_ENGINE}}` | Banco de dados | `PostgreSQL` |
| `{{DB_VERSION}}` | Versão do banco | `16` |
| `{{MIGRATION_TOOL}}` | Ferramenta de migração | `Flyway` |
| `{{E2E_TOOL}}` | Ferramenta de teste E2E | `Playwright` |
| `{{BASE_PACKAGE}}` | Pacote base do backend | `com.empresa.app` |
| `{{BACKEND_PORT}}` | Porta do servidor backend | `8080` |
| `{{FRONTEND_PORT}}` | Porta do servidor frontend | `5173` |
| `{{DB_PORT}}` | Porta do banco de dados | `5432` |

---

*Este índice é mantido como parte do skeleton de guidelines. Atualize ao adicionar, remover ou modificar documentos.*
