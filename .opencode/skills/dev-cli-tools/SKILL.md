---
name: dev-cli-tools
description: Reference guide for essential CLI tools in dev projects. Use when setting up a new project environment, onboarding a dev machine, or when the user asks what CLI tools to install. Covers git, node, python, java/spring, docker, API testing, data, and shell productivity.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [cli, devtools, reference, onboarding]
metadata:
  source: curated (dev.to, awesome-cli-apps)
  adapted-for: opencode
---

# Dev CLI Tools — Essential Install Guide

Reference for the most useful CLI tools across different project contexts.
Use this to recommend installs based on the project type.

---

## Universal Essentials (any project)

Tools every developer should have regardless of stack.

### Git & Version Control

| Tool | Install | Why |
|-----------|---------|----------|
| **gh** | `brew install gh` / `winget install GitHub.cli` | GitHub CLI — PRs, issues, releases from terminal |
| **lazygit** | `brew install lazygit` | Full TUI for git — branches, diffs, stash |
| **git-delta** | `brew install git-delta` | Much more readable diff output |
| **gitui** | `brew install gitui` | Lighter alternative to lazygit |

**Recommended git-delta setup** (add to `~/.gitconfig`):
```ini
[core]
    pager = delta
[delta]
    navigate = true
    side-by-side = true
```

---

### Search & Navigation

| Tool | Install | Why |
|-----------|---------|----------|
| **ripgrep** (`rg`) | `brew install ripgrep` / `winget install BurntSushi.ripgrep.MSVC` | Fast file search — much faster than grep, respects .gitignore |
| **fd** | `brew install fd` | File discovery — replaces `find`, more intuitive |
| **fzf** | `brew install fzf` | Interactive fuzzy finder — integrates with shell |
| **zoxide** (`z`) | `brew install zoxide` | Jump to directories without full path (`z my-project`) |
| **bat** | `brew install bat` | Replaces `cat` with syntax highlighting and line numbers |
| **eza** | `brew install eza` | Replaces `ls` with icons, colors, git status |

**Useful aliases** (add to `.bashrc` / `.zshrc`):
```bash
alias ls='eza --icons --git'
alias ll='eza -la --icons --git'
alias cat='bat'
alias find='fd'
```

---

### Shell & Terminal

| Tool | Install | Why |
|-----------|---------|----------|
| **starship** | `brew install starship` | Beautiful, informative prompt for any shell |
| **tldr** | `brew install tldr` / `npm i -g tldr` | Simplified man pages with examples |
| **just** | `brew install just` | Task runner — replaces `make` with cleaner syntax |
| **direnv** | `brew install direnv` | Loads env variables per directory (`.envrc`) |
| **jq** | `brew install jq` / `winget install jqlang.jq` | Command-line JSON processor |
| **yq** | `brew install yq` | YAML processor (same API as jq) |

---

## Per Stack

### Node.js / JavaScript / TypeScript

| Tool | Install | Why |
|-----------|---------|----------|
| **fnm** | `brew install fnm` | Node version manager — faster than nvm |
| **pnpm** | `npm i -g pnpm` | More efficient package manager (disk and speed) |
| **tsx** | `npm i -g tsx` | Run TypeScript directly without build |
| **npm-check-updates** (`ncu`) | `npm i -g npm-check-updates` | Check and update dependency versions |
| **serve** | `npm i -g serve` | Serve static files locally |
| **np** | `npm i -g np` | Safe npm package publishing (auto-checklist) |
| **release-it** | `npm i -g release-it` | Automate releases: changelog, git tag, npm publish |
| **depcheck** | `npm i -g depcheck` | Detect unused dependencies |
| **bundlewatch** | `npm i -g bundlewatch` | Track bundle size over time |

**For Next.js / React projects:**
```bash
# Analyze bundle size
npm i -g @next/bundle-analyzer
npx source-map-explorer 'build/static/js/*.js'
```

---

### Python

