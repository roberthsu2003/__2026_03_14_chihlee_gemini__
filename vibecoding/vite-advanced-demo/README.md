```md
/home/pi/Documents/__2026_03_14_chihlee_gemini__/vibecoding/vite-advanced-demo/README.md
# Vite 進階配置示範

這是一個展示 Vite 進階配置的 React + TypeScript 專案，包含了環境變數、跨域代理、路徑別名等實用功能。

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
```

### 預覽建置結果
```bash
npm run preview
```

## 📁 專案結構

```
vite-advanced-demo/
├── public/                 # 靜態資源
│   ├── favicon.svg
│   └── icons.svg
├── src/                    # 源代碼
│   ├── assets/            # 資源文件
│   ├── components/        # React 元件
│   ├── App.css           # App 樣式
│   ├── App.tsx           # 主應用元件
│   ├── index.css         # 全域樣式
│   └── main.tsx          # 應用入口
├── .env.development      # 開發環境變數
├── .env.production       # 生產環境變數
├── .gitignore           # Git 忽略文件
├── eslint.config.js     # ESLint 配置
├── index.html           # HTML 模板
├── package.json         # 專案配置與依賴
├── tsconfig.json        # TypeScript 配置
├── tsconfig.app.json    # 應用程式 TypeScript 配置
├── tsconfig.node.json   # 節點 TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 🔧 進階配置

### 1. 環境變數

專案使用 Vite 的環境變數功能，區分開發與生產環境：

- 開發環境變數：`.env.development`
- 生產環境變數：`.env.production`

**重要提示：** 只有以 `VITE_` 開頭的變數會暴露給前端代碼，其餘變數將被保護。

範例：
```env
# 前端可訪問
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Vite進階模版

# 前端無法訪問 (安全)
SECRET_TOKEN=this_is_a_secret
```

### 2. 路徑別名 (Path Aliases)

配置 `@` 作為 `src` 目錄的別名，避免使用繁瑣的相對路徑：

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

使用方式：
```tsx
// 替代 import UserCard from '../../components/UserCard'
import UserCard from '@/components/UserCard'
```

### 3. 跨域代理 (Proxy)

配置代理解決開發環境下的跨域問題：

```ts
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
},
```

這樣前端向 `/api` 發送的請求會被自動代理到 `http://localhost:3000/api`。

### 4. 打包分析與優化

使用 `rollup-plugin-visualizer` 進行打包分析，並配置手動分塊：

```ts
// vite.config.ts
plugins: [
  react(),
  visualizer({ open: false, filename: 'stats.html' }) as any
],

build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        lucide: ['lucide-react'] 
      }
    }
  }
}
```

建置後會生成 `stats.html` 文件，用於分析打包結果。

## 🛠️ 開發工具

- **Vite** - 現代前端構建工具
- **React 19** - 使用者介面庫
- **TypeScript** - 類型安全的 JavaScript
- **ESLint** - 代碼檢查工具
- **Lucide React** - 圖標庫

## 📦 依賴說明

### 生產依賴
- `react` - React 核心
- `react-dom` - React DOM 渲染器
- `lucide-react` - 圖標庫

### 開發依賴
- `@vitejs/plugin-react` - Vite 的 React 插件
- `typescript` - TypeScript 編譯器
- `vite` - Vite 構建工具
- `eslint` - 代碼檢查
- `@types/*` - TypeScript 類型定義
- `rollup-plugin-visualizer` - 打包分析工具

## 🎯 實際應用範例

查看 `src/App.tsx` 了解如何：
- 使用環境變數 (`import.meta.env.VITE_API_URL`)
- 使用路徑別名導入元件 (`@/components/UserCard`)
- 使用代理發送 API 請求 (`fetch('/api/test')`)

## 🔍 類型檢查

專案配置了嚴格的 TypeScript 類型檢查，確保代碼品質與類型安全。

## 📚 參考資源

- [Vite 官方文檔](https://vite.dev/)
- [React 官方文檔](https://react.dev/)
- [TypeScript 官方文檔](https://www.typescriptlang.org/)
```
