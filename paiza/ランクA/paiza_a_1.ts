process.stdin.resume();
process.stdin.setEncoding("utf8");
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", (line) => {
  lines.push(line);
});
reader.on("close", () => {
  // 4
  // 1314
  // 1213
  // 2134
  // 3124
  const n: number = Number.parseInt(lines[0])
  const array: number[][] = []
  for (let i=1; i<=n; i++) {
      array.push(lines[i].split('').map(val => Number.parseInt(val)))
  }

  let max: number = 0
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          const diagonalCount: number = getDiagonalSwipCount(i,j,n,array)
          const horizonCount: number = getHorizonSwipCount(i,j,n,array)
          const verticalCount: number = getVerticalSwipCount(i,j,n,array)
          if (Math.max(diagonalCount,horizonCount,verticalCount) > max) {
              max = Math.max(diagonalCount,horizonCount,verticalCount)
          }
      }
  }
  console.log(max)
});

/**
 * 斜めのスワイプを確認してカウントを返す
 */
const getDiagonalSwipCount = (i:number, j:number, n:number, array: number[][]): number => {
    let current: number = array[i][j]
    let count: number = 0
    for (;i < n - 1 && j < n - 1;) {
        let next: number = array[++i][++j]
        if (Math.abs(current - next) === 1) {
            current = next
            count ++
        } else {
            break
        }
    }
    return count === 0 ? count : ++count 
};

/**
 * 横のスワイプを確認してカウントを返す
 */
const getHorizonSwipCount = (i:number, j:number, n:number, array: number[][]): number => {
    let current: number = array[i][j]
    let count: number = 0
    for (;j < n - 1;) {
        const next: number = array[i][++j]
        if (Math.abs(current - next) === 1) {
            current = next
            count ++
        } else {
            break
        }
    }
    return count === 0 ? count : ++count 
};

/**
 * 縦のスワイプを確認してカウントを返す
 */
const getVerticalSwipCount = (i:number, j:number, n:number,array: number[][]): number => {
    let current: number = array[i][j]
    let count: number = 0
    for (;i < n - 1;) {
        const next: number = array[++i][j]
        if (Math.abs(current - next) === 1) {
            current = next
            count ++
        } else {
            break
        }
    }
    return count === 0 ? count : ++count 
};
