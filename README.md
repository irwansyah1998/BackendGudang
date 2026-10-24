# BackendGudang

Same-origin API playground for the verified BackendGudang Node.js API. Warehouse business requirements, persistence, and backend authentication have not yet been specified.

## Requirements

- Node.js 26.12.1 (the Node.js 26 line is currently Current, not LTS)
- npm bundled with Node.js

## Run

For a single-origin production-style local run:

```sh
npm run build
npm start
```

Open `http://127.0.0.1:3000`. The server listens on loopback by default. Set `HOST` and `PORT` to override these values. `GET /health` returns process liveness.

For frontend development, start the backend in one terminal and run `npm run dev` in another. The Vite server proxies API paths to the fixed backend at `127.0.0.1:3000` and is intended for trusted local use.

## Test

```sh
npm ci
npm test
```

The playground reports actual same-origin responses. It currently discovers the single verified `/health` route; it does not yet provide staging/production environments, saved requests, or backend authentication. See [Documentation.md](Documentation.md) for security limits, setup, and pending decisions.