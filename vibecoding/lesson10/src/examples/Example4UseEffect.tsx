import { useState, useEffect } from "react"

function Example4UseEffect(){
    const [seconds, setSeconds] = useState(0)
    useEffect(()=>{
        const timer = setInterval(()=>{
            setSeconds((prev) => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className="example-card">
            <h2>範例 4：useEffect</h2>
            <p className="hint">👆 觀察秒數每秒自動增加（useEffect 啟動計時器）</p>

            <section>
                <p className="timer-display">已經過了<strong>{seconds}</strong>秒</p>
            </section>
        </div>
    )
}

export default Example4UseEffect