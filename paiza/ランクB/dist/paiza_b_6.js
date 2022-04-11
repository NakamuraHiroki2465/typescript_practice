process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', function (line) {
    lines.push(line);
});
reader.on('close', function () {
    // N
    // d_1 d_2 ... d_N
    // 1 2 3 4 5 6 7 8
    var n = Number.parseInt(lines[0]);
    var days = lines[1].split(' ').map(function (val) { return Number.parseInt(val); });
    var count = 0;
    var length = 0;
    var day_array = [];
    for (var i = 0; i < n - 7; i++) {
        length += 1;
        if (days.slice(i, 7 + i).filter(function (val) { return val === 0; }).length >= 2) {
            count += 1;
        }
        else {
            if (count > 0) {
                day_array.push(count + 7);
            }
            count = 0;
        }
        if (i === n - 8 && count !== 0) {
            day_array.push(count + 7);
        }
    }
    var max = 0;
    day_array.forEach(function (val) {
        max = val > max ? val : max;
    });
    console.log(max);
});
