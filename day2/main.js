const {readFile} = require('fs').promises;
console.time();
(async () => {
    const itemPoints = new Map([
        ['rock', 1],
        ['paper', 2],
        ['scissors', 3],
    ]);

    const rock = {item: 'rock', win: 'scissors', lose: 'paper'};
    const paper = {item: 'paper', win: 'rock', lose: 'scissors'};
    const scissors = {item: 'scissors', win: 'paper', lose: 'rock'};

    const itemWithResult = new Map([
        ['A', rock],
        ['B', paper],
        ['C', scissors],
        ['X', rock],
        ['Y', paper],
        ['Z', scissors],
    ]);

    const formattedValueFromFile = (await readFile('./data.txt', 'utf8'))
        .split('\n')
        .map(el => [el.at(0), el.at(-1)]);

    let firstTaskScore = 0;

    formattedValueFromFile.forEach(([a, b]) => {
        const firstPlayer = itemWithResult.get(a);
        const secondPlayer = itemWithResult.get(b);
        firstTaskScore += itemPoints.get(secondPlayer.item);

        if (secondPlayer.item === firstPlayer.item) {
            firstTaskScore += 3;
            return;
        }
        if (secondPlayer.win === firstPlayer.item) {
            firstTaskScore += 6;
            return;
        }
    });

    let secondTaskScore = 0;
    formattedValueFromFile.forEach(([a, b]) => {
        const firstPlayer = itemWithResult.get(a);

        if (b === 'Y') {
            secondTaskScore += 3 + itemPoints.get(firstPlayer.item);
            return;
        }
        if (b === 'X') {
            secondTaskScore += itemPoints.get(firstPlayer.win);
            return;
        }
        secondTaskScore += 6 + itemPoints.get(firstPlayer.lose);
    })
    console.log({firstTaskScore})
    console.log({secondTaskScore});
})()
console.timeEnd()

