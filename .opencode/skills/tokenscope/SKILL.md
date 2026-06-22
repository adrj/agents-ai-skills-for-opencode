---
name: tokenscope
description: Comprehensive token analysis and cost tracking for opencode sessions. Provides detailed insights into token usage patterns, provider costs, and optimization opportunities with advanced reporting capabilities.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [tokens, cost, analysis, reporting, optimization]
metadata:
  source: https://github.com/ramtinJ95/opencode-tokenscope
  adapted-for: opencode
---

# Tokenscope

Comprehensive token analysis and cost tracking for opencode sessions.

## Overview

This skill provides comprehensive analysis of token usage and cost tracking for OpenCode sessions, offering detailed insights into consumption patterns, provider costs, and optimization opportunities with advanced reporting capabilities.

## When to Use

Use this skill when:
- You want detailed analysis of token consumption patterns
- Cost tracking and budget management is important
- You need to optimize token usage across sessions
- Comparing costs between different AI providers
- Generating detailed reports for team or project stakeholders
- Identifying optimization opportunities in your workflows

## Core Features

### Token Analysis

- Per-session token breakdown (input/output/tool)
- Real-time token counting and monitoring
- Historical token usage trends
- Token efficiency metrics
- Provider-specific token calculation

### Cost Tracking

- Multi-provider cost calculation
- Real-time cost monitoring
- Budget tracking with alerts
- Cost comparison between providers
- Historical cost analysis

### Optimization Insights

- Token-heavy operation identification
- Cost-saving recommendations
- Usage pattern analysis
- Efficiency benchmarking
- Workflow optimization suggestions

### Advanced Reporting

- Custom report generation
- Data export in multiple formats
- Visual dashboards and charts
- Periodic summary reports
- Comparative analysis reports

## Workflow

### Session Monitoring

1. **Automatic Tracking**
   - Tokens counted for every interaction
   - Costs calculated in real-time
   - Usage patterns monitored continuously

2. **Periodic Analysis**
   ```
   /tokenscope analyze --session=current --detailed
   ```

3. **Budget Monitoring**
   ```
   /tokenscope budget --check --alert=80%
   ```

### Detailed Inspection

1. **Session Breakdown**
   ```
   /tokenscope inspect --session=abc123 --components=all
   ```

2. **Provider Comparison**
   ```
   /tokenscope compare --providers=openai,anthropic,google --model=gpt-4
   ```

3. **Optimization Review**
   ```
   /tokenscope optimize --session=abc123 --suggest
   ```

## Best Practices

### Monitoring Strategy

- Enable automatic tracking for all sessions
- Set budget alerts for cost control
- Regular detailed analysis for optimization
- Compare different approaches for efficiency
- Review historical trends for planning

### Cost Management

- Identify most expensive operations
- Optimize context before costly calls
- Use appropriate models for tasks
- Implement context pruning when needed
- Leverage caching for repeated operations

### Optimization Techniques

- Compress redundant information
- Remove obsolete context regularly
- Use concise prompts and instructions
- Break complex tasks into smaller sessions
- Choose cost-effective providers for tasks

## Integration Points

### With Other Skills

- **context-analysis**: Complementary detailed context analysis — **but avoid loading both simultaneously** (significant overlap; prefer context-analysis for lightweight use, this skill for advanced reporting)
- **dynamic-context-pruning**: Use insights to guide pruning decisions
- **opencode-mem**: Track memory impact on token usage
- **agent-memory**: Monitor file-based memory costs

### Tool Integration

- Automatic analysis of tool call costs
- Context impact measurement for operations
- Integration with file operations
- Shell command output token tracking

## Commands

### Analysis Commands

```
/tokenscope analyze [--session=id|current|all] [--detailed] [--format=json|text|csv]
/tokenscope inspect --session=id [--components=input|output|tool|memory]
/tokenscope trends [--period=daily|weekly|monthly] [--provider=name]
```

### Cost Commands

```
/tokenscope cost [--session=id] [--provider=openai|anthropic|google] [--model=name]
/tokenscope budget [--set=10.00] [--alert=80%] [--period=daily|weekly|monthly]
/tokenscope compare --providers=name1,name2 [--model=model-name] [--task=task-type]
```

### Optimization Commands

```
/tokenscope optimize [--session=id] [--suggest] [--apply]
/tokenscope recommend [--category=context|tools|memory] [--priority=high|medium|low]
```

### Reporting Commands

```
/tokenscope report [--type=daily|weekly|monthly|custom] [--format=pdf|csv|json]
/tokenscope export --data=usage|costs|trends --format=csv|json [--file=filename]
```

## Example Usage

### Session Cost Analysis

```
/tokenscope analyze --session=current --detailed
# Token usage breakdown:
# - User messages: 2,847 tokens (45%)
# - AI responses: 1,923 tokens (30%)
# - Tool outputs: 1,580 tokens (25%)
# - Memory references: 0 tokens (0%)
#
# Cost analysis (OpenAI GPT-4):
# - Input cost: $0.085 ($0.03/1K tokens * 2,847)
# - Output cost: $0.115 ($0.06/1K tokens * 1,923)
# - Tool cost: $0.047 ($0.03/1K tokens * 1,580)
# - Total session cost: $0.247
```

