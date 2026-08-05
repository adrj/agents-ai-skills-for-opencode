---
name: architecture-audit
description: Scan a codebase for architectural friction and quality baseline opportunities. Generates an HTML report with improvement candidates. For projects already in development — ideal for establishing the first baseline and RFCs retroactively.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [architecture, quality, refactoring, audit]
metadata:
  source: Inspired by mattpocock/skills improve-codebase-architecture and Lucas Montano quality gate
  adapted-for: opencode
---

# Architecture Audit — Auditoria de Arquitetura

Audita um projeto existente para identificar oportunidades de melhoria arquitetural e estabelecer a primeira baseline de qualidade.

## Processo

### 1. Análise de Hotspots

```bash
git log --oneline -50  # Arquivos mais alterados = hotspots
```

### 2. Coleta de Métricas

- Tamanho de arquivos (top 10 maiores)
- Complexidade ciclomática
- Duplicação de código
- Cobertura de testes
- Violações de lint
- Acoplamento entre módulos

### 3. Relatório

Gera um relatório em `docs/audit/architecture-audit-{date}.md` com:

- **Hotspots**: Arquivos mais alterados e com mais violações
- **Candidatos a refatoração**: Onde a arquitetura causa fricção
- **Gaps de documentação**: Módulos sem RFC ou ADR
- **Baseline proposta**: Métricas atuais para o quality gate

### 4. Ação

Após o relatório, pergunte ao usuário:
1. "Quer congelar o baseline atual no quality gate?"
2. "Quer gerar RFCs retroativas para os módulos principais?"
3. "Qual candidato a refatoração quer explorar primeiro?"

Se o usuário escolher um candidato, inicie `/grilling` focado naquele módulo.

## Regras

- Use `@spec-writer` para gerar RFCs retroativas
- Use `@qa-engineer` para correções mecânicas
- Use `@refactorer` para refatorações estruturais
- Sempre leia `CONTEXT.md` e ADRs existentes antes de sugerir mudanças
