import assert from 'node:assert/strict';
import { test } from 'node:test';
import { onRequestPost } from '../functions/api/gap-review-request.js';

const origin = 'https://preview.example';
const homeCarePath = '/industries/home-care-agencies/#search-review';
const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' };
const base = { name: 'Test Owner', email: 'owner@example.com', website: 'agency.example', startedAt: Date.now() - 3000 };
const target = { ...base, source: 'homeCare', serviceAndCity: 'Dementia care in Scottsdale, AZ' };

const post = (body, secrets = env, requestOrigin = origin) => onRequestPost({
  request: new Request(origin + '/api/gap-review-request', {
    method: 'POST',
    headers: { Origin: requestOrigin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }),
  env: secrets,
});

test('home-care requests include the optional focus and source page', async (t) => {
  const telegram = t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: true }));
  const response = await post(target);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(telegram.mock.callCount(), 1);
  const [url, { body }] = telegram.mock.calls[0].arguments;
  assert.match(url, /api\.telegram\.org\/bottest-token\/sendMessage$/);
  const message = JSON.parse(body);
  assert.equal(message.chat_id, 'test-chat');
  assert.ok(message.text.includes('Review focus: Dementia care in Scottsdale, AZ'));
  assert.ok(message.text.includes('Source: ' + origin + homeCarePath));
  assert.doesNotMatch(message.text, /Primary constraint/);
});

test('a website and work email are enough for a home-care review', async (t) => {
  const telegram = t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: true }));
  const { name, serviceAndCity, ...essentials } = target;
  const response = await post(essentials);
  assert.equal(response.status, 200);
  const message = JSON.parse(telegram.mock.calls[0].arguments[1].body).text;
  assert.ok(message.includes('Review focus: Use the agency website to choose a starting point.'));
  assert.doesNotMatch(message, /Name:/);
  const fallback = await post(essentials, {});
  assert.equal(fallback.status, 503);
  const link = new URL((await fallback.json()).fallbackUrl);
  assert.match(link.searchParams.get('body'), /Work email: owner@example.com/);
  assert.match(link.searchParams.get('body'), /Website: agency.example/);
});

test('homepage stays compatible with payloads that omit the source', async (t) => {
  const telegram = t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: true }));
  const response = await post({ ...base, constraint: 'Getting found in local search' });
  assert.equal(response.status, 200);
  const message = JSON.parse(telegram.mock.calls[0].arguments[1].body).text;
  assert.ok(message.includes('Primary constraint: Getting found in local search'));
  assert.ok(message.includes('Source: ' + origin + '/#gap-review'));
});

test('mocked delivery errors and missing configuration give a populated mailto, not success', async (t) => {
  const telegram = t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: false }, { status: 403 }));
  for (const [secrets, status] of [[{}, 503], [env, 502]]) {
    const response = await post(target, secrets);
    assert.equal(response.status, status);
    const { fallbackUrl, ok } = await response.json();
    assert.notEqual(ok, true);
    const mailto = new URL(fallbackUrl);
    assert.equal(mailto.pathname, 'pranit@caliperworks.com');
    assert.equal(mailto.searchParams.get('subject'), 'Caliperworks Home-Care Search Review');
    assert.ok(mailto.searchParams.get('body').includes('Dementia care in Scottsdale, AZ'));
    assert.ok(mailto.searchParams.get('body').includes(origin + homeCarePath));
  }
  assert.equal(telegram.mock.callCount(), 1);
});

test('invalid and cross-origin requests do not reach Telegram', async (t) => {
  const telegram = t.mock.method(globalThis, 'fetch');
  assert.equal((await post({ ...target, website: ' ' })).status, 400);
  assert.equal((await post({ ...base, constraint: ' ' })).status, 400);
  assert.equal((await post({ ...target, source: 'https://elsewhere.example' })).status, 400);
  assert.equal((await post(null)).status, 400);
  assert.equal((await post(target, env, 'https://elsewhere.example')).status, 403);
  assert.equal(telegram.mock.callCount(), 0);
});
