const {readFile} = require('fs').promises;

const createStackAsMap = (arr) => {
    const resultArr = [...arr.pop()].filter(el => el !== ' ').map(el => [el, []]);
    arr.reverse();

    const arrayOfRows = arr.map(el => (
        el.replace(/(...)./g, "$1").match(/.{1,3}/g) || []
    ))
    for (const row of arrayOfRows) {
        for (const [columnIndex, column] of row.entries()) {
            if (column === '   ') continue;
            resultArr[columnIndex][1].push(column.replaceAll('[', '').replaceAll(']', ''))
        }
    }
    return new Map([...resultArr]);
}

const convertStepsIntoObjectArray = (textArray) => {
    return textArray.map(text => {
        const stepsArr = text.split(' ');
        const resultObject = {};
        for (let i = 0; i < stepsArr.length - 1; i += 2) {
            if (i === 0) {
                resultObject[stepsArr[i].trim()] = +stepsArr[i + 1];
                continue
            }
            resultObject[stepsArr[i].trim()] = stepsArr[i + 1];
        }
        return resultObject;
    })
}

const createAnswer = (map) => {
    let result = '';
    map.forEach(el => result += el.at(-1));
    return result
}
const moveStackBySteps = (steps, stack, reverse = false) => {
    for (const step of steps) {
        const fromArray = stack.get(step.from);
        const toArray = stack.get(step.to);
        stack.set(step.from, fromArray.slice(0, fromArray.length - step.move))
        if (reverse) {
            stack.set(step.to, toArray.concat(fromArray.slice(fromArray.length - step.move).reverse()));
            continue
        }
        stack.set(step.to, toArray.concat(fromArray.slice(fromArray.length - step.move)));
    }
    return stack;
}


(async () => {
    const valueFromFile = (await readFile('./data.txt', 'utf8')).split('\n').filter(el => el !== '');
    const stackFromFile = valueFromFile.slice(0, 9);
    const stepsFromFile = valueFromFile.slice(9);
    const stack = createStackAsMap(stackFromFile);
    const steps = convertStepsIntoObjectArray(stepsFromFile);
    const resultForPartOne = moveStackBySteps(steps, new Map(stack), true)
    const resultForPartTwo = moveStackBySteps(steps, new Map(stack))

    console.log('Part one: ', createAnswer(resultForPartOne))
    console.log('Part one: ', createAnswer(resultForPartTwo))
})()
