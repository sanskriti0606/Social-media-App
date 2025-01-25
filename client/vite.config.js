import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 KiB
  },
});
