/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/object-management-system-react/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
