import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@css": "/src/css",
      "@js": "/src/js",
      "@fonts": "/src/assets/fonts",
      "@images": "/src/assets/images",
      "@audio": "/src/assets/audio",
      "@components": "/src/js/components",
      "@utils": "/src/js/utils",
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'pages/sobre.html'),
        testeNivelamento: resolve(__dirname, 'pages/teste-nivelamento.html'),
      },
    },
  },
});
