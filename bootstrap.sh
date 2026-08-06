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

# 1. opencode.json
if [ ! -f "$TARGET/opencode.json" ]; then
  echo "  ✅ Criando opencode.json"
  cat > "$TARGET/opencode.json" << 'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"]
}
EOF
else
  echo "  ⏭️  opencode.json já existe"
fi

# 2. AGENTS.md (link or copy from global)
if [ ! -f "$TARGET/AGENTS.md" ]; then
  echo "  ✅ Copiando AGENTS.md (modo systemico)"
  cp "$GLOBAL/AGENTS.md" "$TARGET/AGENTS.md"
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

echo ""
echo "✅ Bootstrap completo!"
echo ""
echo "O que o agente fará na primeira execução:"
echo "  1. Detectar que baseline.json não existe → quality-gate (auto-audit)"
echo "  2. Detectar que CONTEXT.md não existe → domain-modeling (glossary)"
echo "  3. Projeto pronto para desenvolvimento com fluxo spec-first"
echo ""
echo "Execute: cd $TARGET && opencode"
