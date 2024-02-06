function listProcessor(data) {
    let result = [];

    for (const el of data) {
        let [command, word] = el.split(' ');

        if (command === "print") {
            break;
        }
        else if (command === 'add') {
            addFn(word);
        }
        else if (command === 'remove') {
            removeFn(word);
        }
    }

    function addFn(inputWord) {
        return result.push(inputWord);
    }

    function removeFn(inputWord) {
        let currentIndex = result.lastIndexOf(inputWord);
        return result.splice(currentIndex, 1);
    }

    console.log(result.join(','));
}

listProcessor(
    [
        'add pesho', 'add george', 'add peter', 'remove peter', 'print'
    ]
)