export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResult = {
  status: number;
  statusText: string;
  durationMs: number;
  timestamp: string;
  url: string;
  method: RequestMethod;
  headers: Array<[string, string]>;
  body: string;
  bodyBytes: number;
  bodyTruncated: boolean;
};

export class RequestError extends Error {
  kind: 'invalid-url' | 'timeout' | 'network' | 'cancelled';

  constructor(kind: RequestError['kind'], message: string) {
    super(message);
    this.name = 'RequestError';
    this.kind = kind;
  }
}

export function resolveRequestUrl(path: string, query: string, origin: string): string {
  let target: URL;

  try {
    target = new URL(path, origin);
  } catch {
    throw new RequestError('invalid-url', 'Enter a valid path on this app origin.');
  }

  if (target.origin !== origin || !['http:', 'https:'].includes(target.protocol)) {
    throw new RequestError('invalid-url', 'Requests are limited to this app origin.');
  }

  const params = new URLSearchParams(query.replace(/^\?/, ''));
  params.forEach((value, key) => target.searchParams.set(key, value));
  if ([...target.searchParams.keys()].some((key) => /token|secret|password|cookie|authorization|api[-_]?key|credential/i.test(key))) {
    throw new RequestError('invalid-url', 'Credential-like query parameters are blocked. Use the masked temporary credential field.');
  }
  return target.toString();
}

export function parseHeaders(value: string): Record<string, string> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value || '{}');
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Invalid JSON';
    throw new RequestError('invalid-url', `Headers must be valid JSON: ${detail}`);
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new RequestError('invalid-url', 'Headers must be a JSON object of name/value pairs.');
  }

  for (const [name, headerValue] of Object.entries(parsed)) {
    if (/token|secret|password|cookie|authorization|api[-_]?key|credential/i.test(name)) {
      throw new RequestError('invalid-url', `Use the masked temporary credential field instead of the sensitive "${name}" header.`);
    }
    if (typeof headerValue !== 'string') {
      throw new RequestError('invalid-url', `Header "${name}" must have a text value.`);
    }
  }

  return parsed as Record<string, string>;
}

export async function sendApiRequest({
  method,
  path,
  query,
  headers,
  body,
  token,
  timeoutMs = 15000,
  signal,
  origin = window.location.origin,
}: {
  method: RequestMethod;
  path: string;
  query: string;
  headers: Record<string, string>;
  body: string;
  token: string;
  timeoutMs?: number;
  signal?: AbortSignal;
  origin?: string;
}): Promise<ApiResult> {
  const url = resolveRequestUrl(path, query, origin);
  const requestHeaders = new Headers(headers);
  if (token.trim()) requestHeaders.set('authorization', `Bearer ${token.trim()}`);

  let requestBody: string | undefined;
  if (method !== 'GET' && body.trim()) {
    try {
      JSON.parse(body);
      requestBody = body;
      if (!requestHeaders.has('content-type')) {
        requestHeaders.set('content-type', 'application/json');
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Invalid JSON';
      throw new RequestError('invalid-url', `Request body is not valid JSON: ${detail}`);
    }
  }

  const controller = new AbortController();
  const abortFromCaller = () => controller.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();
  const timestamp = new Date().toISOString();

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
    });
    const { body: responseBody, bytes: bodyBytes, truncated: bodyTruncated } = await readResponseBody(response);
    const durationMs = Math.round(performance.now() - startedAt);

    return {
      status: response.status,
      statusText: response.statusText,
      durationMs,
      timestamp,
      url,
      method,
      headers: [...response.headers.entries()],
      body: responseBody,
      bodyBytes,
      bodyTruncated,
    };
  } catch (error) {
    if (signal?.aborted) {
      throw new RequestError('cancelled', 'Request cancelled.');
    }
    if (controller.signal.aborted) {
      throw new RequestError('timeout', `Request timed out after ${timeoutMs / 1000} seconds.`);
    }
    throw new RequestError('network', 'The backend could not be reached. Check that it is running and try again.');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}

async function readResponseBody(response: Response, maxBytes = 1_048_576): Promise<{ body: string; bytes: number; truncated: boolean }> {
  if (!response.body) return { body: '', bytes: 0, truncated: false };

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;

  while (bytes < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    const remaining = maxBytes - bytes;
    const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
    chunks.push(chunk);
    bytes += chunk.byteLength;
    if (chunk.byteLength < value.byteLength) {
      truncated = true;
      break;
    }
  }

  if (!truncated && bytes === maxBytes) {
    const next = await reader.read();
    truncated = !next.done;
  }

  if (truncated) await reader.cancel();
  const combined = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { body: new TextDecoder().decode(combined), bytes, truncated };
}

export function diagnosticFor(status: number): string {
  if (status === 400 || status === 422) return 'The server rejected this input. Check the request path, headers, and body.';
  if (status === 401) return 'The server requires valid authentication.';
  if (status === 403) return 'The server understood the request but denied access.';
  if (status === 404) return 'No route matched this path. Check the endpoint and HTTP method.';
  if (status === 409) return 'The request conflicts with the current server state.';
  if (status === 429) return 'The server is rate limiting requests. Wait before retrying.';
  if (status >= 500) return 'The server reported an error. Check backend logs for details.';
  return '';
}