const BLOCK_TAGS = [
  'article',
  'aside',
  'blockquote',
  'br',
  'dd',
  'div',
  'dl',
  'dt',
  'figcaption',
  'figure',
  'footer',
  'form',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'section',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
];

const INLINE_SPACE_TAGS = ['span', 'strong', 'em', 'b', 'i', 'small'];

export function acceptsMarkdown(acceptHeader) {
  if (!acceptHeader) return false;

  return acceptHeader
    .split(',')
    .map((part) => {
      const [type, ...parameters] = part.trim().split(';').map((value) => value.trim());
      const q = parameters
        .find((parameter) => parameter.toLowerCase().startsWith('q='))
        ?.slice(2);

      return {
        type: type.toLowerCase(),
        q: q === undefined ? 1 : Number.parseFloat(q),
      };
    })
    .some(({ type, q }) => Number.isFinite(q) && q > 0 && type === 'text/markdown');
}

export function htmlToMarkdown(html, sourceUrl = 'https://caliperworks.com/') {
  const title = extractTagContent(html, 'title');
  const description = extractMetaContent(html, 'description');
  const body = extractRawTagContent(html, 'body') || html;
  const baseUrl = new URL(sourceUrl);
  const markdownBody = convertHtmlFragment(body, baseUrl);
  const frontmatter = [
    '---',
    title ? `title: ${escapeFrontmatterValue(title)}` : undefined,
    description ? `description: ${escapeFrontmatterValue(description)}` : undefined,
    `url: ${baseUrl.href}`,
    '---',
  ].filter(Boolean);

  return `${frontmatter.join('\n')}\n\n${markdownBody}\n`;
}

export function estimateMarkdownTokens(markdown) {
  return Math.max(1, Math.ceil(markdown.trim().split(/\s+/).filter(Boolean).length * 1.35));
}

function convertHtmlFragment(html, baseUrl) {
  let markdown = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '')
    .replace(/<img\b[^>]*\balt=(["'])(.*?)\1[^>]*>/gi, (_, __, alt) => (alt.trim() ? ` ${decodeHtml(alt)} ` : ' '))
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, attributes, label) => {
      const text = normalizeInlineText(stripTags(label));
      const href = extractAttribute(attributes, 'href');
      if (!text) return '';
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return text;

      return `[${escapeMarkdownLinkText(text)}](${new URL(href, baseUrl).href})`;
    });

  markdown = markdown.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, content) => {
    const text = normalizeInlineText(stripTags(content));
    return text ? `\n\n${'#'.repeat(Number(level))} ${text}\n\n` : '\n\n';
  });

  markdown = markdown
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, content) => {
      const text = normalizeInlineText(stripTags(content));
      return text ? `\n- ${text}` : '\n';
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '\n\n---\n\n');

  for (const tag of BLOCK_TAGS) {
    markdown = markdown.replace(new RegExp(`</?${tag}\\b[^>]*>`, 'gi'), '\n\n');
  }

  for (const tag of INLINE_SPACE_TAGS) {
    markdown = markdown.replace(new RegExp(`</?${tag}\\b[^>]*>`, 'gi'), ' ');
  }

  return decodeHtml(stripTags(markdown))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTagContent(html, tagName) {
  const content = extractRawTagContent(html, tagName);
  return content ? normalizeInlineText(stripTags(content)) : '';
}

function extractRawTagContent(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? match[1] : '';
}

function extractMetaContent(html, name) {
  const metaPattern = /<meta\b[^>]*>/gi;
  const tags = html.match(metaPattern) || [];
  const tag = tags.find((candidate) => extractAttribute(candidate, 'name')?.toLowerCase() === name.toLowerCase());
  return tag ? normalizeInlineText(extractAttribute(tag, 'content') || '') : '';
}

function extractAttribute(attributes, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = attributes.match(new RegExp(`\\b${escapedName}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match ? decodeHtml(match[2]) : '';
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ');
}

function normalizeInlineText(value) {
  return decodeHtml(value).replace(/\s+/g, ' ').trim();
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function escapeFrontmatterValue(value) {
  return JSON.stringify(value);
}

function escapeMarkdownLinkText(value) {
  return value.replace(/([\[\]])/g, '\\$1');
}
