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
        const val = lines[0];
        const message = '+' + val + '+';
        let top_under_val = ''

        for (let i=0 ; i< message.length; i++) {
            top_under_val += '+'
        }
        console.log(top_under_val);
        console.log(message);
        console.log(top_under_val);
    });