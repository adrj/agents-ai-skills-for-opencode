---
title: Guia de Logs de Sessão
category: process
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Formato padronizado para documentação de sessões de desenvolvimento com cabeçalho, atividades, commits e resumo.
---

# Guia de Logs de Sessão

Este documento define o padrão para criação de logs de sessão de desenvolvimento.

---

## 1. Localização

Todos os logs devem ser salvos em:

```
docs/logs/
```

## 2. Nomenclatura

```
LOG_SESSION_YYYY-MM-DD.md
```

- Prefixo fixo: `LOG_SESSION_`
- Data no formato ISO 8601 (ano-mês-dia)
- Extensão: `.md`

**Exemplo:** `LOG_SESSION_2026-07-30.md`

---

## 3. Cabeçalho Obrigatório

```markdown
# Log de Sessão — [Projeto Principal]

**Data:** YYYY-MM-DD
**Operador:** Nome Completo (email@dominio)
**Ferramenta:** OpenCode (vX.Y.Z)
**Projetos:** projeto-a, projeto-b, projeto-c
```

| Campo | Descrição |
|---|---|
| **Data** | Data da sessão (ISO 8601) |
| **Operador** | Nome e email do responsável |
| **Ferramenta** | IDE/ferramenta de IA utilizada |
| **Projetos** | Repositórios envolvidos, separados por vírgula |

---

## 4. Estrutura de Seções

### 4.1 Agrupamento por Atividade

Cada seção deve representar uma atividade ou tema distinto. Usar numeração sequencial:

```markdown
## 1. [Nome da Atividade]

### 1.1 [Sub-atividade]

**Contexto:** [breve descrição do problema ou objetivo]

- Item da ação realizada
- Outro item

| Header | Header |
|---|---|
| dado | dado |
```

### 4.2 Tabela de Commits

Sempre que houver múltiplos commits, usar tabela padronizada:

```markdown
| Repo | Commit | Descrição |
|---|---|---|
| projeto-x | `abc1234` | feat: descrição curta |
| projeto-x | `def5678` | fix: correção de bug |
```

### 4.3 Resumo Final

Ao final do log, incluir seção de resumo consolidando todos os commits:

```markdown
## N. Resumo de Commits — [Projeto] (YYYY-MM-DD)

| # | Commit | Descrição |
|---|---|---|
| 1 | `abc1234` | feat: descrição |
| 2 | `def5678` | fix: descrição |

**Total:** X commits
```

---

## 5. Tipos de Atividades e Conteúdo Sugerido

| Tipo de Atividade | Conteúdo Esperado |
|---|---|
| **Bugfix** | Problema encontrado, causa raiz, arquivos modificados, solução |
| **Nova Feature** | Contexto, escopo, componentes/arquivos criados, API/endpoints |
| **Refatoração** | Motivo, antes/depois, arquivos impactados |
| **Configuração** | Variáveis alteradas, arquivos de config, ambiente afetado |
| **Documentação** | Documentos criados/atualizados, localização |
| **Planejamento** | Decisões arquiteturais, estimativas, riscos |
| **Sincronização** | Repositórios sincronizados, conflitos resolvidos |
| **Segurança** | Vulnerabilidade encontrada, severidade, correção |

---

## 6. Boas Práticas

### 6.1 Organização

- Agrupar atividades relacionadas na mesma seção
- Ordenar seções cronologicamente conforme execução
- Usar sub-seções (`### 1.1`) para detalhamento

### 6.2 Commits

- Referenciar sempre o hash curto (`abc1234`)
- Incluir o nome do repositório quando houver múltiplos
- Listar commits em ordem cronológica inversa (mais recente primeiro)

### 6.3 Clareza

- Descrever o "por que" além do "o que"
- Incluir trechos de código apenas quando essenciais para compreensão
- Usar diagramas ASCII para estrutura de componentes ou fluxos
- Evitar jargões sem explicação

### 6.4 Consistência

- Manter mesmo formato entre sessões
- Usar mesma nomenclatura de projetos
- Reutilizar estruturas de tabela padronizadas

---

## 7. Template

```markdown
# Log de Sessão — [Projeto Principal]

**Data:** YYYY-MM-DD
**Operador:** Nome Completo (email@dominio)
**Ferramenta:** OpenCode (vX.Y.Z)
**Projetos:** projeto-a, projeto-b

---

## 1. [Atividade Principal]

### 1.1 [Sub-atividade]

**Contexto:** [breve descrição]

- Ação realizada
- Resultado obtido

| Repo | Commit | Descrição |
|---|---|---|
| projeto-x | `abc1234` | feat: descrição |

---

## 2. Resumo de Commits — [Projeto] (YYYY-MM-DD)

| # | Commit | Descrição |
|---|---|---|
| 1 | `abc1234` | feat: descrição |

**Total:** X commits

---

*Fim da sessão — YYYY-MM-DD.*
```

---

## 8. Exemplos

### Exemplo 1 — Bugfix

```markdown
## 3. Correção de NPE no AuthService

**Problema:** `NullPointerException` ao buscar registro sem email cadastrado.

**Causa raiz:** Método `findByEmail()` retornava `null` e o código não tratava esse caso.

**Correção em `AuthService.java`:**
- Adicionado `Optional.ofNullable()` no retorno de `findByEmail()`
- Fallback para valor padrão quando registro não encontrado

| Repo | Commit | Descrição |
|---|---|---|
| meu-projeto | `dfdaa72` | fix: NPE ao buscar registro sem email |
```

### Exemplo 2 — Nova Feature

```markdown
## 5. Carrossel de Itens em Destaque

**Contexto:** Portal público não destacava itens mais acessados.

**Arquivos criados:**
- `FeaturedCarousel.tsx` — Carrossel com cards
- `FeaturedCard.tsx` — Card individual (ícone + label)

**Especificação:**
- Cards 80px, circulares, ícone + label truncado
- Swiper freeMode, 7 slides desktop / 2 mobile
- Fallback com 10 dados mock

| Repo | Commit | Descrição |
|---|---|---|
| meu-projeto | `abc1234` | feat: carrossel de itens em destaque |
```

---

## 9. Referências

- `docs/guidelines/AI_GUIDELINES.md` — Guia geral para IAs
- `docs/guidelines/BRANCHING_STRATEGY.md` — Estratégia de commits
- `docs/guidelines/FEATURE_PLANNING_GUIDELINES.md` — Planejamento de features
