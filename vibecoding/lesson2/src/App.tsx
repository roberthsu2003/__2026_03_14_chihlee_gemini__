import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setReply(null);

    try {
      // 這裡最重要！注意我們不是打 http://localhost:3000
      // 而是直接打 '/api/chat'，然後讓 Vite Proxy 幫我們轉發
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        throw new Error('伺服器回應發生錯誤！');
      }

      const data = await response.json();
      setReply(data.text);
      
    } catch (err: any) {
      setErrorMsg(err.message || '發生未知的錯誤。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Gemini 一句話問答</h1>
      <p>完全由我們自己的 Express 後端代為呼叫 API，前端看不見金鑰！</p>

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea 
          placeholder="請輸入你想問 Gemini 的問題..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputText.trim()}>
          {isLoading ? '處理中...' : '送出'}
        </button>
      </form>

      {errorMsg && <div className="error-box">{errorMsg}</div>}
      
      {reply && (
        <div className="reply-box">
          <p><strong>Gemini 回覆：</strong></p>
          <p>{reply}</p>
        </div>
      )}
    </div>
  )
}

export default App