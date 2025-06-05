import { defineConfig } from "vite";

export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@fonts": "/src/assets/fonts",
      "@images": "/src/assets/images",
      "@audio": "/src/assets/audio",
      "@components": "/src/components",
    },
  },
});
