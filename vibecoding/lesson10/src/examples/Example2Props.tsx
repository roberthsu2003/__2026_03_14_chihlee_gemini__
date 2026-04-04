interface GreetingProps{
    name: string
    age?: number
}

function Greeting({name, age}:GreetingProps){
    return (
        <div className="greeting-box">
            <h3>你好,{name}!</h3>
            {age !== undefined && <p>今年{age}</p>}
        </div>
    )
}
function Example2Props(){

    return (
        <div className="example-card">
            <h2>範例2:Props(屬性)</h2>
            <p className="hint">👆 觀察同一個 Greeting 元件，傳入不同參數會顯示不同內容</p>

            <section>
                <h3>有傳name 和 age</h3>
                <Greeting name="小明" age={18} />
            </section>

            <section>
                <h3>只傳name(age 為可選)</h3>
                <Greeting name="小華" />
            </section>
        </div>
    )
}

export default Example2Props