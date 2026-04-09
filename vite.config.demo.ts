import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      'hookra': resolve(__dirname, 'src/index.ts'),
    },
  },

  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
})
