process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
    // N
    // d_1 d_2 ... d_N
    // 1 2 3 4 5 6 7 8
    const n: number = Number.parseInt(lines[0])
    const days: number[] = lines[1].split(' ').map(val => Number.parseInt(val))

    let count: number = 0
    let length: number = 0

    const day_array: number[] = []
    for (let i = 0; i< n -7; i++) {
        length += 1
        if (days.slice(i,7 + i).filter(val => val === 0).length >= 2) {
            count += 1 
        } else {
            if (count > 0) {
                day_array.push(count + 7)
            }
            count = 0
        }
        if (i === n-8 && count !== 0) {
            day_array.push(count + 7)
        }
    }
    let max = 0
    day_array.forEach((val) => {
        max = val > max ? val : max
    })
    console.log(max)
});