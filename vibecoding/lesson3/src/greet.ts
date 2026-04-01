/**
 * 以 export 匯出，編譯後為 ES Module，供 main 以 import 使用。
 */
export function greet(name: string): void {
  const el = document.getElementById("msg");
  if (el) {
    el.textContent = `Hello, ${name}（TypeScript → tsc → ES Module）`;
  }
}