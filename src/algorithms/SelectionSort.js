import { swap } from "./helpers";

const ss = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let n = array.length;
    for(let i = 0; i < n-1; i++){
        let min = i;
        for(let j = i+1; j < n; j++){
            if(array[j] < array[min]) min = j;
        }
        colorKey[i] = 1;
        colorKey[min] = 1;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
        swap(array, min, i);
        
        arraySteps.push(array.slice());
        colorKey[i] = 2;
        colorKey[min] = 0;
        colorSteps.push(colorKey.slice());
    }
    for(let i = 0; i < colorKey.length; i++) colorKey[i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    console.log(array);
}

export default ss;