import { useEffect, useRef, useState } from 'react';
import {
  Activity, ArrowDownToLine, ArrowRight, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Copy, FileCode2, FlaskConical, History, LayoutDashboard,
  LockKeyhole, Menu, Moon, Play, Plus, Search, Send, ShieldCheck, Sun, Trash2, X,
} from 'lucide-react';
import { diagnosticFor, RequestError, sendApiRequest, type ApiResult, type RequestMethod } from './apiClient';

type Page = 'Overview' | 'API Explorer' | 'Request Builder' | 'Test Suites' | 'Request History' | 'Documentation';
type HistoryEntry = Pick<ApiResult, 'status' | 'durationMs' | 'timestamp' | 'url' | 'method'> & { id: string };
const navItems: Array<{ label: Page; icon: typeof Activity }> = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'API Explorer', icon: FileCode2 },
  { label: 'Request Builder', icon: Send }, { label: 'Test Suites', icon: FlaskConical },
  { label: 'Request History', icon: History }, { label: 'Documentation', icon: CircleHelp },
];
const methods: RequestMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

function getInitialTheme(): 'light' | 'dark' {
  try { return localStorage.getItem('playground-theme') === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
}

function formatBody(body: string): string {
  try { return JSON.stringify(JSON.parse(body), null, 2); }
  catch { return body || '(empty response body)'; }
}

export default function App() {
  const [page, setPage] = useState<Page>('Overview');
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileNav, setMobileNav] = useState(false);
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [path, setPath] = useState('/health');
  const [query, setQuery] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');
  const [token, setToken] = useState('');
  const [result, setResult] = useState<ApiResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [responseTab, setResponseTab] = useState<'Pretty' | 'Raw' | 'Headers' | 'Request details'>('Pretty');
  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('playground-theme', theme); } catch { /* Preference is optional. */ }
  }, [theme]);

  async function sendRequest(overrides?: { method: RequestMethod; path: string }) {
    setBusy(true);
    setError('');
    setResult(null);
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      const response = await sendApiRequest({
        method: overrides?.method ?? method,
        path: overrides?.path ?? path,
        query,
        headers: JSON.parse(headers || '{}'),
        body,
        token,
        signal: controller.signal,
      });
      setResult(response);
      setError(response.bodyTruncated ? 'Response display capped at 1 MiB; additional bytes were not read.' : '');
      setHistory((previous) => [{
        id: `${response.timestamp}-${Math.random().toString(36).slice(2)}`,
        method: response.method, url: new URL(response.url).pathname, status: response.status,
        durationMs: response.durationMs, timestamp: response.timestamp,
      }, ...previous].slice(0, 30));
    } catch (cause) {
      setError(cause instanceof RequestError ? cause.message : 'Headers must be a JSON object with text values.');
    } finally {
      activeRequest.current = null;
      setBusy(false);
    }
  }

  function openRequest(endpoint: string, verb: RequestMethod = 'GET') {
    setPath(endpoint);
    setMethod(verb);
    setPage('Request Builder');
    setMobileNav(false);
  }

  const passed = history.filter((entry) => entry.status < 400).length;
  const failed = history.length - passed;
  const average = history.length ? Math.round(history.reduce((sum, entry) => sum + entry.durationMs, 0) / history.length) : null;
  const lastStatus = history[0]?.status;

  return <div className="shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Activity size={19} /></span><span><strong>backendlab</strong><small>API PLAYGROUND</small></span><button className="icon-button mobile-close" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X size={18} /></button></div>
      <div className="workspace"><span className="workspace-avatar">BG</span><span><strong>BackendGudang</strong><small>Workspace</small></span><ChevronDown size={15} /></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${page === label ? 'active' : ''}`} onClick={() => { setPage(label); setMobileNav(false); }}><Icon size={17} /><span>{label}</span>{label === 'API Explorer' && <small>01</small>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="security-note"><ShieldCheck size={16} /><span><strong>Same-origin only</strong><small>Requests stay local.</small></span></div><div className="user-row"><span className="user-avatar">Y</span><span><strong>Your workspace</strong><small>Local session</small></span><span className="online-dot" /></div></div>
    </aside>
    {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={20} /></button><div className="crumb"><span>BackendGudang</span><ChevronRight size={14} /><strong>{page}</strong></div></div><div className="top-actions"><span className="environment"><i /> LOCAL <small>same origin</small></span><button className="icon-button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button><button className="docs-shortcut" onClick={() => setPage('Documentation')}><CircleHelp size={15} /> Docs</button></div></header>
      {busy && page === 'Request Builder' && <button className="global-cancel" onClick={() => activeRequest.current?.abort()}><X size={14} /> Cancel request</button>}
      <div className="content">
        {page === 'Overview' && error && <div className="overview-error" role="alert"><CircleHelp size={15} /><span>{error} Check that the backend is running, then retry.</span></div>}
        {page === 'Overview' && <>
          <Heading eyebrow="YOUR LOCAL WORKSPACE" title={<>Make the API<br /><em>make sense.</em></>} description="Real requests against the backend you have, not the one you wish you had." action={<button className="button primary" onClick={() => setPage('Request Builder')}><Plus size={16} /> New request</button>} />
          <section className="hero"><div className="hero-copy"><div className="hero-kicker"><i /> LOCAL WORKSPACE</div><h2>Your backend,<br /><em>under the microscope.</em></h2><p>One verified endpoint so far. Start with a health check, then explore what responds.</p><div className="hero-buttons"><button className="button ink" onClick={() => sendRequest({ method: 'GET', path: '/health' })} disabled={busy}><Play size={14} fill="currentColor" /> Run health check <ArrowRight size={15} /></button><button className="link-button" onClick={() => setPage('API Explorer')}>Explore API <ArrowRight size={14} /></button></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="signal-core"><Activity size={31} /></div><div className="float-endpoint"><b>VERIFIED</b><code>/health</code></div><small>127.0.0.1 · SAME ORIGIN</small></div></section>
          <div className="section-heading"><div><h2>Session snapshot</h2><p>Measured from requests in this tab only.</p></div><span>SESSION DATA</span></div>
          <div className="metrics"><Metric icon={<Activity size={17} />} label="Backend status" value={lastStatus === undefined ? 'Not checked' : lastStatus < 500 ? 'Responding' : 'Error'} detail={lastStatus === undefined ? 'Run a check for live status' : `Last HTTP status ${lastStatus}`} tone="mint" /><Metric icon={<FileCode2 size={17} />} label="Verified endpoints" value="01" detail="Found in inspected source" tone="blue" /><Metric icon={<Check size={17} />} label="Requests passed" value={String(passed).padStart(2, '0')} detail={`${failed} non-2xx/3xx in this session`} tone="green" /><Metric icon={<Clock3 size={17} />} label="Average latency" value={average === null ? '—' : `${average} ms`} detail={history.length ? `${history.length} measured request${history.length === 1 ? '' : 's'}` : 'Waiting for first sample'} tone="amber" /></div>
          <div className="lower-grid"><section className="panel"><PanelTitle overline="DISCOVERED IN SOURCE" title="Endpoint to try" action={<button className="link-button" onClick={() => setPage('API Explorer')}>Explorer <ArrowRight size={14} /></button>} /><Endpoint method="GET" path="/health" detail="Process liveness · no auth" onClick={() => sendRequest({ method: 'GET', path: '/health' })} /></section><section className="panel"><PanelTitle overline="THIS TAB ONLY" title="Recent activity" action={<History size={17} className="muted" />} />{history.length ? history.slice(0, 3).map((entry) => <Recent key={entry.id} entry={entry} />) : <div className="empty-inline"><span><History size={17} /></span><div><strong>Nothing sent yet</strong><small>Real request summaries show up here.</small></div></div>}</section></div>
          <div className="truth-note"><ShieldCheck size={16} /><span><strong>No pretend metrics.</strong> Endpoint count is source-verified; request totals and latency are measured in this tab.</span></div>
        </>}
        {page === 'API Explorer' && <><Heading eyebrow="SOURCE-VERIFIED ROUTES" title="API Explorer" description="Routes found in the current backend implementation." action={<span className="verified-label"><Check size={14} /> 1 verified route</span>} /><label className="search-box"><Search size={16} /><input aria-label="Search endpoints" placeholder="Search path or description" value={filter} onChange={(event) => setFilter(event.target.value)} /></label><div className="group-caption">⌄ &nbsp; HEALTH <small>{'/health'.includes(filter.toLowerCase()) || 'health liveness'.includes(filter.toLowerCase()) ? '01' : '00'}</small></div>{('/health'.includes(filter.toLowerCase()) || 'health liveness'.includes(filter.toLowerCase())) ? <section className="panel explorer-card"><div className="explorer-main"><Method method="GET" /><div><code>/health</code><small>Process liveness check</small></div><span className="auth-free"><i /> No authentication</span><button className="icon-button circle-arrow" aria-label="Open GET /health in request builder" onClick={() => openRequest('/health')}><ArrowRight size={16} /></button></div><div className="explorer-foot"><span>Source: <code>src/app.js</code></span><span>200 · application/json · no-store</span></div></section> : <p className="empty-message">No verified endpoint matches “{filter}”.</p>}<div className="discovery-note"><CircleHelp size={17} /><div><strong>Just one route, by design.</strong><p>No OpenAPI spec or other routes were found. Try another path in Request Builder if needed; responses will come from the backend.</p></div></div></>}
        {page === 'Request Builder' && <><Heading eyebrow="REQUEST WORKBENCH" title="Build a request." description="Send an HTTP call to this backend origin and inspect the actual response." action={<span className="origin-label"><i /> LOCAL <code>{window.location.origin}</code></span>} /><div className="builder-grid"><section className="panel compose-panel"><PanelTitle overline="REQUEST CONFIGURATION" title="Compose" action={<span className="memory-label"><i /> IN THIS TAB</span>} /><div className="request-line"><label className="method-select"><span className="sr-only">HTTP method</span><select aria-label="HTTP method" value={method} onChange={(event) => setMethod(event.target.value as RequestMethod)}>{methods.map((verb) => <option key={verb}>{verb}</option>)}</select><ChevronDown size={14} /></label><label className="path-field"><span>{window.location.origin}</span><input aria-label="Request path" value={path} onChange={(event) => setPath(event.target.value)} placeholder="/health" /></label></div><div className="field-stack"><label className="field-label">Query parameters <small>key=value pairs</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="?verbose=true&limit=10" /></label><label className="field-label">Headers <small>JSON object</small><textarea rows={3} value={headers} onChange={(event) => setHeaders(event.target.value)} spellCheck={false} /></label>{method !== 'GET' && <label className="field-label">Request body <small>JSON</small><textarea rows={5} value={body} onChange={(event) => setBody(event.target.value)} placeholder={'{\n  "key": "value"\n}'} spellCheck={false} />{body && <JsonCheck value={body} />}</label>}</div><div className="token-panel"><div className="token-heading"><span><LockKeyhole size={15} /></span><div><strong>Bearer token</strong><small>Temporary · memory only · same origin</small></div><button className="link-button" disabled={!token} onClick={() => setToken('')}>Clear</button></div><div className="token-input"><input aria-label="Bearer token" type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Paste token for this request" /><small><ShieldCheck size={12} /> PRIVATE</small></div><div className="token-warning">Page scripts can access this value. It is never persisted or added to history.</div></div>{error && <div className="error-message" role="alert"><X size={16} />{error}</div>}<div className="send-row"><span><CircleHelp size={14} /> Same-origin URLs only.</span><button className="button primary" onClick={() => sendRequest()} disabled={busy}>{busy ? <span className="spinner" /> : <Send size={15} />}{busy ? 'Sending…' : 'Send request'}</button></div></section>
          <section className="panel response-panel"><PanelTitle overline="LIVE RESPONSE" title="Response" action={result && <span className={`http-result ${result.status < 400 ? 'good' : 'bad'}`}><i /> {result.status} {result.statusText}</span>} />{result ? <><div className="response-stats"><span><Clock3 size={14} /> {result.durationMs} ms</span><span>{result.bodyBytes < 1024 ? `${result.bodyBytes} B` : `${(result.bodyBytes / 1024).toFixed(1)} KB`}</span><span>{new Date(result.timestamp).toLocaleTimeString()}</span></div><div className="response-tabs" role="tablist" aria-label="Response sections">{(['Pretty', 'Raw', 'Headers', 'Request details'] as const).map((tab) => <button role="tab" aria-selected={responseTab === tab} key={tab} className={responseTab === tab ? 'selected' : ''} onClick={() => setResponseTab(tab)}>{tab}</button>)}</div><div className="response-body" role="tabpanel">{responseTab === 'Pretty' && <pre>{formatBody(result.body)}</pre>}{responseTab === 'Raw' && <pre>{result.body || '(empty response body)'}</pre>}{responseTab === 'Headers' && <div className="headers-list">{result.headers.map(([key, value]) => <div key={key}><code>{key}</code><span>{value}</span></div>)}</div>}{responseTab === 'Request details' && <div className="details-list"><span>Method <code>{result.method}</code></span><span>URL <code>{result.url}</code></span><span>Timestamp <code>{result.timestamp}</code></span><span>Body bytes <code>{result.bodyBytes} readable bytes</code></span></div>}</div>{result.status >= 400 && <div className="diagnostic"><CircleHelp size={14} />{diagnosticFor(result.status)} Hint only; cause is not confirmed.</div>}<div className="response-actions"><button onClick={async () => { await navigator.clipboard.writeText(result.body); setCopied(true); window.setTimeout(() => setCopied(false), 1300); }}><Copy size={14} />{copied ? 'Copied' : 'Copy response'}</button><button onClick={() => { const blobUrl = URL.createObjectURL(new Blob([result.body], { type: 'text/plain' })); const anchor = document.createElement('a'); anchor.href = blobUrl; anchor.download = `response-${result.status}.txt`; anchor.click(); URL.revokeObjectURL(blobUrl); }}><ArrowDownToLine size={14} />Download</button></div></> : <div className="response-empty">{busy ? <span className="spinner big" /> : <Activity size={22} />}<strong>{busy ? 'Waiting on the backend…' : 'Your response lands here.'}</strong><small>{busy ? 'Reading the actual response.' : 'Send a request to inspect status, headers, and body.'}</small></div>}</section></div><div className="truth-note"><ShieldCheck size={15} /><span>Browser fetch follows same-origin policy. Network/CORS errors can hide server responses; check the backend process first.</span></div></>}
        {page === 'Test Suites' && <><Heading eyebrow="LIVE ASSERTIONS" title="Test Suites" description="A real health request with explicit status and body assertions." action={<span className={`suite-badge ${(result ? result.status === 200 && result.body.includes('"status":"ok"') : !error) ? 'good' : 'bad'}`}>{busy ? 'RUNNING' : result ? result.status === 200 && result.body.includes('"status":"ok"') ? 'PASS' : 'FAIL' : error ? 'BLOCKED' : 'READY'}</span>} /><section className="panel suite-panel"><span className="suite-icon"><FlaskConical size={21} /></span><div className="overline">LIVE · NO FIXTURES</div><h2>Health checks</h2><p>Confirms HTTP 200 and the expected liveness payload from the backend.</p><div className="assertions"><div><Check size={14} /><code>status === 200</code><small>Exact response status</small></div><div><Check size={14} /><code>body.status === "ok"</code><small>Actual JSON field</small></div></div>{result && <div className={`suite-outcome ${result.status === 200 && result.body.includes('"status":"ok"') ? 'good' : 'bad'}`}><Check size={16} /><span><strong>{result.status === 200 && result.body.includes('"status":"ok"') ? 'Both assertions passed.' : 'At least one assertion failed.'}</strong><small>HTTP {result.status} · {result.durationMs} ms</small></span></div>}{error && <div className="suite-outcome bad"><X size={16} /><span><strong>Test blocked.</strong><small>{error}</small></span></div>}<button className="button primary" disabled={busy} onClick={() => sendRequest({ method: 'GET', path: '/health' })}><Play size={14} fill="currentColor" />{busy ? 'Running…' : 'Run health suite'}</button></section><div className="truth-note"><ShieldCheck size={15} /><span>This suite only reads liveness. It creates or modifies no records.</span></div></>}
        {page === 'Request History' && <><Heading eyebrow="CURRENT TAB · NOT PERSISTED" title="Request History" description="Request summaries only; credentials, headers, and bodies are excluded." action={history.length > 0 && <button className="button danger-quiet" onClick={() => setHistory([])}><Trash2 size={15} /> Clear history</button>} /><section className="panel history-panel"><div className="history-head"><span>METHOD</span><span>REQUEST</span><span>STATUS</span><span>TIME</span><span>WHEN</span></div>{history.length ? history.map((entry) => <button className="history-row" key={entry.id} onClick={() => openRequest(entry.url, entry.method)}><Method method={entry.method} /><code>{entry.url}</code><span className={entry.status < 400 ? 'text-good' : 'text-bad'}>{entry.status}</span><span>{entry.durationMs} ms</span><span>{new Date(entry.timestamp).toLocaleTimeString()}</span><ArrowRight size={14} /></button>) : <div className="empty-history"><History size={19} /><strong>No requests in this tab yet.</strong><small>Send a request to see a redacted summary.</small></div>}</section><div className="truth-note"><LockKeyhole size={15} /><span>Memory-only. Body, headers, and tokens are not recorded. Refresh clears this history.</span></div></>}
        {page === 'Documentation' && <><Heading eyebrow="VERIFIED CONTRACT" title="Documentation" description="Reference based on inspected backend implementation, not a guessed schema." /><section className="panel docs-panel"><div className="docs-intro"><FileCode2 size={19} /><span><strong>No OpenAPI document found.</strong><small>One route is verified in <code>src/app.js</code>.</small></span></div><div className="docs-route"><div><Method method="GET" /><code>/health</code><span className="auth-free"><i /> No authentication</span><button className="link-button" onClick={() => openRequest('/health')}>Try it <ArrowRight size={14} /></button></div><p>Process liveness only. It does not verify database or downstream readiness.</p><pre>{'{\n  "status": "ok"\n}'}</pre><small>200 · application/json · Cache-Control: no-store</small></div><div className="docs-footnote"><CircleHelp size={15} /> Unknown GET routes return 404. Non-GET methods return 405 with <code>Allow: GET</code>.</div></section></>}
      </div>
      <footer><span><i /> Frontend connected · live results</span><span>BackendGudang <b>·</b> Node.js API</span></footer>
    </main>
  </div>;
}

function Heading({ eyebrow, title, description, action }: { eyebrow: string; title: React.ReactNode; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="overline">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}
function PanelTitle({ overline, title, action }: { overline: string; title: string; action?: React.ReactNode }) {
  return <div className="panel-title"><div><div className="overline">{overline}</div><h3>{title}</h3></div>{action}</div>;
}
function Metric({ icon, label, value, detail, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: string }) {
  return <div className="metric"><span className={`metric-icon ${tone}`}>{icon}</span><small>{label}</small><strong>{value}</strong><span>{detail}</span></div>;
}
function Method({ method }: { method: string }) { return <span className={`method method-${method.toLowerCase()}`}>{method}</span>; }
function Endpoint({ method, path: endpoint, detail, onClick }: { method: string; path: string; detail: string; onClick: () => void }) {
  return <button className="endpoint-row" onClick={onClick}><Method method={method} /><code>{endpoint}</code><span>{detail}</span><ArrowRight size={15} /></button>;
}
function Recent({ entry }: { entry: HistoryEntry }) { return <div className="recent-row"><span className={`method-text ${entry.method.toLowerCase()}`}>{entry.method}</span><code>{entry.url}</code><span className={entry.status < 400 ? 'text-good' : 'text-bad'}>{entry.status}</span></div>; }
function JsonCheck({ value }: { value: string }) {
  try { JSON.parse(value); return <small className="json-good"><Check size={12} /> Valid JSON</small>; }
  catch (cause) { return <small className="json-bad"><X size={12} /> {cause instanceof Error ? cause.message : 'Invalid JSON'}</small>; }
}