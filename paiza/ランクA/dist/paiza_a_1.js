process.stdin.resume();
process.stdin.setEncoding("utf8");
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on("line", function (line) {
    lines.push(line);
});
reader.on("close", function () {
    // 4
    // 1314
    // 1213
    // 2134
    // 3124
    var n = Number.parseInt(lines[0]);
    var array = [];
    for (var i = 1; i <= n; i++) {
        array.push(lines[i].split('').map(function (val) { return Number.parseInt(val); }));
    }
    var max = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var diagonalCount = getDiagonalSwipCount(i, j, n, array);
            var horizonCount = getHorizonSwipCount(i, j, n, array);
            var verticalCount = getVerticalSwipCount(i, j, n, array);
            if (Math.max(diagonalCount, horizonCount, verticalCount) > max) {
                max = Math.max(diagonalCount, horizonCount, verticalCount);
            }
        }
    }
    console.log(max);
});
/**
 * 斜めのスワイプを確認してカウントを返す
 */
var getDiagonalSwipCount = function (i, j, n, array) {
    var current = array[i][j];
    var count = 0;
    for (; i < n - 1 && j < n - 1;) {
        var next = array[++i][++j];
        if (Math.abs(current - next) === 1) {
            current = next;
            count++;
        }
        else {
            break;
        }
    }
    return count === 0 ? count : ++count;
};
/**
 * 横のスワイプを確認してカウントを返す
 */
var getHorizonSwipCount = function (i, j, n, array) {
    var current = array[i][j];
    var count = 0;
    for (; j < n - 1;) {
        var next = array[i][++j];
        if (Math.abs(current - next) === 1) {
            current = next;
            count++;
        }
        else {
            break;
        }
    }
    return count === 0 ? count : ++count;
};
/**
 * 縦のスワイプを確認してカウントを返す
 */
var getVerticalSwipCount = function (i, j, n, array) {
    var current = array[i][j];
    var count = 0;
    for (; i < n - 1;) {
        var next = array[++i][j];
        if (Math.abs(current - next) === 1) {
            current = next;
            count++;
        }
        else {
            break;
        }
    }
    return count === 0 ? count : ++count;
};
