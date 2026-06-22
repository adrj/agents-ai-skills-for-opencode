# Skills Guide by Project Type

Quick reference for identifying which skills are most suitable depending on your project type and context.

---

## Basic / General Project

Simple projects, scripts, automations, or when you need general guidance.

### Essential
| Skill | When to use |
|-------|-------------|
| `systematic-debugging` | Any bug or unexpected error |
| `finishing-a-branch` | Before finalizing work or creating a PR |
| `napkin` | Persistent memory of project learnings |

### Recommended
| Skill | When to use |
|-------|-------------|
| `dev-cli-tools` | Questions about available CLI tools |
| `test-driven-development` | When writing unit tests |

---

## Frontend / Web

React, Vue, Next.js, or any web application with a UI.

### Essential
| Skill | When to use |
|-------|-------------|
| `interface-design` | Consistent UI design, spacing, colors |
| `systematic-debugging` | Component or state bugs |
| `test-driven-development` | React/Vue component tests |

### Recommended
| Skill | When to use |
|-------|-------------|
| `finishing-a-branch` | Before deploying or creating a PR |
| `napkin` | Maintaining design patterns across sessions |
| `firecrawl-web` | Capturing website content for analysis |

---

## Backend / API

Node.js, Python, Java, or any API service.

### Essential
| Skill | When to use |
|-------|-------------|
| `systematic-debugging` | API errors, database issues, connection problems |
| `test-driven-development` | Endpoint and business logic tests |
| `finishing-a-branch` | Before deploy or release |

### Recommended
| Skill | When to use |
|-------|-------------|
| `dev-cli-tools` | Tool guidance per stack (Node/Python/Java) |
| `napkin` | Documenting architecture decisions |

---

## Data / Analytics Project

Jupyter notebooks, ETL scripts, dashboards, analytics.

### Essential
| Skill | When to use |
|-------|-------------|
| `systematic-debugging` | Data transformation errors |
| `dev-cli-tools` | Tools like `jq`, `fx`, `dasel`, `visidata` |

### Recommended
| Skill | When to use |
|-------|-------------|
| `finishing-a-branch` | Validation before using data in production |
| `napkin` | Documenting data sources and transformations |

---

## Team / Collaborative Project

Multiple developers working on the same codebase.

### Essential
| Skill | When to use |
|-------|-------------|
| `finishing-a-branch` | **Always** before creating a PR |
| `systematic-debugging` | Bugs reported by others |
| `napkin` | Sharing learnings with the team |

### Recommended
| Skill | When to use |
|-------|-------------|
| `test-driven-development` | Ensuring new code has tests |
| `interface-design` | Maintaining consistency across contributors |

---

## Long-Term Project

Projects spanning weeks/months with multiple sessions.

### Essential
| Skill | When to use |
|-------|-------------|
| `napkin` | **Always** — accumulate learnings across sessions |
| `systematic-debugging` | Regression bugs |
| `finishing-a-branch` | Maintaining quality over time |

### Recommended
| Skill | When to use |
|-------|-------------|
| `opencode-roadmap` | Milestone and dependency planning |
| `context-analysis` | Monitoring token usage in long sessions |
| `dynamic-context-pruning` | Maintaining performance in extended conversations |

---

## Special-Needs Projects

### AI / Machine Learning
| Skill | When to use |
|-------|-------------|
| `dev-cli-tools` | Python, uv, ruff, jupyter tools |
| `test-driven-development` | Model and pipeline tests |

### DevOps / Infrastructure
| Skill | When to use |
|-------|-------------|
| `dev-cli-tools` | Docker, kubectl, awscli, terraform |
| `systematic-debugging` | Logs, containers, networks |
| `finishing-a-branch` | Validation before apply |

### Security / Audit
| Skill | When to use |
|-------|-------------|
| `dev-cli-tools` | gitleaks, trufflehog, age, op |
| `finishing-a-branch` | Checking for secrets before push |

---

## Quick Reference

```
New project?              → systematic-debugging, napkin, finishing-a-branch
Bug to fix?               → systematic-debugging
Writing tests?            → test-driven-development
UI design?                → interface-design
Tool questions?           → dev-cli-tools
Before PR?                → finishing-a-branch
Long-term project?        → napkin, context-analysis
Very long session?        → dynamic-context-pruning
```

---

## How to Use This Guide

1. **Identify your project type** from the list above
2. **Activate the essential skills** recommended
3. **Add recommended skills** as needed
4. **Consult the Quick Reference** for fast decisions

Remember: you can load multiple skills simultaneously and OpenCode will use them as context dictates.
