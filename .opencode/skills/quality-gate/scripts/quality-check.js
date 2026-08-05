#!/usr/bin/env node

/**
 * Quality Gate — Catraca de Qualidade
 * 
 * Compara métricas atuais do projeto contra um baseline congelado.
 * Bloqueia qualquer regressão.
 * 
 * Uso: node quality-check.js
 * 
 * Primeira execução: cria baseline.json
 * Execuções seguintes: compara e bloqueia regressões
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Config ────────────────────────────────────────────────────────────────

const CONFIG = {
  qualityDir: path.resolve(__dirname, '..', '..', '..', '..', 'quality-gate'),
  baselineFile: 'baseline.json',
  targetFile: 'templates/target.json',
  projectRoot: path.resolve(__dirname, '..', '..', '..', '..'),
  minBar: {
    lint_errors: 0,
    duplication_percent: 3.0,
    complexity_per_function: 10,
    max_file_lines: 500,
    max_function_lines: 50,
    test_coverage_percent: 0  // No minimum — just don't get worse
  }
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJSON(filepath) {
  if (!fs.existsSync(filepath)) return null;
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function writeJSON(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n');
}

function safeExec(cmd, fallback = '') {
  try {
    return execSync(cmd, { cwd: CONFIG.projectRoot, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return fallback;
  }
}

// ─── Collectors ────────────────────────────────────────────────────────────

function collectLintMetrics() {
  let errors = 0;
  let warnings = 0;

  // Try ESLint
  const eslintOutput = safeExec('npx eslint . --format json 2>/dev/null');
  if (eslintOutput) {
    try {
      const results = JSON.parse(eslintOutput);
      for (const r of results) {
        errors += r.errorCount || 0;
        warnings += r.warningCount || 0;
      }
    } catch {}
  }

  return { errors, warnings, total: errors + warnings };
}

function collectDuplicationMetrics() {
  let percent = 0;
  let totalLines = 0;
  let duplicatedLines = 0;

  // Try jscpd
  const jscpdOutput = safeExec('npx jscpd --output . --silent 2>/dev/null');
  if (jscpdOutput) {
    const match = jscpdOutput.match(/Clone detection finished\. Found (\d+) clones \((\d+) duplicated lines from (\d+) total lines, ([\d.]+)%/);
    if (match) {
      duplicatedLines = parseInt(match[2]) || 0;
      totalLines = parseInt(match[3]) || 0;
      percent = parseFloat(match[4]) || 0;
    }
  }

  return { percent, duplicatedLines, totalLines };
}

function collectCoverageMetrics() {
  let percent = 0;

  // Try to find coverage summary
  const coveragePaths = [
    'coverage/coverage-summary.json',
    'coverage/lcov-report/index.html'
  ];

  for (const cp of coveragePaths) {
    const fullPath = path.join(CONFIG.projectRoot, cp);
    if (fs.existsSync(fullPath)) {
      if (cp.endsWith('.json')) {
        const data = readJSON(fullPath);
        if (data?.total?.lines?.pct !== undefined) {
          percent = data.total.lines.pct;
          break;
        }
      }
    }
  }

  return { percent };
}

function collectFileSizeMetrics() {
  const maxLinesLimit = CONFIG.minBar.max_file_lines;
  let filesOverLimit = 0;
  let largestFileName = '';
  let largestFileLines = 0;

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build', 'coverage', '.next', 'target'].includes(entry.name)) continue;
        walkDir(fullPath);
      } else if (/\.(js|ts|jsx|tsx|java|py|go|rs|rb|php)$/.test(entry.name)) {
        try {
          const lines = fs.readFileSync(fullPath, 'utf-8').split('\n').length;
          if (lines > maxLinesLimit) filesOverLimit++;
          if (lines > largestFileLines) {
            largestFileLines = lines;
            largestFileName = path.relative(CONFIG.projectRoot, fullPath);
          }
        } catch {}
      }
    }
  }

  walkDir(CONFIG.projectRoot);

  return { filesOverLimit, largestFileName, largestFileLines, limit: maxLinesLimit };
}

// ─── Main ──────────────────────────────────────────────────────────────────

function collectAllMetrics() {
  console.log('📊 Coletando métricas...\n');

  const lint = collectLintMetrics();
  const duplication = collectDuplicationMetrics();
  const coverage = collectCoverageMetrics();
  const fileSize = collectFileSizeMetrics();

  const metrics = {
    collected_at: new Date().toISOString(),
    lint_errors: lint.errors,
    lint_warnings: lint.warnings,
    lint_total: lint.total,
    duplication_percent: duplication.percent,
    test_coverage_percent: coverage.percent,
    files_over_limit: fileSize.filesOverLimit,
    largest_file: fileSize.largestFileName,
    largest_file_lines: fileSize.largestFileLines,
    max_file_lines: fileSize.limit
  };

  return { metrics, lint, duplication, coverage, fileSize };
}

function checkMinBar(metrics) {
  const violations = [];

  if (metrics.lint_errors > CONFIG.minBar.lint_errors) {
    violations.push(`❌ Lint errors: ${metrics.lint_errors} (mínimo: ${CONFIG.minBar.lint_errors})`);
  }
  if (metrics.duplication_percent > CONFIG.minBar.duplication_percent) {
    violations.push(`❌ Duplicação: ${metrics.duplication_percent}% (mínimo: ≤${CONFIG.minBar.duplication_percent}%)`);
  }
  if (metrics.files_over_limit > 0) {
    violations.push(`❌ Arquivos acima do limite (${metrics.max_file_lines} linhas): ${metrics.files_over_limit}`);
  }

  return violations;
}

function compareWithBaseline(current, baseline) {
  const regressions = [];

  const checks = [
    ['lint_errors', 'Erros de lint', '↑'],
    ['duplication_percent', 'Duplicação %', '↑'],
    ['files_over_limit', 'Arquivos acima do limite', '↑'],
    ['test_coverage_percent', 'Cobertura de testes %', '↓']
  ];

  for (const [key, label, direction] of checks) {
    const curr = current[key];
    const base = baseline[key];
    if (curr === undefined || base === undefined) continue;

    if (direction === '↑' && curr > base) {
      regressions.push({ key, label, baseline: base, current: curr, direction: 'worsened' });
    } else if (direction === '↓' && curr < base) {
      regressions.push({ key, label, baseline: base, current: curr, direction: 'worsened' });
    }
  }

  return regressions;
}

function generateReport(current, baseline, regressions, minBarViolations) {
  const lines = [];
  lines.push('# 📊 Quality Gate Report');
  lines.push('');
  lines.push(`**Data:** ${new Date().toISOString().split('T')[0]}`);
  lines.push(`**Projeto:** ${path.basename(CONFIG.projectRoot)}`);
  lines.push('');

  if (!baseline) {
    lines.push('## 🔍 Primeira Execução — Baseline Criado');
    lines.push('');
  }

  lines.push('## Métricas');
  lines.push('');
  lines.push('| Métrica | Atual | Baseline | Status |');
  lines.push('|---------|-------|----------|--------|');

  const displayBaseline = baseline || {};
  const entries = [
    ['lint_errors', 'Erros de lint'],
    ['lint_warnings', 'Warnings de lint'],
    ['duplication_percent', 'Duplicação %'],
    ['test_coverage_percent', 'Cobertura %'],
    ['files_over_limit', 'Arquivos > limite'],
  ];

  for (const [key, label] of entries) {
    const curr = current[key] ?? '?';
    const base = displayBaseline[key] ?? '-';
    const regression = regressions?.find(r => r.key === key);
    const status = regression ? '❌ PIOROU' : (base === '-' ? '🆕' : '✅');
    const formattedCurr = typeof curr === 'number' ? (Number.isInteger(curr) ? curr : curr.toFixed(1)) : curr;
    const formattedBase = typeof base === 'number' ? (Number.isInteger(base) ? base : base.toFixed(1)) : base;
    lines.push(`| ${label} | ${formattedCurr} | ${formattedBase} | ${status} |`);
  }

  if (current.largest_file) {
    lines.push(`| Maior arquivo | ${current.largest_file_lines} linhas | - | ${current.largest_file} |`);
  }

  lines.push('');

  if (minBarViolations && minBarViolations.length > 0) {
    lines.push('## ⚠️ Barra Mínima Não Atingida');
    lines.push('');
    for (const v of minBarViolations) lines.push(`- ${v}`);
    lines.push('');
    lines.push('**Ação necessária:** As violações devem ser corrigidas antes de congelar o baseline.');
    lines.push('Execute as correções com `@qa-engineer` e `@refactorer`.');
    lines.push('');
  }

  if (regressions && regressions.length > 0) {
    lines.push('## ❌ QUALITY GATE FAILED');
    lines.push('');
    lines.push('As seguintes métricas pioraram:');
    lines.push('');
    for (const r of regressions) {
      lines.push(`- **${r.label}**: ${r.baseline} → ${r.current} (piorou)`);
    }
    lines.push('');
    lines.push('**Ação necessária:** Corrija as regressões antes de prosseguir.');
  } else if (baseline) {
    lines.push('## ✅ QUALITY GATE PASSED');
    lines.push('');
    lines.push('Todas as métricas estão iguais ou melhores que o baseline.');
  }

  return lines.join('\n');
}

// ─── Entry ─────────────────────────────────────────────────────────────────

function main() {
  ensureDir(CONFIG.qualityDir);

  const { metrics: current } = collectAllMetrics();
  const baselinePath = path.join(CONFIG.qualityDir, CONFIG.baselineFile);
  let baseline = readJSON(baselinePath);

  // ── First run: check min bar, freeze baseline ──────────────────────────
  if (!baseline) {
    const violations = checkMinBar(current);

    if (violations.length > 0) {
      const report = generateReport(current, null, null, violations);
      console.log(report);
      console.log('\n⚠️  Baseline NÃO foi congelado — corrija as violações primeiro.');
      process.exit(1);
    }

    // Freeze baseline
    const frozen = {
      project: path.basename(CONFIG.projectRoot),
      frozen_at: new Date().toISOString(),
      metrics: current,
      min_bar: CONFIG.minBar,
      rules: {
        allow_worsening: false,
        block_on_regression: true
      }
    };
    writeJSON(baselinePath, frozen);

    const report = generateReport(current, null, null, null);
    console.log(report);
    console.log(`\n✅ Baseline congelado em ${CONFIG.qualityDir}/baseline.json`);
    console.log('   A partir de agora, nenhuma métrica pode piorar.');
    process.exit(0);
  }

  // ── Subsequent runs: compare against baseline ─────────────────────────
  const regressions = compareWithBaseline(current, baseline.metrics);

  const report = generateReport(current, baseline.metrics, regressions, null);
  console.log(report);

  if (regressions.length > 0) {
    console.log(`\n❌ ${regressions.length} métrica(s) pioraram. Corrija as regressões.`);
    process.exit(1);
  }

  console.log('\n✅ Nenhuma regressão detectada.');
  process.exit(0);
}

main();
