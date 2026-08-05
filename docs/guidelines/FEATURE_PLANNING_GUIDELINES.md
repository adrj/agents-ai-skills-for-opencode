---
title: Guia de Planejamento de Features
category: process
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Processo padrão para planejamento de funcionalidades com documentos de feature, plano, sprint e checklist.
---

# Guia de Planejamento de Features

Este documento define o processo padrão para planejamento de novas funcionalidades, cobrindo arquitetura backend, design frontend e alinhamento com os padrões do projeto.

---

## 1. Estrutura de Documentos

Toda documentação de um projeto fica no diretório do projeto:

```
docs/projetos/{{APP_NAME}}/
├── adr/                    # Decisões de arquitetura
│   └── ADR-NNNN-[Slug].md
├── features/
│   └── FEATURE_NN_[Nome].md
├── plan/
│   └── PLANO_[Nome].md
└── sprints/
    └── SPRINT_NN_[Nome].md
```

Diretórios de nível superior (`docs/`) são reservados para conteúdo transversal:
- `docs/guidelines/` — normas e padrões compartilhados
- `docs/logs/` — logs de sessão (ver `LOG_SESSION_GUIDELINES.md`)

### 1.1 ADR (Decisão de Arquitetura)

Toda decisão arquitetural significativa gera um ADR. Nome: `ADR-NNNN-[Slug].md` com numeração sequencial. Formato padrão:

- **Status:** `Proposed` | `Accepted` | `Deprecated` | `Superseded by ADR-NNNN`
- **Contexto** — forças e restrições que motivam a decisão
- **Decisão** — o que foi escolhido e como
- **Consequências** — positivas, negativas e neutras
- **Alternativas Consideradas** — com motivo de rejeição

Manter o índice `adr/README.md` de cada projeto atualizado. Decisões que afetam vários projetos são documentadas no projeto dono da mudança, com referências cruzadas.

---

## 2. Documento de Feature

### 2.1 Cabeçalho

```markdown
# Feature NN — [Nome da Feature]

**Projeto:** {{APP_REPO}}
**Versão:** X.Y.Z
**Data:** YYYY-MM-DD
**Status:** PLANEJADA | EM_ANDAMENTO | CONCLUIDA
```

### 2.2 Seções Obrigatórias

| Seção | Conteúdo |
|---|---|
| **Contexto** | Problema atual e solução proposta |
| **Escopo** | O que será e o que NÃO será implementado |
| **Layout/Design** | Mockup visual (se frontend), diagrama de tela, posição na página |
| **Dados** | API endpoints, modelos, contratos |
| **Regras de Negócio** | Tabela RN-XX com cada regra |
| **Critérios de Aceite** | Checklist de validação |
| **Estimativa** | Tabela de tarefas com horas |

---

## 3. Documento de Plano

### 3.1 Cabeçalho

```markdown
# Plano de Execução — [Nome da Feature]

**Projeto:** {{APP_REPO}}
**Feature:** FEATURE_NN_[Nome]
**Data:** YYYY-MM-DD
**Status:** PLANEJADO
```

### 3.2 Seções Obrigatórias

| Seção | Conteúdo |
|---|---|
| **Visão Geral** | Objetivo e escopo resumido |
| **Arquitetura** | Diagrama de componentes (backend e frontend), fluxo de dados |
| **Cronograma** | Fases com durações |
| **Design Tokens** | Variáveis CSS, cores, fontes, espaçamentos (se frontend) |
| **Resoluções Responsivas** | Breakpoints e comportamentos (se frontend) |
| **Dependências** | Bibliotecas, APIs, serviços externos |
| **Riscos** | Tabela com risco, impacto e mitigação |

### 3.3 Diagrama de Componentes

Usar ASCII art para representar a hierarquia:

```
PaginaPrincipal.tsx
├── ComponenteA
│   ├── SubComponenteA1
│   └── SubComponenteA2
├── ComponenteB
└── ComponenteC
```

### 3.4 Fluxo de Dados

```
Componente X
  │
  ├─ useEffect → API.getData()
  │                │
  │                ├─ sucesso → setState(data)
  │                └─ erro    → fallback
  │
  └─ render → state → subcomponentes
```

---

## 4. Documento de Sprint

### 4.1 Cabeçalho

