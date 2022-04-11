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
    //     4 5
    // 0 s 0 1
    // 0 0 1 0
    // 0 1 1 0
    // 0 0 1 g
    // 0 0 0 0
    

    // while
    // 全方向移動可能かチェック
    // 移動するべき方向を見定める
    // 移動する

    const [x,y] = lines[0].split('').map(v => Number.parseInt(v))
    const data: number[][] = []
    const process: number[][] = []
    let current: Place = new Place()
    const goal: Place = new Place()
    let isGoal: boolean = false
    for (let i = 1; i <= 5; i++) {
        data.push(lines[i].split('').map((v,j) => {
            if (v === 's') {
                current.y = i
                current.x = j
                return 8
            }
            if (v === 'g') {
                goal.y = i
                goal.x = j
                return 9
            }
            return v
        }))
    }
    
    let count = 0
    let counts: number[] = []
    while(!isGoal) {
        let nextAble: NextAble = new NextAble()
        nextAble = checkMove(data,current,process) 
        const direct: Map<number,number[]> = decideDirection(current,nextAble,goal)
        if (direct.size > 0) {
            direct.forEach((v,i) => {
                if (i === 1) {
                    if (v === [goal.y,goal.x]) {
                        isGoal = true
                        count ++
                        counts.push(count)
                    } else {
                        current.y = v[0]
                        current.x = v[1]
                        process.push([current.y,current.x])
                        count ++
                    }
                }
            })
        } else {
            current = new Place()
            count = 0
            continue
        }
    }



    // while isGoalがfalseの間


    // currentPlace[x][y] = 'g'の場合
    // isGoal = true
    // counts.push(currentPlace.count)
    


});


const checkMove = (data: number[][], current: Place, process: number[][]): NextAble => {
    const nextAble: NextAble = new NextAble()

    if (!(current.x === 0 || data[current.y][current.x - 1] === 1 || process.includes([current.y,current.x - 1]))) {
        nextAble.x.back = true
    }

    if (!(current.y === 0 || data[current.y - 1][current.x] === 1 || process.includes([current.y - 1,current.x]) )) {
        nextAble.y.back = true
    }

    if (!(current.x + 1 === data[0].length || data[current.y][current.x + 1] === 1 || process.includes([current.y,current.x + 1]))) {
        nextAble.x.next = true
    }

    if (!(current.y + 1 === data.length || data[current.y + 1][current.x] === 1 || process.includes([current.y + 1,current.x]))) {
        nextAble.y.next = true
    }

    return nextAble
}

const decideDirection = (current: Place, nextAble: NextAble, goal: Place): Map<number,number[]>  => {
    const map: Map<number, number[]> = new Map<number, number[]>()
    let key: number = 1
    if (goal.x === current.x && goal.y - current.y > 0) {
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
    } else if (goal.x === current.x && goal.y - current.y < 0) {
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
    } else if (goal.x - current.x > 0 && goal.y === current.y) {
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
    } else if (goal.x - current.x < 0 && goal.y === current.y) {
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
    } else if (goal.x - current.x > 0 && goal.y - current.y > 0) {
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
    } else if (goal.x - current.x > 0 && goal.y - current.y < 0) {
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
    } else if (goal.x - current.x < 0 && goal.y - current.y > 0) {
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
    } else if (goal.x - current.x < 0 && goal.y - current.y < 0) {
        if (nextAble.x.back) {
            map.set(key++, [current.y,current.x - 1])
        }
        if (nextAble.y.back) {
            map.set(key++, [current.y - 1,current.x])
        }
        if (nextAble.x.next) {
            map.set(key++,[current.y,current.x + 1])
        }
        if (nextAble.y.next) {
            map.set(key++, [current.y + 1,current.x])
        }
    }
    return map
}

class Place  {
    x: number
    y: number
    constructor() {
        this.x = 0
        this.y = 0
    }
}

class NextAble {
    x: {
        next: boolean
        back: boolean
    }
    y: {
        next: boolean
        back: boolean
    }
    constructor() {
        this.x.next = false
        this.x.back = false
        this.y.next = false
        this.y.back = false
    }
}