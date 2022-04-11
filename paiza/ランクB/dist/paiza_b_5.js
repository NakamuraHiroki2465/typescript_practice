var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
process.stdin.resume();
process.stdin.setEncoding('utf8');
var lines = [];
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', function (line) {
    lines.push(line);
});
reader.on('close', function () {
    // ターン数　マスの高さ マスの幅　
    // N H W
    // x座標、y座標、辺の長さ
    // x_{1,1} y_{1,1} s_{1,1}
    // x_{1,2} y_{1,2} s_{1,2}
    // x_{1,3} y_{1,3} s_{1,3}
    // x_{2,1} y_{2,1} s_{2,1}
    // x_{2,2} y_{2,2} s_{2,2}
    // x_{2,3} y_{2,3} s_{2,3}
    // ...
    // x_{N,1} y_{N,1} s_{N,1}
    // x_{N,2} y_{N,2} s_{N,2}
    // x_{N,3} y_{N,3} s_{N,3}
    var _a = lines[0].split(' ').map(function (val) { return Number.parseInt(val); }), n = _a[0], h = _a[1], w = _a[2];
    var datas = [];
    for (var i = 1; i <= 3 * n; i++) {
        datas.push(lines[i].split(' ').map(function (val) { return Number.parseInt(val); }));
    }
    var emp_board = initBoard(h, w);
    datas.forEach(function (args, i) {
        emp_board = execute(args, i, emp_board);
    });
    // プレイヤーの得点を初期化
    var one_counts = 0;
    var two_counts = 0;
    var three_counts = 0;
    for (var i = 0; i < emp_board.length; i++) {
        for (var j = 0; j < emp_board[i].length; j++) {
            var val = emp_board[i][j];
            if (val === 1) {
                one_counts += 1;
            }
            else if (val === 2) {
                two_counts += 1;
            }
            else if (val === 3) {
                three_counts += 1;
            }
        }
    }
    var results = [one_counts, two_counts, three_counts];
    console.log(results.toString().replace(/,/g, ' '));
});
/**
 * ボードを初期化
 * @param h
 * @param w
 * @returns
 */
var initBoard = function (h, w) {
    var record = __spreadArray([], Array(w), true).map(function (val) { return 0; });
    var results = [];
    for (var i = 0; i < h; i++) {
        results.push(record);
    }
    return results;
};
/**
 * ターンを実行
 * @param args
 * @param index
 * @param emp_results
 * @returns
 */
var execute = function (args, index, emp_results) {
    var player = null;
    if (index % 3 === 0) {
        player = 1;
    }
    else if (index % 3 === 1) {
        player = 2;
    }
    else if (index % 3 === 2) {
        player = 3;
    }
    // do action
    var x = args[0], y = args[1], w = args[2];
    emp_results = emp_results.map(function (val, y_index) {
        if (y_index < y + w && y_index >= y) {
            return emp_results[y_index].map(function (val, x_index) {
                if (x_index < x + w && x_index >= x) {
                    if (val === player || val === 0) {
                        return player;
                    }
                    else {
                        var answer = [1, 2, 3].filter(function (master) { return master !== player && master !== val; })[0];
                        return answer;
                    }
                }
                else {
                    return val;
                }
            });
        }
        else {
            return val;
        }
    });
    return emp_results;
};
