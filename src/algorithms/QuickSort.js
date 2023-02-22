import { swap } from "./helpers";

const qs = (array, position, arraySteps, colorSteps) => {
    // let stack = [];
    // stack.push(0);
    // stack.push(array.length - 1);

    // while (stack.length > 0) {
    //     let end = stack.pop();
    //     let start = stack.pop();

    //     let pivot = partition(array, start, end, arraySteps, colorSteps);

    //     if (pivot - 1 > start) {
    //         stack.push(start);
    //         stack.push(pivot - 1);
    //     }

    //     if (pivot + 1 < end) {
    //         stack.push(pivot + 1);
    //         stack.push(end);
    //     }
    // }
    quickSort(array, 0, array.length - 1, arraySteps, colorSteps);
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

const quickSort = (array, start, end, arraySteps, colorSteps) => {
    if (start > end) {
        return;
    } else if (start === end) {
        arraySteps.push(array.slice());
        let colorKey = colorSteps[colorSteps.length - 1].slice();
        colorKey[start] = 2;
        colorSteps.push(colorKey.slice());
        return;
    }
    let pivot = partition(array, start, end, arraySteps, colorSteps);

    quickSort(array, start, pivot - 1, arraySteps, colorSteps);
    quickSort(array, pivot + 1, end, arraySteps, colorSteps);
};

const partition = (array, start, end, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let pivot = array[end];
    let pIndex = start;

    for (let i = start; i < end; i++) {
        if (array[i] <= pivot) {
            array = swap(array, i, pIndex);
            arraySteps.push(array.slice());
            colorKey[i] = 1;
            colorKey[pIndex] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[i] = 0;
            colorKey[pIndex] = 0;
            pIndex++;
        } else {
            arraySteps.push(array.slice());
            colorKey[i] = 1;
            colorKey[pIndex] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[i] = 0;
            colorKey[pIndex] = 0;
        }
    }

    array = swap(array, pIndex, end);
    arraySteps.push(array.slice());
    colorKey[pIndex] = 2;
    colorKey[end] = 0;
    colorSteps.push(colorKey.slice());

    return pIndex;
};

export default qs;
