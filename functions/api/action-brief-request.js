import { SEARCH_BRIEF_CATALOG } from './search-brief-catalog.js';

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) {
    return json({ error: 'Invalid request origin.' }, 403);
  }

  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ error: 'Expected a JSON request.' }, 415);
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > 10_000) {
    return json({ error: 'Request is too large.' }, 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (String(body.website || '').trim()) {
    return json({ ok: true });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const briefSlug = clean(body.briefSlug, 100).toLowerCase();
  const startedAt = Number(body.startedAt || 0);
  const elapsed = Date.now() - startedAt;

  if (name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please enter a valid work email.' }, 400);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(briefSlug)) return json({ error: 'Invalid search brief.' }, 400);
  const catalogBrief = SEARCH_BRIEF_CATALOG[briefSlug];
  if (!catalogBrief) return json({ error: 'Invalid search brief.' }, 400);
  const { businessName, geoLabel } = catalogBrief;
  if (!Number.isFinite(elapsed) || elapsed < 1_500 || elapsed > 86_400_000) {
    return json({ error: 'Please reload the page and try again.' }, 400);
  }

  const brief = { briefSlug, businessName, geoLabel };
  const fallbackUrl = createFallbackUrl(brief, name, email);
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ error: 'The request form is not configured.', fallbackUrl }, 503);
  }

  const text = [
    'New search brief request',
    '',
    `Business: ${businessName}`,
    `Geography: ${geoLabel}`,
    `Name: ${name}`,
    `Work email: ${email}`,
    `Brief: ${briefSlug}`,
    `Source: ${url.origin}/search-brief/${briefSlug}/`,
    '',
    'Requested artifact: 2-page action plan',
  ].join('\n');

  let telegramResponse;
  try {
    telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
      }),
    });
  } catch {
    return json({ error: 'The request could not be delivered.', fallbackUrl }, 502);
  }

  if (!telegramResponse.ok) {
    return json({ error: 'The request could not be delivered.', fallbackUrl }, 502);
  }

  let telegramResult;
  try {
    telegramResult = await telegramResponse.json();
  } catch {
    return json({ error: 'The request could not be confirmed.', fallbackUrl }, 502);
  }
  if (telegramResult.ok !== true) return json({ error: 'The request could not be confirmed.', fallbackUrl }, 502);

  return json({ ok: true });
}

function clean(value, maxLength) {
  return String(value || '').trim().replace(/[\r\n\t]+/g, ' ').slice(0, maxLength);
}

function createFallbackUrl(brief, name, email) {
  const subject = `${brief.businessName} 2-page action plan`;
  const body = `Hi Pranit,\n\nPlease send the ${brief.businessName} 2-page action plan to ${email}.\n\nName: ${name}\nGeography: ${brief.geoLabel}`;
  return `mailto:pranit@caliperworks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
