export default defineConfig({
  base: './', // Ensures relative paths in production
  build: {
    outDir: 'dist',
  },
  server: {
    mimeTypes: {
      '.js': 'application/javascript', // Make sure JS files are served with the correct MIME type
    },
  },
});
