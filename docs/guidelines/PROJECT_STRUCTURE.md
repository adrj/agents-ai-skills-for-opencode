---
title: Guia de Estrutura de Projetos
category: project
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Estrutura do ecossistema de projetos, repositórios, configuração de ambiente, portas e troubleshooting.
---

# Guia de Estrutura de Projetos

Este documento descreve a estrutura completa dos projetos, permitindo que uma IA ou desenvolvedor configure um ambiente idêntico.

---

## 1. Visão Geral

```
{{WORKSPACE_DIR}}/
├── {{DEVOPS_REPO}}/          # Scripts DevOps e infraestrutura
├── {{DOCS_REPO}}/            # Documentação centralizada
└── {{APPS}}/                 # Aplicações (monorepo ou individuais)
    └── {{APP_NAME}}/
        ├── backend/          # Backend
        └── frontend/         # Frontend
```

---

## 2. Estrutura de Documentação

Toda documentação de projeto é organizada por projeto:

```
{{DOCS_REPO}}/
├── docs/
│   ├── guidelines/               # Normas e padrões compartilhados
│   ├── logs/                     # Logs de sessão (LOG_SESSION_YYYY-MM-DD.md)
│   ├── projetos/
│   │   └── {{APP_NAME}}/
│   │       ├── adr/              # Decisões de arquitetura
│   │       ├── features/         # Documentos de features
│   │       ├── plan/             # Planos de execução
│   │       └── sprints/          # Planejamento de sprints
│   └── seed/                     # Dados iniciais (CSV, SQL, etc.)
```

---

## 3. Repositórios

| Repositório | URL | Descrição |
|-------------|-----|-----------|
| `{{DEVOPS_REPO}}` | {{DEVOPS_REPO_URL}} | Scripts DevOps e infraestrutura |
| `{{DOCS_REPO}}` | {{DOCS_REPO_URL}} | Documentação centralizada |
| `{{APP_REPO}}` | {{APP_REPO_URL}} | Aplicação principal |

---

## 4. Configuração do Ambiente

### 4.1 Clonar os Repositórios

```bash
# Criar diretório de trabalho
mkdir {{WORKSPACE_DIR}}
cd {{WORKSPACE_DIR}}

# Clonar repositórios
git clone {{DEVOPS_REPO_URL}}
git clone {{DOCS_REPO_URL}}
git clone {{APP_REPO_URL}}
```

### 4.2 Pré-requisitos

- Docker e Docker Compose
- {{BACKEND_LANG}} {{BACKEND_LANG_VERSION}}+ (para backends)
- Node.js 18+ (para frontends)
- npm ou yarn
- Git

---

## 5. Projetos

### 5.1 {{APP_NAME}}

**Descrição:** {{APP_DESCRIPTION}}

**Tecnologias:**
- Backend: {{BACKEND_FRAMEWORK}} {{BACKEND_FRAMEWORK_VERSION}}, {{BACKEND_LANG}} {{BACKEND_LANG_VERSION}}, {{DB_ENGINE}} {{DB_VERSION}}
- Frontend: {{FRONTEND_LIB}} {{FRONTEND_LIB_VERSION}}, {{FRONTEND_BUILD_TOOL}}, {{UI_LIBRARY}}

**Estrutura:**
```
{{APP_REPO}}/
├── backend/
│   └── {{BACKEND_MODULE}}/
│       ├── src/main/java/{{BASE_PACKAGE}}/
│       ├── src/main/resources/
│       │   ├── application.yaml
│       │   ├── application-development.yaml
│       │   └── db/migration/
│       ├── pom.xml
│       └── compose.yaml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   ├── styles/
    │   ├── main.tsx
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

**Portas:**
- Backend: {{BACKEND_PORT}}
- Frontend: {{FRONTEND_PORT}}
- {{DB_ENGINE}}: {{DB_PORT}}

---

## 6. Banco de Dados

### 6.1 {{DB_ENGINE}}

Cada projeto possui seu próprio banco de dados.

| Projeto | Banco | Usuário | Porta |
|---------|-------|---------|-------|
| {{APP_NAME}} | `{{DB_NAME}}` | `{{DB_USER}}` | {{DB_PORT}} |

### 6.2 Migrações

As migrações são gerenciadas pelo {{MIGRATION_TOOL}} e estão localizadas em:

```
backend/{{BACKEND_MODULE}}/src/main/resources/db/migration/
```

---

## 7. Scripts DevOps

### 7.1 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `devops start all` | Inicia todos os serviços |
| `devops start {{APP_NAME}}` | Inicia apenas a aplicação |
| `devops stop all` | Para todos os serviços |
| `devops status` | Mostra status dos serviços |
| `devops reset {{APP_NAME}}` | Reseta banco da aplicação |

### 7.2 Logs

Os logs são salvos em:

```
{{DEVOPS_REPO}}/scripts/logs/
```

---

## 8. Variáveis de Ambiente

O arquivo `.env` está localizado em `{{DEVOPS_REPO}}/.env`:

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `{{APP_NAME_UPPER}}_DB_PORT` | Porta {{DB_ENGINE}} | {{DB_PORT}} |
| `{{APP_NAME_UPPER}}_SERVER_PORT` | Porta Backend | {{BACKEND_PORT}} |
| `{{APP_NAME_UPPER}}_FRONTEND_PORT` | Porta Frontend | {{FRONTEND_PORT}} |

---

## 9. Inicialização

### 9.1 Backend

```bash
cd {{APP_REPO}}/backend/{{BACKEND_MODULE}}

# Executar
./mvnw spring-boot:run

# Compilar
./mvnw clean package

# Testes
./mvnw test
```

### 9.2 Frontend

```bash
cd {{APP_REPO}}/frontend

# Instalar dependências
npm install

# Executar desenvolvimento
npm run dev

# Build produção
npm run build

# Testes E2E
npm run test:e2e
```

---

## 10. Troubleshooting

### 10.1 Banco de Dados

Se o banco não iniciar corretamente:

```bash
cd {{APP_REPO}}/backend/{{BACKEND_MODULE}}
docker compose down -v
docker compose up -d
```

### 10.2 Portas em Uso

Verificar portas em uso:

```bash
# Linux/Mac
lsof -i :{{BACKEND_PORT}}

# Windows
netstat -ano | findstr ":{{BACKEND_PORT}}"
```

### 10.3 Dependências

Se houver problemas com dependências:

```bash
# Backend
cd backend/{{BACKEND_MODULE}}
mvn clean install

# Frontend
cd frontend
npm install
```

---

## 11. Referências

- `docs/guidelines/AI_GUIDELINES.md` — Guia geral para IAs
- `docs/guidelines/BACKEND_GUIDELINES.md` — Padrões backend
- `docs/guidelines/FRONTEND_GUIDELINES.md` — Padrões frontend
- `docs/guidelines/FEATURE_PLANNING_GUIDELINES.md` — Planejamento de features
- `docs/guidelines/LOG_SESSION_GUIDELINES.md` — Logs de sessão
