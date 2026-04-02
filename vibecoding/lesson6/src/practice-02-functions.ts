/**
 * 範例 2｜網頁版：函式與型別（參數、回傳、選用、預設、void）
 * 與 tsx-cli 的 console 示範不同：這裡用「結帳收據」呈現相同觀念。
 */

function formatPrice(amount: number, currency = "TWD"): string {
  return `${currency} ${amount.toFixed(0)}`;
}

function greetCustomer(name: string): string {
  return `您好，${name}，歡迎光臨。`;
}

function describeLine(item: string, qty?: number): string {
  const n = qty ?? 1;
  return `${item} × ${n}`;
}

function appendReceiptLog(lines: string[]): void {
  const pre = document.querySelector<HTMLPreElement>("#receipt-body");
  if (pre) pre.textContent = lines.join("\n");
}

function mount(): void {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  let customerName = "小華";
  let itemName = "藜麥沙拉";
  let amount = 120;
  let currency: "TWD" | "USD" = "TWD";
  let qty: number | undefined = 1;

  function redraw(): void {
    const lines: string[] = [];
    lines.push(greetCustomer(customerName));
    lines.push("— — —");
    lines.push(describeLine(itemName, qty));
    lines.push(formatPrice(amount, currency));
    if (qty !== undefined && qty > 1) {
      lines.push(`小計意涵：單價與數量已分開（選用參數 qty）`);
    }
    appendReceiptLog(lines);
  }

  root.innerHTML = `
    <div class="brand">
      <p class="tag">範例 2 · 函式與型別</p>
      <h1>輕食結帳</h1>
      <p>調整欄位後按「更新收據」— 對應函式參數型別、預設幣別與選用數量。</p>
    </div>
    <div class="form">
      <label>顧客名（string）
        <input type="text" id="inp-name" value="${customerName}" />
      </label>
      <label>品項（string）
        <input type="text" id="inp-item" value="${itemName}" />
      </label>
      <div class="row">
        <label>金額（number）
          <input type="number" id="inp-amount" value="${amount}" min="0" step="1" />
        </label>
        <label>幣別（預設 TWD）
          <select id="inp-currency">
            <option value="TWD" selected>TWD</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </div>
      <label>數量（選填；空白 = 省略 qty）
        <input type="number" id="inp-qty" value="${qty}" min="1" step="1" placeholder="留空則不傳 qty" />
      </label>
      <div class="btn-row">
        <button type="button" id="btn-update">更新收據</button>
        <button type="button" id="btn-clear-qty" class="secondary">清空數量（測試 ?）</button>
      </div>
    </div>
    <section class="receipt" aria-live="polite">
      <h2>收據預覽</h2>
      <pre id="receipt-body"></pre>
    </section>
    <p class="hint">
      練習：試改 <code>formatPrice</code> 的回傳格式，或新增一個回傳 <code>boolean</code> 的 <code>isPassing(score: number)</code> 並在收據中顯示「及格與否」。
    </p>
  `;

  redraw();

  document.querySelector<HTMLButtonElement>("#btn-update")?.addEventListener("click", () => {
    customerName = (document.querySelector<HTMLInputElement>("#inp-name")?.value ?? "").trim() || "訪客";
    itemName = (document.querySelector<HTMLInputElement>("#inp-item")?.value ?? "").trim() || "未命名";
    amount = Number(document.querySelector<HTMLInputElement>("#inp-amount")?.value) || 0;
    const cur = document.querySelector<HTMLSelectElement>("#inp-currency")?.value;
    currency = cur === "USD" ? "USD" : "TWD";
    const qRaw = document.querySelector<HTMLInputElement>("#inp-qty")?.value;
    qty = qRaw === "" || qRaw === undefined ? undefined : Number(qRaw);
    redraw();
  });

  document.querySelector<HTMLButtonElement>("#btn-clear-qty")?.addEventListener("click", () => {
    const el = document.querySelector<HTMLInputElement>("#inp-qty");
    if (el) el.value = "";
  });
}

mount();