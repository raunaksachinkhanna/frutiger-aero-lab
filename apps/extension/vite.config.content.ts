import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Content scripts can't reliably use ES module imports in MV3 across all
// Chromium versions, so this builds src/content/main.ts as a single IIFE
// with no code-splitting. CSS is pulled in via `?inline` imports in the
// source and injected at runtime, so there's no separate stylesheet to
// wire up in the manifest.
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/content/main.ts'),
      formats: ['iife'],
      name: 'AeroRedditContent',
      fileName: () => 'content.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
})
