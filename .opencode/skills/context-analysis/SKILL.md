---
name: context-analysis
description: Detailed token usage analysis for AI sessions. Provides insights into token consumption patterns, cost tracking, and optimization opportunities.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [tokens, analysis, cost, optimization, monitoring]
metadata:
  source: https://github.com/IgorWarzocha/Opencode-Context-Analysis-Plugin
  adapted-for: opencode
---

# Context Analysis

Detailed token usage analysis for AI sessions.

## Overview

This skill provides detailed analysis of token usage in your AI sessions, helping you understand consumption patterns, track costs, and identify optimization opportunities.

## When to Use

Use this skill when:
- You want to understand token consumption patterns
- Monitoring costs becomes important
- Optimizing session efficiency is needed
- Debugging performance issues related to context
- Comparing different approaches for token efficiency

## Core Features

### Token Tracking

- Real-time token counting for inputs and outputs
- Per-message token breakdown
- Cumulative session token usage
- Provider-specific token calculation

### Cost Analysis

- Cost estimation based on provider pricing
- Per-session cost tracking
- Daily/weekly/monthly cost summaries
- Budget monitoring and alerts

### Context Insights

- Context window utilization
- Tool call token consumption
- Memory impact on token usage
- Redundancy detection

### Optimization Suggestions

- Token-heavy section identification
- Pruning recommendations
- Context compression opportunities
- Session structure improvements

## Workflow

### Session Monitoring

1. **Automatic Tracking**
   - Tokens are counted for every interaction
   - Costs are calculated in real-time
   - Context usage is monitored continuously

2. **Periodic Analysis**
   ```
   /context analyze --detailed
   ```

3. **Summary Reports**
   ```
   /context summary --period=daily
   ```

### Detailed Inspection

1. **Message Breakdown**
   ```
   /context inspect --message=5
   ```

2. **Tool Impact**
   ```
   /context tools --sort=cost
   ```

3. **Memory Analysis**
   ```
   /context memory --show=usage
   ```

## Best Practices

### Monitoring Strategy

- Enable automatic tracking for all sessions
- Set budget alerts for cost control
- Regular detailed analysis for optimization
- Compare different approaches for efficiency

### Cost Management

- Identify token-heavy operations
- Optimize context before expensive calls
- Use appropriate models for tasks
- Implement context pruning when needed

### Optimization Techniques

- Compress redundant information
- Remove obsolete context regularly
- Use concise prompts and instructions
- Break complex tasks into smaller sessions

## Integration Points

### With Other Skills

- **dynamic-context-pruning**: Use analysis to guide pruning decisions
- **opencode-mem**: Track memory impact on token usage
- **agent-memory**: Monitor file-based memory costs
- **tokenscope**: Complementary detailed token analysis — **but avoid loading both simultaneously** (significant overlap; prefer this one for lightweight analysis, tokenscope for advanced reporting)

### Measuring tool overhead

Use context-analysis to compare sessions with and without specific MCPs/skills:
1. Run a task without the tool → record token cost
2. Run same task with the tool → record token cost
3. Difference = tool overhead. If overhead > benefit, disable the tool.

### Tool Integration

- Automatic analysis of tool call costs
- Context impact measurement for operations
- Integration with file read/write operations
- Shell command output token tracking

## Commands

### Analysis Commands

```
/context analyze [--detailed] [--format=json|text]
/context summary [--period=daily|weekly|monthly]
/context inspect [--message=id] [--tool=name]
```

### Cost Commands

```
/context cost [--provider=openai|anthropic] [--model=gpt-4|claude-3]
/context budget [--set=10.00] [--alert=80%]
```

### Optimization Commands

```
/context optimize [--suggest] [--apply]
/context compress [--level=high|medium|low]
```

## Example Usage

### Session Cost Tracking

```
/context cost --provider=openai --model=gpt-4
# Estimated session cost: $0.45
# Input tokens: 2,340 ($0.03)
# Output tokens: 1,200 ($0.06)
# Tool calls: 15 ($0.36)
```

### Performance Analysis

```
/context analyze --detailed
# Token usage by component:
# - User messages: 45% (3,540 tokens)
# - Tool outputs: 35% (2,760 tokens)
# - System context: 15% (1,180 tokens)
# - Memory blocks: 5% (390 tokens)
```

### Optimization Recommendations

```
/context optimize --suggest
# Recommendations:
# 1. Prune tool outputs older than 5 messages (save ~800 tokens)
# 2. Compress system context (save ~300 tokens)
# 3. Consolidate memory blocks (save ~100 tokens)
# Potential savings: 1,200 tokens per message
```

## Configuration

### Tracking Settings

```
/context config --track=true --detailed=false
```

### Provider Configuration

```
/context provider openai --price-input=0.03 --price-output=0.06
```

### Alert Settings

```
/context alert --cost=5.00 --tokens=100000
```

## Reporting

### Session Reports

- Token usage breakdown
- Cost analysis
- Context efficiency metrics
- Optimization opportunities

### Periodic Reports

- Daily summaries
- Weekly trends
- Monthly cost analysis
- Year-over-year comparisons

### Custom Reports

```
/context report --start=2026-01-01 --end=2026-01-31 --format=csv
```

## Troubleshooting

### Missing Data

- Verify tracking is enabled
- Check provider configuration
- Review session boundaries
- Ensure proper skill initialization

### Inaccurate Costs

- Update provider pricing
- Verify model selection
- Check for cached data
- Recalculate with fresh data

### Performance Impact

- Review analysis frequency
- Optimize data collection
- Use sampling for large sessions
- Consider async processing