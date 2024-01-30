function evenPosition(array) {
    let result = [];

    for (let i = 0; i < array.length; i += 2) {
        result.push(array[i]);
    }

    return result.join(" ");
}

const functionResult = evenPosition(['20', '30', '40', '50', '60'])
console.log(functionResult);