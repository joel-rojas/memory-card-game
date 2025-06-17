import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlify()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/containers": path.resolve(__dirname, "./src/containers"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/store": path.resolve(__dirname, "./src/store"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", "build"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "**/*.d.ts",
        "**/*.config.*",
      ],
    },
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
  },
  publicDir: "public",
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router"],
        },
      },
    },
  },
});
