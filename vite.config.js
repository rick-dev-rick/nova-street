import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const githubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: githubPages ? '/nova-street/' : '/',
  define: { 'import.meta.env.VITE_GITHUB_PAGES': JSON.stringify(githubPages) },
  server: { allowedHosts: ['terminal.local'] },
})
