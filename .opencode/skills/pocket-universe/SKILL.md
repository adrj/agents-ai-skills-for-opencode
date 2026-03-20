---
name: pocket-universe
description: Subagent driven pocket universe plugin that extends opencode's native subagent paradigm to provide resilient, async, closed-loop agents that block the main thread's execution.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/spoons-and-mirrors/pocket-universe
  adapted-for: opencode
---

# Pocket Universe

Subagent driven pocket universe plugin for resilient, async, closed-loop agents.

## Overview

This skill extends OpenCode's native subagent paradigm to provide resilient, asynchronous, closed-loop agents that can block the main thread's execution when needed, creating isolated "pocket universes" for complex tasks.

## When to Use

Use this skill when:
- You need to run long-running or complex tasks asynchronously
- You want to isolate risky operations in a controlled environment
- You need resilient agents that can recover from failures
- You want to create closed-loop systems that continuously operate
- You need to block main thread execution for critical operations

## Core Concepts

### Pocket Universes

A pocket universe is an isolated execution environment where subagents can operate independently while maintaining connection to the main agent.

Characteristics:
- Isolated context and state
- Independent execution lifecycle
- Resilient to failures and interruptions
- Controlled communication with main agent
- Resource management and monitoring

### Subagent Types

1. **Observer Agents**: Monitor systems and report changes
2. **Executor Agents**: Perform actions and operations
3. **Coordinator Agents**: Manage multiple subagents and workflows
4. **Recovery Agents**: Handle failures and implement recovery procedures

### Communication Patterns

- **Request/Response**: Synchronous communication for immediate needs
- **Event Streaming**: Continuous data flow from subagents
- **State Synchronization**: Periodic updates of agent state
- **Control Commands**: Direct commands to subagents

## Workflow

### Universe Creation

1. **Define Scope**
   ```
   /pocket create "data-processing-universe" --type=executor --resources=cpu:2,memory:4GB
   ```

2. **Configure Agents**
   ```
   /pocket agent add "data-processor" --role=executor --image=processor:latest
   ```

3. **Set Communication**
   ```
   /pocket connect "main-agent" "data-processor" --protocol=event-stream
   ```

### Agent Management

1. **Start Universe**
   ```
   /pocket start "data-processing-universe"
   ```

2. **Monitor Status**
   ```
   /pocket status "data-processing-universe" --details
   ```

3. **Send Commands**
   ```
   /pocket command "data-processor" "process-batch" --data=batch-123
   ```

### Lifecycle Control

1. **Pause/Resume**
   ```
   /pocket pause "data-processing-universe"
   /pocket resume "data-processing-universe"
   ```

2. **Scale Agents**
   ```
   /pocket scale "data-processor" --replicas=3
   ```

3. **Terminate Universe**
   ```
   /pocket stop "data-processing-universe" --graceful
   ```

## Best Practices

### Universe Design

- Keep universes focused on specific domains or tasks
- Design for failure with built-in recovery mechanisms
- Implement proper resource limits to prevent abuse
- Use clear naming conventions for easy identification
- Document universe purpose and agent responsibilities

### Agent Resilience

- Implement health checks and self-monitoring
- Use circuit breakers for external dependencies
- Design idempotent operations where possible
- Implement graceful degradation strategies
- Log extensively for debugging and monitoring

### Communication Efficiency

- Minimize data transfer between main agent and pocket universe
- Use appropriate communication protocols for use cases
- Implement backpressure mechanisms for high-volume streams
- Handle network partitions gracefully
- Secure communication channels

## Integration Points

### With Other Skills

- **subtask2**: Coordinate complex workflows across pocket universes
- **agent-memory**: Store universe state and agent knowledge
- **dynamic-context-pruning**: Manage context within pocket universes
- **opencode-roadmap**: Plan and track universe-based initiatives

### Tool Integration

- Docker/container orchestration
- Message queues and event streaming
- Monitoring and alerting systems
- Logging and observability tools

## Commands

### Universe Management

```
/pocket create "universe-name" [--type=observer|executor|coordinator] [--resources=spec]
/pocket start "universe-name"
/pocket stop "universe-name" [--graceful]
/pocket status "universe-name" [--details]
```

