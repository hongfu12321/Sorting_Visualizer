/*
** Bubble sort
*/
export function getBubbleSortAnimation(array) {
    // console.log('Start Bubble Sort!');
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
    // const response = arraySorted(array) ? `Bubble Sort Succeed!` : `Bubble Sort Failed...`;
    // console.log(response)
    return animations;
}


/*
** Merge sort
*/
// Animation show boundary
const SHOW_BOUNDARY = 0;
// Animation show merging process 
const MERGING = 1;

export function getMergeSortAnimation(array) {
    // console.log('Start Merge Sort!');
    let animations = []
    
    mergeSort(array, 0, array.length, animations)
    // const response = arraySorted(array) ? `Merge Sort Succeed!` : `Merge Sort Failed...`;
    // console.log(response)
    return animations
}

function mergeSort(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return array;

    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(array, startIdx, midIdx, animations);
    mergeSort(array, midIdx + 1, endIdx, animations);
    merge(array, startIdx, midIdx, endIdx, animations);
}

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
        animations.push([i, array[j], 0, 0, MERGING])
        array[i++] = array[j++];
    }
    while (k < helper.length) {
        animations.push([i, helper[k], 0, 0, MERGING]);
        array[i++] = helper[k++];
    }
}


/*
** Quick sort
*/
// Animation show pivot
const PIVOT = 0;
// Animation show partition
const PARTITION = 1;
// Animation to put pivot in the middle
const MIDDLE = 2

export function getQuickSortAnimation(array) {
    // console.log('Start Quick Sort!');
    let animations = []
    
    quickSort(array, 0, array.length - 1, animations);
    // const response = arraySorted(array) ? `Quick Sort Succeed!` : `Quick Sort Failed...`;
    // console.log(response)
    return animations
}

function partition(arr, start, end, animations){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIdx = start; 

    animations.push([end, pivotValue, 0, 0, PIVOT]);
    for (let i = start; i < end; i++) {
        // if arr[i] < pivot, move to the front.
        if (arr[i] < pivotValue) {
            animations.push([i, arr[i], pivotIdx, arr[pivotIdx], PARTITION]);
            [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
            pivotIdx++;
        }
    }
    
    // Putting the pivot value in the middle
    animations.push([end, arr[end], pivotIdx, arr[pivotIdx], MIDDLE]);
    [arr[pivotIdx], arr[end]] = [arr[end], arr[pivotIdx]]
    return pivotIdx;
};

function quickSort(arr, start, end, animations) {
    // Base case or terminating case
    if (start > end) {
        return;
    }
    
    // Returns pivotIndex
    let middle = partition(arr, start, end, animations);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, middle - 1, animations);
    quickSort(arr, middle + 1, end, animations);
}


/*
** Utility
*/
// function arraySorted(array) {
//     if (array.length <= 1) { return true; }
    
//     let pre = array[0];

//     for (let i = 1; i < array.length; i++){
//         if (array[i] < pre) {return false;}
//         pre = array[i];
//     }
//     return true;
// }