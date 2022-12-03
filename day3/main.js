const {readFile} = require('fs').promises;
console.time();
const LOWERCASE_NUMBER= 96;
const UPPERCASE_NUMBER= 38;

const sumOfResult  = (result)=>{
    return  [...result].reduce((prev,curr)=>{
        if(curr === curr.toLowerCase()){
            return prev + curr.charCodeAt(0)- LOWERCASE_NUMBER;
        }
        return prev + curr.charCodeAt(0) - UPPERCASE_NUMBER;
    },0);
}

(async ()=>{

    const formattedValueFromFile =
        (await readFile('./data.txt','utf8'))
            .split('\n');

    const formattedValueForPartOne =
        formattedValueFromFile
            .map(el=> {
                el.trim();
                const centerIndexOfElement = el.length / 2;
                return [el.slice(0 ,centerIndexOfElement), el.slice(centerIndexOfElement,el.length)]
            });

    let resultForPartOne = '';
    for (const [first,second] of formattedValueForPartOne) {
        for (let char of first) {
            if(second.includes(char)){
                resultForPartOne+=char;
                break;
            }
        }
    }
    console.log('Part One: ',sumOfResult(resultForPartOne))

    const formattedValueFromFileForPartTwo = [];

    for (let i = 0; i < formattedValueFromFile.length-2 ; i+=3) {
        formattedValueFromFileForPartTwo.push([formattedValueFromFile[i],formattedValueFromFile[i+1],formattedValueFromFile[i+2]])
    }
    let resultForPartTwo='';
    formattedValueFromFileForPartTwo.forEach(([a,b,c])=>{
        for (const charA of a) {
            if(b.includes(charA) && c.includes(charA)){
                resultForPartTwo+=charA;
                break
            }
        }
    })
    console.log('Part Two: ',sumOfResult(resultForPartTwo))

})()
console.timeEnd()

