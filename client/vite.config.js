import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths in production
  build: {
    outDir: 'dist',
  },
  server: {
    mimeTypes: {
      '.js': 'application/javascript', // Ensure JS files are served with the correct MIME type
      '.jsx': 'application/javascript', // Add support for .jsx files if using React
    },
  },
});
