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
/**
 * << // ++
 * <// + <<// + //
 */
reader.on('close', () => {
    const line = lines[0];
    const nums_string = line.split('+');
    let sum = 0;
    nums_string.forEach((val) => {
        console.log(val);
        const val_ten_index = val.split('').reduce((prev, val) => {
            console.log(val);
            return prev + (val === '<' ? 1 : 0);
        }, 0);
        const val_ten_count = val_ten_index !== -1 ? val_ten_index : 0;
        console.log(val_ten_count);
        const val_one_index = val.split('').reduce((prev, val) => {
            console.log(val);
            return prev + (val === '/' ? 1 : 0);
        }, 0);
        const val_one_count = val_one_index !== -1 ? val_one_index : 0;
        console.log(val_one_count);
        const num = val_ten_count * 10 + val_one_count * 1;
        sum += num;
    });
    console.log(sum);
});
