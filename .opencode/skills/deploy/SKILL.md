---
name: deploy
description: Guide deployment processes including CI/CD pipeline creation, environment setup, and rollback procedures
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [deploy, devops, ci-cd, infrastructure, workflow]
metadata:
  source: https://github.com/weisser-dev/awesome-opencode
  adapted-for: opencode
---

# Deploy

## What I Do

- Analyze the project to determine the appropriate deployment strategy
- Generate CI/CD pipeline configurations (GitHub Actions, GitLab CI, etc.)
- Create environment-specific configurations
- Define rollback procedures
- Set up health checks and monitoring

## When to Use

Use this skill when you need to:
- Set up a new deployment pipeline
- Add a new deployment environment (staging, production)
- Create or update CI/CD configurations
- Plan a deployment strategy for a new service

## Deployment Strategies

### 1. Rolling Update (Default)
- Gradually replace instances
- Zero-downtime for stateless services
- Easy rollback

### 2. Blue/Green
- Two identical environments
- Switch traffic at once
- Instant rollback

### 3. Canary
- Route small percentage to new version
- Monitor metrics
- Gradual traffic shift

## Rollback Procedure

1. **Detect**: Monitor health checks and error rates
2. **Decide**: If error rate > threshold, initiate rollback
3. **Execute**: Revert to previous version
4. **Verify**: Confirm health checks pass
5. **Communicate**: Notify team of rollback and reason

## Environment Checklist

- [ ] Environment variables configured
- [ ] Secrets stored securely (not in code)
- [ ] Database migrations applied
- [ ] Health check endpoint available
- [ ] Logging and monitoring configured
- [ ] Rollback procedure documented and tested
- [ ] SSL/TLS certificates valid
- [ ] DNS configured correctly
