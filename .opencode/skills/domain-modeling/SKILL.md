---
name: domain-modeling
description: Build and maintain the project's domain model — CONTEXT.md glossary, ubiquitous language, and ADR links. Auto-triggers during grilling sessions when new domain concepts are named or existing terms are sharpened.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [domain, ddd, glossary, documentation]
metadata:
  source: Inspired by mattpocock/skills domain-modeling pattern
  adapted-for: opencode
---

# Domain Modeling — Modelagem de Domínio

Constrói e mantém o modelo de domínio do projeto durante o desenvolvimento.

## Arquivos Mantidos

### CONTEXT.md (Glossário de Domínio)

Localizado na raiz do projeto. Estrutura:

```markdown
# CONTEXT.md — {{PROJECT_NAME}}

## Glossary

| Termo | Definição | Sinônimos | ADR |
|-------|-----------|-----------|-----|
| Pedido | Solicitação de compra feita pelo cliente | Order, Solicitação | ADR-0003 |

## Ubiquitous Language

Termos que DEVEM ser usados consistentemente em todo o código e documentação.

## Domain Rules

Regras de negócio extraídas do código e ADRs.
```

## Regras

1. **Criar lazy**: Se `CONTEXT.md` não existe, crie na primeira necessidade
2. **Atualizar inline**: Durante grilling, quando um termo novo é nomeado ou um termo fuzzy é esclarecido, atualize `CONTEXT.md` imediatamente
3. **Nunca duplicar ADRs**: CONTEXT.md referencia ADRs, não os substitui
4. **Usar língua do projeto**: Se o projeto é em português, o glossário é em português

## Auto-Disparo

Dispara automaticamente durante sessões de grilling quando novos conceitos de domínio são definidos.
