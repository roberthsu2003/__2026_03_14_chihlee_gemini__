import "./style.css"

// Select the pre element used to display console output in the UI
const output = document.querySelector<HTMLPreElement>("#console-output");
// Save a reference to the original console.log before overriding it,
// so we can still call the native implementation when needed
const originalLog = console.log.bind(console);
console.log = (...args: unknown[]) => {
  originalLog(...args);
  if (!output) return;
  const line = args
    .map((a) => {
      if (typeof a === "string") return a;
      if (typeof a === "bigint") return `${a}n`;
      try {
        return JSON.stringify(a);
      } catch {
        return String(a);
      }
    })
    .join(" ");
  output.textContent += `${line}\n`;
};

void import("./practice-01-basics")