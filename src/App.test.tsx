import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { afterEach, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
});

it('labels only the verified endpoint, passes an accessibility scan, and displays actual backend response', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"status":"ok"}', {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })));

  const { container } = render(<App />);
  const accessibility = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
  expect(accessibility.violations).toEqual([]);
  expect(screen.getByText('Verified endpoints')).toBeInTheDocument();
  expect(screen.getAllByText('01')).toHaveLength(2);
  expect(screen.getByText('Not checked')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /run health check/i }));

  await waitFor(() => expect(screen.getByText(/Last HTTP status 200/)).toBeInTheDocument());
  expect(screen.getByText(/Requests passed/)).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(`${window.location.origin}/health`, expect.objectContaining({ method: 'GET' }));
});

it('does not claim the backend is responding after a network failure', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /run health check/i })[0]);

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/backend could not be reached.*check that the backend is running/i));
  expect(screen.getByText('Not checked')).toBeInTheDocument();
});

it('keeps query values out of request history', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"status":"ok"}', {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })));

  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Request Builder' }));
  fireEvent.change(screen.getByRole('textbox', { name: /query parameters/i }), { target: { value: 'probe=private' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  await waitFor(() => expect(screen.getByRole('tab', { name: 'Pretty' })).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Request History' }));

  expect(screen.getByText('/health')).toBeInTheDocument();
  expect(screen.queryByText(/private/)).not.toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(`${window.location.origin}/health?probe=private`, expect.anything());
});