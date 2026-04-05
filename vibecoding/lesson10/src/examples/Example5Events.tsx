import React, { useState } from "react"

function Example5Events() {
    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setText(e.target.value)
    }

    const handleClick = () => {
        alert(`你輸入的是:${text || `(尚未輸入)`}`)
    }
    return (
        <div className="example-card">
            <h2>範例 5：事件處理</h2>
            <p className="hint">👆 輸入文字並點擊按鈕，體驗 onChange 與 onClick</p>

            <section>
                <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="輸入一些文字...."
                />
                <button onClick={handleClick}>顯示輸入內容</button>
                <p>即時顯示:{text || '(尚未輸入)'}</p>
            </section>
        </div>
    )
}

export default Example5Events