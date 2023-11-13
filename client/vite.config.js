import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
      https: {
        key: './private.key',
        cert: './certificate.cert'
      }
    },
  };
  return defineConfig(config);
}
