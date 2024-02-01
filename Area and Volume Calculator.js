function solve(areaFn, volFn, input) {
    const data = JSON.parse(input);
    const result = [];

    for (let el of data) {
        result.push({
            area: areaFn.call(el),
            volume: volFn.call(el)
        });
    }

    console.log(result);
}

const data1 = `[ 
    {"x":"1","y":"2","z":"10"}, 
    {"x":"7","y":"7","z":"10"}, 
    {"x":"5","y":"2","z":"10"} 
]`

solve(area, vol, data1);

function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
}