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
    let n,a,b;
    [n,a,b] = lines[0].split(' ');
    
    const arr = [...Array(Number.parseInt(n)).keys()].map((v) => v + 1);
    arr.map((num) => {
        let result = '';
        result += num % a === 0 ? 'A' : ''
        result += num % b === 0 ? 'B' : ''
        result = result || 'N'
        console.log(result);
    })
});