import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for Smart NLP Chatbot frontend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Frontend dev server port
    proxy: {
      // Proxy /api requests to the Flask backend
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
