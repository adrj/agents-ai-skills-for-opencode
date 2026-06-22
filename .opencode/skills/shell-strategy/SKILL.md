---
name: shell-strategy
description: Avoid interactive shell commands that hang in non-TTY environments. Teaches the agent to use non-interactive flags, bypass prompts, and avoid TTY-dependent tools.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [shell, terminal, reliability, workflow]
metadata:
  source: https://github.com/JRedeker/opencode-shell-strategy
  adapted-for: opencode
---

# Shell Non-Interactive Strategy

OpenCode's shell is **non-interactive** — no TTY/PTY. Commands that wait for input, confirmation, or launch a UI will hang and timeout.

## Core Mandates

1. **Assume `CI=true`** — act like a headless CI/CD pipeline
2. **No editors/pagers**: `vim`, `nano`, `less`, `more`, `man` are banned
3. **Force & Yes**: always preemptively supply `-y`, `-f`, `--yes` flags
4. **Prefer opencode tools** (`Read`/`Write`/`Edit`) over shell manipulation
5. **No interactive modes**: never use `-i`, `-p` flags

## Environment Variables (auto-set when possible)

`CI=true` `DEBIAN_FRONTEND=noninteractive` `GIT_TERMINAL_PROMPT=0` `GIT_PAGER=cat` `PAGER=cat` `PIP_NO_INPUT=1`

## Quick Reference

| Tool | BAD (hangs) | GOOD |
|------|------------|------|
| npm init | `npm init` | `npm init -y` |
| apt install | `apt-get install pkg` | `apt-get install -y pkg` |
| pip install | `pip install pkg` | `pip install --no-input pkg` |
| git commit | `git commit` | `git commit -m "msg"` |
| git merge | `git merge branch` | `git merge --no-edit branch` |
| git log | `git log` | `git log --no-pager -n 10` |
| rm | `rm file` | `rm -f file` |
| cp/mv | `cp -i a b` | `cp -f a b` |
| unzip | `unzip file.zip` | `unzip -o file.zip` |
| ssh | `ssh host` | `ssh -o BatchMode=yes host` |
| curl | `curl url` | `curl -fsSL url` |
| docker run | `docker run -it image` | `docker run image` |
| python | `python` | `python -c "code"` |

## Handling Commands Without Non-Interactive Flags

```bash
yes | ./install_script.sh
./configure.sh <<< "option1"
timeout 30 ./script.sh || echo "Timed out"
```

## Banned Commands

`vim` `nano` `vi` `emacs` `less` `more` `man` `git add -p` `git rebase -i` `python` (REPL) `node` (REPL) `bash -i`
