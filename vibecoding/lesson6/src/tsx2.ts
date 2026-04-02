function greet(name: string): string{
    return `你好, ${name}`
}

console.log(greet("小明"))

function add(a: number, b: number): number{
    return a + b;
}

console.log("加法:", add(3, 4));

const double = (n: number) => n * 2;
console.log("double:", double(5))

const multiply = (a: number, b: number): number => a*b;
console.log("multiply:", multiply(3, 6));

const clamp = (value: number, min: number, max:number): number =>{
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

console.log("clamp:", clamp(150, 0, 100));

function introduce(name: string, age?:number): string{
    if (age !== undefined){
        return `${name},${age}歲`;
    }
    return name;
}

console.log(introduce("小明"))
console.log(introduce("小華", 20))

function createLabel(text: string, prefix = "標籤"){
    return `${prefix}:${prefix}`;
}

console.log(createLabel("重要"))
console.log(createLabel("警告", "注意"))

function logScore(s: number): void{
    console.log(`分數:${s}`)
}

logScore(88);