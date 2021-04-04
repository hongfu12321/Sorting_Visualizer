export function getBubbleSortAnimation(array) {
    console.log('Start Bubble Sort!');
    
    let animations = [];
    let arr_len = array.length;

    for (let i = 0; i < arr_len; i++) {
        for (let j = 0; j < arr_len - i - 1; j++) {
            animations.push([j, j + 1, array[j], array[j + 1], 0]);

            if (array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
        // Index of the confirm sorted element.
        animations.push([arr_len - i - 1, 0, 0, 0, 1]);
    }
    return animations;
}

export function getMergeSortAnimation(array) {
    console.log('Start Merge Sort!');
    let animations = []
    
    mergeSort(array, 0, array.length, animations)
    const response = arraySorted(array) ? `Array is sorted!` : `Array not sorted!`;
    console.log(response)
    return animations
}

function mergeSort(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return array;

    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(array, startIdx, midIdx, animations);
    mergeSort(array, midIdx + 1, endIdx, animations);
    merge(array, startIdx, midIdx, endIdx, animations);
}

// Animation show boundary
const SHOW_BOUNDARY = 0;
// Animation show merging process 
const MERGING = 1;

function merge(array, startIdx, midIdx, endIdx, animations) {
    let i = startIdx;
    let j = midIdx + 1;
    let k = 0;
    let helper = array.slice(i, j);

    animations.push([0, 0, startIdx, endIdx - 1, SHOW_BOUNDARY])
    while (j <= endIdx && k < helper.length) {
        if (helper[k] > array[j]) {
            array[i] = array[j];
            j++;
        }
        else {
            array[i] = helper[k];
            k++;
        }
        animations.push([i, array[i], 0, 0, MERGING])
        i++;
    }
    while (j < endIdx) {
        array[i] = array[j];
        animations.push([i, array[i], 0, 0, MERGING])
        i++;
        j++;
    }
    while (k < helper.length) {
        array[i] = helper[k];
        animations.push([i, array[i], 0, 0, MERGING]);
        i++;
        k++;
    }
}

function arraySorted(array) {
    if (array.length <= 1) { return true; }
    
    let pre = array[0];

    for (let i = 1; i < array.length; i++){
        if (array[i] < pre) {return false;}
        pre = array[i];
    }
    return true;
}