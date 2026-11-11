import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { onRequest } from '../functions/[[path]].js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function createContext(acceptHeader) {
  const request = new Request('https://caliperworks.com/', {
    headers: acceptHeader ? { Accept: acceptHeader } : {},
  });

  return {
    request,
    env: {
      ASSETS: {
        async fetch() {
          return new Response(html, {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=0, must-revalidate',
            },
          });
        },
      },
    },
  };
}

const markdownResponse = await onRequest(createContext('text/markdown'));
const markdown = await markdownResponse.text();

assert(markdownResponse.headers.get('Content-Type')?.startsWith('text/markdown'), 'Expected markdown content type');
assert(markdownResponse.headers.get('Link')?.includes('rel="alternate"'), 'Expected markdown alternate Link header on homepage markdown response');
assert(markdownResponse.headers.get('Link')?.includes('/llms.txt'), 'Expected llms.txt Link header on homepage markdown response');
assert(markdownResponse.headers.get('Link')?.includes('rel="service-doc"'), 'Expected service-doc Link header on homepage markdown response');
assert(markdownResponse.headers.get('Link')?.includes('rel="service-meta"'), 'Expected service-meta Link header on homepage markdown response');
assert(markdownResponse.headers.get('Vary')?.toLowerCase().split(',').map((value) => value.trim()).includes('accept'), 'Expected Vary: Accept');
assert(/^\d+$/.test(markdownResponse.headers.get('x-markdown-tokens') || ''), 'Expected x-markdown-tokens header');
assert(markdown.includes('title:'), 'Expected markdown frontmatter title');
assert(markdown.includes('#') && markdown.includes('Caliperworks'), 'Expected converted page markdown');
assert(!markdown.includes('<html'), 'Expected markdown body without HTML document tags');

const htmlResponse = await onRequest(createContext('text/html'));
assert(htmlResponse.headers.get('Content-Type')?.startsWith('text/html'), 'Expected HTML content type for browser Accept header');
assert(htmlResponse.headers.get('Link')?.includes('rel="alternate"'), 'Expected markdown alternate Link header on homepage HTML response');
assert(htmlResponse.headers.get('Link')?.includes('/llms.txt'), 'Expected llms.txt Link header on homepage HTML response');
assert(htmlResponse.headers.get('Link')?.includes('rel="service-doc"'), 'Expected service-doc Link header on homepage HTML response');
assert(htmlResponse.headers.get('Link')?.includes('rel="service-meta"'), 'Expected service-meta Link header on homepage HTML response');

const browserResponse = await onRequest(createContext('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'));
assert(browserResponse.headers.get('Content-Type')?.startsWith('text/html'), 'Expected HTML content type for wildcard browser Accept header');

const privacyPath = '/privacy/firstlight-care-planner/';
const privacyHtml = readPrivacyHtml();
assert(!privacyHtml.includes('https://app.cal.com/embed/embed.js'), 'Privacy notice must avoid loading the booking embed');
assert(privacyHtml.includes('https://caliperworks.com/privacy/firstlight-care-planner/'), 'Expected canonical privacy URL');
const privacyContext = createContext('text/markdown');
privacyContext.request = new Request(`https://caliperworks.com${privacyPath}`, { headers: { Accept: 'text/markdown' } });
privacyContext.env.ASSETS.fetch = async () => new Response(privacyHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
const privacyResponse = await onRequest(privacyContext);
const privacyMarkdown = await privacyResponse.text();
assert(privacyResponse.headers.get('Content-Type')?.startsWith('text/markdown'), 'Expected markdown privacy response');
assert(privacyResponse.headers.get('Vary')?.includes('Accept'), 'Expected privacy content negotiation header');
assert(privacyMarkdown.includes('FirstLight care planner privacy'), 'Expected privacy heading in markdown');
assert(privacyMarkdown.includes('pranit@caliperworks.com'), 'Expected privacy support contact in markdown');
assert(privacyMarkdown.includes('Optional resource answers'), 'Expected resource-answer disclosure in markdown');

function readPrivacyHtml() {
  return fs.readFileSync(path.join(root, 'dist/privacy/firstlight-care-planner/index.html'), 'utf8');
}

console.log('validate-markdown-negotiation: ok');
