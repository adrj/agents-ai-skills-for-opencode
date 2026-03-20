---
name: dev-cli-tools
description: Reference guide for essential CLI tools in dev projects. Use when setting up a new project environment, onboarding a dev machine, or when the user asks what CLI tools to install. Covers git, node, python, java/spring, docker, API testing, data, and shell productivity.
license: MIT
compatibility: opencode
metadata:
  curated-from: dev.to/lissy93, agarrharr/awesome-cli-apps, sdkman.io, spring.io, jbang.dev, quarkus.io
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

### Java e Spring Boot

---

**Primeiro passo: instale o SDKMAN!**

SDKMAN é o gerenciador de versões padrão do ecossistema Java — gerencia JDK, Maven, Gradle, Spring Boot CLI, Quarkus CLI e muito mais em paralelo.

```bash
# macOS / Linux
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Verificar
sdk version
```

---

#### Gerenciamento de JDK

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **SDKMAN!** | `curl -s "https://get.sdkman.io" \| bash` | Gerencia JDK, Maven, Gradle, Spring CLI, Quarkus CLI — o `fnm` do ecossistema Java |
| **Eclipse Temurin** | `sdk install java 21.0.5-tem` | JDK OpenJDK mais popular para produção (LTS recomendado: 21) |
| **GraalVM** | `sdk install java 21.0.3-graal` | JDK com compilação nativa (`native-image`) — essencial para Spring Native e Quarkus |

```bash
# Ver JDKs disponíveis
sdk list java

# Instalar LTS atual (Java 21)
sdk install java 21.0.5-tem

# Instalar GraalVM para native image
sdk install java 21.0.3-graal

# Trocar versão no projeto (cria .sdkmanrc)
sdk env init
sdk env
```

**Arquivo `.sdkmanrc`** — versiona o JDK por projeto (equivalente ao `.nvmrc`):
```
java=21.0.5-tem
```

---

#### Build Tools

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **Maven** | `sdk install maven` / `brew install maven` | Build tool padrão do ecossistema Spring |
| **Maven Daemon** (`mvnd`) | `sdk install mvnd` | Maven paralelo e persistente — até 10x mais rápido |
| **Gradle** | `sdk install gradle` / `brew install gradle` | Build tool alternativo, mais usado em Android e Kotlin |
| **Gradle profiler** | `sdk install gradleprofiler` | Perfila builds Gradle para otimizar tempo de compilação |

```bash
# Maven — comandos essenciais
mvn spring-boot:run          # Roda a aplicação
mvn test                     # Executa testes
mvn clean package -DskipTests # Gera JAR sem rodar testes
mvn dependency:tree          # Mostra árvore de dependências
mvn dependency:analyze       # Detecta dependências não usadas

# Maven Daemon (substituto direto, mesma sintaxe)
mvnd spring-boot:run
mvnd clean package

# Wrapper (sem instalar Maven/Gradle globalmente)
./mvnw spring-boot:run
./gradlew bootRun
```

---

#### Spring Boot CLI

```bash
# Instalar via SDKMAN
sdk install springboot

# Ou via Homebrew
brew tap spring-io/tap
brew install spring-boot
```

```bash
# Criar novo projeto (integra com start.spring.io)
spring init --dependencies=web,data-jpa,postgresql --build=maven meu-projeto

# Criar com mais opções
spring init \
  --group-id=com.empresa \
  --artifact-id=meu-servico \
  --dependencies=web,security,data-jpa,actuator,lombok \
  --java-version=21 \
  --build=maven \
  meu-servico

# Listar dependências disponíveis
spring init --list

# Subir script Groovy sem projeto (prototipagem rápida)
spring run hello.groovy
```

---

#### Spring CLI (nova — project templating)

```bash
# Instalar via SDKMAN
sdk install springcli

# Criar projeto a partir de template de repositório
spring boot new meu-projeto

# Adicionar feature a projeto existente (merge inteligente)
spring boot add jpa
spring boot add security

# Listar projetos/templates disponíveis
spring project list
```

---

#### Quarkus CLI

Quarkus é alternativa ao Spring Boot com foco em GraalVM native e startup rápido. A CLI é excelente mesmo se você estiver comparando opções.

```bash
# Instalar via SDKMAN
sdk install quarkus

# Ou via Homebrew
brew install quarkusio/tap/quarkus

# Criar projeto
quarkus create app com.empresa:meu-servico \
  --extension=quarkus-rest,quarkus-hibernate-orm-panache,quarkus-jdbc-postgresql

# Dev mode (live reload)
quarkus dev

# Listar extensões
quarkus ext list --concise -i -s jdbc

# Adicionar extensão
quarkus ext add smallrye-openapi

# Build native image
quarkus build --native
```

---

#### JBang — Java sem projeto

JBang permite executar Java como script, sem `pom.xml` ou estrutura de projeto. Ideal para automações, CLIs rápidas e exploração.

```bash
# Instalar
sdk install jbang
# ou
brew install jbangdev/tap/jbang

# Rodar arquivo Java diretamente
jbang hello.java

# Criar script com dependências
jbang init --template=cli minha-ferramenta.java
```

```java
///usr/bin/env jbang "$0" "$@" ; exit $?
//DEPS org.springframework.boot:spring-boot-starter-web:3.2.0
//JAVA 21+

// Arquivo standalone — sem pom.xml, sem estrutura de projeto
public class MinhaFerramenta {
    public static void main(String[] args) {
        System.out.println("Hello from JBang!");
    }
}
```

```bash
# Instalar como comando do sistema
jbang app install minha-ferramenta.java

# Executar script de URL (ex: GitHub)
jbang https://github.com/user/repo/blob/main/script.java

# IDE support (abre com IntelliJ/VSCode)
jbang edit minha-ferramenta.java
```

