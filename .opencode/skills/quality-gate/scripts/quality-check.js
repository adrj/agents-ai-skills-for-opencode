#!/usr/bin/env node

/**
 * Quality Gate — Complete Metrics Report (Generic)
 * 
 * Comprehensive quality report with baseline comparison.
 * Works with any project type (Java/Maven, Node.js, etc.)
 * Style inspired by Lucas Montano's quality gate.
 * 
 * Run from project root: node .opencode/skills/quality-gate/scripts/quality-check.js
 * 
 * First run: freezes baseline.json
 * Subsequent runs: compares and blocks regressions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.cwd();
const baselinePath = path.join(projectRoot, 'quality-gate', 'baseline.json');

// ─── Thresholds (configurable per project) ───────────────────────────────────

const DEFAULT_THRESHOLDS = {
  coverage_lines: 60,
  coverage_statements: 60,
  coverage_functions: 60,
  coverage_branches: 50,
  duplication_percentage: 10,
  lint_errors: 0,
  checkstyle_violations: 50,
  pmd_violations: 20,
  spotbugs_warnings: 10,
  cve_critical: 0,
  cve_high: 0,
  files_over_limit: 0,
};

function safeExec(cmd, fallback = '') {
  try {
    return execSync(cmd, { cwd: projectRoot, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return fallback;
  }
}

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  } catch {
    return null;
  }
}

function saveBaseline(data) {
  const dir = path.dirname(baselinePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(baselinePath, JSON.stringify(data, null, 2) + '\n');
}

// ─── Auto-detect project type ────────────────────────────────────────────────

function detectProjectType() {
  if (fs.existsSync(path.join(projectRoot, 'pom.xml')) || fs.existsSync(path.join(projectRoot, 'app-core', 'pom.xml'))) {
    return 'java-maven';
  }
  if (fs.existsSync(path.join(projectRoot, 'package.json'))) {
    return 'node';
  }
  if (fs.existsSync(path.join(projectRoot, 'go.mod'))) {
    return 'go';
  }
  if (fs.existsSync(path.join(projectRoot, 'pyproject.toml')) || fs.existsSync(path.join(projectRoot, 'setup.py'))) {
    return 'python';
  }
  return 'unknown';
}

// ─── Coverage from JaCoCo CSV (Java/Maven) ───────────────────────────────────

function collectJaCoCoCoverage() {
  const possiblePaths = [
    'app-core/target/site/jacoco/jacoco.csv',
    'target/site/jacoco/jacoco.csv',
    'build/reports/jacoco/jacoco.csv',
  ];

  for (const csvPath of possiblePaths) {
    const fullPath = path.join(projectRoot, csvPath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());
        
        let totalInstructionMissed = 0, totalInstructionCovered = 0;
        let totalBranchMissed = 0, totalBranchCovered = 0;
        let totalLineMissed = 0, totalLineCovered = 0;
        let totalMethodMissed = 0, totalMethodCovered = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',');
          if (cols.length >= 13) {
            totalInstructionMissed += parseInt(cols[3]) || 0;
            totalInstructionCovered += parseInt(cols[4]) || 0;
            totalBranchMissed += parseInt(cols[5]) || 0;
            totalBranchCovered += parseInt(cols[6]) || 0;
            totalLineMissed += parseInt(cols[7]) || 0;
            totalLineCovered += parseInt(cols[8]) || 0;
            totalMethodMissed += parseInt(cols[11]) || 0;
            totalMethodCovered += parseInt(cols[12]) || 0;
          }
        }

        const instructionTotal = totalInstructionMissed + totalInstructionCovered;
        const branchTotal = totalBranchMissed + totalBranchCovered;
        const lineTotal = totalLineMissed + totalLineCovered;
        const methodTotal = totalMethodMissed + totalMethodCovered;

        return {
          lines: lineTotal > 0 ? (totalLineCovered / lineTotal * 100) : 0,
          statements: instructionTotal > 0 ? (totalInstructionCovered / instructionTotal * 100) : 0,
          functions: methodTotal > 0 ? (totalMethodCovered / methodTotal * 100) : 0,
          branches: branchTotal > 0 ? (totalBranchCovered / branchTotal * 100) : 0,
        };
      } catch {}
    }
  }

  return null;
}

// ─── Coverage from V8/Istanbul (Node.js) ─────────────────────────────────────

function collectNodeCoverage() {
  const possiblePaths = [
    'coverage/coverage-summary.json',
    'coverage/lcov-report/index.html',
  ];

  for (const coveragePath of possiblePaths) {
    const fullPath = path.join(projectRoot, coveragePath);
    if (fs.existsSync(fullPath) && fullPath.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        if (data.total) {
          return {
            lines: data.total.lines?.pct || 0,
            statements: data.total.statements?.pct || 0,
            functions: data.total.functions?.pct || 0,
            branches: data.total.branches?.pct || 0,
          };
        }
      } catch {}
    }
  }

  return null;
}

function collectCoverageMetrics() {
  const projectType = detectProjectType();
  
  if (projectType === 'java-maven') {
    return collectJaCoCoCoverage() || { lines: 0, statements: 0, functions: 0, branches: 0 };
  }
  
  if (projectType === 'node') {
    return collectNodeCoverage() || { lines: 0, statements: 0, functions: 0, branches: 0 };
  }

  return { lines: 0, statements: 0, functions: 0, branches: 0 };
}

// ─── Duplication from jscpd ──────────────────────────────────────────────────

function collectDuplicationMetrics() {
  const jscpdOutputPath = path.join(projectRoot, 'tmp', 'jscpd-report.json');
  const dir = path.dirname(jscpdOutputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const projectType = detectProjectType();
  let format = 'typescript,javascript';
  if (projectType === 'java-maven') format = 'java';
  if (projectType === 'python') format = 'python';

  safeExec(`npx jscpd --format "${format}" --output tmp --reporters json --silent 2>/dev/null`);

  if (fs.existsSync(jscpdOutputPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(jscpdOutputPath, 'utf-8'));
      const stats = report.statistics?.total || report.statistics || {};
      const total = stats.lines || 0;
      const duplicated = stats.duplicatedLines || 0;
      const percentage = total > 0 ? (duplicated / total * 100) : 0;
      const fragments = stats.clones || 0;

      return { percentage, fragments, totalLines: total, duplicatedLines: duplicated };
    } catch {}
  }

  return { percentage: 0, fragments: 0, totalLines: 0, duplicatedLines: 0 };
}

// ─── Lint Metrics ────────────────────────────────────────────────────────────

function collectLintMetrics() {
  const projectType = detectProjectType();
  let errors = 0;
  let warnings = 0;

  if (projectType === 'node') {
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
  }

  return { errors, warnings, total: errors + warnings };
}

// ─── Checkstyle Metrics (Java) ───────────────────────────────────────────────

function collectCheckstyleMetrics() {
  const projectType = detectProjectType();
  if (projectType !== 'java-maven') return { warnings: 0, errors: 0, total: 0 };

  const possiblePaths = [
    'app-core/target/checkstyle-result.xml',
    'target/checkstyle-result.xml',
  ];

  // Try to run checkstyle
  safeExec('./mvnw checkstyle:checkstyle -q 2>/dev/null');

  for (const reportPath of possiblePaths) {
    const fullPath = path.join(projectRoot, reportPath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(/severity="warning"/g);
        const errs = content.match(/severity="error"/g);
        return {
          warnings: matches ? matches.length : 0,
          errors: errs ? errs.length : 0,
          total: (matches ? matches.length : 0) + (errs ? errs.length : 0),
        };
      } catch {}
    }
  }

  return { warnings: 0, errors: 0, total: 0 };
}

// ─── PMD Metrics (Java) ──────────────────────────────────────────────────────

function collectPmdMetrics() {
  const projectType = detectProjectType();
  if (projectType !== 'java-maven') return { violations: 0 };

  const possiblePaths = [
    'app-core/target/pmd.xml',
    'target/pmd.xml',
  ];

  safeExec('./mvnw pmd:pmd -q 2>/dev/null');

  for (const reportPath of possiblePaths) {
    const fullPath = path.join(projectRoot, reportPath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const violations = content.match(/<violation/g);
        return { violations: violations ? violations.length : 0 };
      } catch {}
    }
  }

  return { violations: 0 };
}

// ─── SpotBugs Metrics (Java) ─────────────────────────────────────────────────

function collectSpotBugsMetrics() {
  const projectType = detectProjectType();
  if (projectType !== 'java-maven') return { warnings: 0 };

  const possiblePaths = [
    'app-core/target/spotbugsXml.xml',
    'target/spotbugsXml.xml',
  ];

  safeExec('./mvnw spotbugs:spotbugs -q 2>/dev/null');

  for (const reportPath of possiblePaths) {
    const fullPath = path.join(projectRoot, reportPath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const bugs = content.match(/<BugInstance/g);
        return { warnings: bugs ? bugs.length : 0 };
      } catch {}
    }
  }

  return { warnings: 0 };
}

// ─── OWASP Dependency Check (Java) ───────────────────────────────────────────

function collectOwaspMetrics() {
  const projectType = detectProjectType();
  if (projectType !== 'java-maven') return { critical: 0, high: 0, medium: 0, low: 0, total: 0 };

  const possiblePaths = [
    'app-core/target/dependency-check-report.json',
    'target/dependency-check-report.json',
  ];

  safeExec('./mvnw dependency-check:check -q 2>/dev/null');

  for (const reportPath of possiblePaths) {
    const fullPath = path.join(projectRoot, reportPath);
    if (fs.existsSync(fullPath)) {
      try {
        const report = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        const dependencies = report.dependencies || [];
        let critical = 0, high = 0, medium = 0, low = 0;

        for (const dep of dependencies) {
          const vulnerabilities = dep.vulnerabilities || [];
          for (const vuln of vulnerabilities) {
            const severity = (vuln.severity || '').toLowerCase();
            if (severity === 'critical') critical++;
            else if (severity === 'high') high++;
            else if (severity === 'medium') medium++;
            else if (severity === 'low') low++;
          }
        }

        return { critical, high, medium, low, total: critical + high + medium + low };
      } catch {}
    }
  }

  return { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
}

// ─── File Size Metrics ───────────────────────────────────────────────────────

function collectFileSizeMetrics() {
  let filesOver500 = 0;
  let filesOverLimit = 0;
  let largestFileName = '';
  let largestFileLines = 0;
  let totalFiles = 0;

  const extensions = detectProjectType() === 'java-maven'
    ? /\.(java)$/
    : /\.(js|ts|jsx|tsx|py|go|rs|rb|php)$/;

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build', 'coverage', '.next', 'target', 'tmp', '.venv', 'vendor'].includes(entry.name)) continue;
        walkDir(fullPath);
      } else if (extensions.test(entry.name)) {
        try {
          totalFiles++;
          const lines = fs.readFileSync(fullPath, 'utf-8').split('\n').length;
          if (lines > 500) filesOver500++;
          if (lines > 1400) filesOverLimit++;
          if (lines > largestFileLines) {
            largestFileLines = lines;
            largestFileName = path.relative(projectRoot, fullPath);
          }
        } catch {}
      }
    }
  }

  walkDir(projectRoot);

  return { filesOver500, filesOverLimit, largestFileName, largestFileLines, totalFiles };
}

// ─── Complexity from JaCoCo ──────────────────────────────────────────────────

function collectComplexityMetrics() {
  const projectType = detectProjectType();
  if (projectType !== 'java-maven') return { total: 0, avgPerFunction: 0 };

  const possiblePaths = [
    'app-core/target/site/jacoco/jacoco.csv',
    'target/site/jacoco/jacoco.csv',
  ];

  for (const csvPath of possiblePaths) {
    const fullPath = path.join(projectRoot, csvPath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());
        
        let totalComplexityMissed = 0;
        let totalComplexityCovered = 0;
        let totalMethods = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',');
          if (cols.length >= 13) {
            totalComplexityMissed += parseInt(cols[9]) || 0;
            totalComplexityCovered += parseInt(cols[10]) || 0;
            totalMethods += (parseInt(cols[11]) || 0) + (parseInt(cols[12]) || 0);
          }
        }

        const totalComplexity = totalComplexityMissed + totalComplexityCovered;
        const avgComplexity = totalMethods > 0 ? (totalComplexity / totalMethods) : 0;

        return {
          total: totalComplexity,
          avgPerFunction: avgComplexity,
        };
      } catch {}
    }
  }

  return { total: 0, avgPerFunction: 0 };
}

// ─── Report Formatting ───────────────────────────────────────────────────────

function formatDelta(current, baseline, higherIsBetter = true) {
  if (baseline === null || baseline === undefined) return '-';
  const delta = current - baseline;
  const sign = delta >= 0 ? '+' : '';
  const formatted = `${sign}${delta.toFixed(2)}%`;
  
  if (higherIsBetter) {
    return delta > 0 ? `📈 ${formatted}` : delta < 0 ? `📉 ${formatted}` : `➡️ ${formatted}`;
  } else {
    return delta < 0 ? `📈 ${formatted}` : delta > 0 ? `📉 ${formatted}` : `➡️ ${formatted}`;
  }
}

function formatValue(value, decimals = 2) {
  return `${value.toFixed(decimals)}%`;
}

function checkThreshold(metric, value, threshold, higherIsBetter = true) {
  if (threshold === undefined || threshold === null) return '⚠️';
  if (higherIsBetter) {
    return value >= threshold ? '✅' : '❌';
  } else {
    return value <= threshold ? '✅' : '❌';
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const baseline = loadBaseline();
  const thresholds = baseline?.thresholds || DEFAULT_THRESHOLDS;
  const projectType = detectProjectType();
  
  // Collect all metrics
  const coverage = collectCoverageMetrics();
  const duplication = collectDuplicationMetrics();
  const lint = collectLintMetrics();
  const checkstyle = collectCheckstyleMetrics();
  const pmd = collectPmdMetrics();
  const spotbugs = collectSpotBugsMetrics();
  const owasp = collectOwaspMetrics();
  const fileSize = collectFileSizeMetrics();
  const complexity = collectComplexityMetrics();

  // Current metrics object
  const current = {
    coverage_lines: coverage.lines,
    coverage_statements: coverage.statements,
    coverage_functions: coverage.functions,
    coverage_branches: coverage.branches,
    duplication_percentage: duplication.percentage,
    duplication_fragments: duplication.fragments,
    lint_errors: lint.errors,
    lint_warnings: lint.warnings,
    checkstyle_violations: checkstyle.total,
    pmd_violations: pmd.violations,
    spotbugs_warnings: spotbugs.warnings,
    cve_critical: owasp.critical,
    cve_high: owasp.high,
    cve_medium: owasp.medium,
    cve_low: owasp.low,
    complexity_total: complexity.total,
    complexity_avg: complexity.avgPerFunction,
    files_over_500: fileSize.filesOver500,
    files_over_limit: fileSize.filesOverLimit,
    largest_file_lines: fileSize.largestFileLines,
    total_files: fileSize.totalFiles,
  };

  // Generate report
  const reportLines = [];
  reportLines.push('# 📊 Quality Gate Report');
  reportLines.push('');
  reportLines.push(`**Date:** ${new Date().toISOString().split('T')[0]}`);
  reportLines.push(`**Project:** ${path.basename(projectRoot)}`);
  reportLines.push(`**Type:** ${projectType}`);
  reportLines.push('');

  // ── Coverage Section ──────────────────────────────────────────────────────
  reportLines.push('## Coverage');
  reportLines.push('');
  reportLines.push('| Metric | Baseline | Current | Δ | Status |');
  reportLines.push('|--------|----------|---------|---|--------|');

  const coverageMetrics = [
    ['Lines', 'coverage_lines', thresholds.coverage_lines],
    ['Statements', 'coverage_statements', thresholds.coverage_statements],
    ['Functions', 'coverage_functions', thresholds.coverage_functions],
    ['Branches', 'coverage_branches', thresholds.coverage_branches],
  ];

  for (const [name, key, threshold] of coverageMetrics) {
    const baseVal = baseline?.metrics?.[key] ?? null;
    const currVal = current[key];
    const baseStr = baseVal !== null ? formatValue(baseVal) : '-';
    const currStr = formatValue(currVal);
    const delta = baseVal !== null ? formatDelta(currVal, baseVal, true) : '-';
    const status = checkThreshold(name, currVal, threshold, true);
    reportLines.push(`| ${name} | ${baseStr} | ${currStr} | ${delta} | ${status} |`);
  }

  reportLines.push('');

  // ── Duplication Section ───────────────────────────────────────────────────
  reportLines.push('## Duplication');
  reportLines.push('');
  reportLines.push('| Metric | Baseline | Current | Δ | Status |');
  reportLines.push('|--------|----------|---------|---|--------|');

  const dupBasePct = baseline?.metrics?.duplication_percentage ?? null;
  const dupBaseFrag = baseline?.metrics?.duplication_fragments ?? null;
  const dupStatus = checkThreshold('Duplication', current.duplication_percentage, thresholds.duplication_percentage, false);
  reportLines.push(`| Percentage | ${dupBasePct !== null ? formatValue(dupBasePct) : '-'} | ${formatValue(current.duplication_percentage)} | ${dupBasePct !== null ? formatDelta(current.duplication_percentage, dupBasePct, false) : '-'} | ${dupStatus} |`);
  reportLines.push(`| Fragments | ${dupBaseFrag ?? '-'} | ${current.duplication_fragments} | ${dupBaseFrag !== null ? (current.duplication_fragments - dupBaseFrag >= 0 ? `+${current.duplication_fragments - dupBaseFrag}` : `${current.duplication_fragments - dupBaseFrag}`) : '-'} | - |`);

  reportLines.push('');

  // ── Violations Section ────────────────────────────────────────────────────
  reportLines.push('## Violations');
  reportLines.push('');
  reportLines.push('| Metric | Baseline | Current | Δ | Status |');
  reportLines.push('|--------|----------|---------|---|--------|');

  const lintBaseErr = baseline?.metrics?.lint_errors ?? null;
  const checkBase = baseline?.metrics?.checkstyle_violations ?? null;
  const pmdBase = baseline?.metrics?.pmd_violations ?? null;
  const spotBase = baseline?.metrics?.spotbugs_warnings ?? null;
  const fileBase500 = baseline?.metrics?.files_over_500 ?? null;
  const fileBaseLimit = baseline?.metrics?.files_over_limit ?? null;

  const lintStatus = checkThreshold('Lint', current.lint_errors, thresholds.lint_errors, false);
  const checkStatus = checkThreshold('Checkstyle', current.checkstyle_violations, thresholds.checkstyle_violations, false);
  const pmdStatus = checkThreshold('PMD', current.pmd_violations, thresholds.pmd_violations, false);
  const spotStatus = checkThreshold('SpotBugs', current.spotbugs_warnings, thresholds.spotbugs_warnings, false);

  reportLines.push(`| Lint errors | ${lintBaseErr ?? '-'} | ${current.lint_errors} | ${lintBaseErr !== null ? current.lint_errors - lintBaseErr >= 0 ? `+${current.lint_errors - lintBaseErr}` : `${current.lint_errors - lintBaseErr}` : '-'} | ${lintStatus} |`);
  reportLines.push(`| Checkstyle violations | ${checkBase ?? '-'} | ${current.checkstyle_violations} | ${checkBase !== null ? current.checkstyle_violations - checkBase >= 0 ? `+${current.checkstyle_violations - checkBase}` : `${current.checkstyle_violations - checkBase}` : '-'} | ${checkStatus} |`);
  reportLines.push(`| PMD violations | ${pmdBase ?? '-'} | ${current.pmd_violations} | ${pmdBase !== null ? current.pmd_violations - pmdBase >= 0 ? `+${current.pmd_violations - pmdBase}` : `${current.pmd_violations - pmdBase}` : '-'} | ${pmdStatus} |`);
  reportLines.push(`| SpotBugs warnings | ${spotBase ?? '-'} | ${current.spotbugs_warnings} | ${spotBase !== null ? current.spotbugs_warnings - spotBase >= 0 ? `+${current.spotbugs_warnings - spotBase}` : `${current.spotbugs_warnings - spotBase}` : '-'} | ${spotStatus} |`);
  reportLines.push(`| Oversized files (>500) | ${fileBase500 ?? '-'} | ${current.files_over_500} | ${fileBase500 !== null ? current.files_over_500 - fileBase500 >= 0 ? `+${current.files_over_500 - fileBase500}` : `${current.files_over_500 - fileBase500}` : '-'} | - |`);
  reportLines.push(`| Oversized files (>1400) | ${fileBaseLimit ?? '-'} | ${current.files_over_limit} | ${fileBaseLimit !== null ? current.files_over_limit - fileBaseLimit >= 0 ? `+${current.files_over_limit - fileBaseLimit}` : `${current.files_over_limit - fileBaseLimit}` : '-'} | ${checkThreshold('Oversized', current.files_over_limit, thresholds.files_over_limit, false)} |`);

  reportLines.push('');

  // ── Security Section ──────────────────────────────────────────────────────
  reportLines.push('## Security');
  reportLines.push('');
  reportLines.push('| Metric | Baseline | Current | Δ | Status |');
  reportLines.push('|--------|----------|---------|---|--------|');

  const cveCritBase = baseline?.metrics?.cve_critical ?? null;
  const cveHighBase = baseline?.metrics?.cve_high ?? null;
  const cveStatus = checkThreshold('CVE Critical', current.cve_critical, thresholds.cve_critical, false);
  const cveHighStatus = checkThreshold('CVE High', current.cve_high, thresholds.cve_high, false);

  reportLines.push(`| CVEs (critical) | ${cveCritBase ?? '-'} | ${current.cve_critical} | ${cveCritBase !== null ? current.cve_critical - cveCritBase >= 0 ? `+${current.cve_critical - cveCritBase}` : `${current.cve_critical - cveCritBase}` : '-'} | ${cveStatus} |`);
  reportLines.push(`| CVEs (high) | ${cveHighBase ?? '-'} | ${current.cve_high} | ${cveHighBase !== null ? current.cve_high - cveHighBase >= 0 ? `+${current.cve_high - cveHighBase}` : `${current.cve_high - cveHighBase}` : '-'} | ${cveHighStatus} |`);
  reportLines.push(`| CVEs (medium) | ${baseline?.metrics?.cve_medium ?? '-'} | ${current.cve_medium} | - | - |`);
  reportLines.push(`| CVEs (low) | ${baseline?.metrics?.cve_low ?? '-'} | ${current.cve_low} | - | - |`);

  reportLines.push('');

  // ── Complexity Section ────────────────────────────────────────────────────
  reportLines.push('## Complexity');
  reportLines.push('');
  reportLines.push('| Metric | Baseline | Current | Δ |');
  reportLines.push('|--------|----------|---------|---|');

  const compBase = baseline?.metrics?.complexity_total ?? null;
  const compAvgBase = baseline?.metrics?.complexity_avg ?? null;
  reportLines.push(`| Total complexity | ${compBase ?? '-'} | ${current.complexity_total} | ${compBase !== null ? current.complexity_total - compBase >= 0 ? `+${current.complexity_total - compBase}` : `${current.complexity_total - compBase}` : '-'} |`);
  reportLines.push(`| Avg complexity/function | ${compAvgBase !== null ? compAvgBase.toFixed(2) : '-'} | ${current.complexity_avg.toFixed(2)} | ${compAvgBase !== null ? (current.complexity_avg - compAvgBase >= 0 ? '+' : '') + (current.complexity_avg - compAvgBase).toFixed(2) : '-'} |`);

  reportLines.push('');

  // ── Summary ───────────────────────────────────────────────────────────────
  reportLines.push('## Summary');
  reportLines.push('');
  reportLines.push(`- **Total source files:** ${current.total_files}`);
  reportLines.push(`- **Largest file:** ${fileSize.largestFileName} (${fileSize.largestFileLines} lines)`);
  reportLines.push('');

  if (baseline) {
    reportLines.push(`**Baseline frozen at:** ${baseline.frozen_at}`);
  } else {
    reportLines.push('**⚠️ No baseline found — first run. Freezing current metrics.**');
  }

  const report = reportLines.join('\n');

  // Console output
  console.log(report);

  // GitHub Step Summary
  const isCI = process.env.GITHUB_ACTIONS === 'true';
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (isCI && summaryFile) {
    fs.appendFileSync(summaryFile, report + '\n');
    console.log('\n✅ Report written to GitHub Step Summary');
  }

  // ── Freeze baseline on first run ──────────────────────────────────────────
  if (!baseline) {
    const frozen = {
      project: path.basename(projectRoot),
      frozen_at: new Date().toISOString(),
      metrics: current,
      thresholds: thresholds,
    };
    saveBaseline(frozen);
    console.log(`\n✅ Baseline frozen at ${baselinePath}`);
    console.log('   No threshold checks on first run — baseline established.');
    console.log('\n✅ Quality gate PASSED (first run)');
    return;
  }

  // ── Check thresholds (only on subsequent runs) ────────────────────────────
  const violations = [];
  if (current.lint_errors > thresholds.lint_errors) violations.push(`❌ Lint errors: ${current.lint_errors} (max: ${thresholds.lint_errors})`);
  if (current.files_over_limit > thresholds.files_over_limit) violations.push(`❌ Oversized files (>1400): ${current.files_over_limit}`);
  if (current.cve_critical > thresholds.cve_critical) violations.push(`❌ Critical CVEs: ${current.cve_critical}`);
  if (current.cve_high > thresholds.cve_high) violations.push(`❌ High CVEs: ${current.cve_high}`);

  // Coverage thresholds (skip if no coverage data)
  const hasCoverage = current.coverage_lines > 0 || current.coverage_statements > 0;
  if (hasCoverage) {
    if (current.coverage_lines < thresholds.coverage_lines) violations.push(`❌ Coverage lines: ${current.coverage_lines.toFixed(1)}% (min: ${thresholds.coverage_lines}%)`);
    if (current.coverage_statements < thresholds.coverage_statements) violations.push(`❌ Coverage statements: ${current.coverage_statements.toFixed(1)}% (min: ${thresholds.coverage_statements}%)`);
    if (current.coverage_functions < thresholds.coverage_functions) violations.push(`❌ Coverage functions: ${current.coverage_functions.toFixed(1)}% (min: ${thresholds.coverage_functions}%)`);
    if (current.coverage_branches < thresholds.coverage_branches) violations.push(`❌ Coverage branches: ${current.coverage_branches.toFixed(1)}% (min: ${thresholds.coverage_branches}%)`);
  }

  // Duplication threshold
  if (current.duplication_percentage > thresholds.duplication_percentage) violations.push(`❌ Duplication: ${current.duplication_percentage.toFixed(1)}% (max: ${thresholds.duplication_percentage}%)`);

  if (violations.length > 0) {
    console.log('\n❌ Quality gate FAILED');
    for (const v of violations) console.log(`  ${v}`);
    process.exit(1);
  }

  console.log('\n✅ Quality gate PASSED');
}

main();
