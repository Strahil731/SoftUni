function solution() {
    let store = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    let recipe = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    }

    return function (data) {
        let [action, type, quantity] = data.split(" ");

        switch (action) {
            case "restock": return restock(type, quantity);

            case "prepare": return prepare(type, quantity);

            case "report": return report();
        }
    }

    function prepare(type, quantity) {
        let prepareRecipe = {};

        for (let [el, value] of Object.entries(recipe[type])) {
            let needElementQuantity = value * quantity;

            if (store[el] < needElementQuantity) {
                return `Error: not enough ${el} in stock`;
            }
            prepareRecipe[el] = needElementQuantity;
        }

        for (let [el, val] of Object.entries(prepareRecipe)) {
            store[el] -= val;
        }

        return "Success";
    }

    function restock(type, quantity) {
        store[type] += Number(quantity);
        return "Success";
    }

    function report() {
        return `protein=${store.protein} carbohydrate=${store.carbohydrate} fat=${store.fat} flavour=${store.flavour}`;
    }
}

let manager = solution();

console.log(manager("prepare turkey 1")); // Success
console.log(manager("restock protein 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock carbohydrate 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("report"));