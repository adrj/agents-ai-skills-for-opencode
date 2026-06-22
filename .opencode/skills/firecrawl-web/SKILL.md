---
name: firecrawl-web
description: Use when you need to scrape websites, search the web, map site URLs, or do web research. Requires firecrawl-cli installed and authenticated. Use for gathering content from URLs or web searches.
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [global]
tags: [web, scraping, search, research]
metadata:
  source: https://docs.firecrawl.dev/sdks/cli
  adapted-for: opencode
---

# Firecrawl Web Skill

Use the Firecrawl CLI to scrape, search, crawl and interact with web content.

## Setup

`npm install -g firecrawl-cli && firecrawl login`

## Quick Reference

| Need | Run |
|------|-----|
| Read a page | `firecrawl <url> --only-main-content` |
| Web search | `firecrawl search "query" --scrape` |
| List URLs on a site | `firecrawl map <url>` |
| Crawl a site | `firecrawl crawl <url> --wait --limit 100` |
| AI research | `firecrawl agent "question" --wait` |

## Workflow

1. **Search** → `firecrawl search "topic" --limit 10 --pretty`
2. **Scrape top result** → `firecrawl <url> --only-main-content`
3. **If results are large, save to file** → redirect to `-o` and use `head`/`tail`/`grep` to read selectively
4. After done, consider running `/context prune` to clear tool outputs (via dynamic-context-pruning)

## Tips

- `--only-main-content` for clean reading; `--tbs qdr:d` for recent results
- Write results to filesystem (`-o file.md`) instead of keeping in context
- Check credits: `firecrawl credit-usage`
- For full CLI reference, see `ops/firecrawl-commands.md`