```markdown
# Sprint N — [Nome da Sprint]

**Projeto:** {{APP_REPO}}-frontend | {{APP_REPO}}-backend
**Feature:** FEATURE_NN_[Nome]
**Duração:** X horas
**Data:** YYYY-MM-DD
**Status:** PLANEJADA
```

### 4.2 Tarefas

Cada tarefa deve ter ID, descrição e horas. Agrupar por fase:

```markdown
### 2.1 Setup (0.5h)

| ID | Tarefa | Horas |
|---|---|---|
| F6.01 | Instalar dependência X | 0.1h |
| F6.02 | Configurar módulo Y | 0.2h |
```

### 4.3 Dados Mock

Incluir dados de exemplo quando necessário:

```js
const MOCK_DATA = [
  { id: 1, title: 'Exemplo', ... },
];
```

### 4.4 Estrutura de Arquivos

Listar todos os arquivos que serão criados ou modificados:

```
src/
├── components/
│   └── NovoComponente.tsx    ← NOVO
├── pages/
│   └── PaginaExistente.tsx    ← MODIFICADO
└── index.css                  ← MODIFICADO
```

### 4.5 Critérios de Conclusão

Checklist final de validação.

---

## 5. Design Tokens e Temas

### 5.1 Design Tokens

Sempre usar variáveis CSS/tokens do design system em vez de valores hardcoded:

| Contexto | Usar | Não usar |
|---|---|---|
| Cor primária | `var(--color-primary, #1351b4)` | `#1351b4` direto |
| Cor primária escura | `var(--color-primary-darken-01, #0c326f)` | `#0c326f` direto |
| Fundo claro | `var(--background-lightest, #f8f8f8)` | `#f8f8f8` direto |
| Borda | `var(--border-color, #e5e5e5)` | `#e5e5e5` direto |
| Texto | `var(--color, #333)` | `#333` direto |
| Fonte | `var(--font-family-base)` (herdado) | Fonte direto no componente |
| Espaçamento | `var(--spacing-scale-2x, 16px)` | `16px` direto |

### 5.2 Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary-default` | `#1351b4` | Botões, links, elementos interativos |
| `--color-primary-darken-01` | `#0c326f` | Texto de links, hover escuro |
| `--color-primary-lighten-01` | `#2670e8` | Hover de botões primários |
| `--color-primary-pastel-01` | `#c5d4eb` | Backgrounds suaves |
| `--pure-0` | `#ffffff` | Branco |
| `--gray-2` | `#f8f8f8` | Fundo de inputs, seções |
| `--gray-20` | `#cccccc` | Borda, elementos desabilitados |
| `--gray-60` | `#717171` | Texto secundário |
| `--gray-80` | `#333333` | Texto principal |

---

## 6. Arquitetura Backend

### 6.1 Estrutura de Pacotes (Clean Architecture)

```
{{BASE_PACKAGE}}/
├── config/                  # Configurações
├── [modulo]/
│   ├── domain/              # Entidades
│   │   └── [Nome]Entity.java
│   ├── gateway/             # Interfaces de repositório
│   │   └── [Nome]RepositoryGateway.java
│   ├── application/         # Serviços (lógica de negócio)
│   │   └── [Nome]Service.java
│   └── infra/
│       ├── persistence/     # Implementações de persistência
│       │   ├── [Nome]JpaRepository.java
│       │   └── [Nome]RepositoryImpl.java
│       ├── dto/             # Request/Response DTOs
│       │   ├── Create[Nome]Request.java
│       │   └── [Nome]Response.java
│       └── web/             # Controllers REST
│           └── [Nome]Controller.java
└── generic/                 # Componentes reutilizáveis
    ├── domain/
    │   └── AbstractEntity.java
    └── infra/
        ├── controller/
        │   └── AbstractCrudController.java
        └── exception/
            └── GlobalExceptionHandler.java
```

### 6.2 Convenções

| Elemento | Padrão |
|---|---|
| Entidade | Estender entidade base (UUID v7, createdAt, updatedAt) |
| Controller | Estender controller base para CRUD padrão |
| Paginação | Retornar `Page<T>`, parâmetros `page`, `size`, `sort` |
| Soft Delete | Campo `active`, métodos `activate()`/`deactivate()` |
| Migração | `V[N]__[descricao].sql` |
| Endpoint público | Prefixo `/api/public/` |
| Endpoint autenticado | Prefixo `/api/[recurso]/` |

### 6.3 Segurança

