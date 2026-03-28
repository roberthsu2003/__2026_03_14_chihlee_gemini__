# test.py 程式說明

這個檔案是 **Open WebUI 的 Filter（過濾器）插件**範例，用來在 AI 對話的請求送出前、以及回應回來後，進行攔截與處理。

---

## 整體架構

```
Filter
├── Valves        ← 管理員層級的設定
├── UserValves    ← 使用者層級的設定
├── __init__()    ← 初始化
├── inlet()       ← 請求前處理（pre-processor）
└── outlet()      ← 回應後處理（post-processor）
```

---

## 各部分說明

### `Valves`（管理員設定）

```python
class Valves(BaseModel):
    priority: int = Field(default=0, ...)
    max_turns: int = Field(default=8, ...)
```

- `priority`：這個 Filter 的執行優先順序，數字越小越先執行，預設為 0。
- `max_turns`：管理員設定的對話輪數上限，預設為 8 輪。超過就會被擋下來。

---

### `UserValves`（使用者設定）

```python
class UserValves(BaseModel):
    max_turns: int = Field(default=4, ...)
```

- `max_turns`：使用者自己可以設定的對話輪數上限，預設為 4 輪。
- 這個值會和管理員的 `max_turns` 取較小值，避免使用者繞過管理員限制。

---

### `__init__()`（初始化）

```python
def __init__(self):
    self.valves = self.Valves()
```

- 建立 `Valves` 實例，載入管理員預設設定。
- 被註解掉的 `self.file_handler = True` 是用來告訴 WebUI 由這個 Filter 自己處理檔案邏輯，目前未啟用。

---

### `inlet()`（請求前處理）

```python
def inlet(self, body: dict, __user__: Optional[dict] = None) -> dict:
```

- 在使用者的訊息送到 AI 模型之前被呼叫。
- 可以用來驗證、修改請求內容。

**主要邏輯：**

```python
max_turns = min(__user__["valves"].max_turns, self.valves.max_turns)
if len(messages) > max_turns:
    raise Exception(f"Conversation turn limit exceeded. Max turns: {max_turns}")
```

1. 取使用者設定的 `max_turns` 和管理員設定的 `max_turns`，兩者取較小值。
2. 計算目前對話訊息數量（`messages`）。
3. 如果訊息數超過上限，直接拋出例外，阻止這次請求繼續送出。

> 例如：管理員設 8，使用者設 4，實際上限就是 4。

---

### `outlet()`（回應後處理）

```python
def outlet(self, body: dict, __user__: Optional[dict] = None) -> dict:
```

- 在 AI 模型回應之後被呼叫。
- 可以用來修改回應內容、記錄 log、做額外分析。
- 目前這個範例只有印出 log，直接把 `body` 原封不動回傳。

---

## 執行流程圖

```
使用者送出訊息
      ↓
  inlet() 攔截
  → 檢查對話輪數是否超限
  → 超限：拋出例外，中止請求
  → 未超限：放行，body 傳給 AI 模型
      ↓
  AI 模型處理
      ↓
  outlet() 攔截
  → 可修改或分析回應
  → 回傳 body 給使用者
```

---

## 使用情境

這個 Filter 適合用在需要限制使用者對話長度的場景，例如：
- 控制 API 使用成本（避免超長對話消耗太多 token）
- 強制使用者定期開新對話，避免上下文過長影響回答品質
