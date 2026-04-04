interface User{
    id: number,
    name: string,
    email: string
}

const u:User = {
    id: 1,
    name: '小明',
    email: "ming@example.com"
}

interface Todo{
    id: number,
    title: string,
    done: boolean
}

function summarize(items: Todo[]):string{
    const left = items.filter((t) => !t.done).length;
    return `共${items.length}筆,未完成${left}筆`
}

const list: Todo[] =[
    {id:1, title: "寫作業", done: false},
    {id:2, title: "買菜", done: true}
]

console.log(summarize(list))
console.log("Hello! World")