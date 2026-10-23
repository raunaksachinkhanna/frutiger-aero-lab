import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed alongside lab-site under /frutiger-aero-lab/ on GitHub Pages,
// at the /aeroreddit/ subpath (see .github/workflows/deploy.yml).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/frutiger-aero-lab/aeroreddit/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
}))
