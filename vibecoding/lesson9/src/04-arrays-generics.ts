const nums: number[] = [1, 2, 3];
const tags: Array<string> = ["ts", "vite"]

console.log("nums:", nums);
console.log("tags:", tags);

const scores: number[] = [];
scores.push(95);
console.log("scores:", scores);

// ----物件陣列------
interface Task{
    id: number;
    title: string;
}

const tasks: Task[] = [
    {id: 1, title:"寫文件"},
    {id: 2, title:"寫測試"}
]

console.log("tasks[0]:", tasks[0].title)

// ----唯讀陣列-----
const seq: readonly number[] = [1, 2, 3]
console.log("seq:", seq);

const labels: ReadonlyArray<string> = ["a", "b"]
console.log("labels:", labels)

// ----泛型函式----
function firstItem<T>(items:T[]):T | undefined{
    return items[0]
}

const n = firstItem([10, 20, 30]);
const s = firstItem(["a", "b"]);
console.log("firstItem(number):", n);
console.log("firstItem(string):", s);

async function loadId(): Promise<number>{
    return 42;
}

const id:number = await loadId()
console.log("loadId:", id)

type Locale = "zh" | "en";
const greetings:Record<Locale, string> ={
    zh: "您好",
    en: "Hello"
}
console.log("greetings:", greetings)
