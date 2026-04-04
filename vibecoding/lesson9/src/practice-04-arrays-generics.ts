/**
 * 範例 4｜網頁版：陣列、唯讀、泛型函式（與 tsx-cli 的 console 版不同）
 * 用「成績光譜」呈現：平均、map、泛型 firstItem / last
 */

interface SubjectScore {
  name: string;
  value: number;
}

function average(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

function firstItem<T>(items: readonly T[]): T | undefined {
  return items[0];
}

function lastItem<T>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[items.length - 1];
}

function mapNames(rows: SubjectScore[]): string[] {
  return rows.map((r) => r.name);
}

const data: SubjectScore[] = [
  { name: "國文", value: 82 },
  { name: "數學", value: 91 },
  { name: "英文", value: 78 },
  { name: "物理", value: 88 },
];

function mount(): void {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  const scores = data.map((d) => d.value);
  const avg = average(scores);
  const maxScore = 100;
  const names = mapNames(data);
  const firstName = firstItem(names);
  const lastName = lastItem(names);

  root.innerHTML = `
    <header class="top">
      <p class="chip">範例 4 · 陣列與泛型</p>
      <h1>成績光譜</h1>
      <p>
        資料為 <code>SubjectScore[]</code>；長條圖寬度依分數比例。下方統計用到
        <code>average(number[])</code> 與泛型 <code>firstItem&lt;T&gt;</code>。
      </p>
    </header>
    <div class="summary">
      <div class="stat">
        <span class="num">${avg.toFixed(1)}</span>
        <span class="lbl">平均</span>
      </div>
      <div class="stat">
        <span class="num">${firstName ?? "—"}</span>
        <span class="lbl">firstItem&lt;string&gt;</span>
      </div>
      <div class="stat">
        <span class="num">${lastName ?? "—"}</span>
        <span class="lbl">lastItem&lt;string&gt;</span>
      </div>
    </div>
    <div class="chart" role="list">
      ${data
        .map(
          (row) => `
        <div class="row" role="listitem">
          <span class="name">${escapeHtml(row.name)}</span>
          <div class="bar-wrap" aria-hidden="true">
            <div class="bar" style="width:${(row.value / maxScore) * 100}%"></div>
          </div>
          <span class="val">${row.value}</span>
        </div>
      `,
        )
        .join("")}
    </div>
    <p class="generic-demo">
      <code>readonly number[]</code> 可傳入 <code>average</code>（唯讀陣列與可變陣列在「讀取」情境常可互通）。
      試在程式碼中將 <code>data</code> 改為 <code>readonly SubjectScore[]</code> 並觀察型別檢查。
    </p>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

mount();