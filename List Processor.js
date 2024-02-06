function listProcessor(input) {
    let result = [];

    let obj = {
        addFn: function (currentWord) {
            return result.push(currentWord);
        },
        removefn: function (currentWord) {
            for (let i = 0; i < result.length; i++) {
                if (result[i] === currentWord) {
                    result.splice(i, 1);
                    i--;
                }
            }
            return result;
        }
    };

    for (let el of input) {
        let [command, word] = el.split(' ');

        if (command === 'print') {
            console.log(result.join(','));
        }
        else if (command === 'add') {
            obj.addFn(word);
        }
        else if (command === 'remove') {
            obj.removefn(word);
        }

    }
}

listProcessor(
    [
        'add hello', 'add hello', 'add again', 'print', 'remove hello', 'add again'
    ]
)

console.log('--------');

listProcessor(
    [
        'add pesho', 'add george', 'add peter', 'remove peter', 'print'
    ]
)