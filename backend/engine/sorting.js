// ================= BUBBLE SORT =================
function bubbleSort(arr) {
    let states = [];
    let a = [...arr];

    states.push({ array: [...a] });

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {

            states.push({ array: [...a], compare: [j, j+1] });

            if (a[j] > a[j+1]) {
                [a[j], a[j+1]] = [a[j+1], a[j]];
                states.push({ array: [...a], swapped: [j, j+1] });
            }
        }
    }

    return states;
}

// ================= SELECTION SORT =================
function selectionSort(arr) {
    let states = [];
    let a = [...arr];

    states.push({ array: [...a] });

    for (let i = 0; i < a.length; i++) {
        let min = i;

        for (let j = i + 1; j < a.length; j++) {
            states.push({ array: [...a], compare: [min, j] });

            if (a[j] < a[min]) {
                min = j;
            }
        }

        if (min !== i) {
            [a[i], a[min]] = [a[min], a[i]];
            states.push({ array: [...a], swapped: [i, min] });
        }
    }

    return states;
}

// ================= INSERTION SORT =================
function insertionSort(arr) {
    let states = [];
    let a = [...arr];

    states.push({ array: [...a] });

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        while (j >= 0 && a[j] > key) {

            states.push({ array: [...a], compare: [j, j+1] });

            a[j+1] = a[j];
            j--;

            states.push({ array: [...a], swapped: [j+1, j+2] });
        }

        a[j+1] = key;
        states.push({ array: [...a] });
    }

    return states;
}

// ================= MERGE SORT =================
function mergeSort(arr) {
    let states = [];
    let a = [...arr];

    function merge(l, m, r) {
        let left = a.slice(l, m+1);
        let right = a.slice(m+1, r+1);

        let i = 0, j = 0, k = l;

        while (i < left.length && j < right.length) {
            states.push({ array: [...a], compare: [l+i, m+1+j] });

            if (left[i] <= right[j]) {
                a[k++] = left[i++];
            } else {
                a[k++] = right[j++];
            }

            states.push({ array: [...a] });
        }

        while (i < left.length) {
            a[k++] = left[i++];
            states.push({ array: [...a] });
        }

        while (j < right.length) {
            a[k++] = right[j++];
            states.push({ array: [...a] });
        }
    }

    function sort(l, r) {
        if (l >= r) return;

        let m = Math.floor((l + r) / 2);

        sort(l, m);
        sort(m+1, r);
        merge(l, m, r);
    }

    sort(0, a.length - 1);

    return states;
}

// ================= QUICK SORT =================
function quickSort(arr) {
    let states = [];
    let a = [...arr];

    function partition(low, high) {

        let pivot = a[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {

            states.push({ array: [...a], compare: [j, high] });

            if (a[j] < pivot) {
                i++;
                [a[i], a[j]] = [a[j], a[i]];
                states.push({ array: [...a], swapped: [i, j] });
            }
        }

        [a[i+1], a[high]] = [a[high], a[i+1]];
        states.push({ array: [...a], swapped: [i+1, high] });

        return i+1;
    }

    function sort(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    }

    sort(0, a.length - 1);

    return states;
}

module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort
};
