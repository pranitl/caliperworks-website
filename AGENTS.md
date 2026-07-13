# AGENTS.md — Caliperworks Website

Keep the public site useful to people, crawlers, and LLM clients without claiming capabilities Caliperworks does not provide.

## Durable product rules

- Treat `public/llms.txt`, `public/robots.txt`, homepage discovery headers, and markdown negotiation as one agent-facing surface. Keep their public claims consistent with the live site.
- Do not claim a public API, MCP server, WebMCP tools, or skill index unless it is actually implemented and available.
- HTML remains the normal browser response. Explicit `Accept: text/markdown` requests should receive equivalent markdown with the appropriate content type and `Vary: Accept`; browser wildcard requests remain HTML.
- Keep the published AI/content preference in `robots.txt` aligned with the business decision. Do not alter it speculatively.

## Verification and delivery

- When touching relevant routes, content signals, or markdown conversion, run the focused site validation documented in the repository and inspect the resulting headers or deployed surface when release state is relevant.
- Keep detailed header values, llms.txt formatting examples, and commands in the project docs and scripts rather than duplicating them here.
- Do not deploy or change public policy without explicit user approval. Delegate only independent, bounded review or verification work.
