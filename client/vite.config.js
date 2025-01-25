import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths in production
  build: {
    outDir: 'dist',
  },
});
