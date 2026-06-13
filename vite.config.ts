import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 정적 사이트 배포(GitHub Pages, Vercel, Netlify 등 어떤 경로든)에서도
// 자산이 올바르게 로드되도록 상대 경로(base)를 사용합니다.
export default defineConfig({
  plugins: [react()],
  base: './',
})
