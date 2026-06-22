---
name: subtask2
description: Orchestration system that extends opencode's /commands into a powerful system with granular flow control, parallel execution, error handling, and advanced scheduling capabilities.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [orchestration, workflow, automation, tasks]
metadata:
  source: https://github.com/spoons-and-mirrors/subtask2
  adapted-for: opencode
---

# Subtask2

Advanced orchestration system with granular flow control.

## Overview

This skill extends OpenCode's native /commands paradigm into a powerful orchestration system with granular flow control, parallel execution, error handling, advanced scheduling, and complex workflow management capabilities.

## When to Use

Use this skill when:
- You need to orchestrate complex workflows with multiple steps
- You want granular control over execution flow and conditions
- You need parallel execution of independent tasks
- You want advanced error handling and recovery mechanisms
- You need to schedule tasks with complex timing requirements
- You want to create reusable, parameterized workflow templates

## Core Features

### Advanced Flow Control

- Conditional execution based on results or state
- Looping constructs with break/continue support
- Branching and merging of execution paths
- Exception handling with try/catch patterns
- Timeout management for long-running operations

### Parallel Execution

- Concurrent execution of independent tasks
- Resource management for parallel operations
- Dependency tracking between parallel tasks
- Result aggregation from parallel executions
- Load balancing across available resources

### Error Handling

- Comprehensive exception handling mechanisms
- Retry policies with exponential backoff
- Fallback procedures for failed operations
- Rollback capabilities for partial failures
- Error categorization and routing

### Scheduling

- Time-based task scheduling
- Recurring task definitions
- Dependency-based scheduling
- Resource-aware scheduling
- Priority-based execution ordering

### Workflow Management

- Reusable workflow templates
- Parameterized workflow execution
- Version control for workflows
- Workflow composition and nesting
- State persistence and recovery

## Workflow

### Workflow Definition

1. **Create Template**
   ```
   /subtask create "deploy-pipeline" --description="CI/CD deployment pipeline"
   ```

2. **Define Steps**
   ```
   /subtask step add "build-app" --command="npm run build" --depends-on="setup"
   ```

3. **Configure Flow**
   ```
   /subtask flow "deploy-pipeline" --on-success="deploy" --on-failure="rollback"
   ```

### Execution Management

1. **Run Workflow**
   ```
   /subtask run "deploy-pipeline" --params="env=production,version=1.2.3"
   ```

2. **Monitor Progress**
   ```
   /subtask status "deploy-pipeline" --instance=abc123 --details
   ```

3. **Control Execution**
   ```
   /subtask pause "deploy-pipeline" --instance=abc123
   /subtask resume "deploy-pipeline" --instance=abc123
   ```

### Template Management

1. **Version Control**
   ```
   /subtask version "deploy-pipeline" --tag=v1.2.3 --notes="Added rollback procedure"
   ```

2. **Parameter Management**
   ```
   /subtask params "deploy-pipeline" --add="region:string:us-west-2" --required
   ```

3. **Template Composition**
   ```
   /subtask compose "full-deployment" --workflows="build-app,test-suite,deploy-pipeline"
   ```

## Best Practices

### Workflow Design

- Keep workflows focused on specific business capabilities
- Design for idempotency where possible
- Implement proper error handling at each step
- Use meaningful names and descriptions for clarity
- Document workflow purpose, inputs, and outputs

### Flow Control

- Use conditional logic to handle different scenarios
- Implement timeouts for long-running operations
- Design graceful degradation paths
- Use parallel execution for independent tasks
- Minimize complex branching to maintain clarity

### Error Handling

- Implement specific exception handlers for different error types
- Use retry mechanisms with appropriate backoff strategies
- Design rollback procedures for critical operations
- Log errors with sufficient context for debugging
- Monitor error patterns to identify systemic issues

### Performance Optimization

- Parallelize independent operations
- Use appropriate resource allocation
- Implement caching for expensive operations
- Optimize data transfer between steps
- Monitor and tune workflow performance

## Integration Points

### With Other Skills

- **pocket-universe**: Orchestrate agents within pocket universes
- **opencode-roadmap**: Execute roadmap milestones as workflows
- **agent-memory**: Store workflow results and execution history
- **context-analysis**: Track workflow token usage and costs

### Tool Integration

- Shell command execution and result handling
- File system operations with proper error handling
- API calls with retry and fallback mechanisms
- Database operations with transaction management

## Commands

### Workflow Management

```
/subtask create "workflow-name" [--description="Description"] [--template=base-workflow]
/subtask delete "workflow-name"
/subtask list [--filter=status:active]
/subtask show "workflow-name" [--format=json|yaml]
```

### Step Management

```
/subtask step add "step-name" --command="shell command" [--depends-on="step1,step2"]
/subtask step update "step-name" --command="new command" [--retry=3]
/subtask step remove "step-name"
/subtask steps "workflow-name" [--details]
```

### Flow Control

```
/subtask flow "workflow-name" --on-success="next-step" --on-failure="error-handler"
/subtask condition "step-name" --if="result.status == 'success'"
/subtask loop "step-name" --while="items.length > 0" --iterator="item"
```

### Execution Control

```
/subtask run "workflow-name" [--params="key1=value1,key2=value2"] [--async]
/subtask status "workflow-name" [--instance=id] [--details]
/subtask pause "workflow-name" --instance=id
/subtask resume "workflow-name" --instance=id
/subtask cancel "workflow-name" --instance=id
```

