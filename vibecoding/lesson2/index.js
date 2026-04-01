import axios from "axios";

async function main() {
  const res = await axios.get("https://httpbin.org/get", { timeout: 8000 });
  console.log("axios 請求成功，HTTP 狀態:", res.status);
}

main().catch((err) => {
  console.error("請確認已執行 npm install axios\n", err.message);
});