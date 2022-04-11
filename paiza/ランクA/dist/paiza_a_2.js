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
    // N
    // A B
    var N = Number.parseInt(lines[0]);
    var _a = __read(lines[1].split(' ').map(function (v) { return Number.parseInt(v); }), 2), A = _a[0], B = _a[1];
    var min = Math.min(A, B);
    var stairsMap = new Map();
    for (var i = 0; i < N; i++) {
        stairsMap.set(i, false);
    }
    for (var i = 0; i <= N; i++) {
        if (i === 0) {
            stairsMap.set(0, true);
        }
        if (i === N) {
            stairsMap.set(N, true);
            continue;
        }
        if (i !== 0 && !stairsMap.get(i)) {
            continue;
        }
        stairsMap.set(i + A, true);
        stairsMap.set(i + B, true);
    }
    var count = 0;
    for (var i = 0; i < N; i++) {
        if (!stairsMap.get(i)) {
            count++;
        }
    }
    console.log(count);
});
