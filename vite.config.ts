import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = repo name: deployed at https://aitoolscian-cpu.github.io/starboard/
export default defineConfig({
  base: '/starboard/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
  },
})
