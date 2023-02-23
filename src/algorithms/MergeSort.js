// import { swap } from "./helpers";

const ms = (array, position, arraySteps, colorSteps) => {
    mergeSort(array, 0, array.length - 1, arraySteps, colorSteps);
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

const mergeSort = (array, start, end, arraySteps, colorSteps) => {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(array, start, mid, arraySteps, colorSteps);
        mergeSort(array, mid + 1, end, arraySteps, colorSteps);
        merge(array, start, mid, end, arraySteps, colorSteps);
    }
};

const merge = (array, start, mid, end, arraySteps, colorSteps) => {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        arraySteps.push(array.slice());
        colorKey[k] = 1;
        colorSteps.push(colorKey.slice());
        colorKey[k] = 0;
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        i++;
        arraySteps.push(array.slice());
        colorKey[k] = 1;
        colorSteps.push(colorKey.slice());
        colorKey[k] = 0;
        k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        j++;
        arraySteps.push(array.slice());
        colorKey[k] = 1;
        colorSteps.push(colorKey.slice());
        colorKey[k] = 0;
        k++;
    }
};

export default ms;
