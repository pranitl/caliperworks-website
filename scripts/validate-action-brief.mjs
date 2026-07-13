import assert from 'node:assert/strict';

import { onRequestPost } from '../functions/api/action-brief-request.js';

const originalFetch = globalThis.fetch;
let sentPayload;

globalThis.fetch = async (url, options) => {
  assert.equal(url, 'https://api.telegram.org/bottest_token/sendMessage');
  assert.equal(options.method, 'POST');
  sentPayload = JSON.parse(options.body);
  return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), { status: 200 });
};

try {
  const valid = await submit({
    name: 'Alex Owner',
    email: 'alex@example.com',
    briefSlug: 'top-tier-home-care-austin',
    businessName: 'A forged business name that must be ignored',
    geoLabel: 'A forged geography that must be ignored',
    website: '',
    startedAt: Date.now() - 3_000,
  }, { TELEGRAM_BOT_TOKEN: 'test_token', TELEGRAM_CHAT_ID: '123456' });
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { ok: true });
  assert.equal(sentPayload.chat_id, '123456');
  assert.match(sentPayload.text, /Top-Tier Home Care/);
  assert.match(sentPayload.text, /Geography: Austin/);
  assert.doesNotMatch(sentPayload.text, /forged/);
  assert.match(sentPayload.text, /alex@example\.com/);

  const invalidEmail = await submit({
    name: 'Alex Owner',
    email: 'not-an-email',
    briefSlug: 'right-at-home-austin-west',
    businessName: 'Right at Home Austin West',
    geoLabel: 'Austin West',
    website: '',
    startedAt: Date.now() - 3_000,
  }, { TELEGRAM_BOT_TOKEN: 'test_token', TELEGRAM_CHAT_ID: '123456' });
  assert.equal(invalidEmail.status, 400);

  const missingSecret = await submit({
    name: 'Alex Owner',
    email: 'alex@example.com',
    briefSlug: 'right-at-home-austin-west',
    businessName: 'Right at Home Austin West',
    geoLabel: 'Austin West',
    website: '',
    startedAt: Date.now() - 3_000,
  }, {});
  const fallback = await missingSecret.json();
  assert.equal(missingSecret.status, 503);
  assert.match(fallback.fallbackUrl, /^mailto:/);

  console.log('validate-action-brief: ok');
} finally {
  globalThis.fetch = originalFetch;
}

function submit(body, env) {
  return onRequestPost({
    request: new Request('https://caliperworks.com/api/action-brief-request', {
      method: 'POST',
      headers: {
        Origin: 'https://caliperworks.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
    env,
  });
}
