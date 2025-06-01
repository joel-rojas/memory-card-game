import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": './src',
      "@/components": './src/components',
      "@/pages": './src/pages',
      "@/assets": './src/assets',
      "@/utils": './src/utils',
      "@/hooks": './src/hooks',
      "@/contexts": './src/contexts',
      "@/containers": './src/containers',
      "@/config": './src/config',
      "@/store": './src/store',
    }
  }
})
