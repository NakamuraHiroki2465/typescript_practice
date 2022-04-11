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
  const zero_arr = lines[0].split(' ')
  const n = zero_arr[0]
  const d = zero_arr[1]


  let duplicate_val = []
  for (let i = 1; i < n ; i++ ){
      duplicate_val.push(lines[i]);
  }

  let sum = 0;
  duplicate_val.map(val => {
    sum += Number.parseInt(val)
  });
  
  const row_length = d*n - sum
  
  console.log(row_length * d);
});