// x^n + y^n = z^nの組み合わせ
const output = (max, n) => {
    const result_array = [];
    // xを1~maxまで
    for (let i = 1; i <= max; i++) {
        // yを1~maxまで
        for (let j = 1; j <= max; j++) {
            if (isInteger(i ** n + j ** n, n)) {
                const z = Math.pow(i ** n + j ** n, 1 / n);
                result_array.push([i, j, z]);
            }
        }
    }
    return result_array;
};
const isInteger = (val, n) => {
    const z = Math.pow(val, 1 / n);
    return Number.isInteger(z);
};
console.log(output(20, 2));
