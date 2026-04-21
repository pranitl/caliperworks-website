import { acceptsMarkdown, estimateMarkdownTokens, htmlToMarkdown } from './_markdown.js';

export async function onRequest(context) {
  const { env, request } = context;
  const assetResponse = await env.ASSETS.fetch(request);
  const isHomepage = new URL(request.url).pathname === '/';

  if (!acceptsMarkdown(request.headers.get('Accept'))) {
    if (isHomepage) {
      return withDiscoveryHeaders(assetResponse);
    }

    return assetResponse;
  }

  const contentType = assetResponse.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('text/html')) {
    if (isHomepage) {
      return withDiscoveryHeaders(assetResponse);
    }

    return assetResponse;
  }

  const markdown = htmlToMarkdown(await assetResponse.text(), request.url);
  const headers = new Headers(assetResponse.headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  if (isHomepage) {
    headers.set('Link', appendDiscoveryLinks(headers.get('Link')));
  }
  headers.set('Vary', appendVary(headers.get('Vary'), 'Accept'));
  headers.set('x-markdown-tokens', String(estimateMarkdownTokens(markdown)));
  headers.delete('Content-Length');

  if (request.method === 'HEAD') {
    return new Response(null, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  }

  return new Response(markdown, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });
}

function appendVary(currentValue, nextValue) {
  if (!currentValue) return nextValue;

  const values = currentValue.split(',').map((value) => value.trim().toLowerCase());
  return values.includes(nextValue.toLowerCase()) ? currentValue : `${currentValue}, ${nextValue}`;
}

function withDiscoveryHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Link', appendDiscoveryLinks(headers.get('Link')));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function appendDiscoveryLinks(currentValue) {
  const discoveryLinks = [
    '</>; rel="alternate"; type="text/markdown"',
    '</llms.txt>; rel="describedby"; type="text/plain"',
    '</services/>; rel="service-doc"; type="text/html"',
    '</sitemap.xml>; rel="service-meta"; type="application/xml"',
  ];
  const existingLinks = currentValue ? currentValue.split(',').map((value) => value.trim()) : [];

  for (const link of discoveryLinks) {
    if (!existingLinks.includes(link)) {
      existingLinks.push(link);
    }
  }

  return existingLinks.join(', ');
}
