---
title: Guia de Desenvolvimento para IAs
category: ai
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Orienta agentes de IA no processo de desenvolvimento, stack, arquitetura, convenções e fluxo de trabalho.
---

# Guia de Desenvolvimento para IAs

Este documento orienta agentes de IA no processo de desenvolvimento do projeto **{{PROJECT_NAME}}**, seguindo os padrões, arquiteturas e ferramentas definidas.

---

## 1. Visão Geral do Projeto

### 1.1 Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Backend | {{BACKEND_LANG}} {{BACKEND_LANG_VERSION}}, {{BACKEND_FRAMEWORK}} {{BACKEND_FRAMEWORK_VERSION}} |
| Banco de Dados | {{DB_ENGINE}} {{DB_VERSION}} |
| Migrações | {{MIGRATION_TOOL}} |
| API Docs | {{API_DOCS_TOOL}} |
| Frontend | {{FRONTEND_LIB}} {{FRONTEND_LIB_VERSION}}, {{FRONTEND_LANG}}, {{FRONTEND_BUILD_TOOL}} {{FRONTEND_BUILD_TOOL_VERSION}} |
| UI | {{UI_LIBRARY}} |
| Testes E2E | {{E2E_TOOL}} |

### 1.2 Estrutura de Diretórios

```
{{BACKEND_REPO}}/
└── {{BACKEND_MODULE}}/
    └── src/main/java/{{BASE_PACKAGE}}/
        ├── config/
        ├── {{APPLICATION_CLASS}}.java
        ├── generic/          # Componentes genéricos
        │   ├── domain/
        │   ├── infra/controller/
        │   └── infra/exception/
        └── [modulo]/       # Módulos funcionais
            ├── domain/
            ├── gateway/
            ├── application/
            └── infra/
                ├── persistence/
                ├── dto/
                └── web/

{{FRONTEND_REPO}}/
└── src/
    ├── services/
    ├── pages/
    ├── components/
    └── contexts/
```

---

## 2. Regras de Desenvolvimento

### 2.1 Padrão Backend (Clean Architecture)

Para cada novo módulo/entidade, seguir esta estrutura:

```
[modulo]/
├── domain/
│   └── [Nome]Entity.java
├── gateway/
│   └── [Nome]RepositoryGateway.java
├── application/
│   └── [Nome]Service.java
└── infra/
    ├── persistence/
    │   ├── [Nome]JpaRepository.java
    │   └── [Nome]RepositoryImpl.java
    ├── dto/
    │   ├── Create[Nome]Request.java
    │   └── [Nome]Response.java
    └── web/
        └── [Nome]Controller.java
```

### 2.2 Padrão Entity

Toda entidade deve estender a entidade base que fornece:
- `id` (UUID v7)
- `createdAt` (Instant)
- `updatedAt` (Instant)

### 2.3 Padrão Controller

Usar controller base para endpoints padrão com implementação dos métodos abstratos:
- `getResourceId()`
- `doFindById()`
- `doFindAll()`
- `doCreate()`
- `doUpdate()`
- `doDelete()`

### 2.4 Paginação

Todos os endpoints de listagem devem retornar `Page<T>` e suportar parâmetros:
- `page` (0-indexed)
- `size`
- `sort`

### 2.5 Soft Delete

Não excluir registros fisicamente. Usar status:
- `active` boolean
- `deactivate()` / `activate()` methods

### 2.6 Timestamps

Não gerenciar `createdAt` e `updatedAt` manualmente — a entidade base já cuida disso.

---

## 3. Convenções de Nomenclatura

| Tipo | Padrão | Exemplo |
|------|-------|---------|
| Entity | [Nome]Entity | UserEntity |
| Gateway | [Nome]RepositoryGateway | UserRepositoryGateway |
| Service | [Nome]Service | UserService |
| Controller | [Nome]Controller | UserController |
| JPA Repository | [Nome]JpaRepository | UserJpaRepository |
| Repository Impl | [Nome]RepositoryImpl | UserRepositoryImpl |
| Request DTO | Create[Nome]Request | CreateUserRequest |
| Response DTO | [Nome]Response | UserResponse |
| Migration | V[N]__[descricao].sql | V1__create_users_table.sql |
| Package | singular | user, product, order |

---

## 4. Fluxo de Desenvolvimento

### 4.1 Nova Entidade/Módulo

