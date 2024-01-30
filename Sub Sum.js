function sumRange(array, start, end) {
    if (!Array.isArray(array)) {
        const error = new TypeError('ERROR: CHECK INPUT');
        throw error;
    }

    if (start < 0) {
        start = 0;
    }

    if (end >= array.length) {
        end = array.length - 1;
    }

    let sum = 0;

    for (let i = start; i <= end; i++) {
        sum += Number(array[i]);
    }

    return sum;
}

console.log(sumRange([1, 2, 3], 1, 2))
console.log(sumRange('aksbfsak', 1, 5))