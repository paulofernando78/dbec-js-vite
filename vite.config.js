import { defineConfig } from "vite";

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
  }
});