1. **Planejar**: Revisar documento de planejamento e sprints
2. **Criar migration**: `V[N]__create_[tabela]_table.sql`
3. **Criar Entity**: Em `[modulo]/domain/`
4. **Criar Gateway Interface**: Em `[modulo]/gateway/`
5. **Criar Service**: Em `[modulo]/application/`
6. **Criar JPA Repository**: Em `[modulo]/infra/persistence/`
7. **Criar Repository Impl**: Implementa Gateway
8. **Criar DTOs**: Request e Response
9. **Criar Controller**: REST endpoints
10. **Testar**: Verificar na API
11. **Documentar**: Atualizar docs

### 4.2 Nova Página/Feature Frontend

1. **Criar API Service**: `src/services/[modulo]Api.ts`
2. **Criar página listagem**: `src/pages/[Modulo]Page.tsx`
3. **Criar página cadastro**: `src/pages/Cadastro[Modulo]Page.tsx`
4. **Criar componentes específicos**: Se necessário
5. **Testar E2E**: Usar {{E2E_TOOL}}

---

## 5. Critérios de Qualidade

### 5.1 Código Limpo

- [ ] Nomes significativos
- [ ] Funções pequenas (SRP)
- [ ] Sem código comentado
- [ ] Comentários apenas quando necessário

### 5.2 Testes

- [ ] Testes unitários para entidades e services
- [ ] Testes E2E para fluxos principais
- [ ] Cobertura mínima: 70%

### 5.3 Documentação

- [ ] API Docs atualizada
- [ ] READMEs de módulos
- [ ] Docs de API

---

## 6. Skills e MCPs Disponíveis

### 6.1 Skills Carregadas

Usar as skills disponíveis para orientar o desenvolvimento:

- **grilling**: Entrevista implacável sobre planos e decisões (dispara automaticamente)
- **rfc-write**: Geração de especificações técnicas agnósticas a linguagem
- **quality-gate**: Catraca de qualidade — bloqueia regressão de métricas
- **domain-modeling**: Constrói e mantém CONTEXT.md com glossário de domínio
- **architecture-audit**: Auditoria de arquitetura para projetos existentes
- **systematic-debugging**: Para debugging de bugs
- **test-driven-development**: Para implementação via TDD
- **interface-design**: Para componentes UI
- **napkin**: Memória persistente do projeto
- **subtask2**: Orquestração de tarefas
- **opencode-roadmap**: Planejamento e milestones

### 6.2 MCPs Carregados

- **Playwright**: Para testes E2E
- **Firecrawl**: Para busca e scraping web

### 6.3 Como Usar as Skills

```bash
# Para debugging
/skill systematic-debugging

# Para TDD
/skill test-driven-development

# Para UI
/skill interface-design

# Para ver histórico do projeto
/skill napkin
```

---

## 7. Boas Práticas para IAs

1. **Sempre ler primeiro**: Antes de fazer alterações, entender a estrutura existente
2. **Seguir padrões**: Não inventar novos padrões — seguir os definidos
3. **Testar sempre**: Verificar funcionamento após implementar
4. **Documentar**: Atualizar documentação quando mudar algo
5. **Usar skills**: Carregar skills relevantes para a tarefa
6. **Commits pequenos**: Commits pequenos e frequentes com mensagens claras
7. **Mensagens de commit**: Usar Conventional Commits
   - `feat`: Nova funcionalidade
   - `fix`: Bugfix
   - `refactor`: Refatoração
   - `docs`: Documentação
   - `test`: Testes

---

## 8. Fluxo de Commits

```bash
# Verificar status
git status

# Adicionar arquivos
git add -A

# Commit com mensagem descritiva
git commit -m "feat(modulo): descrição curta

- Item realizado 1
- Item realizado 2"

# Push
git push origin main
```

---

## 9. Referências

- **BACKEND_GUIDELINES.md**: Padrões detalhados de backend
- **FRONTEND_GUIDELINES.md**: Padrões detalhados de frontend
- **BRANCHING_STRATEGY.md**: Estratégia de branches e versionamento
- **FEATURE_PLANNING_GUIDELINES.md**: Planejamento de features
- **LOG_SESSION_GUIDELINES.md**: Como documentar sessões
- **PROJECT_STRUCTURE.md**: Estrutura completa do ecossistema

---

*Este documento deve ser seguido por qualquer IA envolvida no desenvolvimento do projeto **{{PROJECT_NAME}}**.*
