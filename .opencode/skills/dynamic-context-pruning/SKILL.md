---
name: dynamic-context-pruning
description: Optimizes token usage by pruning obsolete tool outputs from conversation context. Reduces token consumption while maintaining relevant context for better performance.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/Tarquinen/opencode-dynamic-context-pruning
  adapted-for: opencode
---

# Dynamic Context Pruning

Optimizes token usage by pruning obsolete tool outputs from conversation context.

## Overview

This skill automatically identifies and removes outdated or irrelevant tool outputs from the conversation context, reducing token consumption while maintaining relevant information for better performance.

## When to Use

Use this skill when:
- Working on long conversations with many tool calls
- Token usage is becoming a concern
- You want to maintain performance while reducing costs
- Working with models that have limited context windows

## How It Works

### Context Analysis

The skill continuously monitors:
- Tool outputs and their relevance to current tasks
- Age of information in the context
- Frequency of reference to specific context items
- Task progression and context needs

### Pruning Criteria

Context items are pruned when they:
- Haven't been referenced in recent messages
- Are older than a specified threshold
- Are superseded by newer information
- Don't match current task focus

### Preservation Rules

The skill preserves:
- Recent and frequently referenced information
- Critical context for current tasks
- User-provided instructions and preferences
- Error messages and debugging information

## Workflow

### Automatic Operation

The skill operates automatically:
1. Monitors context after each tool call
2. Analyzes relevance of existing context
3. Identifies candidates for pruning
4. Removes obsolete information
5. Maintains context integrity

### Manual Control

You can also manually trigger pruning:
```
/context prune
```

Or check what would be pruned:
```
/context analyze
```

## Best Practices

### Context Management

- Allow the skill to operate automatically for best results
- Use manual commands when you notice performance issues
- Review pruned context if information seems missing

### Performance Optimization

- Combine with other context management skills
- Use focused prompts to reduce context needs
- Break complex tasks into smaller sessions when possible

### Monitoring

Watch for these indicators:
- Increased token usage in long sessions
- Slower response times
- Model confusion about previous steps

## Integration Points

### With Other Skills

- **agent-memory**: Preserves references to stored memories
- **napkin**: Maintains napkin content in context
- **dev-cli-tools**: Prunes obsolete command outputs while preserving important results

### Tool Integration

The skill works with:
- File operations (read, write, edit)
- Shell commands and their outputs
- API calls and responses
- Search results and findings

## Configuration

### Pruning Thresholds

Adjust sensitivity:
```
/context sensitivity high|medium|low
```

### Preservation Rules

Specify what to always keep:
```
/context preserve "critical-file-name"
```

### Monitoring

Enable detailed logging:
```
/context log enable
```

## Example Scenarios

### Long Debugging Session

1. Multiple file reads and edits
2. Shell command executions with verbose output
3. Gradual pruning of resolved issues
4. Focus on current debugging state

### Code Review Process

1. Read multiple files for context
2. Run tests and analyze outputs
3. Prune test results after addressing issues
4. Maintain focus on current review points

### Research Task

1. Search and gather information
2. Prune outdated search results
3. Keep relevant findings in context
4. Update context as research progresses

## Troubleshooting

### Missing Information

If important context seems missing:
```
/context restore
```

### Performance Issues

If pruning seems too aggressive:
```
/context sensitivity low
```

### Debugging

To see what's being pruned:
```
/context log enable
```