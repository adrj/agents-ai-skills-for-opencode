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

## Métricas Coletadas

| Categoria | Métrica | Fonte | Threshold |
|-----------|---------|-------|-----------|
| **Coverage** | Lines | jacoco.csv / v8 | ≥ 60% |
| **Coverage** | Statements | jacoco.csv / v8 | ≥ 60% |
| **Coverage** | Functions | jacoco.csv / v8 | ≥ 60% |
| **Coverage** | Branches | jacoco.csv / v8 | ≥ 50% |
| **Duplication** | Percentage | jscpd | ≤ 10% |
| **Duplication** | Fragments | jscpd | - |
| **Violations** | Lint errors | ESLint | 0 |
| **Violations** | Checkstyle | checkstyle.xml | ≤ 50 |
| **Violations** | PMD | pmd.xml | ≤ 20 |
| **Violations** | SpotBugs | spotbugs.xml | ≤ 10 |
| **Security** | CVEs (critical) | OWASP | 0 |
| **Security** | CVEs (high) | OWASP | 0 |
| **Complexity** | Total | jacoco.csv | - |
| **Complexity** | Avg/function | jacoco.csv | - |
| **File Size** | Oversized (>500) | File scan | - |
| **File Size** | Oversized (>1400) | File scan | 0 |

## Modos de Operação

### Modo 1: Primeira Execução (sem baseline)

1. Detecta que `quality-gate/baseline.json` não existe
2. Escaneia o projeto coletando métricas atuais
3. Congela `baseline.json` com as métricas atuais
4. Reporta métricas no console e no GitHub Step Summary

### Modo 2: Execuções Seguintes (com baseline)

1. Coleta métricas atuais
2. Compara com `baseline.json`
3. Se alguma métrica piorou → **BLOQUEIA** e reporta a regressão
4. Gera relatório comparativo com delta (📈/📉/➡️)

## Comandos

```bash
# Verificar métricas atuais vs baseline
node .opencode/skills/quality-gate/scripts/quality-check.js

# Resetar baseline (após grande refatoração)
rm quality-gate/baseline.json
node .opencode/skills/quality-gate/scripts/quality-check.js
```

## Auto-detect Project Type

O script detecta automaticamente o tipo de projeto:

| Tipo | Detecção | Coverage Fonte |
|------|----------|----------------|
| Java/Maven | `pom.xml` | jacoco.csv |
| Node.js | `package.json` | v8/istanbul |
| Go | `go.mod` | - |
| Python | `pyproject.toml` / `setup.py` | - |

## Relatório de Exemplo

```
# 📊 Quality Gate Report

## Coverage
| Metric     | Baseline | Current | Δ         | Status |
|------------|----------|---------|-----------|--------|
| Lines      | 44.86%   | 45.20%  | 📈 +0.34% | ❌     |
| Statements | 43.79%   | 44.10%  | 📈 +0.31% | ❌     |

## Duplication
| Metric     | Baseline | Current | Δ    | Status |
|------------|----------|---------|------|--------|
| Percentage | 6.17%    | 5.90%   | 📈 -0.27% | ✅   |

## Violations
| Metric                  | Baseline | Current | Δ  | Status |
|-------------------------|----------|---------|----|--------|
| Lint errors             | 0        | 0       | -  | ✅     |
| Checkstyle violations   | 12       | 8       | -4 | ✅     |

## Security
| Metric         | Baseline | Current | Δ  | Status |
|----------------|----------|---------|----|--------|
| CVEs (critical)| 0        | 0       | -  | ✅     |

## Complexity
| Metric                | Baseline | Current | Δ    |
|-----------------------|----------|---------|------|
| Avg complexity/function| 4.20    | 3.80    | -0.40|
```

## Modelos

- **Checagem de métricas**: Script determinístico (zero AI — custo $0)
- **Correção de lint/estilo**: `@qa-engineer` → `opencode/deepseek-v4-flash-free` (grátis)
- **Refatoração estrutural**: `@refactorer` → `opencode/deepseek-v4-flash`
- **Cobertura de testes**: `@test-automator` → `opencode/deepseek-v4-flash-free` (grátis)
- **Revisão final**: `@code-reviewer` → `opencode-go/deepseek-v4-pro`

## Auto-Disparo

Dispara automaticamente antes de commits e criação de PRs.
