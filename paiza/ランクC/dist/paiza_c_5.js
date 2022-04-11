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
    // m  p q
    const [m, p, q] = lines[0].split(' ');
    console.log(m * (p / 100 - 1) * (q / 100 - 1));
});
