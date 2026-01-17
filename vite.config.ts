import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to a local PHP server during development
    // To test locally: 
    // 1. Open terminal in the api directory
    // 2. Run: php -S localhost:8000
    // 3. The proxy will forward /api/* requests to http://localhost:8000/*
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
