const {readFile} = require('fs').promises;

const foo = (text, length) => {
    for (let i = 0; i < text.length; i++) {
        const bar = text.slice(i, i + length);
        if (new Set(bar).size === length) {
            return text.indexOf(bar) + length;
        }
    }
}


(async () => {
    const text = await readFile('./data.txt', 'utf-8');

    const resultForepartOne = foo(text, 4);
    const resultForPartTwo = foo(text, 14);


    console.log('Part one: ', resultForepartOne);
    console.log('Part two: ', resultForPartTwo);
})()