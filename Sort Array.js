function sortArray(array, string) {
    if (string === "asc") {
        return array.sort((a, b) => a - b);
    }
    else if (string === 'desc') {
        return array.sort((a, b) => b - a);
    }
}

const functionResult = sortArray([14, 7, 17, 6, 8], 'asc');
console.log(functionResult);