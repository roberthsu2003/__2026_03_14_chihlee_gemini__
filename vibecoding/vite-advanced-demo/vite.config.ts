import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // [進階配置 4] 加入打包分析視覺化工具，在 build 之後會產出 stats.html
    visualizer({ open: false, filename: "stats.html" }) as any,
  ],

  // [進階配置 2] 設定路徑別名 (Alias)
  resolve: {
    alias: {
      // 告訴 Vite：只要看到 '@' 就當作是專案的 'src' 目錄
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // [進階配置 3] 設定跨域代理 (Proxy)
  server: {
    proxy: {
      // 當前端向 '/api' 發出請求時，Vite 會幫忙攔截並偷偷轉發到後端 (解決 CORS)
      "/api": {
        // 目標伺服器網址 (假設後端跑在本機的 3000 port)
        target: "http://localhost:3000",
        changeOrigin: true, // 必設：變更請求頭的 Host，偽裝成同源請求
        secure: false, // 若目標是 https 且沒有有效憑證，設為 false 可忽略錯誤

        // 如果後端實際上沒有 /api 這個前綴，可以在這裡把它拔除：
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // [進階配置 4] 建置與打包優化 (Build Optimization)
  build: {
    rollupOptions: {
      output: {
        // 手動分塊 (Manual Chunks)：把肥大的第三方套件獨立切出一包，增加快取的重用率
        manualChunks(id) {
          if (id.includes("lucide-react")) return "lucide";
          if (id.includes("react") || id.includes("react-dom")) return "vendor";
        },
      },
    },
  },
});
