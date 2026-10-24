import { createApp } from './httpApp.js';

const host = process.env.HOST?.trim() || '127.0.0.1';
const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const server = createApp();
let shuttingDown = false;

server.listen(port, host, () => {
  console.log(JSON.stringify({ level: 'info', message: 'server_started', host, port }));
});

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(JSON.stringify({ level: 'info', message: 'shutdown_started', signal }));
  server.close((error) => {
    if (error) {
      console.error(JSON.stringify({ level: 'error', message: 'shutdown_failed' }));
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));