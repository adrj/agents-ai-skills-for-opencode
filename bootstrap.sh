#!/usr/bin/env bash
set -e
# opencode-skeleton/bootstrap.sh
# Bootstrap a new project using the OpenCode global skeleton.
# Usage: bootstrap.sh /path/to/new-project

TARGET="${1:-.}"

if [ ! -d "$TARGET" ]; then
  echo "❌ Diretório não existe: $TARGET"
  exit 1
fi

GLOBAL="$HOME/.config/opencode"
SKELETON="$GLOBAL/skeleton-bootstrap"

echo "🚀 Bootstrapping OpenCode skeleton em: $TARGET"
echo ""

# 1. opencode.json + AGENTS.md
if [ ! -f "$TARGET/opencode.json" ]; then
  echo "  ✅ Criando opencode.json"
  
  # Check if AGENTS.md exists locally
  if [ -f "$TARGET/AGENTS.md" ]; then
    # Local AGENTS.md exists - use relative path
    cat > "$TARGET/opencode.json" << 'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"]
}
EOF
    echo "  ℹ️  Usando AGENTS.md local"
  else
    # No local AGENTS.md - use global path
    cat > "$TARGET/opencode.json" << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "instructions": ["~/.config/opencode/AGENTS.md"]
}
EOF
    echo "  ℹ️  Usando AGENTS.md global (sem cópia)"
  fi
else
  echo "  ⏭️  opencode.json já existe"
fi

# 2. AGENTS.md (only copy if local doesn't exist)
if [ ! -f "$TARGET/AGENTS.md" ]; then
  echo "  ✅ Copiando AGENTS.md do global"
  cp "$GLOBAL/AGENTS.md" "$TARGET/AGENTS.md"
  echo "  ℹ️  AGENTS.md copiado para o projeto"
else
  echo "  ⏭️  AGENTS.md já existe"
fi

# 3. .opencode/agents (link to global to always get updates)
if [ ! -d "$TARGET/.opencode/agents" ]; then
  echo "  ✅ Link simbólico: .opencode/agents → $GLOBAL/agents"
  mkdir -p "$TARGET/.opencode"
  ln -sf "$GLOBAL/agents" "$TARGET/.opencode/agents"
else
  echo "  ⏭️  .opencode/agents já existe"
fi

# 4. .opencode/skills (link to global to always get updates)
if [ ! -d "$TARGET/.opencode/skills" ]; then
  echo "  ✅ Link simbólico: .opencode/skills → $GLOBAL/skills"
  mkdir -p "$TARGET/.opencode"
  ln -sf "$GLOBAL/skills" "$TARGET/.opencode/skills"
else
  echo "  ⏭️  .opencode/skills já existe"
fi

# 5. .github (PR template + CI pipeline)
if [ ! -d "$TARGET/.github" ]; then
  echo "  ✅ Copiando .github/ (PR template + CI pipeline)"
  cp -r "$GLOBAL/.github" "$TARGET/.github"
else
  echo "  ⏭️  .github/ já existe"
fi

# 6. docs/guidelines (copy from global template, then customize)
if [ ! -d "$TARGET/docs/guidelines" ]; then
  echo "  ✅ Copiando docs/guidelines/ (template com placeholders)"
  mkdir -p "$TARGET/docs"
  cp -r "$GLOBAL/guidelines" "$TARGET/docs/guidelines"
  echo "     ⚠️  Substitua {{VARIAVEL}} pelos valores do seu projeto"
  echo "     Veja docs/guidelines/README.md para a lista de placeholders"
else
  echo "  ⏭️  docs/guidelines já existe"
fi

# 7. quality-gate (baseline template)
if [ ! -d "$TARGET/quality-gate" ]; then
  echo "  ✅ Criando quality-gate/ (baseline template)"
  mkdir -p "$TARGET/quality-gate"
  cp "$GLOBAL/skills/quality-gate/templates/baseline.json" "$TARGET/quality-gate/baseline.json"
else
  echo "  ⏭️  quality-gate/ já existe"
fi

# 8. Git hooks (pre-commit + pre-push)
if [ ! -d "$TARGET/.husky" ] && [ ! -d "$TARGET/.git/hooks" ]; then
  echo "  ⏭️  Git hooks: nenhum sistema de hooks detectado"
else
  if [ ! -f "$TARGET/.husky/pre-commit" ]; then
    echo "  ✅ Criando .husky/pre-commit (lint + format + tests)"
    mkdir -p "$TARGET/.husky"
    cp "$GLOBAL/skills/quality-gate/hooks/pre-commit" "$TARGET/.husky/pre-commit"
    chmod +x "$TARGET/.husky/pre-commit"
  else
    echo "  ⏭️  .husky/pre-commit já existe"
  fi

  if [ ! -f "$TARGET/.husky/pre-push" ]; then
    echo "  ✅ Criando .husky/pre-push (quality gate)"
    cp "$GLOBAL/skills/quality-gate/hooks/pre-push" "$TARGET/.husky/pre-push"
    chmod +x "$TARGET/.husky/pre-push"
  else
    echo "  ⏭️  .husky/pre-push já existe"
  fi
fi

# 9. husky + lint-staged (Node.js projects only)
if [ -f "$TARGET/package.json" ]; then
  echo "  📦 Detectado projeto Node.js"

  # Install husky + lint-staged if not present
  if ! grep -q '"husky"' "$TARGET/package.json" 2>/dev/null; then
    echo "  ✅ Instalando husky + lint-staged + commitlint"
    cd "$TARGET"
    npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional 2>/dev/null || true

    # Initialize husky
    npx husky init 2>/dev/null || true

    # Add prepare script to package.json
    if ! grep -q '"prepare"' "$TARGET/package.json"; then
      sed -i 's/"preview"/"preview",\n    "prepare": "husky"/' "$TARGET/package.json" 2>/dev/null || true
    fi

    echo "     ✅ husky + lint-staged + commitlint instalados"
  else
    echo "  ⏭️  husky já configurado"
  fi
fi

echo ""
echo "✅ Bootstrap completo!"
echo ""
echo "Fluxo de trabalho:"
echo "  1. Criar feature branch: git checkout -b feature/minha-feature"
echo "  2. Fazer commits (hooks rodam automaticamente)"
echo "  3. Push para develop: git push origin feature/minha-feature"
echo "  4. Criar PR: develop → main"
echo "  5. CI roda automaticamente (test + quality-gate)"
echo "  6. Após aprovação, merge no main"
echo ""
echo "Branch protection (configurar manualmente no GitHub):"
echo "  - Branch: main"
echo "  - Required checks: quality-gate, test"
echo "  - Require PR: 1 approval"
echo "  - Dismiss stale reviews: true"
echo ""
echo "Execute: cd $TARGET && opencode"
