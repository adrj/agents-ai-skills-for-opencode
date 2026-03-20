---
name: opencode-roadmap
description: Strategic roadmap planning and multi-agent coordination plugin. Provides project-wide planning capabilities with timeline management, milestone tracking, and resource allocation.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/IgorWarzocha/Opencode-Roadmap
  adapted-for: opencode
---

# Opencode Roadmap

Strategic roadmap planning and multi-agent coordination plugin.

## Overview

This skill provides comprehensive roadmap planning capabilities with timeline management, milestone tracking, resource allocation, and multi-agent coordination for project-wide planning.

## When to Use

Use this skill when:
- Planning complex projects with multiple components
- Coordinating work across multiple agents or team members
- Need to visualize project timeline and dependencies
- Tracking progress against milestones and deliverables
- Managing resource allocation and capacity planning
- Creating strategic plans with long-term vision

## Core Features

### Roadmap Creation

- Visual timeline with drag-and-drop editing
- Milestone and deliverable tracking
- Dependency management between tasks
- Resource allocation and capacity planning
- Multiple timeline views (weekly, monthly, quarterly)

### Multi-Agent Coordination

- Agent assignment to specific tasks
- Coordination workflows and handoffs
- Progress synchronization across agents
- Conflict detection and resolution
- Communication facilitation

### Strategic Planning

- Long-term vision mapping
- Quarterly and annual planning
- Initiative prioritization
- Risk assessment and mitigation
- Resource forecasting

### Progress Tracking

- Real-time progress updates
- Milestone completion tracking
- Burndown charts and velocity metrics
- Delay detection and alerts
- Progress reporting and dashboards

## Workflow

### Initial Planning

1. **Project Setup**
   ```
   /roadmap create "Q3 2026 Product Launch"
   ```

2. **Timeline Definition**
   ```
   /roadmap timeline --start=2026-07-01 --end=2026-09-30
   ```

3. **Milestone Creation**
   ```
   /roadmap milestone add "MVP Complete" --date=2026-08-15
   ```

### Task Management

1. **Task Creation**
   ```
   /roadmap task add "Implement authentication" --owner=backend-agent --duration=5d
   ```

2. **Dependency Setting**
   ```
   /roadmap task link "Implement authentication" "Database setup"
   ```

3. **Resource Allocation**
   ```
   /roadmap assign "frontend-agent" "UI implementation" --hours=40
   ```

### Progress Monitoring

1. **Status Updates**
   ```
   /roadmap update "MVP Complete" --status=done --notes="All core features implemented"
   ```

2. **Progress Reports**
   ```
   /roadmap report --format=weekly
   ```

3. **Risk Assessment**
   ```
   /roadmap risk "Database migration" --level=high --mitigation="Backup plan ready"
   ```

## Best Practices

### Planning Strategy

- Start with high-level vision and break down into initiatives
- Define clear milestones with measurable outcomes
- Identify critical path and dependencies early
- Allocate realistic time buffers for uncertainty
- Regularly review and adjust plans based on progress

### Multi-Agent Coordination

- Clearly define agent responsibilities and boundaries
- Establish communication protocols between agents
- Set up regular sync points for coordination
- Monitor for conflicts and address proactively
- Facilitate knowledge sharing between agents

### Milestone Management

- Create meaningful milestones that represent value delivery
- Set realistic dates with some buffer time
- Track milestone dependencies to identify blockers
- Celebrate milestone completions to maintain momentum
- Learn from missed milestones to improve future planning

## Integration Points

### With Other Skills

- **agent-memory**: Store planning decisions and rationale
- **context-analysis**: Track planning session token usage
- **pocket-universe**: Coordinate complex multi-agent workflows
- **subtask2**: Manage detailed task breakdowns and execution

### Tool Integration

- Git integration for code-related milestones
- Calendar sync for timeline visualization
- Project management tool export/import
- Communication tool notifications

## Commands

### Roadmap Management

```
/roadmap create "Project Name" [--description="Description"]
/roadmap timeline --start=YYYY-MM-DD --end=YYYY-MM-DD
/roadmap view [--format=timeline|list|board]
```

