---
name: dev-cli-tools
description: Reference guide for essential CLI tools in dev projects. Use when setting up a new project environment, onboarding a dev machine, or when the user asks what CLI tools to install. Covers git, node, docker, API testing, data, and shell productivity.
license: MIT
compatibility: opencode
metadata:
  curated-from: dev.to/lissy93, agarrharr/awesome-cli-apps, github trending
  adapted-for: opencode
---

# Dev CLI Tools — Essential Install Guide

Reference for the most useful CLI tools across different project contexts.
Use this to recommend installs based on the project type.

---

## Essenciais Universais (qualquer projeto)

Ferramentas que todo dev deveria ter independente da stack.

### Git & Controle de Versão

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **gh** | `brew install gh` / `winget install GitHub.cli` | GitHub CLI — PRs, issues, releases direto do terminal |
| **lazygit** | `brew install lazygit` | TUI completa para git. Visualiza branches, diffs, stash |
| **git-delta** | `brew install git-delta` | Diff muito mais legível (substitui diff-so-fancy) |
| **gitui** | `brew install gitui` | Alternativa ao lazygit, mais leve |

**Setup recomendado para git-delta** (adicione ao `~/.gitconfig`):
```ini
[core]
    pager = delta
[delta]
    navigate = true
    side-by-side = true
```

---

### Busca e Navegação

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **ripgrep** (`rg`) | `brew install ripgrep` / `winget install BurntSushi.ripgrep.MSVC` | Busca em arquivos — muito mais rápido que grep. Respeita .gitignore |
| **fd** | `brew install fd` | Busca de arquivos — substitui `find`, mais intuitivo |
| **fzf** | `brew install fzf` | Fuzzy finder interativo. Integra com shell para busca de histórico e arquivos |
| **zoxide** (`z`) | `brew install zoxide` | Navega para diretórios sem precisar do path completo (`z meu-projeto`) |
| **bat** | `brew install bat` | Substitui `cat` com syntax highlighting e line numbers |
| **eza** | `brew install eza` | Substitui `ls` com ícones, cores e git status |

**Aliases úteis** (adicione ao `.bashrc` / `.zshrc`):
```bash
alias ls='eza --icons --git'
alias ll='eza -la --icons --git'
alias cat='bat'
alias find='fd'
```

---

### Shell e Terminal

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **starship** | `brew install starship` | Prompt bonito e informativo em qualquer shell |
| **tldr** | `brew install tldr` / `npm i -g tldr` | Docs resumidas com exemplos (substitui `man`) |
| **just** | `brew install just` | Task runner — substitui `make` com sintaxe mais clara |
| **direnv** | `brew install direnv` | Carrega variáveis de ambiente por diretório (`.envrc`) |
| **jq** | `brew install jq` / `winget install jqlang.jq` | Processa JSON na linha de comando |
| **yq** | `brew install yq` | Processa YAML (mesma API do jq) |

---

## Por Stack

### Node.js / JavaScript / TypeScript

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **fnm** | `brew install fnm` | Gerencia versões do Node — mais rápido que nvm |
| **pnpm** | `npm i -g pnpm` | Package manager mais eficiente (disco e velocidade) |
| **tsx** | `npm i -g tsx` | Executa TypeScript direto sem build (`tsx arquivo.ts`) |
| **npm-check-updates** (`ncu`) | `npm i -g npm-check-updates` | Verifica e atualiza versões de dependências |
| **serve** | `npm i -g serve` | Serve arquivos estáticos localmente (`serve ./dist`) |
| **np** | `npm i -g np` | Publica packages npm com segurança (checklist automático) |
| **release-it** | `npm i -g release-it` | Automatiza releases: changelog, git tag, npm publish |
| **depcheck** | `npm i -g depcheck` | Detecta dependências não usadas no projeto |
| **bundlewatch** | `npm i -g bundlewatch` | Monitora tamanho do bundle ao longo do tempo |

**Para projetos Next.js / React:**
```bash
# Analisa tamanho do bundle
npm i -g @next/bundle-analyzer
# ou
npx source-map-explorer 'build/static/js/*.js'
```

---

### Python

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **uv** | `brew install uv` / `pip install uv` | Package manager ultra-rápido (substitui pip + venv) |
| **ruff** | `brew install ruff` / `pip install ruff` | Linter e formatter Python muito rápido (substitui flake8 + black) |
| **pyenv** | `brew install pyenv` | Gerencia versões do Python |
| **httpx** | `pip install httpx[cli]` | Cliente HTTP moderno com CLI (`httpx https://api.example.com`) |
| **rich** | `pip install rich` | Output bonito no terminal para scripts Python |

---

### Docker e Containers

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **lazydocker** | `brew install lazydocker` | TUI completa para Docker (containers, imagens, volumes, logs) |
| **ctop** | `brew install ctop` | Monitora métricas de containers em tempo real |
| **dive** | `brew install dive` | Inspeciona layers de imagens Docker |
| **k9s** | `brew install k9s` | TUI para Kubernetes — navega pods, logs, exec |
| **stern** | `brew install stern` | Tail de logs de múltiplos pods Kubernetes simultaneamente |

---

