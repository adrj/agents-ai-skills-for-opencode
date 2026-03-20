---
name: firecrawl-web
description: Use when you need to scrape websites, search the web, map site URLs, or do web research. Requires firecrawl-cli installed and authenticated. Use for gathering content from URLs or web searches.
license: MIT
compatibility: opencode
metadata:
  source: https://docs.firecrawl.dev/sdks/cli
  adapted-for: opencode
---

# Firecrawl Web Skill

Use the Firecrawl CLI to scrape, search, crawl and interact with web content.

## Setup (one-time)

```bash
# Install globally
npm install -g firecrawl-cli

# Authenticate
firecrawl login

# Verify
firecrawl --status
```

## Core Commands

### Scrape a URL

```bash
# Get clean markdown content (recommended)
firecrawl https://example.com --only-main-content

# Get HTML
firecrawl https://example.com --html

# Multiple formats (returns JSON)
firecrawl https://example.com --format markdown,links

# Save to file
firecrawl https://example.com -o output.md
```

### Search the Web

```bash
# Basic search
firecrawl search "query here"

# With limit
firecrawl search "AI news" --limit 10

# Recent results only
firecrawl search "tech news" --tbs qdr:d   # last day
firecrawl search "tech news" --tbs qdr:w   # last week

# Search and scrape results
firecrawl search "documentation" --scrape --scrape-formats markdown
```

### Discover URLs on a Site

```bash
# Map all URLs
firecrawl map https://example.com

# Filter by pattern
firecrawl map https://example.com --search "blog"

# Include subdomains
firecrawl map https://example.com --include-subdomains
```

### Crawl Entire Site

```bash
# Crawl and wait for completion
firecrawl crawl https://example.com --wait --limit 100 --max-depth 3

# With progress
firecrawl crawl https://example.com --wait --progress -o results.json
```

### AI Agent Search

```bash
# Natural language research (no URLs needed)
firecrawl agent "Find the top 5 AI startups and their funding amounts" --wait

# Focus on specific URLs
firecrawl agent "Compare pricing plans" --urls https://slack.com/pricing --wait
```

## When to Use Each Command

| Task | Command |
|------|---------|
| Read a specific page | `firecrawl <url> --only-main-content` |
| Web research | `firecrawl search "query" --scrape` |
| Find all pages on a site | `firecrawl map <url>` |
| Download entire docs site | `firecrawl crawl <url> --wait` |
| AI-powered research | `firecrawl agent "research question" --wait` |

## Tips

- Always use `--only-main-content` for cleaner output when reading articles
- Use `--tbs qdr:d` for recent news/events
- Pipe output: `firecrawl https://example.com | head -100`
- Save JSON with pretty formatting: `firecrawl ... --pretty -o results.json`
- Check credits: `firecrawl credit-usage`

## Workflow Example: Research a Topic

```bash
# 1. Search for sources
firecrawl search "opencode agent skills" --limit 10 --pretty

# 2. Scrape the most relevant result
firecrawl https://opencode.ai/docs/skills/ --only-main-content

# 3. If you need the whole site
firecrawl crawl https://opencode.ai/docs/ --wait --limit 50 -o docs.json
```
