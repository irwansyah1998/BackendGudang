import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseHeaders, RequestError, resolveRequestUrl, sendApiRequest } from './apiClient';

afterEach(() => vi.restoreAllMocks());

describe('resolveRequestUrl', () => {
  it('resolves same-origin paths and query parameters', () => {
    expect(resolveRequestUrl('/health', 'verbose=true', 'http://localhost:3000'))
      .toBe('http://localhost:3000/health?verbose=true');
    expect(resolveRequestUrl('/health', '?verbose=true', 'http://localhost:3000'))
      .toBe('http://localhost:3000/health?verbose=true');
  });

  it('rejects absolute cross-origin and unsupported protocol targets', () => {
    expect(() => resolveRequestUrl('https://example.com', '', 'http://localhost:3000'))
      .toThrow('Requests are limited to this app origin.');
    expect(() => resolveRequestUrl('javascript:alert(1)', '', 'http://localhost:3000'))
      .toThrow(RequestError);
    expect(() => resolveRequestUrl('/health?access_token=secret', '', 'http://localhost:3000'))
      .toThrow('Credential-like query parameters are blocked');
  });

  it('validates headers as string-valued JSON object', () => {
    expect(parseHeaders('{"accept":"application/json"}')).toEqual({ accept: 'application/json' });
    expect(() => parseHeaders('[]')).toThrow('Headers must be a JSON object');
    expect(() => parseHeaders('{"x-count":2}')).toThrow('must have a text value');
    expect(() => parseHeaders('{"authorization":"secret"}')).toThrow('masked temporary credential field');
  });
});

describe('sendApiRequest', () => {
  it('returns actual response metadata and includes ephemeral bearer auth', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{"status":"ok"}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));

    const result = await sendApiRequest({
      method: 'GET', path: '/health', query: '', headers: {}, body: '', token: 'temporary',
      origin: 'http://localhost:3000',
    });

    expect(result.status).toBe(200);
    expect(result.body).toBe('{"status":"ok"}');
    expect(result.bodyBytes).toBeGreaterThan(0);
    expect(fetchMock.mock.calls[0][1]?.headers).toBeInstanceOf(Headers);
    expect((fetchMock.mock.calls[0][1]?.headers as Headers).get('authorization')).toBe('Bearer temporary');
  });

  it('rejects invalid JSON bodies before sending', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    await expect(sendApiRequest({
      method: 'POST', path: '/health', query: '', headers: {}, body: '{bad', token: '',
      origin: 'http://localhost:3000',
    })).rejects.toThrow('Request body is not valid JSON');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('normalizes timeout and network failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((_, options) => new Promise((_, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    await expect(sendApiRequest({
      method: 'GET', path: '/health', query: '', headers: {}, body: '', token: '', timeoutMs: 1,
      origin: 'http://localhost:3000',
    })).rejects.toMatchObject({ kind: 'timeout' });

    vi.restoreAllMocks();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('socket detail'));
    await expect(sendApiRequest({
      method: 'GET', path: '/health', query: '', headers: {}, body: '', token: '',
      origin: 'http://localhost:3000',
    })).rejects.toMatchObject({ kind: 'network', message: expect.not.stringContaining('socket detail') });
  });

  it('caps readable response bodies at 1 MiB', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('x'.repeat(1_048_600), { status: 200 }));
    const result = await sendApiRequest({
      method: 'GET', path: '/health', query: '', headers: {}, body: '', token: '',
      origin: 'http://localhost:3000',
    });
    expect(result.bodyBytes).toBe(1_048_576);
    expect(result.bodyTruncated).toBe(true);
  });

  it('supports caller cancellation', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((_, options) => new Promise((_, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    const controller = new AbortController();
    const pending = sendApiRequest({
      method: 'GET', path: '/health', query: '', headers: {}, body: '', token: '',
      signal: controller.signal, origin: 'http://localhost:3000',
    });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ kind: 'cancelled' });
  });
});