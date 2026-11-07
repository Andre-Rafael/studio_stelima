import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O proxy evita problemas de CORS: o front chama /api/... e o Vite
// repassa para o Spring Boot em http://localhost:8080.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
});
