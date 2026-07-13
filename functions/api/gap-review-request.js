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

  if (String(body.company || '').trim()) return json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const website = clean(body.website, 240);
  const constraint = clean(body.constraint, 80);
  const startedAt = Number(body.startedAt || 0);
  const elapsed = Date.now() - startedAt;
  const fallbackUrl = createFallbackUrl(name, email, website, constraint);

  if (name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please enter a valid work email.' }, 400);
  if (website.length < 3) return json({ error: 'Please enter your website.' }, 400);
  if (!constraint) return json({ error: 'Please choose the closest constraint.' }, 400);
  if (!Number.isFinite(elapsed) || elapsed < 1_500 || elapsed > 86_400_000) {
    return json({ error: 'Please reload the page and try again.' }, 400);
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ error: 'The gap review form is not configured.', fallbackUrl }, 503);
  }

  const text = [
    'New gap review request',
    '',
    `Name: ${name}`,
    `Work email: ${email}`,
    `Website: ${website}`,
    `Primary constraint: ${constraint}`,
    '',
    'Requested entry offer:',
    'First material gap, evidence to check, and recommended starting path.',
    `Source: ${url.origin}/#gap-review`,
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

function createFallbackUrl(name, email, website, constraint) {
  const subject = 'Caliperworks Gap Review Request';
  const body = `Hi Pranit,\n\nPlease review my site and recommend the first constraint worth fixing.\n\nName: ${name}\nWork email: ${email}\nWebsite: ${website}\nPrimary constraint: ${constraint}`;
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
