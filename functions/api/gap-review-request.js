import { gapReviewSources } from '../../src/lib/gap-review.js';

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

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (String(body.company || '').trim()) return json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const website = clean(body.website, 240);
  const source = body.source ?? 'home';
  if (source !== 'home' && source !== 'homeCare') return json({ error: 'Invalid review source.' }, 400);
  const isHomeCare = source === 'homeCare';
  const detail = isHomeCare ? clean(body.serviceAndCity, 160) : clean(body.constraint, 80);
  const detailLabel = isHomeCare ? 'Review focus' : 'Primary constraint';
  const sourceUrl = new URL(gapReviewSources[source], url.origin).href;
  const startedAt = Number(body.startedAt || 0);
  const elapsed = Date.now() - startedAt;

  if (!isHomeCare && name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please enter a valid work email.' }, 400);
  if (website.length < 3) return json({ error: 'Please enter your website.' }, 400);
  if (!isHomeCare && !detail) return json({ error: 'Please choose the closest constraint.' }, 400);
  if (!Number.isFinite(elapsed) || elapsed < 1_500 || elapsed > 86_400_000) {
    return json({ error: 'Please reload the page and try again.' }, 400);
  }

  const subject = isHomeCare ? 'Caliperworks Home-Care Search Review' : 'Caliperworks Gap Review Request';
  const offer = isHomeCare
    ? 'Email report on what families find on Google and what to change first.'
    : 'First material gap, evidence to check, and recommended starting path.';
  const requestDetails = [
    ...(!isHomeCare || name ? [`Name: ${name}`] : []),
    `Work email: ${email}`,
    `Website: ${website}`,
    `${detailLabel}: ${detail || 'Use the agency website to choose a starting point.'}`,
    `Source: ${sourceUrl}`,
  ];
  const fallbackUrl = createFallbackUrl(subject, offer, requestDetails);

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ error: 'The gap review form is not configured.', fallbackUrl }, 503);
  }

  const text = [
    isHomeCare ? 'New home-care search review request' : 'New gap review request',
    '',
    ...requestDetails,
    '',
    'Requested entry offer:',
    offer,
  ].join('\n');

  let telegramResponse;
  try {
    telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    });
  } catch {
    return json({ error: 'The request could not be delivered.', fallbackUrl }, 502);
  }

  if (!telegramResponse.ok) return json({ error: 'The request could not be delivered.', fallbackUrl }, 502);

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

function createFallbackUrl(subject, offer, requestDetails) {
  const body = ['Hi Pranit,', '', `I’d like to request the following review: ${offer}`, '', ...requestDetails].join('\n');
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
