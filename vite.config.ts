import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    proxy: {
      '^/(?!$|index\\.html$|src/|@vite/|@react-refresh$|@id/|@fs/|node_modules/|favicon\\.svg$|assets/)': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: false,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/testSetup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});