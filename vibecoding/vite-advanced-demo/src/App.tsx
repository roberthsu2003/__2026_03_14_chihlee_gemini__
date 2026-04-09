import { useState, useEffect } from 'react'
// [進階配置 2] 使用 '@' 取代 '../../../' 等相對路徑
import UserCard from '@/components/UserCard'
import './App.css'

function App() {
  const [data, setData] = useState<string>('')

  // [進階配置 1] 讀取由 vite 掛載的環境變數
  // 只有 VITE_ 開頭的變數才會被打包到這裡！
  const MODE = import.meta.env.MODE; // Vite 內建變數 (development 或 production)
  const API_URL = import.meta.env.VITE_API_URL;
  // 以下變數在瀏覽器中會是 undefined，系統保護了這個沒加 VITE_ 的變數
  const SECRET = import.meta.env.SECRET_TOKEN; 

  useEffect(() => {
    // [進階配置 3] 測試 Proxy 代理
    // 因為在 vite.config.ts 設定了 proxy，這裡打向 '/api/test'
    // 實際上會被 Vite 轉向 'http://localhost:3000/api/test' (不跨域！)
    fetch('/api/test')
      .then(res => res.json().catch(() => ({ message: '這個 API 是假的，用來測試 Proxy 設定' })))
      .then(json => setData(json.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Vite 進階配置展示</h1>
      <p style={{ color: '#888' }}>本講義示範：環境變數、跨域 Proxy代理、@ 路徑別名</p>
      
      <div style={{ textAlign: 'left', background: '#242424', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>1. 環境變數測試 (.env)</h3>
        <p>目前模式 (MODE): <strong style={{ color: '#646cff' }}>{MODE}</strong></p>
        <p>API 網址 (VITE_API_URL): <strong style={{ color: '#646cff' }}>{API_URL}</strong></p>
        <p>機密不該顯示 (SECRET_TOKEN): <strong style={{ color: '#ff646c'}}>{SECRET || '成功隱藏 (因為沒加 VITE_ 前綴)'}</strong></p>
        <p style={{ fontSize: '0.8rem', color: '#999'}}>👉 您可以改變 <code>.env.development</code> 的值並重整網頁看看變化。</p>
      </div>

      <div style={{ textAlign: 'left', background: '#242424', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>2. 跨域代理設定 (Proxy)</h3>
        <p>嘗試 fetch <code>/api/test</code> 的結果: </p>
        <pre style={{ background: '#000', padding: '0.5rem', borderRadius: '4px', overflowX: 'auto' }}>
          {data || 'Loading... (開發模式下這個請求是被 Vite Proxy 轉發的！)'}
        </pre>
      </div>

      <div style={{ textAlign: 'left', background: '#242424', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>3. 路徑別名測試 (Alias)</h3>
        <p>底下的卡片是透過 <code>import UserCard from '@/components/UserCard'</code> 引入的，不必寫繁瑣的 <code>../../</code></p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <UserCard name="Alex (元件來自 @/components)" />
        </div>
      </div>
    </div>
  )
}

export default App
