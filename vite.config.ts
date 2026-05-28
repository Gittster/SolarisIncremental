import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use relative paths in production so the app works when served
  // under any sub-path (e.g. Claude Code's web preview proxy).
  // Dev server stays at '/' so HMR and absolute imports work normally.
  base: command === 'serve' ? '/' : './',
}))
