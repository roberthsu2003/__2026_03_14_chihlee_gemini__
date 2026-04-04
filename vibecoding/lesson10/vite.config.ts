import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/__2026_03_14_chihlee_gemini__/',
  build: {
    outDir: '../../docs',
  },
})
