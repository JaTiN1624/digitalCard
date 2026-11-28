import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Same rule as normalizePhone() in src/config/business.js
const isUsablePhone = (raw = '') => {
  let d = String(raw).replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  if (d.length === 10 && /^[6-9]/.test(d)) d = `91${d}`
  return d.length >= 11 && d.length <= 15
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // VITE_* values are baked into the bundle at build time. A missing WhatsApp number used to
  // ship silently (contact buttons opened WhatsApp with no recipient), so say so in the
  // build log — on Vercel this appears under Deployments → (deployment) → Build Logs.
  if (command === 'build' && mode === 'production') {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    if (!isUsablePhone(env.VITE_WHATSAPP_NUMBER)) {
      console.warn(
        '\n⚠  VITE_WHATSAPP_NUMBER is missing or not a valid phone number.\n' +
          '   Contact buttons will open WhatsApp without your number.\n' +
          '   Set it (e.g. 919876543210) in Vercel → Settings → Environment Variables (Production), then redeploy.\n',
      )
    }
  }

  return {
    plugins: [react()],
    server: {
      // Listen on the LAN too, so phones on the same Wi-Fi can open the dev server.
      host: true,
      // Forward API calls to the backend, so the browser only ever talks to this server.
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  }
})
