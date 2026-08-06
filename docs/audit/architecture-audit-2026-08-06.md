---
title: Architecture Audit — agents-ai-skills-for-opencode
date: 2026-08-06
status: Completed
---

# Auditoria de Arquitetura — agents-ai-skills-for-opencode

**Data:** 2026-08-06
**Projeto:** agents-ai-skills-for-opencode
**Auditor:** OpenCode Agent

---

## 1. Visão Geral

| Métrica | Valor |
|---------|-------|
| Agents | 48 |
| Skills | 45 (+ manifest desatualizado) |
| Guidelines | 7 documentos padronizados |
| Scripts | 1 (quality-check.js — 350 linhas) |
| Total de arquivos relevantes | 13.699 linhas |
| Maior arquivo | README.md (701 linhas) |
| Hotspot #1 | AGENTS.md (28 commits) |
| Hotspot #2 | README.md (16 commits) |
| Hotspot #3 | SKELETON.md (4 commits) |

---

## 2. Hotspots (Arquivos Mais Alterados)

| Arquivo | Commits | Observação |
|---------|---------|------------|
| `AGENTS.md` | 28 | Fluxo de decisão em constante evolução — esperado |
| `README.md` | 16 | Tabela de agents/skills cresce a cada feature |
| `SKELETON.md` | 4 | Instruções de setup — crescimento natural |
| `quality-gate/SKILL.md` | 2 | Skills novas com ajustes iniciais |
| `README.md` (repo) | 15 | Documentação pública |

**Diagnóstico:** Hotspots são saudáveis — refletem adição de features, não bugs.

---

## 3. Gap Crítico: manifest.json Desatualizado

**Problema:** O `manifest.json` lista 37 skills, mas o diretório tem 45.

**Skills faltando no manifest:**

| Skill | Categoria |
|-------|-----------|
| `grilling` | productivity |
| `grill-me` | productivity |
| `grill-with-docs` | engineering |
| `rfc-write` | specification |
| `quality-gate` | quality |
| `domain-modeling` | documentation |
| `architecture-audit` | quality |
| `babysit` | automation |

**Impacto:** Ferramentas que indexam via manifest não encontram essas skills.

**Ação recomendada:** Atualizar `manifest.json` com as 8 skills faltantes.

---

## 4. Análise de Agents

### 4.1 Distribuição por Modelo

| Modelo | Qtd | % | Tier |
|--------|-----|---|------|
| `opencode-go/deepseek-v4-pro` | 15 | 31% | Pro |
| `opencode-go/deepseek-v4-flash` | 13 | 27% | Flash |
| `opencode/deepseek-v4-flash-free` | 13 | 27% | Free |
| `opencode-go/qwen3.7-plus` | 4 | 8% | Qwen |
| `opencode/mimo-v2.5-free` | 2 | 4% | Free |
| `opencode-go/mimo-v2.5` | 1 | 2% | Flash |
| **Total** | **48** | **100%** | |

### 4.2 Cobertura de Categorias

| Categoria | Agents | Status |
|-----------|--------|--------|
| Backend | 10 | ✅ Forte |
| Frontend | 6 | ✅ Forte |
| Quality | 4 | ✅ Forte (qa-engineer, refactorer, test-automator, code-reviewer) |
| DevOps | 5 | ✅ Forte |
| Specification | 1 | ⚠️ Só spec-writer — considerar domain-expert |
| Business | 3 | ✅ OK |
| Data | 3 | ✅ OK |
| Web | 2 | ✅ OK (web-scraper + image-analyzer) |
| Git | 2 | ✅ OK |
| Memory | 2 | ✅ OK |
| Docs | 3 | ✅ OK |

### 4.3 Agents com Modelo Possivelmente Inadequado

| Agente | Modelo Atual | Sugestão | Motivo |
|--------|-------------|----------|--------|
| `file-ops` | `mimo-v2.5-free` | Manter | Operações mecânicas, grátis resolve |
| `log-analyst` | `deepseek-v4-flash-free` | Manter | Análise de logs é mecânica, grátis resolve |

---

## 5. Análise de Skills

### 5.1 Fluxo Completo Coberto?

| Fase | Skills | Status |
|------|--------|--------|
| 0. Bootstrap | `architecture-audit`, `quality-gate`, `domain-modeling` | ✅ |
| 1. Spec | `grilling`, `grill-me`, `grill-with-docs`, `rfc-write` | ✅ |
| 2. Implement | `test-driven-development`, `test-patterns` | ✅ |
| 3. Quality | `quality-gate`, `pr-review` | ✅ |
| 4. PR/Merge | `babysit`, `finishing-a-branch`, `git-release` | ✅ |
| Cross-cutting | `napkin`, `handoff`, `systematic-debugging`, `interface-design` | ✅ |

