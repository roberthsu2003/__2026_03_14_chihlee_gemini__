/**
 * 範例 1｜網頁版：變數與基本型別（與 tsx-cli 觀念呼應，呈現方式不同）
 *
 * 重點：const / let、: string / : number / : boolean、型別推斷、畫面更新
 * 本檔示範如何將「型別」反映在 UI；可修改常數與按鈕邏輯做實驗。
 */

const appName: string = "型別儀表板";
let visitCount: number = 0;
const displayName: string = "訪客";
const age: number = 20;
const passed: boolean = true;
const bigDemo: bigint = 9007199254740993n;

function tick(): void {
  visitCount += 1;
}

function render(): void {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  root.innerHTML = `
    <header class="hero">
      <p class="eyebrow">08 TypeScript · 範例 1</p>
      <h1>${appName}</h1>
      <p>用卡片呈現 <code>string</code>、<code>number</code>、<code>boolean</code> 與可變的計數（<code>let</code>）。</p>
    </header>
    <div class="grid" role="group" aria-label="型別示範">
      <article class="card">
        <p class="label">string（const）</p>
        <p class="value">${displayName}</p>
      </article>
      <article class="card">
        <p class="label">number（const）</p>
        <p class="value">${age}</p>
      </article>
      <article class="card">
        <p class="label">boolean（const）</p>
        <p class="value ${passed ? "bool-true" : "bool-false"}">${passed ? "通過" : "未通過"}</p>
      </article>
      <article class="card">
        <p class="label">let 計數</p>
        <p class="value">${visitCount}</p>
      </article>
    </div>
    <div class="actions">
      <button type="button" id="btn-tick">造訪 +1</button>
    </div>
    <p class="note">
      <strong>bigint</strong> 示範（選讀）：<code>${bigDemo.toString()}n</code> — 一般前端仍以 <code>number</code> 為主。
    </p>
    <p class="footer-files">
      程式：<code>src/practice-01-basics.ts</code> · 樣式：<code>src/style.css</code>
    </p>
  `;

  document.querySelector<HTMLButtonElement>("#btn-tick")?.addEventListener("click", () => {
    tick();
    render();
  });
}

render();