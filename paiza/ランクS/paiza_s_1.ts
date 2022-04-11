import { isNumber } from "util";

process.stdin.resume();
process.stdin.setEncoding("utf8");
var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", (line) => {
  lines.push(line);
});
reader.on("close", () => {
    // 10000(10000(10000(2000(ab)500(dz)c200h)2mu3000(fpr)))
    // a 2000000000000000
    // b 2000000000000000
    // c 1000000000000
    // d 500000000000000
    
    // num, (), a-z,

    // aからzまでfor文で回す


    // 1.
    // 1-1 aが含まれるインデックスを調べる
    // 1-2 aの数だけforで回す
    // 1-3 forの中でaのインデックスにアクセスする
    // 1-4 (を見つけて、存在する場合、(の前の数字をかける。
    // 1-5 (が見つからなくなるまで1.を繰り返す


    const data: string[] = lines[0].split('')

    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
        const alphabet: string = String.fromCharCode(i)
        const alphabetIndex: number[] = findAll(data, alphabet)
        const count: number[] = []
        alphabetIndex.forEach((i: number) => {
            let v: number = i - 1 
            const arr: number[] = []
            let openCount: number = 0
            let closeCount: number = 0
            let forCountIndex = i
            while(forCountIndex >= 0) {
                if (data[forCountIndex] === ')') {
                    closeCount ++
                } else if (data[forCountIndex] === '(') {
                    openCount ++
                }
                forCountIndex--
            }
            let nestLevel: number = openCount - closeCount
            // console.log('nestlevel'+ nestLevel)
            const multipleIndex: number[] = getMultipleIndex(data,nestLevel,i)
            // console.log('multipleIndex'+  multipleIndex)
            if ((Number.parseInt(data[v]) || data[v] === '0')) {
                // console.log('first')
                const num: number = getNumber(data,v)
                arr.push(num)
            }
            if (multipleIndex.length > 0) {
                multipleIndex.forEach((i) => {
                    arr.push(getNumber(data, i - 1))
                })
            }
            // console.log('arr' + arr)
            count.push(arr.reduce((a,b) => a*b,1))
        })
        const result: number = count.reduce((a,b) => a+b,0)
        console.log(alphabet + " " + result)
    }

});

/**
 * 配列から合致した要素のインデックスを返す
 */
const findAll = (array: string[], val: string): number[] => {
    const results: number[] = []
    for (let index: number = 0; index < array.length; index++){
        let v = array[index]
        if (v == val) {
            results.push(index)
        }
    }
    return results
}


const getNumber = (data: string[], index: number): number => {
    let isNumber: boolean = true
    const val: string[] = []
    while(index >= 0 && isNumber) {
        if (Number.parseInt(data[index]) || data[index] === '0') {
            val.push(data[index])
            index--
        }else {
            isNumber = false
        }
    }
    return Number.parseInt(val.reverse().reduce((a,b) => a + b))
}

const getMultipleIndex = (data, nestLevel,valIndex): number[] => {
    const results: number[] = []
    if (nestLevel === 0) {
        return results
    }
    let openCount = 0
    let closeCount = 0
    
    for (let i = valIndex; i >=  0 && nestLevel > 0 ; i--) {
        if (data[i] === '(') {
            openCount ++
        }
        if (data[i] === ')') {
            closeCount ++
        }
        // console.log('open' + openCount)
        // console.log('close' + closeCount)
        if (data[i] === '(' && openCount - closeCount > 0) {
            nestLevel --
            results.push(i)
            openCount = closeCount =  0
        }
    }
    return results
}