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
    const [n, limit] = lines[0].split(' ');
    const arr = [];
    [...Array(Number.parseInt(n)).keys()].map((_val, i) => {
        arr.push(lines[i + 1].split(' '));
    });
    const success_road = [];
    for (let j = 0; j < n; j++) {
        const road = [];
        for (let k = 0; k < n; k++) {
            road.push(arr[k][j]);
        }
        if (road.filter((val) => val >= limit).length === 0) {
            success_road.push(j + 1);
        }
    }
    console.log(success_road.length === 0 ? 'wait' : success_road.toString().replace(/,/g, ' '));
});
