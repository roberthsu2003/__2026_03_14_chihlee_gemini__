import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: new URL("../.env", import.meta.url).pathname })

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

//Middleware 設置
app.use(cors());
app.use(express.json());

//建立一個簡單的GET API,用來測試伺服器是否正常運作

app.get("/api/status", (req, res) => {
  res.json({ message: "BFF伺服器運作正常!", status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    //檢查有沒有設定環境變數
    if (!process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ error: "找不到GEMINI_API_KEY 環境變數設定。" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "請提供message欄位。" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
    });

    res.json({
      text: response.text,
    });
  } catch (error) {
    console.error("呼叫Gemini發生錯誤", error);
    res.status(500).json({ error: "伺服器內部發生錯誤,請稍後再試。" });
  }
});

app.use(express.static(path.join(__dirname,'../dist')))
app.get('/{*path}',(req, res)=>{
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

//啟動伺服器
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Server] Express伺服器已經啟動:http://localhost:${PORT}`);
});