### Milestone Management

```
/roadmap milestone add "Milestone Name" --date=YYYY-MM-DD [--description="Description"]
/roadmap milestone update "Milestone Name" --status=planned|in-progress|done|blocked
/roadmap milestone list [--status=all|planned|in-progress|done|blocked]
```

### Task Management

```
/roadmap task add "Task Name" --owner=agent-name --duration=Xd [--dependencies="Task1,Task2"]
/roadmap task assign "Task Name" agent-name [--hours=X]
/roadmap task link "Task1" "Task2" [--type=depends-on|blocks|related]
```

### Progress Tracking

```
/roadmap update "Item Name" --status=planned|in-progress|done|blocked [--notes="Update notes"]
/roadmap report [--period=daily|weekly|monthly] [--format=text|json|csv]
/roadmap risk "Item Name" --level=low|medium|high [--mitigation="Mitigation strategy"]
```

## Example Usage

### Product Launch Planning

```
/roadmap create "Q3 2026 Product Launch" --description="Launch new AI-powered analytics platform"
/roadmap timeline --start=2026-07-01 --end=2026-09-30

/roadmap milestone add "MVP Complete" --date=2026-08-15 --description="Core features implemented and tested"
/roadmap milestone add "Beta Release" --date=2026-09-01 --description="Release to beta users for feedback"
/roadmap milestone add "GA Launch" --date=2026-09-30 --description="General availability release"

/roadmap task add "Database Design" --owner=backend-agent --duration=3d
/roadmap task add "API Implementation" --owner=backend-agent --duration=7d --dependencies="Database Design"
/roadmap task add "UI Design" --owner=frontend-agent --duration=5d
/roadmap task add "Frontend Implementation" --owner=frontend-agent --duration=10d --dependencies="UI Design,API Implementation"

/roadmap assign backend-agent "API Implementation" --hours=40
/roadmap assign frontend-agent "Frontend Implementation" --hours=60
```

### Progress Update

```
/roadmap update "Database Design" --status=done --notes="Completed with PostgreSQL schema"
/roadmap update "API Implementation" --status=in-progress --notes="60% complete, authentication module done"
/roadmap risk "Frontend Implementation" --level=medium --mitigation="Pair programming session scheduled"

/roadmap report --period=weekly --format=text
# Week of 2026-07-15 Progress Report:
# Completed: Database Design
# In Progress: API Implementation (60%), UI Design (40%)
# Upcoming: Frontend Implementation (blocked by API)
# Risk: Frontend timeline may slip (medium risk)
```

## Configuration

### Planning Settings

```
/roadmap config --timezone=America/New_York --work-days="Mon-Fri" --hours-per-day=8
```

### Notification Settings

```
/roadmap notify --on=milestone-complete,task-delayed --method=slack,email
```

### Integration Settings

```
/roadmap integrate github --repo=organization/project --token=ghp_...
```

## Visualization

### Timeline View

- Horizontal timeline with color-coded items
- Milestone markers and dependency lines
- Resource allocation indicators
- Progress bars for ongoing tasks

### Board View

- Kanban-style columns for status tracking
- Drag-and-drop task movement
- Assignment indicators
- Due date warnings

### Report View

- Text-based progress summaries
- Statistical analysis of velocity
- Risk assessment overview
- Resource utilization reports

## Troubleshooting

### Planning Issues

- **Overly ambitious timelines**: Add buffer time and break down large tasks
- **Unclear dependencies**: Map out all dependencies explicitly
- **Resource conflicts**: Use resource leveling features
- **Scope creep**: Implement change control processes

### Coordination Problems

- **Communication gaps**: Establish regular sync protocols
- **Conflicting priorities**: Align on project goals and priorities
- **Knowledge silos**: Implement knowledge sharing practices
- **Progress tracking issues**: Set up automated status updates

### Technical Difficulties

- **Integration failures**: Verify API keys and permissions
- **Data sync issues**: Check network connectivity and retry
- **Performance problems**: Optimize large roadmap views
- **Notification failures**: Review notification settings and channels