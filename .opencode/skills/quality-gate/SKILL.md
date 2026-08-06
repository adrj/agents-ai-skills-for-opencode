---
name: quality-gate
description: Code quality ratchet — scan metrics, freeze baseline, block regressions. Auto-triggers before commits and PRs. Delegates fixes to @qa-engineer (free model) for simple violations and @refactorer for structural issues.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [quality, ci, lint, coverage, refactoring]
metadata:
  source: Inspired by Lucas Montano (quality gate + ratchet workflow)
  adapted-for: opencode
---

# Quality Gate — Catraca de Qualidade

Verifica métricas de qualidade do código contra um baseline congelado. Nenhuma métrica pode piorar.

## Modos de Operação

### Modo 1: Primeira Execução (sem baseline)

1. Detecta que `quality-gate/baseline.json` não existe
2. Escaneia o projeto coletando métricas atuais
3. **Audita** as métricas contra a barra mínima:

| Métrica | Barra Mínima |
|---------|--------------|
| Erros de lint | 0 |
| Duplicação | ≤ 3% |
| Complexidade por função | ≤ 10 |
| Linhas por arquivo | ≤ 500 |
| Linhas por função | ≤ 50 |

4. Se violações existirem → delega correções para `@qa-engineer` (violações simples) e `@refactorer` (estruturais)
5. Re-escaneia até a barra mínima ser atingida
6. Congela `baseline.json` com as métricas atuais

### Modo 2: Execuções Seguintes (com baseline)

1. Coleta métricas atuais
2. Compara com `baseline.json`
3. Se alguma métrica piorou → **BLOQUEIA** e reporta a regressão
4. Delega correções para os agents apropriados
5. Re-verifica após correções

## Comandos

```bash
# Verificar métricas atuais vs baseline
node .opencode/skills/quality-gate/scripts/quality-check.js

# Resetar baseline (após grande refatoração)
rm quality-gate/baseline.json
node .opencode/skills/quality-gate/scripts/quality-check.js
```

## Modelos

- **Checagem de métricas**: Script determinístico (zero AI — custo $0)
- **Correção de lint/estilo**: `@qa-engineer` → `opencode/deepseek-v4-flash-free` (grátis)
- **Refatoração estrutural**: `@refactorer` → `opencode/deepseek-v4-flash`
- **Cobertura de testes**: `@test-automator` → `opencode/deepseek-v4-flash-free` (grátis) — gera testes para branches não cobertos seguindo `test-patterns`
- **Revisão final**: `@code-reviewer` → `opencode-go/deepseek-v4-pro`

## Tratamento de Coverage Gap

Quando o quality gate detecta queda na cobertura:
1. Identifica os arquivos com branches não cobertos
2. Delega para `@test-automator` gerar testes seguindo `test-patterns`
3. Re-verifica cobertura após os testes serem adicionados
4. Se cobertura ≥ baseline anterior → ✅ passa

## Auto-Disparo

Dispara automaticamente antes de commits e criação de PRs.
