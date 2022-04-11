import reader from 'reader'

const linessum = []
const readersum = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
 
reader.on('line', function (line) {
  linessum.push(line);
});
reader.on('close', function () {
    const {N, A, B} = linessum[0].split(' ')
    console.log(N,A,B)
})