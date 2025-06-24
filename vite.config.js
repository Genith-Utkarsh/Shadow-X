import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This is critical for proper asset paths in production
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  server: {
    port: 3000,
  }
});