| Tool | Install | Why |
|-----------|---------|----------|
| **uv** | `brew install uv` / `pip install uv` | Ultra-fast package manager (replaces pip + venv) |
| **ruff** | `brew install ruff` / `pip install ruff` | Very fast linter and formatter (replaces flake8 + black) |
| **pyenv** | `brew install pyenv` | Python version manager |
| **httpx** | `pip install httpx[cli]` | Modern HTTP client with CLI |
| **rich** | `pip install rich` | Beautiful terminal output for Python scripts |

---

### Docker & Containers

| Tool | Install | Why |
|-----------|---------|----------|
| **lazydocker** | `brew install lazydocker` | Full TUI for Docker (containers, images, volumes, logs) |
| **ctop** | `brew install ctop` | Real-time container metrics monitoring |
| **dive** | `brew install dive` | Inspect Docker image layers |
| **k9s** | `brew install k9s` | TUI for Kubernetes — browse pods, logs, exec |
| **stern** | `brew install stern` | Tail logs from multiple Kubernetes pods simultaneously |

---

### APIs & HTTP

| Tool | Install | Why |
|-----------|---------|----------|
| **httpie** (`http`) | `brew install httpie` / `pip install httpie` | Human-friendly HTTP client |
| **curlie** | `brew install curlie` | curl with httpie output — script-compatible |
| **xh** | `brew install xh` | Faster httpie alternative (Rust) |
| **hurl** | `brew install hurl` | Test APIs with declarative `.hurl` files |
| **websocat** | `brew install websocat` | WebSocket CLI client |

**httpie examples:**
```bash
# GET with headers
http GET api.example.com/users Authorization:"Bearer token123"

# POST JSON
http POST api.example.com/users name="John" email="john@example.com"
```

---

### Databases

| Tool | Install | Why |
|-----------|---------|----------|
| **pgcli** | `brew install pgcli` / `pip install pgcli` | PostgreSQL client with smart autocompletion |
| **mycli** | `brew install mycli` / `pip install mycli` | MySQL client with autocompletion |
| **usql** | `brew install usql` | Universal SQL client (PG, MySQL, SQLite, etc.) |
| **redis-cli** | ships with Redis | Redis CLI (included with Redis installation) |

---

### Cloud & DevOps

| Tool | Install | Why |
|-----------|---------|----------|
| **awscli** | `brew install awscli` / `pip install awscli` | Official AWS CLI |
| **terraform** | `brew install terraform` | Infrastructure as Code |
| **pulumi** | `brew install pulumi` | IaC with real languages (TS, Python, Go) |
| **caddy** | `brew install caddy` | HTTP server with auto HTTPS |
| **ngrok** | `brew install ngrok` | Expose localhost to internet (webhooks, demos) |
| **cloudflared** | `brew install cloudflared` | Cloudflare tunnel — ngrok alternative |
| **mkcert** | `brew install mkcert` | Create trusted local HTTPS certificates |

---

### Security & Secrets

| Tool | Install | Why |
|-----------|---------|----------|
| **gitleaks** | `brew install gitleaks` | Detect leaked secrets in git history |
| **trufflehog** | `brew install trufflesecurity/trufflehog/trufflehog` | Scan repos for secrets |
| **age** | `brew install age` | Simple, modern file encryption |
| **op** (1Password) | official site | 1Password CLI for secrets in scripts |

**Use in CI:**
```bash
gitleaks detect --source . --verbose
```

---

### Data & JSON

| Tool | Install | Why |
|-----------|---------|----------|
| **jq** | `brew install jq` | JSON query and transformation |
| **fx** | `npm i -g fx` | Interactive JSON viewer for terminal |
| **gron** | `brew install gron` | Make JSON greppable (`gron data.json \| grep name`) |
| **dasel** | `brew install dasel` | Select/modify JSON, YAML, TOML, XML with same API |
| **visidata** | `pip install visidata` | Terminal spreadsheet for CSV/JSON/logs |
| **miller** (`mlr`) | `brew install miller` | Process CSV/TSV/JSON like sed/awk |

