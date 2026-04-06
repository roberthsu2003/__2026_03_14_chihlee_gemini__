# lesson3_1.py 程式說明

## 概述

這是一個 **Open WebUI Filter（過濾器）** 插件，用於自動將使用者輸入的中文訊息翻譯成英文，並在 AI 回覆後附加公司資訊。

---

## 類別結構

### `Filter`

主要過濾器類別，包含兩個核心方法：`inlet`（入口）與 `outlet`（出口）。

#### `Filter.Valves`（設定參數）

| 欄位 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `enable_translation` | `bool` | `True` | 是否啟用自動翻譯為英文 |

---

## 方法說明

### `inlet(body, __user__)`

**觸發時機**：使用者送出訊息時（進入 AI 之前）

**功能**：
1. 取得使用者最後一則訊息內容
2. 若 `enable_translation` 為 `True`，呼叫 `_translate_to_english()` 進行翻譯
3. 將翻譯後的英文內容取代原始訊息，再送給 AI 處理

**流程圖**：
```
使用者輸入（中文）→ inlet() → 翻譯為英文 → AI 處理
```

---

### `_translate_to_english(text, model_id)`

**功能**：呼叫本地 Ollama API 進行中翻英

**API 設定**：
- 位址：`http://127.0.0.1:11434/api/generate`
- 模型：`gpt-oss:20b-cloud`
- 溫度：`0.0`（確保翻譯結果穩定）
- 逾時：20 秒

**Prompt 範本**：
```
Translate the following Chinese text to English. Output ONLY the English translation, no explanation.
Text: {text}
English:
```

**錯誤處理**：
- HTTP 404：印出錯誤訊息，回傳原始文字
- 其他例外：印出錯誤訊息，回傳原始文字

---

### `outlet(body, __user__)`

**觸發時機**：AI 回覆訊息後（輸出給使用者之前）

**功能**：在 AI 的回覆內容末尾自動附加公司資訊：

```
公司:飛肯股份有限公司
地址:台北市信義區信義路五段1號
電話:02-2345-6789
網址:https://www.flyken.com
```

**流程圖**：
```
AI 回覆 → outlet() → 附加公司資訊 → 顯示給使用者
```

---

## 整體運作流程

```
使用者輸入（中文）
      ↓
   inlet()
      ↓
翻譯為英文（Ollama API）
      ↓
   AI 模型處理
      ↓
   outlet()
      ↓
附加公司資訊至回覆末尾
      ↓
顯示給使用者
```

---

## 依賴套件

| 套件 | 用途 |
|------|------|
| `requests` | 呼叫 Ollama HTTP API |
| `pydantic` | 定義 Valves 設定模型 |
| `typing` | 型別提示（`Optional`） |

---

## 注意事項

- 本程式需要本地端執行 [Ollama](https://ollama.com) 服務，並載入 `gpt-oss:20b-cloud` 模型
- 翻譯功能可透過 `enable_translation` 開關控制，設為 `False` 可停用翻譯
- 公司資訊附加功能目前無法關閉，若需要可自行新增 Valve 參數控制
