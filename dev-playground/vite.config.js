import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          editor: resolve(__dirname, 'pages/editor.html'),
          viewer: resolve(__dirname, 'pages/viewer.html'),
        },
      },
    },
  }
});
