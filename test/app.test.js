import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { once } from 'node:events';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../src/httpApp.js';

async function withServer(run, options) {
  const server = createApp(options);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

test('GET /health returns a non-cacheable liveness response', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  });
});

test('unknown paths return 404', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/not-a-route`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'Not found' });
  });
});

test('non-GET methods return 405 and advertise the allowed method', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`, { method: 'POST' });

    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET');
  });
});

test('built frontend files are served with restrictive browser headers', async () => {
  const staticDirectory = await mkdtemp(path.join(os.tmpdir(), 'backend-gudang-ui-'));
  await mkdir(path.join(staticDirectory, 'assets'));
  await writeFile(path.join(staticDirectory, 'index.html'), '<main>Playground</main>');
  await writeFile(path.join(staticDirectory, 'assets', 'app.js'), 'console.log("ready")');

  try {
    await withServer(async (baseUrl) => {
      const page = await fetch(baseUrl);
      assert.equal(page.status, 200);
      assert.equal(await page.text(), '<main>Playground</main>');
      assert.match(page.headers.get('content-security-policy'), /connect-src 'self'/);

      const asset = await fetch(`${baseUrl}/assets/app.js`);
      assert.equal(asset.status, 200);
      assert.equal(asset.headers.get('cache-control'), 'public, max-age=31536000, immutable');
    }, { staticDirectory });
  } finally {
    await rm(staticDirectory, { recursive: true, force: true });
  }
});