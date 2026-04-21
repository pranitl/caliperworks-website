# AGENTS.md

Guidance for future agents working in this repository.

## Agent-Readiness Requirements

Keep the site friendly to browsers, crawlers, and LLM/agent clients without advertising capabilities Caliperworks does not actually provide.

Current agent-facing surfaces:
- `public/llms.txt`: concise LLM-facing site guide.
- `public/robots.txt`: crawl policy plus Content Signals.
- `functions/[[path]].js`: Cloudflare Pages Function for homepage discovery `Link` headers and markdown response negotiation.
- `functions/_markdown.js`: HTML-to-markdown conversion used when clients send `Accept: text/markdown`.
- `scripts/validate-markdown-negotiation.mjs`: local validation for markdown negotiation and discovery headers.

## llms.txt Maintenance

Update `public/llms.txt` whenever site positioning, services, pricing, industries, case studies, public URLs, or agent guidance changes.

Keep it aligned with the proposed `llms.txt` structure:
- Start with a single H1 containing the site/project name.
- Put a short blockquote summary immediately after the H1.
- Add concise plain-language context before link sections.
- Use H2 sections for resource groups.
- Use markdown link lists with descriptions: `- [Title](https://example.com/path): Description.`
- Put lower-priority links under `## Optional`.

Do not add claims that the site exposes a public API, MCP server, WebMCP tools, or agent skill index unless those capabilities are actually implemented.

## Discovery Headers

The homepage should include RFC 8288 `Link` headers that point agents to useful, real resources.

Current intended homepage links:
- `</>; rel="alternate"; type="text/markdown"`
- `</llms.txt>; rel="describedby"; type="text/plain"`
- `</services/>; rel="service-doc"; type="text/html"`
- `</sitemap.xml>; rel="service-meta"; type="application/xml"`

Do not add `api-catalog`, MCP, or tool-related relations unless the corresponding endpoint exists and is accurate.

## Markdown Negotiation

HTML must remain the default for normal browser requests.

Requests with an explicit `Accept: text/markdown` should return:
- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- `x-markdown-tokens` when available
- Markdown converted from the same HTML response

Browser-style wildcard Accept headers must continue receiving HTML.

## robots.txt Content Signals

Keep `public/robots.txt` explicit about AI/content usage preferences.

Current policy:
- `ai-train=no`
- `search=yes`
- `ai-input=yes`

Only change these if the business preference changes.

## Validation

After changing content, routes, `llms.txt`, discovery headers, markdown negotiation, or robots policy, run:

```sh
npm run build
npm run validate:site
npm run validate:markdown
```

For direct header inspection, use a mocked Pages Function request or check the deployed site after push:

```sh
curl -sS -D - -o /tmp/caliperworks.md https://caliperworks.com/ -H 'Accept: text/markdown'
curl -sS https://caliperworks.com/llms.txt
```

The live site may lag until Cloudflare Pages finishes deployment.