---

### Java & Spring Boot

**First step: install SDKMAN!**

SDKMAN is the standard version manager for the Java ecosystem — manages JDK, Maven, Gradle, Spring Boot CLI, Quarkus CLI, and more in parallel.

```bash
# macOS / Linux
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Verify
sdk version
```

---

#### JDK Management

| Tool | Install | Why |
|-----------|---------|----------|
| **SDKMAN!** | `curl -s "https://get.sdkman.io" \| bash` | Manages JDK, Maven, Gradle, Spring CLI, Quarkus CLI |
| **Eclipse Temurin** | `sdk install java 21.0.5-tem` | Most popular OpenJDK for production (LTS: 21) |
| **GraalVM** | `sdk install java 21.0.3-graal` | JDK with native compilation (`native-image`) |

```bash
# List available JDKs
sdk list java

# Install current LTS (Java 21)
sdk install java 21.0.5-tem

# Install GraalVM for native image
sdk install java 21.0.3-graal

# Switch version per project (creates .sdkmanrc)
sdk env init
sdk env
```

**.sdkmanrc file** — version JDK per project (equivalent to `.nvmrc`):
```
java=21.0.5-tem
```

---

#### Build Tools

| Tool | Install | Why |
|-----------|---------|----------|
| **Maven** | `sdk install maven` / `brew install maven` | Standard Spring build tool |
| **Maven Daemon** (`mvnd`) | `sdk install mvnd` | Parallel, persistent Maven — up to 10x faster |
| **Gradle** | `sdk install gradle` / `brew install gradle` | Alternative build tool (Android, Kotlin) |
| **Gradle profiler** | `sdk install gradleprofiler` | Profile Gradle builds to optimize compilation time |

```bash
# Maven essentials
mvn spring-boot:run          # Run application
mvn test                     # Run tests
mvn clean package -DskipTests # Build JAR
mvn dependency:tree          # Show dependency tree
mvn dependency:analyze       # Detect unused dependencies

# Maven Daemon (drop-in replacement)
mvnd spring-boot:run
mvnd clean package

# Wrapper (no global Maven/Gradle needed)
./mvnw spring-boot:run
./gradlew bootRun
```

---

#### Spring Boot CLI

```bash
# Install via SDKMAN
sdk install springboot

# Or via Homebrew
brew tap spring-io/tap
brew install spring-boot
```

```bash
# Create new project (integrates with start.spring.io)
spring init --dependencies=web,data-jpa,postgresql --build=maven my-project

# Create with more options
spring init \
  --group-id=com.company \
  --artifact-id=my-service \
  --dependencies=web,security,data-jpa,actuator,lombok \
  --java-version=21 \
  --build=maven \
  my-service

# List available dependencies
spring init --list

# Run Groovy script without project (quick prototyping)
spring run hello.groovy
```

---

#### Spring CLI (new — project templating)

```bash
# Install via SDKMAN
sdk install springcli

# Create project from repository template
spring boot new my-project

# Add feature to existing project (intelligent merge)
spring boot add jpa
spring boot add security

# List available projects/templates
spring project list
```

---

#### Quarkus CLI

Quarkus is a Spring Boot alternative focused on GraalVM native and fast startup. The CLI is excellent even for comparison.

```bash
# Install via SDKMAN
sdk install quarkus

# Or via Homebrew
brew install quarkusio/tap/quarkus

# Create project
quarkus create app com.company:my-service \
  --extension=quarkus-rest,quarkus-hibernate-orm-panache,quarkus-jdbc-postgresql

# Dev mode (live reload)
quarkus dev

# List extensions
quarkus ext list --concise -i -s jdbc

# Add extension
quarkus ext add smallrye-openapi

# Build native image
quarkus build --native
```

---

#### JBang — Java without Project

JBang lets you run Java as a script, without `pom.xml` or project structure. Ideal for automation, quick CLIs, and exploration.

