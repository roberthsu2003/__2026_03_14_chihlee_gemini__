/**
 * 範例 3｜網頁版：interface / type 描述物件（readonly、選用屬性、extends）
 * 與 tsx-cli 不同：這裡用「書架卡片」呈現結構化資料。
 */

interface Book {
  readonly isbn: string;
  title: string;
  author: string;
  year?: number;
}

interface Audiobook extends Book {
  durationMin: number;
}

type BookListItem = Book | Audiobook;

function isAudiobook(b: BookListItem): b is Audiobook {
  return "durationMin" in b;
}

function summarizeBooks(items: Book[]): string {
  const withYear = items.filter((b) => b.year !== undefined).length;
  return `共 ${items.length} 本，其中 ${withYear} 本有標示出版年。`;
}

const shelf: BookListItem[] = [
  { isbn: "978-986-123-001", title: "海邊的卡夫卡", author: "村上春樹", year: 2003 },
  { isbn: "978-986-456-002", title: "設計模式", author: "Gang of Four", year: 1994 },
  {
    isbn: "978-986-789-003",
    title: "深夜食堂有聲書",
    author: "安倍夜郎",
    durationMin: 420,
  },
];

function renderCard(b: BookListItem): string {
  const yearBlock =
    b.year !== undefined ? `<p class="year">${b.year} 年出版</p>` : "";
  const extra = isAudiobook(b)
    ? `<p class="year">有聲書 · ${b.durationMin} 分鐘</p>`
    : "";
  return `
    <article class="book-card">
      <span class="spine" aria-hidden="true"></span>
      <h2 class="title">${escapeHtml(b.title)}</h2>
      <p class="author">${escapeHtml(b.author)}</p>
      ${yearBlock}
      ${extra}
      <p class="isbn">ISBN ${escapeHtml(b.isbn)}</p>
    </article>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mount(): void {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  const plainBooks: Book[] = shelf.map((item) => ({
    isbn: item.isbn,
    title: item.title,
    author: item.author,
    year: item.year,
  }));

  root.innerHTML = `
    <header class="shelf-header">
      <p class="ribbon">範例 3 · interface 與 type</p>
      <h1>閱讀清單</h1>
      <p>每張卡對應一個符合 <code>interface Book</code> 的物件；含 <code>readonly</code>、選用 <code>year?</code>，以及擴充 <code>Audiobook</code>。</p>
    </header>
    <div class="book-grid" role="list">
      ${shelf.map((b) => renderCard(b)).join("")}
    </div>
    <p class="stats">${summarizeBooks(plainBooks)}</p>
  `;
}

mount();