/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter()],
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
