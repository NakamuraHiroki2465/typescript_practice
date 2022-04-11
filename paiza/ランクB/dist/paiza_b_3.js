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
    // N M K
    const [n, m, k] = lines[0].split(' ').map((line) => Number.parseInt(line));
    // カード配列を作成
    let cards = [...Array(n).keys()].map(i => i += 1);
    let split_cards = [];
    for (let i = 0; i < k; i++) {
        split_cards = setSplitCard(cards, m);
        split_cards.reverse();
        cards = toFlatArray(split_cards);
    }
    cards.forEach(result => console.log(result));
});
const setSplitCard = ((cards, m) => {
    let cards_set = [];
    let card_set = [];
    cards.map((card, index) => {
        index++;
        card_set.push(card);
        if (index % m === 0) {
            cards_set.push(card_set);
            card_set = [];
        }
    });
    if (card_set.length !== 0) {
        cards_set.push(card_set);
    }
    return cards_set;
});
const toFlatArray = ((cards) => {
    const results = [];
    cards.forEach((card) => {
        results.push(...card);
    });
    return results;
});