### APIs e HTTP

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **httpie** (`http`) | `brew install httpie` / `pip install httpie` | Cliente HTTP humano — mais legível que curl |
| **curlie** | `brew install curlie` | curl com saída do httpie — compatível com scripts existentes |
| **xh** | `brew install xh` | Alternativa ao httpie, mais rápida (Rust) |
| **hurl** | `brew install hurl` | Testa APIs com arquivos `.hurl` declarativos |
| **websocat** | `brew install websocat` | Cliente WebSocket para terminal (`websocat ws://...`) |

**Exemplo httpie:**
```bash
# GET com headers
http GET api.exemplo.com/users Authorization:"Bearer token123"

# POST JSON
http POST api.exemplo.com/users name="João" email="joao@ex.com"
```

---

### Banco de Dados

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **pgcli** | `brew install pgcli` / `pip install pgcli` | Cliente PostgreSQL com autocompletion inteligente |
| **mycli** | `brew install mycli` / `pip install mycli` | Cliente MySQL com autocompletion |
| **usql** | `brew install usql` | Cliente SQL universal (PG, MySQL, SQLite, etc.) |
| **redis-cli** | vem com Redis | Cliente Redis (já incluído na instalação do Redis) |

---

### Cloud e DevOps

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **awscli** | `brew install awscli` / `pip install awscli` | CLI oficial da AWS |
| **terraform** | `brew install terraform` | Infrastructure as Code |
| **pulumi** | `brew install pulumi` | IaC com linguagens reais (TS, Python, Go) |
| **caddy** | `brew install caddy` | Servidor HTTP com HTTPS automático |
| **ngrok** | `brew install ngrok` | Expõe localhost para a internet (webhooks, demos) |
| **cloudflared** | `brew install cloudflared` | Tunnel Cloudflare — alternativa ao ngrok |
| **mkcert** | `brew install mkcert` | Cria certificados HTTPS locais confiáveis |

---

### Segurança e Secrets

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **gitleaks** | `brew install gitleaks` | Detecta secrets vazados no git history |
| **trufflehog** | `brew install trufflesecurity/trufflehog/trufflehog` | Varre repos procurando secrets |
| **age** | `brew install age` | Criptografia de arquivos simples e moderna |
| **op** (1Password) | site oficial | CLI do 1Password para usar secrets em scripts |

**Use em CI:**
```bash
# Antes de cada push/commit
gitleaks detect --source . --verbose
```

---

### Dados e JSON

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **jq** | `brew install jq` | Query e transformação de JSON |
| **fx** | `npm i -g fx` | JSON viewer interativo no terminal |
| **gron** | `brew install gron` | Torna JSON greppável (`gron data.json \| grep name`) |
| **dasel** | `brew install dasel` | Seleciona/modifica JSON, YAML, TOML, XML com mesma API |
| **visidata** | `pip install visidata` | Spreadsheet para CSV/JSON/logs no terminal |
| **miller** (`mlr`) | `brew install miller` | Processa CSV/TSV/JSON como sed/awk |

---

### Monitoramento e Performance

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **htop** | `brew install htop` | Monitor de processos interativo |
| **btop** | `brew install btop` | Monitor completo (CPU, mem, disco, rede) — visual rico |
| **bandwhich** | `brew install bandwhich` | Monitora uso de banda por processo em tempo real |
| **hyperfine** | `brew install hyperfine` | Benchmarking de comandos com estatísticas |
| **vegeta** | `brew install vegeta` | Load testing de APIs HTTP |

---

## Setup por Tipo de Projeto

### Projeto Web (Node/React/Next)

```bash
# Essenciais
brew install gh lazygit git-delta ripgrep fd fzf bat eza zoxide jq just

# Node
brew install fnm
npm i -g pnpm tsx npm-check-updates serve

# Desenvolvimento
npm i -g release-it depcheck
```

### Projeto Python/Backend

```bash
# Essenciais
brew install gh lazygit git-delta ripgrep fd fzf bat eza zoxide jq just

# Python
brew install pyenv uv ruff
pip install httpie pgcli rich

# Segurança
brew install gitleaks
```

### Projeto Full-Stack com Docker

```bash
# Essenciais
brew install gh lazygit ripgrep fd bat jq

# Docker/Infra
brew install lazydocker ctop dive k9s

# APIs
brew install httpie
```

---

## Quando Instalar o Quê

| Situação | Instale |
|----------|---------|
| Iniciar qualquer projeto | `gh`, `ripgrep`, `fd`, `bat`, `fzf`, `jq`, `just` |
| Antes de commit | `gitleaks` (varre secrets), `git-delta` (diff legível) |
| Testar API | `httpie` ou `xh`, `websocat` para WS |
| Debug de containers | `lazydocker`, `ctop`, `dive` |
| Novo projeto Node | `fnm`, `pnpm`, `tsx`, `npm-check-updates` |
| Novo projeto Python | `uv`, `ruff`, `pyenv` |
| Deploy cloud | `awscli` ou equivalente, `mkcert` para HTTPS local |

---

## Checklist de Máquina Nova

```bash
# 1. Package manager (macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Core
brew install git gh ripgrep fd bat eza fzf zoxide jq yq just direnv starship

# 3. Git setup
brew install lazygit git-delta
gh auth login

# 4. Shell (adicione ao .zshrc / .bashrc)
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
eval "$(direnv hook zsh)"

# 5. Node
brew install fnm
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
fnm install --lts
npm i -g pnpm tsx

# 6. Segurança
brew install gitleaks
```