```bash
# Install
sdk install jbang
# or
brew install jbangdev/tap/jbang

# Run Java file directly
jbang hello.java

# Create script with dependencies
jbang init --template=cli my-tool.java
```

```java
///usr/bin/env jbang "$0" "$@" ; exit $?
//DEPS org.springframework.boot:spring-boot-starter-web:3.2.0
//JAVA 21+

// Standalone file — no pom.xml, no project structure
public class MyTool {
    public static void main(String[] args) {
        System.out.println("Hello from JBang!");
    }
}
```

```bash
# Install as system command
jbang app install my-tool.java

# Run script from URL (e.g., GitHub)
jbang https://github.com/user/repo/blob/main/script.java

# IDE support (opens with IntelliJ/VSCode)
jbang edit my-tool.java
```

---

#### JVM Diagnostic Tools

| Tool | Install | Why |
|-----------|---------|----------|
| **VisualVM** | `sdk install visualvm` | JVM profiler and monitor — heap, threads, CPU |
| **JDK Mission Control** | `sdk install jmc` | Advanced Oracle profiler (Flight Recorder) |
| **jvmtop** | `brew install jvmtop` | `htop` for JVMs — threads, heap, GC in real-time |
| **async-profiler** | direct download | Low-overhead CPU/heap profiler — no safepoint bias |
| **Eclipse MAT** | direct download | Heap dump analyzer (`.hprof`) — detects memory leaks |

```bash
# JDK built-in diagnostic tools
jps -l                         # List running Java processes
jstack <pid>                   # Thread dump
jmap -heap <pid>               # Heap info
jstat -gc <pid> 1000           # GC statistics every 1 second
jcmd <pid> VM.native_memory    # Native memory usage

# Heap dump for analysis
jmap -dump:live,format=b,file=heap.hprof <pid>
```

---

#### Database with Spring

| Tool | Install | Why |
|-----------|---------|----------|
| **Flyway CLI** | `brew install flyway` | SQL migration management |
| **Liquibase CLI** | `sdk install liquibase` | Flyway alternative with XML/YAML/JSON support |
| **pgcli** | `brew install pgcli` | PostgreSQL client with autocompletion |
| **mycli** | `brew install mycli` | MySQL/MariaDB client with autocompletion |

```bash
# Flyway — check migration status
flyway -url=jdbc:postgresql://localhost:5432/mydb \
       -user=postgres -password=postgres info

# Liquibase — validate changelog
liquibase --changelog-file=db/changelog/db.changelog-master.yaml validate
```

---

#### Observability & Actuator

| Tool | Install | Why |
|-----------|---------|----------|
| **HTTPie** | `brew install httpie` | Easily test Actuator endpoints |
| **jq** | `brew install jq` | Process Actuator JSON output |

```bash
# Test Spring Boot Actuator endpoints
http :8080/actuator/health
http :8080/actuator/info
http :8080/actuator/metrics

# Filter with jq
curl -s http://localhost:8080/actuator/health | jq '.components'
curl -s http://localhost:8080/actuator/metrics | jq '.names[]' | grep jvm

# View all registered beans
http :8080/actuator/beans | jq '.contexts.application.beans | keys'

# View route mappings
http :8080/actuator/mappings | jq '..'
```

---

#### Containers & Deploy for Spring Apps

```bash
# Build image with Buildpacks (no Dockerfile)
./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=my-app:latest

# Build with Jib (faster, no Docker daemon)
./mvnw compile com.google.cloud.tools:jib-maven-plugin:3.4.0:dockerBuild

# Quarkus — native Docker build
quarkus build --native -Dquarkus.native.container-build=true

# Inspect image layers
brew install dive
dive my-app:latest
```

---

#### Complete Java/Spring Boot Setup

