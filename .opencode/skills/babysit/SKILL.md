---
name: babysit
description: Monitor a PR after creation — watch CI checks, respond to reviewer comments, fix issues automatically, and loop until merge-ready. Use after creating a PR. Trigger phrases: "babysit", "monitor PR", "watch CI", "address review comments".
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [ci, review, pr, automation, github]
metadata:
  source: Inspired by Lucas Montano (babysit + quality gate loop)
  adapted-for: opencode
---

# Babysit — Babá de PR

Monitora um PR ativo: verifica CI, responde comentários, corrige problemas automaticamente em loop até o merge ser liberado.

## Processo

```
PR aberto
  │
  ├─ 1. Verifica CI (gh pr checks)
  │   ├─ CI OK? → próximo
  │   └─ CI falhou? → lê logs → corrige → git push → volta ao 1
  │
  ├─ 2. Verifica reviews (gh pr view --comments)
  │   ├─ Sem comentários? → próximo
  │   └─ Tem comentários? → analisa cada um:
  │       ├─ Mudança solicitada → implementa → git push
  │       ├─ Dúvida → responde explicando
  │       └─ Aprovado → resolve conversa
  │
  ├─ 3. Verifica quality-gate
  │   ├─ Passou? → próximo
  │   └─ Falhou? → corrige regressão → git push → volta ao 1
  │
  └─ 4. Condição de saída
      ├─ CI ✅ + reviews aprovados ✅ + quality-gate ✅ → PR pronto para merge
      └─ Senão → volta ao passo 1
```

## Comandos usados

```bash
# Verificar CI
gh pr checks

# Ver comentários/reviews
gh pr view --comments
gh pr view --json reviews,comments

# Responder comentário
gh pr comment --body "Resposta..."

# Ver status do PR
gh pr view --json state,mergeable,reviewDecision,statusCheckRollup

# Reverter mudanças (se necessário)
gh pr diff  # ver o que foi alterado
```

## Regras

1. **Máximo 3 iterações**: Se após 3 ciclos de correção o PR ainda falha, pare e reporte ao usuário. Algo estrutural está errado.
2. **Nunca force push**: Apenas `git push` normal. Se houver conflito, reporte ao usuário.
3. **Problemas complexos**: Se o CI falhar com um erro que o `@qa-engineer` ou `@refactorer` não conseguem resolver em 1 tentativa, pare e peça ajuda humana.
4. **Respostas em português**: Comentários no PR devem ser em português brasileiro.
5. **Resolva conversas**: Após endereçar um comentário, marque a conversa como resolvida (`gh pr review --comment --body "Resolvido em <commit>"`).

## Otimização de Custo (Tokens)

| Ação | Custo | Modelo |
|------|-------|--------|
| `gh pr checks` / `gh pr view` | **Zero tokens** | CLI local |
| `gh pr diff` (ler mudanças) | **Zero tokens** | CLI local |
| Ler logs de CI | **Zero tokens** | CLI local |
| Corrigir lint/estilo | **Grátis** | `@qa-engineer` (free) |
| Corrigir coverage gap | **Grátis** | `@test-automator` (free) |
| Refatorar arquivo grande | **Baixo** | `@refactorer` (flash) |
| Só delegar a Pro se for inevitável | **Médio** | `@code-reviewer` (pro) |

**Estratégia**: Zero-AI primeiro → free tier para mecânico → flash para estrutural → pro só se inevitável.

## Exemplo de Loop

```
Iteração 1:
  CI: ❌ lint falhou (3 erros)
  Reviews: 1 comentário ("extrai essa função")
  → qa-engineer corrige lint, extrai função, git push

Iteração 2:
  CI: ✅ passou
  Reviews: 0 novos comentários
  Quality-gate: ❌ cobertura caiu 2%
  → test-automator gera testes, git push

Iteração 3:
  CI: ✅ passou
  Reviews: ✅ aprovado
  Quality-gate: ✅ passou
  → PR pronto para merge ✅
```

## Auto-Disparo

Dispara após criar um PR ou quando o usuário menciona "babysit", "monitorar PR" ou "acompanhar CI".
