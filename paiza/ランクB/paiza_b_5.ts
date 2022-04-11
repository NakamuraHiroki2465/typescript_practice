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


    const [n,h,w] = lines[0].split(' ').map((val) => Number.parseInt(val))
    const datas: number[][] = []
    for (let i = 1; i <= 3 * n; i++) {
        datas.push(lines[i].split(' ').map((val) => Number.parseInt(val)))
    }

    let emp_board: number[][] = initBoard(h,w)

    datas.forEach((args,i) => {
        emp_board = execute(args,i,emp_board)
    })

    // プレイヤーの得点を初期化
    let one_counts = 0
    let two_counts = 0
    let three_counts = 0
    for(let i=0; i< emp_board.length; i++) {
        for(let j=0; j< emp_board[i].length; j++) {
            const val = emp_board[i][j]
            if (val === 1) {
                one_counts +=1
            }else if (val === 2) {
                two_counts +=1 
            }else if (val === 3) {
                three_counts +=1
            }
        }
    }
    const results: number[] = [one_counts, two_counts, three_counts]
    console.log(results.toString().replace(/,/g,' '))
});

/**
 * ボードを初期化
 * @param h 
 * @param w 
 * @returns 
 */
const initBoard = (h: number,w: number): number[][] => {
    const record: number[] = [...Array(w)].map((val) => 0)
    const results: number[][] = []
    for (let i = 0; i< h ; i++) {
        results.push(record)
    }
    return results
 }

 /**
  * ターンを実行
  * @param args 
  * @param index 
  * @param emp_results 
  * @returns 
  */
const execute = (args: number[],index: number,emp_results: number[][]): number[][] => {
    let player = null
    if (index%3 === 0) {
        player = 1
    } else if (index%3 === 1 ) {
        player = 2
    } else if (index%3 === 2) {
        player = 3 
    }
    // do action
    const [x,y,w] = args
    emp_results = emp_results.map((val, y_index) => {
        if (y_index < y + w && y_index >= y) {
            return emp_results[y_index].map((val,x_index) => {
                if (x_index < x + w && x_index >= x) {
                    if (val === player || val === 0) {
                        return player
                    } else {
                        const answer: number = [1,2,3].filter((master) => master !== player && master !== val)[0]
                        return answer
                    }
                } else {
                    return val
                }
            })
        } else {
            return val
        }
    })

    return emp_results
}
