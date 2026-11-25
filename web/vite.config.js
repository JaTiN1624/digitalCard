import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on the LAN too, so phones on the same Wi-Fi can open the dev server.
    host: true,
    // Forward API calls to the backend, so the browser only ever talks to this server.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
