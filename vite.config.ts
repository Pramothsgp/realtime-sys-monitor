import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copy({
      targets: [
        { src: 'src/ui/assets', dest: 'dist-react/assets' }
      ],
      hook: 'buildStart',
    })
  ],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  publicDir: 'public',
})
