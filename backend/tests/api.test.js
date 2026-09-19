const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const app = require('../app');

let server;
let baseUrl;

test.before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /api/health should return 200 and healthy status metadata', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.strictEqual(response.status, 200);

  const data = await response.json();
  assert.strictEqual(data.status, 'ok');
  assert.strictEqual(data.service, 'Traveloop API');
  assert.ok(typeof data.timestamp === 'string');
  assert.ok(typeof data.uptime === 'string');
});

test('GET /api/trips/public should return 200 with an array of public trips', async () => {
  const response = await fetch(`${baseUrl}/api/trips/public`);
  assert.strictEqual(response.status, 200);

  const data = await response.json();
  assert.strictEqual(data.success, true);
  assert.ok(Array.isArray(data.data));
});

test('GET /api/trips/invalid-id-without-token should return 401 Unauthorized', async () => {
  const response = await fetch(`${baseUrl}/api/trips/sample-invalid-id`);
  assert.strictEqual(response.status, 401);

  const data = await response.json();
  assert.strictEqual(data.success, false);
});
