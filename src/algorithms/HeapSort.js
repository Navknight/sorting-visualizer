import { swap } from "./helpers";

const heapify = (array, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swap(array, largest, i);
        heapify(array, n, largest);
    }
};

const hs = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(array, 0, i);
        heapify(array, i, 0);
        arraySteps.push(array.slice());
        colorKey[array.length - i] = 2;
        colorSteps.push(colorKey.slice());
    }
    colorKey[0] = 2;
    colorSteps.push(colorKey.slice());
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

export default hs;
