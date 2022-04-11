process.stdin.resume();
process.stdin.setEncoding('utf8');
var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
    // N
    // A B
    const N: number = Number.parseInt(lines[0])

    const [A,B] = lines[1].split(' ').map(v => Number.parseInt(v))

    const min: number = Math.min(A,B)

    let stairsMap: Map<number, boolean> = new Map<number, boolean>()

    for (let i=0; i< N; i++) {
        stairsMap.set(i, false)
    }

    for (let i=0; i<= N; i++) {
        if (i === 0) {
            stairsMap.set(0, true)
        }
        if (i === N) {
            stairsMap.set(N, true)
            continue
        }
        if (i !== 0 && !stairsMap.get(i)) {
            continue
        }
        stairsMap.set(i + A, true)
        stairsMap.set(i + B, true)
    }

    let count = 0
    for (let i=0; i< N; i++) {
        if (!stairsMap.get(i)) {
            count++
        }
    }
    console.log(count)
});