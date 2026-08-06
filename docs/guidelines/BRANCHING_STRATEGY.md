---
title: Estratégia de Branches e Versionamento
category: process
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Modelo de branches Git Flow simplificado, Conventional Commits, PRs e versionamento semântico.
---

# Estratégia de Branches e Versionamento

Este documento define a estratégia de branches, convenção de commits e versionamento para todos os projetos, garantindo consistência, qualidade e fluxo de trabalho eficiente.

---

## 1. Modelo de Branches (Git Flow Simplificado)

```
main       ★ ──────────────●── ● ──● (produção)
                           /       /
develop    ★ ──●──●──●──●───────●──── (integração)
                 \    /
feature/*  ★ ───●──●─┘                 (desenvolvimento)
```

### 1.1 Branches Permanentes

| Branch | Papel | Proteção |
|--------|-------|----------|
| `main` | Código em produção. Somente via merge de `develop`, `release/*` ou `hotfix/*`. | Sim |
| `develop` | Integração contínua. Feature branches são mergeadas aqui. (Opcional para projetos pequenos) | Sim |

### 1.2 Branches Temporárias

| Prefixo | Formato | Exemplo | Uso | Origem | Destino |
|---------|---------|---------|-----|--------|---------|
| `feature/` | `feature/{issue}-{descricao}` | `feature/123-login-social` | Novas funcionalidades | `develop` | `develop` |
| `fix/` | `fix/{issue}-{descricao}` | `fix/456-erro-upload` | Correção de bugs | `develop` | `develop` |
| `hotfix/` | `hotfix/{issue}-{descricao}` | `hotfix/789-crash-producao` | Correções urgentes em produção | `main` | `main` + `develop` |
| `refactor/` | `refactor/{descricao}` | `refactor/estrutura-modular` | Refatorações sem mudança de funcionalidade | `develop` | `develop` |
| `docs/` | `docs/{descricao}` | `docs/api-documentation` | Documentação | `develop` | `develop` |
| `chore/` | `chore/{descricao}` | `chore/atualizar-deps` | Tarefas de manutenção | `develop` | `develop` |
| `test/` | `test/{descricao}` | `test/cobertura-auth` | Testes experimentais | `develop` | `develop` |
| `release/` | `release/{versao}` | `release/1.2.0` | Preparação de release | `develop` | `main` |

### 1.3 Regras

- `main` é protegida — não se faz commit direto, apenas merge via PR.
- `develop` é a branch padrão de trabalho.
- Toda feature ou correção tem sua própria branch, originada de `develop`.
- Após concluída, a branch é mergeada em `develop` via Pull Request.
- Quando `develop` atinge um ponto estável, é mergeada em `main` para release.
- Nunca commitar diretamente em `main` ou `develop`.

---

## 2. Padronização entre Projetos

Todos os projetos devem usar `main` como branch principal:

```bash
# Renomear master para main (se necessário)
git branch -m master main
git push origin main
git push origin --delete master
```

---

## 3. Conventional Commits

Todas as mensagens de commit devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/).

### 3.1 Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[footer opcional]
```

### 3.2 Regras

- Subject em letras minúsculas (não pode iniciar com maiúscula)
- Máximo de 72 caracteres no subject
- Máximo de 100 caracteres por linha no body
- Corpo explica o **porquê**, não o **o quê**
- Footer para breaking changes: `BREAKING CHANGE: descrição`
- Referenciar issues: `fixes #123`, `closes #456`

### 3.3 Tipos Permitidos

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adicionar login social` |
| `fix` | Correção de bug | `fix(upload): corrigir timeout em arquivos grandes` |
| `docs` | Documentação | `docs(api): atualizar endpoints` |
| `style` | Formatação (não afeta lógica) | `style(frontend): ajustar espaçamento` |
| `refactor` | Refatoração | `refactor(user): extrair validação para serviço` |
| `test` | Testes | `test(auth): adicionar testes unitários` |
| `chore` | Manutenção | `chore(deps): atualizar dependências` |
| `perf` | Performance | `perf(query): otimizar consulta N+1` |
| `ci` | CI/CD | `ci(github): adicionar pipeline de deploy` |
| `build` | Build system | `build(maven): configurar profiles` |
| `revert` | Reverter commit | `revert: reverter feature X` |

### 3.4 Exemplos

```bash
# Funcionalidade com escopo
feat(auth): adicionar renovação automática de token

# Bugfix
fix(backend): corrigir NPE ao buscar registro sem email

# Com corpo e referência a issue
feat(portal): implementar ranking de itens mais acessados

- Adicionado endpoint GET /api/itens/ranking
- Cache de 5 minutos configurado
- Exibição dos top 5 no frontend

Refs: #42

# Documentação
docs: adicionar guideline de versionamento
```

---

## 4. Pull Requests

Todo merge em `develop` ou `main` deve ser feito via Pull Request.

### 4.1 Template de PR

Cada repositório contém `.github/pull_request_template.md` com:

```markdown
## Descrição
[O que este PR faz]

