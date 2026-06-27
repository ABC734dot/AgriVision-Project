import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Whenever you fetch an endpoint starting with /api, 
      // Vite forwards it to your backend automatically
      '/api': {
        target: 'http://localhost:5001', // Put your backend port here
        changeOrigin: true,
        secure: false,
      }
    }
  }


})
