import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@fonts": "/src/assets/fonts",
      "@images": "/src/assets/images",
      "@audio": "/src/aseets/audio",
      "@components": "/src/components"
    }
  }
})