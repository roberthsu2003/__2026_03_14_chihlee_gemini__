/**
 * TypeScript 基礎練習 - tsx1.ts
 * 本檔案演示 TypeScript 的基本型別與變數宣告
 */

// 定義圓周率常數
const pi = 3.14;

// 宣告變數並賦值：分數
let score = 0;
score = 85;
console.log("SCORE:", score);

//--型別註解：明確指定變數型別
const userName: string = "小明";
const age: number = 18;
const passed: boolean = true;
console.log(`姓名:${userName},年齡:${age},通過:${passed}`)

//--型別推斷：TypeScript 自動推斷型別
const title = "Hello";
const count = 10;
const ok = false;

//先宣告，後給值時建議明確標型別
let total: number;
total = 0;
total = total + 1;
console.log("total:", total);

//bigint：處理超大整數
const big: bigint = 9007199254740993n;
console.log("bigint:", big); 

//綜合範例：結合常數、變數與函式
const appName = "TS 練習"
let visitCount: number = 0;

/**
 * 計算訪問次數並輸出訊息
 */
function tick(){
    visitCount = visitCount + 1;
    console.log(`${appName}:第${visitCount}次`)
}
tick();
tick();