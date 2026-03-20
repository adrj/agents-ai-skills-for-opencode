---
name: agent-memory
description: Persistent, self-editable memory blocks inspired by Letta agents. Gives the agent persistent memory that carries across sessions and can be modified by the agent itself during operation.
license: MIT
compatibility: opencode
metadata:
  source: https://github.com/joshuadavidthomas/opencode-agent-memory
  adapted-for: opencode
---

# Agent Memory

Persistent, self-editable memory blocks inspired by Letta agents.

## Overview

This skill provides the agent with persistent memory that carries across sessions and can be modified by the agent itself during operation. Memory blocks are stored as files in the `.opencode/memory/` directory and can be referenced by name.

## When to Use

Use this skill when:
- You need to remember information across multiple sessions
- You want to create persistent notes or documentation
- You need to store complex information that doesn't fit in a napkin
- You want to build a knowledge base that grows over time

## Core Concepts

### Memory Blocks

Memory blocks are text files stored in `.opencode/memory/` with the following structure:

```
.opencode/
└── memory/
    ├── project-architecture.md
    ├── api-design-notes.md
    └── user-preferences.md
```

Each block has:
- A unique name (used as filename)
- Content that can be any text/markdown
- Automatic persistence across sessions

### Memory Operations

The agent can perform these operations:

1. **Create/Update Memory**
   ```
   /memory save "project-architecture" "Content for the memory block"
   ```

2. **Read Memory**
   ```
   /memory read "project-architecture"
   ```

3. **List Memories**
   ```
   /memory list
   ```

4. **Delete Memory**
   ```
   /memory delete "project-architecture"
   ```

## Workflow

### Creating New Memory

When you encounter information worth remembering:
1. Summarize the key points
2. Choose a descriptive name
3. Save it with `/memory save "name" "content"`

Example:
```
/memory save "database-schema" "Users table has id, name, email. Posts table has id, title, content, user_id."
```

### Updating Existing Memory

When you learn new information about an existing topic:
1. Read the current memory with `/memory read`
2. Integrate new information
3. Save the updated version

### Referencing Memory

When working on related tasks:
1. Check if relevant memory exists with `/memory list`
2. Read pertinent memories with `/memory read`
3. Use the information to inform your work

## Best Practices

### Naming Conventions

- Use descriptive, concise names
- Prefer kebab-case (e.g., "api-design-principles")
- Include context when helpful (e.g., "projectname-auth-strategy")

### Content Structure

- Start with a brief summary
- Organize with markdown headers when content is long
- Use bullet points for key facts
- Keep information current - update when learning new things

### When to Create Memory

Create memory for:
- ✅ Project architecture decisions
- ✅ API design patterns
- ✅ User preferences and feedback
- ✅ Complex business logic
- ✅ Integration details

Don't create memory for:
- ❌ Temporary notes
- ❌ Simple reminders (use napkin instead)
- ❌ Session-specific context

## Example Usage

### Architecture Documentation
```
/memory save "microservice-communication" "Services communicate via REST APIs. Use circuit breaker pattern for external calls. Implement retry logic with exponential backoff."
```

### User Preferences
```
/memory save "user-cli-preferences" "User prefers zsh over bash. Likes starship prompt. Uses ripgrep for search. Prefers neovim over vscode."
```

### API Design
```
/memory save "error-handling-pattern" "All APIs return JSON with {error: {code, message, details}}. Use HTTP status codes appropriately. Log all 5xx errors."
```

## Memory Management

### Regular Review

Periodically:
1. Check for outdated information
2. Merge related memories
3. Delete obsolete memories
4. Reorganize for better clarity

### Memory Hygiene

- Keep memories focused on single topics
- Update when information changes
- Remove when no longer relevant
- Cross-reference related memories

## Integration with Other Skills

- **napkin**: Use for short-term, high-frequency notes. Use memory for long-term, detailed information.
- **systematic-debugging**: Store debugging insights and patterns.
- **interface-design**: Remember design decisions and user feedback.