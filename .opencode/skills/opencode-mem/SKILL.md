---
name: opencode-mem
description: Persistent memory system with vector database for long-term context retention across sessions. Features dual memory scopes, web interface, auto-capture system, and multi-provider AI support.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/tickernelz/opencode-mem
  adapted-for: opencode
---

# Opencode Mem

Persistent memory system with vector database for long-term context retention across sessions.

## Overview

A persistent memory system for AI coding agents that enables long-term context retention across sessions using local vector database technology. Features dual memory scopes, web interface, auto-capture system, and multi-provider AI support.

## When to Use

Use this skill when:
- You need long-term memory persistence across sessions
- Working on complex projects that require context retention
- Want to automatically capture important information
- Need to search through historical context and decisions
- Working with multiple providers and want unified memory

## Core Features

### Dual Memory Scopes

1. **Global Memory**: Shared across all projects and sessions
2. **Project Memory**: Specific to the current repository

### Vector Database

- Local storage using vector embeddings
- Semantic search capabilities
- Automatic indexing of content
- Efficient retrieval of relevant information

### Web Interface

- Browser-based UI for memory management
- Search and browse capabilities
- Memory editing and organization
- Visualization of memory relationships

### Auto-Capture System

- Automatic capture of important context
- Configurable triggers and rules
- Smart filtering of relevant information
- Integration with tool outputs

### Multi-Provider Support

- Works with multiple AI providers
- Unified memory interface
- Provider-specific optimizations
- Cross-provider context sharing

## Workflow

### Memory Creation

1. **Automatic Capture**
   - Tool outputs are automatically indexed
   - Important decisions are captured
   - User interactions are stored when relevant

2. **Manual Storage**
   ```
   /mem store "Important project decision" --tags=architecture,decision
   ```

3. **File Integration**
   ```
   /mem import @README.md --type=documentation
   ```

### Memory Retrieval

1. **Semantic Search**
   ```
   /mem search "database connection issues"
   ```

2. **Tag-based Search**
   ```
   /mem find --tag=architecture
   ```

3. **Recent Memory**
   ```
   /mem recent --limit=5
   ```

### Memory Management

1. **Organization**
   ```
   /mem tag "memory-id" architecture,backend
   ```

2. **Updates**
   ```
   /mem update "memory-id" "Updated content"
   ```

3. **Deletion**
   ```
   /mem delete "memory-id"
   ```

## Best Practices

### Content Strategy

- Store high-value information that's hard to recreate
- Focus on decisions, rationale, and complex context
- Avoid storing transient or easily reproducible data
- Use tags for better organization and retrieval

### Tagging System

Recommended tags:
- `decision`: Important architectural or design decisions
- `error`: Error patterns and solutions
- `pattern`: Reusable patterns and practices
- `requirement`: User requirements and constraints
- `research`: Research findings and insights

### Search Optimization

- Use specific, descriptive search terms
- Combine keywords with tags when possible
- Review search results to improve future queries
- Update memory content to improve searchability

## Integration Points

### With Other Skills

- **agent-memory**: Complements file-based memory with vector search
- **napkin**: Stores high-level patterns and recurring issues
- **systematic-debugging**: Captures debugging insights and solutions

### Tool Integration

- Automatic indexing of tool outputs
- Context-aware memory suggestions
- Integration with file operations
- Shell command result storage

## Configuration

### Memory Settings

```
/mem config --scope=project --auto-capture=true
```

### Provider Setup

```
/mem provider openai --api-key=your-key
```

### Web Interface

```
/mem web --port=3000
```

## Example Usage

### Project Onboarding

```
/mem import @docs/architecture.md --type=architecture
/mem import @README.md --type=documentation
/mem search "project setup"
```

### Debugging Session

```
/mem store "Fixed memory leak by implementing proper cleanup" --tags=debug,error
/mem search "memory leak" --related=true
```

### Knowledge Building

```
/mem store "User requested real-time notifications feature" --tags=requirement,user
/mem find --tag=pattern --limit=10
```

## Web Interface Features

### Dashboard

- Overview of memory statistics
- Recent memories and updates
- Search quick access
- Configuration controls

### Search Interface

- Full-text and semantic search
- Filter by tags and types
- Sort by relevance, date, or usage
- Preview and quick actions

### Memory Management

- Create, edit, and delete memories
- Tag management and organization
- Bulk operations and exports
- Import from various sources

## Performance Considerations

### Indexing

- Automatic background indexing
- Incremental updates for efficiency
- Configurable indexing frequency
- Manual reindex when needed

### Search Optimization

- Cached search results for common queries
- Efficient vector similarity calculations
- Pagination for large result sets
- Search result relevance tuning

## Troubleshooting

### Memory Not Found

- Check if auto-capture is enabled
- Verify content was properly stored
- Try broader search terms
- Check both global and project scopes

### Performance Issues

- Review indexing settings
- Check vector database size
- Optimize memory content
- Consider scope separation

### Web Interface Problems

- Verify port availability
- Check network connectivity
- Review browser compatibility
- Clear cache and reload