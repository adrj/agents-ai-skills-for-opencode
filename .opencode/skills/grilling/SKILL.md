---
name: grilling
description: Interview the user relentlessly about a plan, design, or decision until every branch of the design tree is resolved. Use when the user describes a new feature, architecture change, or any non-trivial implementation task. Also use when the agent needs to make domain decisions that affect business rules. Trigger phrases: "new feature", "implement", "add", "create", "change", "refactor", "design", "how should I", "what if". Ask questions in Portuguese.
disable-model-invocation: false
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [specification, interview, planning, design, workflow]
metadata:
  source: https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling
  adapted-for: opencode
---

# Grilling — Entrevista Implacável

Entreviste o usuário implacavelmente até alcançar um entendimento compartilhado. Mapeie a discussão como uma **árvore de decisões**: cada decisão ramifica nas decisões que dependem dela.

## Regras

1. **Rodadas**: Trabalhe em rodadas. A **fronteira** são as decisões cujos pré-requisitos já estão resolvidos — perguntas que você pode fazer AGORA sem adivinhar respostas que ainda não ouviu. Faça TODAS as perguntas da fronteira em uma rodada.

2. **Formato de cada pergunta**:
```
❓ **Q1** — **Título da pergunta**: Corpo da pergunta (pode ter múltiplos parágrafos, opções)

➡️ **Recomendação**: Sua resposta recomendada com justificativa
```

3. **Fatos são seus, decisões são do usuário**: Busque fatos no filesystem/tools. Não pergunte ao usuário o que você pode descobrir sozinho.

4. **Em português**: Todas as perguntas e respostas em português brasileiro.

5. **Sessão concluída** quando a fronteira estiver vazia: todas as branches visitadas, nada assumido silenciosamente. Apresente um resumo final e pergunte se pode prosseguir.

## Quando Disparar Automaticamente

- Usuário descreve uma feature nova sem spec existente
- Usuário propõe mudança arquitetural
- Antes de implementar qualquer feature não-trivial que não tenha RFC
- Quando o agente precisa tomar decisões de domínio que afetam regras de negócio
