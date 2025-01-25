import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths in production
  build: {
    outDir: 'dist',
  },
  server: {
    mimeTypes: {
      '.js': 'application/javascript', // Ensures JS files are served with correct MIME type
    },
  },
});
