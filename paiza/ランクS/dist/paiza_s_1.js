"use strict";
exports.__esModule = true;
process.stdin.resume();
process.stdin.setEncoding("utf8");
var lines = [];
var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on("line", function (line) {
    lines.push(line);
});
reader.on("close", function () {

    var data = lines[0].split('');
    var _loop_1 = function (i) {
        var alphabet = String.fromCharCode(i);
        var alphabetIndex = findAll(data, alphabet);
        var count = [];
        alphabetIndex.forEach(function (i) {
            var v = i - 1;
            var arr = [];
            var openCount = 0;
            var closeCount = 0;
            var forCountIndex = i;
            while (forCountIndex >= 0) {
                if (data[forCountIndex] === ')') {
                    closeCount++;
                }
                else if (data[forCountIndex] === '(') {
                    openCount++;
                }
                forCountIndex--;
            }
            var nestLevel = openCount - closeCount;
 
            var multipleIndex = getMultipleIndex(data, nestLevel, i);
    
            if ((Number.parseInt(data[v]) || data[v] === '0')) {
        
                var num = getNumber(data, v);
                arr.push(num);
            }
            if (multipleIndex.length > 0) {
                multipleIndex.forEach(function (i) {
                    arr.push(getNumber(data, i - 1));
                });
            }

            count.push(arr.reduce(function (a, b) { return a * b; }, 1));
        });
        var result = count.reduce(function (a, b) { return a + b; }, 0);
        console.log(alphabet + " " + result);
    };
    for (var i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
        _loop_1(i);
    }
});
/**
 * 配列から合致した要素のインデックスを返す
 */
var findAll = function (array, val) {
    var results = [];
    for (var index = 0; index < array.length; index++) {
        var v = array[index];
        if (v == val) {
            results.push(index);
        }
    }
    return results;
};
var getNumber = function (data, index) {
    var isNumber = true;
    var val = [];
    while (index >= 0 && isNumber) {
        if (Number.parseInt(data[index]) || data[index] === '0') {
            val.push(data[index]);
            index--;
        }
        else {
            isNumber = false;
        }
    }
    return Number.parseInt(val.reverse().reduce(function (a, b) { return a + b; }));
};
var getMultipleIndex = function (data, nestLevel, valIndex) {
    var results = [];
    if (nestLevel === 0) {
        return results;
    }
    var openCount = 0;
    var closeCount = 0;
    for (var i = valIndex; i >= 0 && nestLevel > 0; i--) {
        if (data[i] === '(') {
            openCount++;
        }
        if (data[i] === ')') {
            closeCount++;
        }

        if (data[i] === '(' && openCount - closeCount > 0) {
            nestLevel--;
            results.push(i);
            openCount = closeCount = 0;
        }
    }
    return results;
};
