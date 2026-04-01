# 靜態三件套示範 - 計數器

這是一個展示 HTML + CSS + JavaScript 基礎整合的入門範例，實作一個簡單的計數器功能。

---

## 📁 檔案結構

```
.
├── index.html    # 頁面結構
├── styles.css    # 視覺樣式
├── main.js       # 互動邏輯
└── README.md     # 本說明文件
```

---

## 🚀 使用方式

1. 直接用瀏覽器開啟 `index.html`
2. 點擊「+1」按鈕，觀察數字變化

> 💡 修改 `main.js` 後需重新整理頁面才會生效

---

## 📋 功能說明

| 檔案 | 職責 | 重點技術 |
|------|------|----------|
| `index.html` | 定義頁面結構與內容 | 語義化標籤、DOM 元素 ID |
| `styles.css` | 控制視覺呈現 | CSS 變數、Grid 置中、響應式單位 |
| `main.js` | 處理互動邏輯 | IIFE、事件監聽、DOM 操作 |

---

## 🔍 程式碼解析

### HTML (`index.html`)

- 使用 `<main>`、`<h1>`、`<button>` 等語義化標籤
- `id="value"`：數字顯示區域
- `id="increment"`：+1 按鈕
- JS 使用 `defer` 屬性，確保 DOM 載入完成後才執行

### CSS (`styles.css`)

- **`:root`**：定義全域字體與配色（藍色主題 `#2563eb`）
- **`body`**：`grid` + `place-items: center` 實現完美置中
- **`.card`**：白底卡片設計，含圓角與陰影
- **響應式單位**：使用 `rem` 而非 `px`，支援使用者調整字級

### JavaScript (`main.js`)

```javascript
(function () {
  // IIFE 創建獨立作用域，避免污染全域
  var count = 0;
  var valueEl = document.getElementById("value");
  var btn = document.getElementById("increment");

  function render() {
    // 安全檢查：確認元素存在才更新
    if (valueEl) valueEl.textContent = String(count);
  }

  if (btn) {
    btn.addEventListener("click", function () {
      count += 1;   // 狀態更新
      render();     // 畫面同步
    });
  }

  render(); // 初始渲染
})();
```

**程式設計特點：**
- ✅ **IIFE 包裹**：隔離變數作用域
- ✅ **防禦性檢查**：元素不存在時不報錯
- ✅ **單一職責**：`render()` 專責畫面更新

---

## 🎨 視覺預覽

```
┌─────────────────────────┐
│  HTML + CSS + JS        │
│                         │
│  改動 main.js 後需...   │
│                         │
│  目前數字：0            │
│                         │
│  [  +1  ]               │
└─────────────────────────┘
     ↓ 點擊
┌─────────────────────────┐
│  目前數字：1            │
└─────────────────────────┘
```

---

## 💡 學習重點

1. **分離關注**：結構、樣式、行為分別由三個檔案處理
2. **DOM 操作**：透過 `id` 取得元素，使用 `textContent` 更新內容
3. **事件處理**：用 `addEventListener` 綁定點擊事件
4. **狀態管理**：變數 `count` 儲存資料，`render()` 同步到畫面

---

## 🔧 可擴充方向

- [ ] 加入「-1」按鈕實現遞減
- [ ] 新增「重置」按鈕歸零
- [ ] 使用 `localStorage` 儲存計數值
- [ ] 鍵盤支援（空白鍵/方向鍵操作）
