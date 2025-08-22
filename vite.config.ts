import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O nome do seu repositório no GitHub
const repositoryName = 'MotorApp_Calculator1';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repositoryName}/`,
})
