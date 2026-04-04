function Example1JSX(){
    const userName = '小明';
    const score = 85;

    return (
        <div className="example-card">
            <h2>範例1:JSX基礎</h2>
            <p className="hint">👆 試著觀察畫面上如何用 <code>{"{}"}</code></p>

            <section>
                <h3>插入變數</h3>
                <p>你好,{userName}!</p>
            </section>

            <section>
                <h3>插入運算(三元運算子)</h3>
                <p>分數{score},及格了嗎?{score >= 60 ? '是 ✓': '否 ✗'}</p>
            </section>

            <section>
                <h3>插入函式呼叫</h3>
                <p>大寫名字:{userName.toUpperCase()}</p>
            </section>
        </div>
    )
}

export default Example1JSX