---
name: rfc-write
description: Generate a language-agnostic technical specification (RFC) based on decisions already discussed. Auto-triggers after a grilling session completes. Delegates to @spec-writer agent. Writes output to docs/rfc/.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [specification, documentation, architecture, planning]
metadata:
  source: Inspired by Lucas Montano (RFC-first workflow) and mattpocock/skills
  adapted-for: opencode
---

# RFC Write — Especificação Técnica

Gera uma especificação técnica (RFC) agnóstica a linguagem baseada nas decisões já discutidas durante a sessão de grilling ou no contexto atual.

## Processo

1. Revise o histórico da conversa para extrair todas as decisões tomadas
2. Consolide em seções: Visão Geral, Entidades DDD, Contratos, Regras de Negócio, Fluxos, Restrições, Critérios de Aceite
3. Delegue a geração para `@spec-writer` com todas as informações coletadas
4. Salve o arquivo em `docs/rfc/RFC-{NNNN}-{slug}.md`
5. Informe o usuário do caminho do arquivo gerado

## Regras

- Se não houver decisões suficientes no contexto, inicie `/grilling` primeiro
- Numeração sequencial: verifique o último RFC em `docs/rfc/` e incremente
- Use português brasileiro
- O RFC gerado se torna o "source of truth" para a implementação

## Auto-Disparo

Dispara automaticamente após uma sessão de `/grilling` ser concluída com sucesso.