## Tipo de Mudança
- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Refatoração (refactor)
- [ ] Documentação (docs)
- [ ] Outro: ___

## Checklist
- [ ] Código segue os guidelines do projeto
- [ ] Testes unitários passando (TDD — test written first)
- [ ] Testes de integração passando (se aplicável)
- [ ] Quality gate passou sem regressões
- [ ] Documentação atualizada (RFC, ADR, CONTEXT.md)
- [ ] Nenhum warning do linter
- [ ] Commits organizados e mensagens claras (Conventional Commits)

## Testes Realizados
[Descrever testes manuais se necessário]

## Screenshots (se UI)
[Adicionar screenshots]

## Issue Relacionada
closes #___
```

### 4.2 Regras de Merge

| Regra | Descrição |
|-------|-----------|
| Mínimo 1 review | Aprovação obrigatória antes do merge |
| Quality gate | Deve passar sem regressões (ver `quality-gate` skill) |
| Squash merge | Para features e fixes (histórico limpo) |
| Merge commit | Para releases e hotfixes |
| Build e testes | Devem passar no CI |
| Sem conflitos | Branch deve estar atualizada com o destino |
| Branch deletada | Deletar branch após merge |

---

## 5. Releases e Versionamento

Quando `develop` atinge um ponto estável pronto para produção:

```bash
# 1. Criar PR: develop → main
# 2. Revisar e aprovar
# 3. Mergear develop em main
# 4. Criar tag de versão em main
git tag -a v1.2.0 -m "Release v1.2.0: descrição da release"
git push origin v1.2.0
```

### 5.1 Versionamento Semântico (SemVer)

As tags seguem [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`

| Incremento | Quando usar |
|------------|-------------|
| **MAJOR** (x.0.0) | Mudanças incompatíveis (breaking changes) |
| **MINOR** (0.x.0) | Novas funcionalidades compatíveis (backward compatible) |
| **PATCH** (0.0.x) | Correções de bugs compatíveis |

---

## 6. Proteção de Branches

### 6.1 Configuração Recomendada (GitHub/GitLab)

**main e develop:**
- Não permitir push direto
- Requerer PR com review
- Requerer status checks passando
- Requerer branches atualizadas antes do merge
- Não permitir force push

---

## 7. Exemplos Práticos

### 7.1 Criar Feature

```bash
# Atualizar develop
git checkout develop
git pull origin develop

# Criar branch
git checkout -b feature/123-login-social

# Desenvolver e commitar
git add .
git commit -m "feat(auth): adicionar login com Google"

# Push e criar PR
git push origin feature/123-login-social
# Criar PR: feature/123-login-social → develop
```

### 7.2 Corrigir Bug

```bash
# Criar branch de develop
git checkout develop
git checkout -b fix/456-erro-upload

# Corrigir e testar
git add .
git commit -m "fix(upload): corrigir timeout em arquivos grandes

Aumentar timeout de 30s para 120s e adicionar retry automático.

fixes #456"

git push origin fix/456-erro-upload
```

### 7.3 Hotfix (Produção)

```bash
# Criar branch de main
git checkout main
git pull origin main
git checkout -b hotfix/789-crash-login

# Corrigir
git add .
git commit -m "fix(auth): corrigir crash no login

Null pointer ao validar token expirado.

fixes #789"

# Merge em main E develop
git checkout main && git merge hotfix/789-crash-login
git checkout develop && git merge hotfix/789-crash-login

# Tag
git tag -a v1.0.1 -m "Hotfix: crash no login"
git push origin main develop v1.0.1
```

---

## 8. Resumo Visual do Fluxo

```
feature/login-oauth ──●──●──┐
                             ├──▶ develop ──●──●──●──●──▶ main (v1.0.0)
feature/ranking      ──●────┘                       │
                                                     ▼
                                               tag: v1.0.0

hotfix/crash-auth ──●──────────────────────────────▶ main (v1.0.1)
                     │                               │
                     └────────────────▶ develop      ▼
                                               tag: v1.0.1
```

---

## 9. Ferramentas e Automação

### 9.1 Git Hooks + Commitlint

```bash
# Hook .husky/commit-msg executa automaticamente:
npx commitlint --edit $1
```

Se o commit violar as regras, é rejeitado com mensagem explicativa.

### 9.2 CI (Integração Contínua)

- Em cada push: lint, build, testes
- Em cada PR para `develop` ou `main`: mesma validação + bloqueio de merge se falhar

### 9.3 Ferramentas Adicionais

| Ferramenta | Uso |
|------------|-----|
| `commitlint` | Validar mensagens de commit |
| `husky` | Git hooks (pre-commit, commit-msg) |
| `standard-version` | Gerar changelogs automaticamente |
| `semantic-release` | Versionamento automatizado |

---

## 10. Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- `commitlint.config.js` — regras aplicadas em cada projeto
- `.github/pull_request_template.md` — template de PR
