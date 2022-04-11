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

    const [counts, totalTime, distinctTime, buzzCount]: number | any = lines[0].split(' ').map((val) => Number.parseInt(val))

    let results: number[][] = []
    for(let i=1; i <= totalTime ; i++) {
        lines[i].split()
        results.push(lines[i].split(' ').map(v => Number.parseInt(v)))
    }
    results = transpose(results)

    let analizedResults: number[][] = []
    results.forEach((val) => {
        analizedResults.push(getBuzzTime(val,totalTime,distinctTime,buzzCount))
    })
    analizedResults.forEach((val: number[]) => {
        console.log(val[0] === 0 ? 'yes': 'no', val[1])
    })
});

/**
 * 転置行列を作成
 * @param results 
 * @returns 
 */
const transpose = (results: number[][]): number[][] => {
    const newResults: number[][] = []
    results[0].forEach((_,i) => {
        const oneResults: number[] = []
        results.forEach((val, _) => {
            oneResults.push(val[i])
        })
        newResults.push(oneResults)
    })
    return newResults
}

const getBuzzTime = (val: number[],totalTime: number, time: number, count: number):  number[] => {
    let analizedResults: number[][] = [];

    for (let i = 0 ; i <= totalTime - time; i ++) {
        for (let k = 0 ; k <= time ; k++) {
            let sum: number = val.slice(i,i + k).reduce(((a,b) => a + b),0)
            if (sum >= count) {
                analizedResults.push([0,i + k])
                break
            }
        }
        if (analizedResults.length !== 0) {
            break
        } 
    }
    return analizedResults.length > 0 ? analizedResults[0] : [1,0]
}