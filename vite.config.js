import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine if we're building for GitHub Pages or Vercel
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/my-portfolio/' : '/',
})