```bash
# 1. SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 2. JDK + build tools
sdk install java 21.0.5-tem
sdk install maven
sdk install mvnd        # Parallel Maven
sdk install springboot  # Spring Boot CLI

# 3. Create project
spring init \
  --dependencies=web,data-jpa,actuator,security,lombok,validation \
  --build=maven \
  --java-version=21 \
  my-project
cd my-project

# 4. Pin JDK version per project
sdk env init
# Edit .sdkmanrc to pin: java=21.0.5-tem

# 5. Git essentials
brew install gh lazygit git-delta ripgrep fd bat jq httpie gitleaks

# 6. Database
brew install pgcli flyway

# 7. Docker for local dependencies
brew install lazydocker

# 8. Run the project
./mvnw spring-boot:run
```

**Tip:** With `spring-boot-devtools` in `pom.xml`, code changes auto-restart without Maven:
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>
```

---

### Monitoring & Performance

| Tool | Install | Why |
|-----------|---------|----------|
| **htop** | `brew install htop` | Interactive process monitor |
| **btop** | `brew install btop` | Full system monitor (CPU, mem, disk, net) |
| **bandwhich** | `brew install bandwhich` | Real-time bandwidth usage per process |
| **hyperfine** | `brew install hyperfine` | Command benchmarking with statistics |
| **vegeta** | `brew install vegeta` | HTTP API load testing |

---

## Setup by Project Type

### Web Project (Node/React/Next)

```bash
# Essentials
brew install gh lazygit git-delta ripgrep fd fzf bat eza zoxide jq just

# Node
brew install fnm
npm i -g pnpm tsx npm-check-updates serve

# Development
npm i -g release-it depcheck
```

### Python/Backend Project

```bash
# Essentials
brew install gh lazygit git-delta ripgrep fd fzf bat eza zoxide jq just

# Python
brew install pyenv uv ruff
pip install httpie pgcli rich

# Security
brew install gitleaks
```

### Full-Stack with Docker

```bash
# Essentials
brew install gh lazygit ripgrep fd bat jq

# Docker/Infra
brew install lazydocker ctop dive k9s

# APIs
brew install httpie
```

### Java/Spring Boot Project

```bash
# SDKMAN (installs all Java ecosystem tools)
curl -s "https://get.sdkman.io" | bash && source "$HOME/.sdkman/bin/sdkman-init.sh"

# JDK + build
sdk install java 21.0.5-tem
sdk install maven
sdk install mvnd        # Parallel Maven
sdk install springboot  # Spring Boot CLI

# Terminal essentials
brew install gh lazygit git-delta ripgrep fd bat jq httpie gitleaks

# Database
brew install pgcli flyway

# Docker for local dependencies
brew install lazydocker
```

---

## When to Install What

| Situation | Install |
|----------|---------|
| Starting any project | `gh`, `ripgrep`, `fd`, `bat`, `fzf`, `jq`, `just` |
| Before commit | `gitleaks` (scan secrets), `git-delta` (readable diff) |
| Testing APIs | `httpie` or `xh`, `websocat` for WS |
| Debugging containers | `lazydocker`, `ctop`, `dive` |
| New Node project | `fnm`, `pnpm`, `tsx`, `npm-check-updates` |
| New Python project | `uv`, `ruff`, `pyenv` |
| New Java/Spring project | `sdkman`, JDK 21 Temurin, `mvnd`, `springboot` CLI |
| JVM diagnostics | `jps`, `jstack`, `jmap`, `visualvm` |
| SQL migrations | `flyway` or `liquibase` |
| Native image build | GraalVM via SDKMAN + `quarkus build --native` |
| Cloud deploy | `awscli` or equivalent, `mkcert` for local HTTPS |

---

## New Machine Checklist

```bash
# 1. Package manager (macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Core
brew install git gh ripgrep fd bat eza fzf zoxide jq yq just direnv starship

# 3. Git setup
brew install lazygit git-delta
gh auth login

# 4. Shell (add to .zshrc / .bashrc)
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
eval "$(direnv hook zsh)"

# 5. Node
brew install fnm
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
fnm install --lts
npm i -g pnpm tsx

# 6. Security
brew install gitleaks
```
