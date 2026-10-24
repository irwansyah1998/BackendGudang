import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const responseHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
};

const staticHeaders = {
  'content-security-policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
};

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function staticFileFor(pathname, staticDirectory) {
  if (pathname === '/' || pathname === '/index.html') {
    return path.join(staticDirectory, 'index.html');
  }

  if (pathname === '/favicon.svg') {
    return path.join(staticDirectory, 'favicon.svg');
  }

  const assetMatch = /^\/assets\/([A-Za-z0-9._-]+)$/.exec(pathname);
  return assetMatch ? path.join(staticDirectory, 'assets', assetMatch[1]) : null;
}

export function createApp({ staticDirectory = fileURLToPath(new URL('../dist/', import.meta.url)) } = {}) {
  return createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;

    if (request.method !== 'GET') {
      response.writeHead(405, { ...responseHeaders, allow: 'GET' });
      response.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    const staticFile = staticFileFor(pathname, staticDirectory);
    if (staticFile) {
      readFile(staticFile).then((content) => {
        const isHashedAsset = pathname.startsWith('/assets/');
        response.writeHead(200, {
          ...staticHeaders,
          'cache-control': isHashedAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
          'content-type': contentTypes[path.extname(staticFile)] ?? 'application/octet-stream',
        });
        response.end(content);
      }).catch((error) => {
        if (error.code !== 'ENOENT') {
          response.writeHead(500, responseHeaders);
          response.end(JSON.stringify({ error: 'Internal server error' }));
          return;
        }

        response.writeHead(404, responseHeaders);
        response.end(JSON.stringify({ error: 'Not found' }));
      });
      return;
    }

    if (pathname !== '/health') {
      response.writeHead(404, responseHeaders);
      response.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({ status: 'ok' }));
  });
}