- Anotações de autorização em endpoints de mutação
- `@Valid` em todos os `@RequestBody`
- CORS configurado com origins explícitas
- Rate limiting em endpoints de auth
- Secrets via variáveis de ambiente (nunca hardcoded)

---

## 7. Arquitetura Frontend

### 7.1 Estrutura de Diretórios

```
src/
├── components/              # Componentes reutilizáveis
├── pages/                   # Páginas (uma por rota)
├── features/                # Módulos com pages + components + hooks
│   └── [feature]/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       └── services/
├── services/                # Chamadas de API
├── hooks/                   # Hooks compartilhados
├── contexts/                # Contextos React (se necessário)
├── index.css                # Estilos globais
├── main.tsx                 # Ponto de entrada
└── App.tsx                  # Rotas + layout
```

### 7.2 Padrão de Componentes

Prefira **smart-card / dumb-page** para fluxos de formulário:

```tsx
// LoginPage.tsx — thin wrapper (dumb page)
export default function LoginPage() {
  return <LoginCard />;
}

// LoginCard.tsx — smart card (lógica interna)
export default function LoginCard() {
  const [email, setEmail] = useState('');
  // ... toda a lógica aqui
  return <div className="card">...</div>;
}
```

Para componentes de exibição, prefira **props puras**:

```tsx
export default function LinkCard({ link, onAccess }: Props) { ... }
```

### 7.3 Responsividade

| Breakpoint | Alvo | Comportamento |
|---|---|---|
| < 576px | Mobile | 1-2 colunas, swipe |
| 576px – 767px | Tablet pequeno | 2-3 colunas |
| 768px – 1279px | Tablet/Desktop | 4-6 colunas |
| ≥ 1280px | Desktop | 7-8 colunas, largura máxima definida |

---

## 8. Checklist de Planejamento

Antes de iniciar a implementação, verificar:

### 8.1 Design e UX

- [ ] Layout alinhado com o design system (componentes nativos, tokens)
- [ ] Cores usam variáveis CSS, não valores hardcoded
- [ ] Fontes herdam token de fonte base
- [ ] Ícones padronizados (biblioteca definida)
- [ ] Responsivo nos breakpoints definidos
- [ ] Estados cobertos: loading, empty, error, success

### 8.2 Backend

- [ ] Endpoints planejados com prefixo `/api/`
- [ ] Autenticação: endpoints públicos vs autenticados
- [ ] Entidades estendem entidade base
- [ ] Controllers estendem controller base quando aplicável
- [ ] Paginação configurada
- [ ] DTOs separados (Request/Response)
- [ ] Migrations nomeadas `V[N]__descricao.sql`

### 8.3 Documentação

- [ ] Feature documentada em `features/FEATURE_NN_Nome.md`
- [ ] Plano documentado em `plan/PLANO_Nome.md`
- [ ] Sprint documentada em `sprints/SPRINT_NN_Nome.md`
- [ ] Dados mock incluídos no documento de sprint
- [ ] Estrutura de arquivos listada (novos + modificados)
- [ ] Estimativa de horas por tarefa

### 8.4 Qualidade

- [ ] Dependências justificadas (evitar bibliotecas desnecessárias)
- [ ] Build sem erros previsto
- [ ] Sem inline styles (usar classes CSS)
- [ ] Sem CSS duplicado
- [ ] `package.json` versionado corretamente

---

## 9. Template Rápido

```markdown
# Feature NN — [Nome]

**Projeto:** {{APP_REPO}} | **Data:** YYYY-MM-DD | **Status:** PLANEJADA

## Contexto
[1 parágrafo]

## Escopo
| Incluso | Não incluso |
|---|---|

## Layout
[ASCII art ou descrição]

## API
| Método | Endpoint | Descrição |
|---|---|---|

## Regras
| ID | Regra |
|---|---|

## Estimativa
| Fase | Horas |
|---|---|
| **Total** | Xh |

## Critérios
- [ ] item
```

---

## 10. Referências

- `docs/guidelines/AI_GUIDELINES.md` — Padrões gerais para IAs
- `docs/guidelines/BACKEND_GUIDELINES.md` — Padrões backend (Clean Architecture)
- `docs/guidelines/FRONTEND_GUIDELINES.md` — Padrões frontend
- `docs/guidelines/BRANCHING_STRATEGY.md` — Estratégia de branches e versionamento
- `docs/guidelines/LOG_SESSION_GUIDELINES.md` — Como documentar sessões
