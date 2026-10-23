import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Builds the extension's regular pages (popup, options) as a normal
// multi-page Vite app. The content script is built separately (see
// vite.config.content.ts) because it must ship as a single classic script,
// not ES modules.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(import.meta.dirname, 'popup.html'),
        options: resolve(import.meta.dirname, 'options.html'),
      },
    },
  },
})
