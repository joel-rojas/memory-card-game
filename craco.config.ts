import path from "path";

const config = {
  typescript: {
    enableTypeChecking: true,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@assets/*": path.resolve(__dirname, "src/assets/*"),
      "@components": path.resolve(__dirname, "src/components"),
      "@components/*": path.resolve(__dirname, "src/components/*"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@hooks/*": path.resolve(__dirname, "src/hooks/*"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@pages/*": path.resolve(__dirname, "src/pages/*"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@contexts/*": path.resolve(__dirname, "src/contexts/*"),
      "@store": path.resolve(__dirname, "src/store"),
      "@store/*": path.resolve(__dirname, "src/store/*"),
      "@config": path.resolve(__dirname, "src/config"),
      "@config/*": path.resolve(__dirname, "src/config/*"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@containers/*": path.resolve(__dirname, "src/containers/*"),
    },
  },
};

export default config;
