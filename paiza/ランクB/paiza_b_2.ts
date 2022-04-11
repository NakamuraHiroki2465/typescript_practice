process.stdin.resume();
process.stdin.setEncoding("utf8");
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", (line) => {
  lines.push(line);
});
reader.on("close", () => {
  const [n, m] = lines[0].split(" ").map((val) => Number.parseInt(val));

  const answer_array = [];
  [...Array(m).keys()].map((i) => {
    answer_array.push(Number.parseInt(lines[i + 1]));
  });
  lines = lines.splice(m + 1, m * n);

  const person_arr = [];
  for (let i = 0; i < n; i++) {
    const arr = [];
    for (let k = i * m; k < m * (i + 1); k++) {
      arr.push(lines[k]);
    }
    person_arr.push(arr);
  }

  const result_arr = person_arr.map((result) =>
    calculate(answer_array, result)
  );
  console.log(Math.max(...result_arr));
});

const calculate = (answer, result) => {
  let point = 100;
  answer.map((val, i) => {
    const diff = Math.abs(val - result[i]);
    if (diff <= 5) {
      return;
    }
    if (diff <= 10) {
      point -= 1;
    } else if (diff <= 20) {
      point -= 2;
    } else if (diff <= 30) {
      point -= 3;
    } else {
      point -= 5;
    }
  });
  return point < 0 ? 0 : point;
};