### Error Handling

```
/subtask retry "workflow-name" --instance=id --step="step-name"
/subtask fallback "step-name" --to="fallback-command"
/subtask timeout "step-name" --duration=300s
```

### Scheduling

```
/subtask schedule "workflow-name" --cron="0 2 * * *" --timezone=UTC
/subtask trigger "workflow-name" --event="git-push" --branch="main"
/subtask unschedule "workflow-name"
```

## Example Usage

### CI/CD Pipeline

```
/subtask create "ci-cd-pipeline" --description="Full CI/CD pipeline with testing and deployment"

/subtask step add "checkout" --command="git clone $REPO_URL" --retry=3
/subtask step add "install-deps" --command="npm install" --depends-on="checkout"
/subtask step add "run-tests" --command="npm test" --depends-on="install-deps"
/subtask step add "build" --command="npm run build" --depends-on="run-tests"
/subtask step add "deploy-staging" --command="deploy.sh staging" --depends-on="build"
/subtask step add "deploy-production" --command="deploy.sh production" --depends-on="deploy-staging"

/subtask condition "deploy-production" --if="env == 'production' and branch == 'main'"
/subtask fallback "deploy-staging" --to="rollback.sh staging"
/subtask timeout "build" --duration=600s

/subtask flow "ci-cd-pipeline" --on-success="cleanup" --on-failure="notify-team"

/subtask run "ci-cd-pipeline" --params="env=staging,branch=develop,REPO_URL=https://github.com/org/repo"
```

### Data Processing Workflow

```
/subtask create "data-processing" --description="ETL pipeline for customer data"

/subtask step add "extract" --command="extract-data.sh" --parallel
/subtask step add "transform" --command="transform-data.sh" --depends-on="extract"
/subtask step add "load" --command="load-data.sh" --depends-on="transform"

/subtask loop "transform" --while="batch.has_more" --iterator="record"
/subtask condition "load" --if="transform.result.count > 0"

/subtask step add "validate" --command="validate-data.sh" --depends-on="load"
/subtask step add "report" --command="generate-report.sh" --depends-on="validate"

/subtask schedule "data-processing" --cron="0 1 * * *" --timezone=America/New_York

/subtask run "data-processing" --params="source=s3://bucket/data/,target=db://prod/customers"
```

### Complex Deployment with Rollback

```
/subtask create "complex-deployment" --description="Multi-service deployment with rollback"

/subtask step add "pre-checks" --command="health-check.sh"
/subtask step add "backup" --command="backup-database.sh" --depends-on="pre-checks"

/subtask step add "deploy-service-a" --command="deploy.sh service-a" --depends-on="backup" --parallel
/subtask step add "deploy-service-b" --command="deploy.sh service-b" --depends-on="backup" --parallel
/subtask step add "deploy-service-c" --command="deploy.sh service-c" --depends-on="backup" --parallel

/subtask step add "integration-test" --command="integration-test.sh" --depends-on="deploy-service-a,deploy-service-b,deploy-service-c"
/subtask step add "health-check" --command="health-check.sh" --depends-on="integration-test"

/subtask condition "health-check" --if="integration-test.status == 'passed'"
/subtask fallback "deploy-service-a" --to="rollback.sh service-a"
/subtask fallback "deploy-service-b" --to="rollback.sh service-b"
/subtask fallback "deploy-service-c" --to="rollback.sh service-c"

/subtask flow "complex-deployment" --on-success="cleanup" --on-failure="rollback-all"

/subtask run "complex-deployment" --params="version=2.1.0,environment=production"
```

## Configuration

### Workflow Settings

```
/subtask config workflow --timeout=3600s --max-retries=3 --retry-delay=60s
```

### Resource Management

```
/subtask config resources --cpu=2 --memory=4GB --parallel-limit=5
```

### Notification Settings

```
/subtask config notifications --on=success,failure --method=slack,email
```

## Monitoring and Observability

### Execution Tracking

- Real-time progress monitoring
- Detailed execution logs
- Performance metrics collection
- Resource utilization tracking
- Dependency visualization

### Analytics

- Execution success/failure rates
- Average execution times
- Resource consumption patterns
- Error frequency and types
- Workflow efficiency metrics

### Alerting

- Failure notifications
- Performance degradation alerts
- Resource exhaustion warnings
- Timeout notifications
- Custom metric thresholds

## Troubleshooting

### Execution Issues

- **Stuck workflows**: Check for blocked dependencies or resource limits
- **Failed steps**: Review logs and implement appropriate retry policies
- **Timeout errors**: Increase timeout values or optimize step performance
- **Resource exhaustion**: Monitor resource usage and adjust limits
- **Dependency cycles**: Review workflow definition for circular dependencies

### Configuration Problems

- **Invalid syntax**: Validate configuration files and commands
- **Missing parameters**: Ensure all required parameters are provided
- **Permission issues**: Check execution permissions and access rights
- **Environment variables**: Verify environment variable availability
- **Path issues**: Confirm file paths and directory access

### Performance Bottlenecks

- **Slow execution**: Profile steps to identify performance issues
- **Resource contention**: Monitor resource usage and adjust allocation
- **Network latency**: Optimize network calls and implement caching
- **Database performance**: Review database queries and indexing
- **Parallelization limits**: Adjust parallel execution settings