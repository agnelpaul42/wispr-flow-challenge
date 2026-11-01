import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : (process.env.GITHUB_ACTIONS ? '/wispr-flow-challenge/' : './'),
  plugins: [
    react(),
    tailwindcss(),
  ],
})
