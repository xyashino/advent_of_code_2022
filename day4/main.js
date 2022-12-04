const {readFile} = require('fs').promises;

function createRange(startAt ,endAt) {
    return [...Array(endAt-startAt+1).keys()].map(i => i + startAt);
}

const formatStringIntoObject = (text) => {
    const [start,end]= text.split('-');
    return {
        start:+start,
        end:+end,
        range: createRange(+start,+end),
    }
}

(async ()=>{
    const formattedValueFromFile = (await readFile('./data.txt','utf8'))
        .split('\n')
        .map(text => {
            const [one, two]= text.split(',');
            return [formatStringIntoObject(one),formatStringIntoObject(two)]
        })

    let scorePartOne=0;
    let scorePartTwo=0;
    for (const [first, second] of formattedValueFromFile) {
        if(
            (first.start >= second.start && first.end <= second.end)
            ||
            (second.start >= first.start && second.end <= first.end)
        ){
            scorePartOne++;
            scorePartTwo++;
            continue
        }
        for (const num of first.range) {
            if(second.range.includes(num)){
                    scorePartTwo++;
                    break
            }
        }
    }
    console.log('Part one: ',scorePartOne)
    console.log('Part two: ',scorePartTwo)
})()