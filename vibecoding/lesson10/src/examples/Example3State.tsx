import { useState } from 'react'

function Example3State() {
    const [count, setCount] = useState(0)
    return (
        <div className="example-card">
            <h2>範例 3：State（狀態）</h2>
            <p className="hint">👆 點擊按鈕，觀察數字如何即時更新</p>

            <section>
                <p className='count-display'>目前數字:<strong>{count}</strong></p>
                <button onClick={()=> setCount(count + 1)}>+1</button>
                <button onClick={()=> setCount(count - 1)}>-1</button>
                <button onClick={() => setCount(0)}>歸零</button>
            </section>
        </div>
    )
}

export default Example3State