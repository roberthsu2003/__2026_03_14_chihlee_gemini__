# Lesson 10 - React + TypeScript + Vite 專案結構說明

這是一個用 React + TypeScript + Vite 建立的前端專案。以下說明每個檔案的作用。

---

## 進入點

### `index.html`
整個網頁的起點。瀏覽器最先載入這個檔案。
裡面有一個 `<div id="root"></div>`，React 會把所有畫面渲染到這個 div 裡面。
同時載入 `src/main.tsx` 作為 JavaScript 的進入點。

### `src/main.tsx`
JavaScript/TypeScript 的進入點。
負責把 React 的根元件 `<App />` 掛載到 `index.html` 的 `#root` 上。
`StrictMode` 是 React 提供的開發輔助工具，會在開發時幫你找出潛在問題。

---

## React 元件

### `src/App.tsx`
整個應用程式的主元件（根元件）。
目前包含：
- 一個計數器按鈕，示範 React 的 `useState` 狀態管理
- 顯示 React 和 Vite 的 Logo
- 連結到官方文件和社群的區塊

這是你學習 React 時主要會修改的檔案。

---

## 樣式

### `src/index.css`
全域 CSS 樣式，套用到整個網頁。
定義了 CSS 變數（顏色、字型等），並支援深色模式（`prefers-color-scheme: dark`）。

### `src/App.css`
只針對 `App.tsx` 元件的樣式。
定義了計數器按鈕、Hero 圖片區塊、文件連結區塊等的外觀。

---

## 靜態資源

### `public/favicon.svg`
瀏覽器分頁上顯示的小圖示（網站圖示）。

### `public/icons.svg`
SVG 圖示集合，`App.tsx` 用 `<use href="/icons.svg#...">` 的方式引用裡面的圖示。

### `src/assets/`
放在這裡的圖片和 SVG 會被 Vite 處理（例如加上 hash 避免快取問題）。
- `react.svg` - React Logo
- `vite.svg` - Vite Logo
- `hero.png` - 首頁的主視覺圖片

---

## 設定檔

### `vite.config.ts`
Vite 的設定檔。
- `plugins: [react()]` - 啟用 React 支援（包含 JSX 轉換和 HMR 熱更新）
- `base` - 設定部署時的根路徑
- `build.outDir` - 設定打包輸出的資料夾位置

### `package.json`
專案的設定檔，記錄：
- 專案名稱和版本
- 常用指令：`npm run dev`（開發）、`npm run build`（打包）、`npm run lint`（檢查程式碼）
- 相依套件：`react`、`react-dom` 是執行時需要的；其餘是開發工具

### `tsconfig.json`
TypeScript 的主設定檔，把設定分成兩個子設定檔管理。

### `tsconfig.app.json`
針對 `src/` 裡面的應用程式程式碼的 TypeScript 設定。
- `jsx: "react-jsx"` - 讓 TypeScript 認識 JSX 語法
- `strict: true` - 開啟嚴格型別檢查

### `tsconfig.node.json`
針對 `vite.config.ts` 等 Node.js 環境執行的設定檔的 TypeScript 設定。

### `eslint.config.js`
ESLint 程式碼品質檢查的設定檔。
啟用了 TypeScript、React Hooks、React Refresh 等相關規則，幫助你寫出更好的程式碼。

### `.gitignore`
告訴 Git 哪些檔案不需要版本控制，例如 `node_modules/`、`dist/` 等。

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器（支援熱更新）
npm run build    # 打包成正式版本
npm run preview  # 預覽打包後的結果
npm run lint     # 檢查程式碼品質
```
