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
  let n,r;
  [n,r] = lines[0].split(' ');
  
  const arr = []
  for (let i=1 ; i< Number.parseInt(n) + 1 ; i ++) {
    Math.min(...lines[i].split(' ')) < r ||  console.log(i);
  }
});