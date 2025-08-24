/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    setupFiles: ['./vitest.setup.js'],
  },
  ssr: {
    // ensure react-fontawesome is not externalized to Node at runtime
    noExternal: ["@fortawesome/react-fontawesome"],
  },
});