### Agent Management

```
/pocket agent add "agent-name" --role=role --image=image [--universe=universe-name]
/pocket agent remove "agent-name"
/pocket agent list [--universe=universe-name]
/pocket scale "agent-name" --replicas=count
```

### Communication

```
/pocket connect "source" "target" --protocol=request-response|event-stream|state-sync
/pocket disconnect "source" "target"
/pocket command "agent-name" "command" [--data=params]
```

### Monitoring

```
/pocket monitor "universe-name" [--metrics=cpu,memory,network]
/pocket logs "agent-name" [--tail=lines] [--follow]
/pocket health "universe-name" [--detailed]
```

## Example Usage

### Data Processing Pipeline

```
/pocket create "data-pipeline" --type=coordinator --resources=cpu:4,memory:8GB

/pocket agent add "data-ingestor" --role=observer --image=ingestor:latest
/pocket agent add "data-processor" --role=executor --image=processor:latest --replicas=3
/pocket agent add "data-validator" --role=executor --image=validator:latest

/pocket connect "data-ingestor" "data-processor" --protocol=event-stream
/pocket connect "data-processor" "data-validator" --protocol=request-response
/pocket connect "data-validator" "main-agent" --protocol=event-stream

/pocket start "data-pipeline"

/pocket command "data-ingestor" "start-watch" --data="/data/input"
/pocket monitor "data-pipeline" --metrics=cpu,memory,throughput
```

### Resilient Web Scraper

```
/pocket create "web-scraper-universe" --type=coordinator

/pocket agent add "url-dispatcher" --role=coordinator --image=dispatcher:latest
/pocket agent add "scraper-worker" --role=executor --image=scraper:latest --replicas=5
/pocket agent add "error-handler" --role=observer --image=error-handler:latest

/pocket connect "main-agent" "url-dispatcher" --protocol=request-response
/pocket connect "url-dispatcher" "scraper-worker" --protocol=event-stream
/pocket connect "scraper-worker" "error-handler" --protocol=event-stream
/pocket connect "error-handler" "url-dispatcher" --protocol=request-response

/pocket start "web-scraper-universe"

/pocket command "url-dispatcher" "add-urls" --data="['http://example1.com', 'http://example2.com']"
/pocket health "web-scraper-universe" --detailed
```

## Configuration

### Resource Management

```
/pocket config resources --cpu=limit:8,request:4 --memory=limit:16GB,request:8GB
```

### Security Settings

```
/pocket config security --network-policy=restricted --image-pull-policy=always
```

### Monitoring Configuration

```
/pocket config monitoring --metrics-interval=30s --log-level=info
```

## Monitoring and Observability

### Metrics Collection

- CPU and memory usage per agent
- Network I/O statistics
- Disk I/O and storage usage
- Request/response latency
- Error rates and failure patterns

### Health Checks

- Liveness probes for agent availability
- Readiness probes for service capability
- Custom health check endpoints
- Automated recovery triggers

### Logging

- Structured logging with trace IDs
- Log level management
- Log aggregation and searching
- Alerting on critical log events

## Troubleshooting

### Startup Issues

- **Resource limits**: Check resource requests vs available capacity
- **Image pull failures**: Verify image names and registry access
- **Network policies**: Review network restrictions
- **Configuration errors**: Validate configuration syntax

### Runtime Problems

- **Performance degradation**: Monitor resource usage and scale accordingly
- **Communication failures**: Check network connectivity and protocols
- **Agent crashes**: Review logs and implement recovery procedures
- **Data loss**: Implement proper persistence and backup strategies

### Scaling Challenges

- **Resource exhaustion**: Monitor and adjust resource limits
- **Network bottlenecks**: Optimize communication patterns
- **Coordination overhead**: Simplify agent interactions
- **State consistency**: Implement proper state management

### Security Concerns

- **Unauthorized access**: Review authentication and authorization
- **Data exposure**: Encrypt sensitive data in transit and at rest
- **Image vulnerabilities**: Scan images for security issues
- **Network exposure**: Limit network access to necessary endpoints only