### 5.2 Skills Órfãs (existentes mas não referenciadas no fluxo)

| Skill | Status |
|-------|--------|
| `tokenscope` | ⚠️ Não mencionada na árvore de decisão |
| `dynamic-context-pruning` | ⚠️ Não mencionada |
| `context-analysis` | ⚠️ Não mencionada |
| `pocket-universe` | ⚠️ Não mencionada |
| `opencode-mem` | ⚠️ Não mencionada |
| `simple-memory` | ⚠️ Não mencionada |
| `agent-memory` | ⚠️ Não mencionada |

**Diagnóstico:** 7 skills existem mas não estão integradas na árvore de decisão. Podem ser usadas manualmente mas não disparam automaticamente.

---

## 6. Análise de Documentação

### 6.1 Tamanho dos Arquivos

| Arquivo | Linhas | Limite | Status |
|---------|--------|--------|--------|
| `README.md` | 701 | - | ⚠️ Grande — considerar split |
| `dev-cli-tools/SKILL.md` | 665 | - | ⚠️ Grande — mas é referência, aceitável |
| `FRONTEND_GUIDELINES.md` | 447 | - | ✅ OK |
| `FEATURE_PLANNING_GUIDELINES.md` | 414 | - | ✅ OK |
| `BACKEND_GUIDELINES.md` | 383 | - | ✅ OK |
| `quality-check.js` | 350 | - | ✅ OK |

### 6.2 Guidelines Consistência

| Critério | Status |
|----------|--------|
| YAML frontmatter | ✅ Todos os 7 têm |
| Placeholders `{{VARIAVEL}}` | ✅ Todos usam |
| Seções numeradas | ✅ Todos seguem |
| Referências cruzadas | ✅ Todos linkam entre si |
| README.md índice | ✅ Existe com tabela |

---

## 7. Gaps e Oportunidades

### 7.1 Prioridade ALTA

| # | Issue | Ação | Impacto |
|---|-------|------|---------|
| 1 | `manifest.json` desatualizado | Atualizar com 8 skills novas | Índice quebrado |
| 2 | 7 skills órfãs no fluxo | Integrar na árvore de decisão ou documentar como "manual use" | Menor descoberta |

### 7.2 Prioridade MÉDIA

| # | Issue | Ação | Impacto |
|---|-------|------|---------|
| 3 | README.md com 701 linhas | Dividir em README.md (resumo) + docs/DETAILS.md | Legibilidade |
| 4 | `quality-check.js` — coleta de coverage | Adicionar suporte a Istanbul/c8 | Métricas mais precisas |
| 5 | Sem testes unitários para skills | Criar smoke tests básicos | Confiabilidade |
| 6 | 37 skills originais + 8 novas = 45 | Considerar renomear categorias no manifest | Organização |

### 7.3 Prioridade BAIXA

| # | Issue | Ação | Impacto |
|---|-------|------|---------|
| 7 | `opencode.json` não tem `small_model` | Configurar `small_model` para session title | Economia |
| 8 | Sem `.opencode/.gitignore` atualizado | Verificar se `node_modules` está ignorado | Limpeza |
| 9 | Sem CHANGELOG.md | Criar changelog a partir do git log | Rastreabilidade |

---

## 8. Melhorias Sugeridas (Priorizadas)

### Candidato 1: Atualizar manifest.json (ALTA prioridade)

```bash
# Adicionar as 8 skills novas ao manifest.json
```

### Candidato 2: Integrar skills órfãs (MÉDIA prioridade)

Adicionar na árvore de decisão:
```
Sessão longa → dynamic-context-pruning
Muitos tokens → context-analysis
Uso recorrente → napkin / agent-memory
```

### Candidato 3: Criar CHANGELOG.md (BAIXA prioridade)

Gerar a partir do git log com `git-release`.

---

## 9. Baseline de Qualidade (Congelado)

| Métrica | Valor |
|---------|-------|
| Lint errors | 0 |
| Duplicação | 0% |
| Cobertura | 0% |
| Arquivos > 500 linhas | 0 |
| Maior arquivo | 351 linhas (quality-check.js) |

**Nota:** Este projeto é config/skills (não app), então métricas de app (coverage, duplication) ficam em 0. O baseline é válido para prevenir crescimento.

---

*Auditoria gerada em 2026-08-06 pelo quality-gate + architecture-audit.*
