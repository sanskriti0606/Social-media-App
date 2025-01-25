import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory is correct
  },
  server: {
    strictPort: true, // Optional: Fix server port binding issues
  },
});
