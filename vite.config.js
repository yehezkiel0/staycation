import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible({ prefix: "REACT_APP_" }), // Compatible with CRA env variables
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          "legacy-js-api",
          "import",
          "global-builtin",
          "if-function",
        ],
      },
    },
  },
  resolve: {
    alias: {
      // Resolve absolute imports from 'src' (CRA default behavior)
      parts: path.resolve(__dirname, "src/parts"),
      elements: path.resolve(__dirname, "src/elements"),
      pages: path.resolve(__dirname, "src/pages"),
      store: path.resolve(__dirname, "src/store"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      configs: path.resolve(__dirname, "src/configs"),
      utils: path.resolve(__dirname, "src/utils"),
      services: path.resolve(__dirname, "src/services"),
      hooks: path.resolve(__dirname, "src/hooks"),
      layouts: path.resolve(__dirname, "src/layouts"),
      context: path.resolve(__dirname, "src/context"),
      constants: path.resolve(__dirname, "src/constants"),
      src: path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000, // Default CRA port
    open: true,
  },
});
