# Firecrawl CLI Reference (read on demand)

## Scrape
```bash
firecrawl https://example.com --only-main-content
firecrawl https://example.com --html
firecrawl https://example.com --format markdown,links
firecrawl https://example.com -o output.md
```

## Search
```bash
firecrawl search "query"
firecrawl search "query" --limit 10
firecrawl search "query" --tbs qdr:d   # last day
firecrawl search "query" --tbs qdr:w   # last week
firecrawl search "query" --scrape --scrape-formats markdown
```

## Map
```bash
firecrawl map https://example.com
firecrawl map https://example.com --search "blog"
firecrawl map https://example.com --include-subdomains
```

## Crawl
```bash
firecrawl crawl https://example.com --wait --limit 100 --max-depth 3
firecrawl crawl https://example.com --wait --progress -o results.json
```

## AI Agent
```bash
firecrawl agent "research question" --wait
firecrawl agent "question" --urls https://example.com --wait
```

## Tips
- Pipe: `firecrawl https://example.com | head -100`
- Pretty JSON: `firecrawl ... --pretty -o results.json`
- Credits: `firecrawl credit-usage`