### Provider Cost Comparison

```
/tokenscope compare --providers=openai,anthropic,google --model=gpt-4
# Cost comparison for 5,000 tokens (2,500 input + 2,500 output):
# - OpenAI GPT-4: $0.150 ($0.03 * 2.5 + $0.06 * 2.5)
# - Anthropic Claude 3: $0.075 ($0.015 * 2.5 + $0.015 * 2.5)
# - Google Gemini Pro: $0.050 ($0.01 * 2.5 + $0.01 * 2.5)
# 
# Potential savings:
# - Switching to Claude 3: Save $0.075 (50%)
# - Switching to Gemini Pro: Save $0.100 (67%)
```

### Optimization Recommendations

```
/tokenscope optimize --session=current --suggest
# Optimization recommendations:
# 1. High: Prune tool outputs older than 3 messages (save ~600 tokens)
# 2. Medium: Compress system context instructions (save ~200 tokens)
# 3. Low: Use shorter variable names in code examples (save ~50 tokens)
# 
# Potential savings: 850 tokens per message (~15% reduction)
# Cost savings: ~$0.025 per session (OpenAI GPT-4 pricing)
```

### Budget Management

```
/tokenscope budget --set=5.00 --alert=80% --period=weekly
# Weekly budget set to $5.00
# Alert configured at 80% ($4.00)
# Current week usage: $2.34 (47% of budget)
# Projected end-of-week: $3.85 (77% of budget)
```

### Trend Analysis

```
/tokenscope trends --period=monthly --provider=openai
# Monthly token usage trends (last 3 months):
# - March 2026: 125,430 tokens ($3.76)
# - April 2026: 98,760 tokens ($2.96)
# - May 2026: 156,890 tokens ($4.71)
# 
# Average monthly cost: $3.81
# Trend: +13% from March to May
# Forecast (June 2026): ~177,000 tokens ($5.31)
```

## Configuration

### Provider Pricing

```
/tokenscope config provider openai --input-price=0.03 --output-price=0.06
/tokenscope config provider anthropic --input-price=0.015 --output-price=0.015
```

### Tracking Settings

```
/tokenscope config tracking --auto=true --detailed=true --interval=60s
```

### Alert Configuration

```
/tokenscope config alerts --cost-threshold=5.00 --token-threshold=50000 --method=slack,email
```

### Export Settings

```
/tokenscope config export --format=csv --directory=~/reports --auto-export=true
```

## Reporting

### Session Reports

- Detailed token usage breakdown
- Cost analysis by component
- Optimization opportunities
- Provider performance comparison

### Periodic Reports

- Daily usage summaries
- Weekly cost analysis
- Monthly trend reports
- Quarterly budget reviews

### Custom Reports

```
/tokenscope report --type=custom --start=2026-05-01 --end=2026-05-31 --components=cost,trends
/tokenscope export --data=usage --format=csv --file=may-2026-token-usage.csv
```

### Dashboard Views

- Real-time usage monitoring
- Cost breakdown visualizations
- Trend analysis charts
- Budget status indicators

## Advanced Features

### Multi-Session Analysis

```
/tokenscope analyze --session=all --period=weekly --aggregate
# Weekly aggregate analysis (May 1-7, 2026):
# - Total sessions: 47
# - Total tokens: 245,670
# - Total cost: $7.37
# - Average cost per session: $0.157
# - Peak usage day: May 3 (48,920 tokens, $1.47)
```

### Workflow Cost Analysis

```
/tokenscope workflow "debug-complex-issue" --analyze-cost
# Workflow cost analysis:
# - Total tokens: 34,560
# - Total cost: $1.04
# - Most expensive step: "code-analysis" (12,340 tokens, $0.37)
# - Optimization potential: 25% cost reduction possible
```

### Team/Project Reporting

```
/tokenscope report --scope=project --project=web-app --period=monthly
# Monthly project report (web-app - May 2026):
# - Total sessions: 126
# - Team members: 5
# - Total cost: $12.45
# - Cost per member: $2.49
# - Most active member: alice (35 sessions, $3.87)
```

## Troubleshooting

### Missing Data

- Verify tracking is enabled for all sessions
- Check provider configuration and pricing
- Review session boundaries and completeness
- Ensure proper skill initialization

### Inaccurate Costs

- Update provider pricing information
- Verify model selection and pricing tiers
- Check for cached or stale data
- Recalculate with fresh current data

### Performance Impact

- Review analysis frequency and detail level
- Optimize data collection and processing
- Use sampling for very large sessions
- Consider asynchronous processing for reports

### Alert Issues

- Verify alert thresholds and conditions
- Check notification method configurations
- Review alert history for false positives
- Adjust sensitivity based on usage patterns

### Export Problems

- Verify export directory permissions
- Check file format compatibility
- Review export size limitations
- Confirm network connectivity for remote exports