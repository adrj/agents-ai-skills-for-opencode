---
name: ci-pipeline
description: Generate CI/CD pipeline config for detected platform with lint, test, build, and deploy stages
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [ci, cd, pipeline, devops, automation]
metadata:
  source: https://github.com/weisser-dev/awesome-opencode
  adapted-for: opencode
---

# CI Pipeline

## What I Do

- Detect the project type, language, and CI/CD platform
- Generate a complete pipeline configuration with standard stages
- Configure caching for faster builds
- Set up environment-specific deployment gates
- Include security scanning and artifact publishing steps

## When to Use

Use this skill when you need to:
- Set up CI/CD for a new project from scratch
- Add missing stages (lint, test, security scan) to an existing pipeline
- Migrate a pipeline from one CI platform to another
- Optimize pipeline performance with caching and parallelism

## Process

1. **Detect project type**: Analyze the repository
   - Language: check for `package.json`, `pom.xml`, `go.mod`, `Cargo.toml`, etc.
   - Framework: check for framework-specific config files
   - CI platform: check for `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`
   - Test runner: check for test configuration files

2. **Define stages**: Standard pipeline stages
   - **Lint**: Static analysis and formatting checks
   - **Test**: Unit tests with coverage reporting
   - **Build**: Compile/bundle the application
   - **Security**: Dependency audit and SAST scan
   - **Deploy**: Environment-specific deployment

3. **Configure caching**: Speed up repeated runs
   - Cache dependency directories (`node_modules`, `.m2`, `~/.cache/go-build`)
   - Use lockfile hashes as cache keys
   - Cache build outputs where safe

4. **Add environment gates**: Control deployment flow
   - `main` branch -> staging (automatic)
   - `main` branch -> production (manual approval)
   - Feature branches -> preview/ephemeral (optional)

5. **Generate config**: Write the pipeline file

## GitHub Actions Template

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
```

## Rules

- Always run lint before test, and test before build
- Cache dependencies using lockfile hashes for reliable invalidation
- Use `concurrency` or equivalent to cancel redundant runs on the same branch
- Pin action versions to full SHA or major version tag
- Store secrets in CI platform's secret management, never in config files
- Include timeout limits on all jobs to prevent hung pipelines
- Upload test coverage and build artifacts for traceability
