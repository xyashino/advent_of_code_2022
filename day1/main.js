const {readFile} = require('fs').promises;
(async ()=>{

    console.time();
    const formattedValueFromFile =(await readFile('./data.txt','utf8')).split('\n');

    const caloriesAteByElves=[];
    let caloriesEatenByOneElv= [];

    formattedValueFromFile.forEach((el,i,arr)=>{
        if(el==='') return;
        caloriesEatenByOneElv.push(+el);
        if(arr[i+1]===''){
            caloriesAteByElves.push(caloriesEatenByOneElv.reduce((curr,prev)=>curr+prev,0));
            caloriesEatenByOneElv=[]
        }
    });
    const [first,second ,third] = caloriesAteByElves.sort((a,b)=>b-a);
    console.log(first)
    console.log(first + second+ third )
    console.timeEnd()
})()
