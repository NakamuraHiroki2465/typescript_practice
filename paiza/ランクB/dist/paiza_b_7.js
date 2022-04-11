var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
    var _a = __read(lines[0].split(' ').map(function (val) { return Number.parseInt(val); }), 4), counts = _a[0], totalTime = _a[1], distinctTime = _a[2], buzzCount = _a[3];
    var results = [];
    for (var i = 1; i <= totalTime; i++) {
        lines[i].split();
        results.push(lines[i].split(' ').map(function (v) { return Number.parseInt(v); }));
    }
    results = transpose(results);
    var analizedResults = [];
    results.forEach(function (val) {
        analizedResults.push(getBuzzTime(val, totalTime, distinctTime, buzzCount));
    });
    analizedResults.forEach(function (val) {
        console.log(val[0] === 0 ? 'yes' : 'no', val[1]);
    });
});
/**
 * 転置行列を作成
 * @param results
 * @returns
 */
var transpose = function (results) {
    var newResults = [];
    results[0].forEach(function (_, i) {
        var oneResults = [];
        results.forEach(function (val, _) {
            oneResults.push(val[i]);
        });
        newResults.push(oneResults);
    });
    return newResults;
};
var getBuzzTime = function (val, totalTime, time, count) {
    var analizedResults = [];
    for (var i = 0; i <= totalTime - time; i++) {
        for (var k = 0; k <= time; k++) {
            var sum = val.slice(i, i + k).reduce((function (a, b) { return a + b; }), 0);
            if (sum >= count) {
                analizedResults.push([0, i + k]);
                break;
            }
        }
        if (analizedResults.length !== 0) {
            break;
        }
    }
    return analizedResults.length > 0 ? analizedResults[0] : [1, 0];
};