---

#### Ferramentas de Diagnóstico JVM

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **VisualVM** | `sdk install visualvm` | Profiler e monitor de JVM — heap, threads, CPU |
| **JDK Mission Control** | `sdk install jmc` | Profiler avançado da Oracle (Flight Recorder) |
| **jvmtop** | `brew install jvmtop` | `htop` para JVMs — mostra threads, heap, GC em tempo real |
| **async-profiler** | download direto | Profiler de CPU/heap de baixo overhead — sem safepoint bias |
| **Eclipse MAT** | download direto | Analisador de heap dump (`.hprof`) — detecta memory leaks |

```bash
# Diagnóstico via JDK built-in tools
jps -l                         # Lista processos Java rodando
jstack <pid>                   # Thread dump
jmap -heap <pid>               # Info do heap
jstat -gc <pid> 1000           # Estatísticas de GC a cada 1 segundo
jcmd <pid> VM.native_memory    # Uso de memória nativa
jcmd <pid> Thread.print        # Thread dump alternativo

# Heap dump para análise
jmap -dump:live,format=b,file=heap.hprof <pid>
```

---

#### Banco de Dados com Spring

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **Flyway CLI** | `brew install flyway` | Gerencia migrations SQL — `flyway migrate`, `flyway info` |
| **Liquibase CLI** | `sdk install liquibase` | Alternativa ao Flyway, com suporte a XML/YAML/JSON além de SQL |
| **pgcli** | `brew install pgcli` | Cliente PostgreSQL com autocompletion (essencial com Spring Data JPA) |
| **mycli** | `brew install mycli` | Cliente MySQL/MariaDB com autocompletion |

```bash
# Flyway — checar estado das migrations
flyway -url=jdbc:postgresql://localhost:5432/mydb \
       -user=postgres -password=postgres info

# Liquibase — validar changelog
liquibase --changelog-file=db/changelog/db.changelog-master.yaml validate
```

---

#### Observabilidade e Actuator

| Ferramenta | Instala | Para quê |
|-----------|---------|----------|
| **HTTPie** | `brew install httpie` | Testar endpoints do Actuator facilmente |
| **jq** | `brew install jq` | Processar JSON do Actuator (`/actuator/health`, `/actuator/metrics`) |

```bash
# Testar endpoints do Spring Boot Actuator
http :8080/actuator/health
http :8080/actuator/info
http :8080/actuator/metrics
http :8080/actuator/metrics/jvm.memory.used

# Filtrar com jq
curl -s http://localhost:8080/actuator/health | jq '.components'
curl -s http://localhost:8080/actuator/metrics | jq '.names[]' | grep jvm

# Ver todos os beans registrados
http :8080/actuator/beans | jq '.contexts.application.beans | keys'

# Ver mapeamentos de rotas
http :8080/actuator/mappings | jq '..'
```

---

#### Containers e Deploy de Apps Spring

```bash
# Build da imagem com Buildpacks (sem Dockerfile)
./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=meu-app:latest

# Build com Jib (mais rápido, sem Docker daemon)
./mvnw compile com.google.cloud.tools:jib-maven-plugin:3.4.0:dockerBuild

# Quarkus — build native image Docker
quarkus build --native -Dquarkus.native.container-build=true

# Inspecionar layers da imagem
brew install dive
dive meu-app:latest
```

---

#### Setup Completo — Projeto Java/Spring Boot

```bash
# 1. SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 2. JDK + ferramentas de build
sdk install java 21.0.5-tem
sdk install maven
sdk install mvnd        # Maven paralelo
sdk install springboot  # Spring Boot CLI

# 3. Criar projeto
spring init \
  --dependencies=web,data-jpa,actuator,security,lombok,validation \
  --build=maven \
  --java-version=21 \
  meu-projeto
cd meu-projeto

# 4. Versionamento de JDK no projeto
sdk env init
# Edite .sdkmanrc para fixar versão: java=21.0.5-tem

# 5. Git essentials
brew install gh lazygit git-delta ripgrep fd bat jq httpie gitleaks

# 6. Banco de dados
brew install pgcli flyway

# 7. Docker para dependências locais
brew install lazydocker
# docker-compose up -d (postgres, redis, kafka...)

# 8. Rodar o projeto
./mvnw spring-boot:run
# ou com live reload (DevTools no classpath)
./mvnw spring-boot:run -Dspring-boot.run.fork=false
```

**Dica:** Com `spring-boot-devtools` no `pom.xml`, mudanças no código reiniciam automaticamente sem precisar do Maven. Adicione ao `pom.xml`:
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

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

### Projeto Java/Spring Boot

```bash
# SDKMAN (instala tudo do ecossistema Java)
curl -s "https://get.sdkman.io" | bash && source "$HOME/.sdkman/bin/sdkman-init.sh"

# JDK + build
sdk install java 21.0.5-tem
sdk install maven
sdk install mvnd        # Maven paralelo
sdk install springboot  # Spring Boot CLI

# Essenciais de terminal
brew install gh lazygit git-delta ripgrep fd bat jq httpie gitleaks

# Banco de dados
brew install pgcli flyway

# Docker para dependências locais
brew install lazydocker
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
| Novo projeto Java/Spring | `sdkman`, JDK 21 Temurin, `mvnd`, `springboot` CLI |
| Diagnosticar JVM | `jps`, `jstack`, `jmap`, `visualvm` |
| Migrations SQL | `flyway` ou `liquibase` |
| Build native image | GraalVM via SDKMAN + `quarkus build --native` |
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
