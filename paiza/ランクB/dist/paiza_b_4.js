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
    const [n, m] = lines[0].split(' ');
    const crenz_answers = [];
    for (let i = 1; i <= n; i++) {
        const answer = lines[i].split(' ');
        const crenz_answer = answer.map((ans) => {
            console.log(Number.parseInt(ans), ans);
            if (!(Number.isInteger(ans) && Number.parseInt(ans) >= 1 && Number.parseInt(ans) <= 100)) {
                return null;
            }
            return Number.parseInt(ans);
        });
        crenz_answers.push(crenz_answer);
    }
    const transposed_array = transpose(crenz_answers);
    transposed_array.forEach((crenz_answer) => {
        crenz_answer = crenz_answer.filter((ans) => ans);
        const sum = crenz_answer.reduce((a, b) => {
            a = a || 0;
            b = b || 0;
            return a + b;
        }, 0);
        const result = sum / crenz_answer.length;
        console.log(Math.trunc(result || 0));
    });
});
const transpose = ((crenz_answers) => {
    const results = [];
    crenz_answers[0].map((_, c) => {
        let transposed_answers = crenz_answers.map((r) => r[c]);
        results.push(transposed_answers);
    });
    return results;
});
