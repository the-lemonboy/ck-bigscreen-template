import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    server: {
      // 自动打开浏览器
      open: true,
      host: true,
      port: 8080,
      proxy: {
        '/dev': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [autoprefixer(), tailwindcss()],
      },
    },
  },
});
