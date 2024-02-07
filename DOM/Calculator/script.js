const firstNum = document.getElementById('num1');
const secondNum = document.getElementById('num2');
const option = document.getElementById('option');

function calc() {
    let sum = 0;

    switch (option.value) {
        case "sum":
            sum = Number(firstNum.value) + Number(secondNum.value);
            break;

        case "subtract":
            sum = Number(firstNum.value) - Number(secondNum.value);
            break;

        case "multiply":
            sum = Number(firstNum.value) * Number(secondNum.value);
            break;

        case "division":
            sum = Number(firstNum.value) / Number(secondNum.value);
            break;
    }

    if (!firstNum.value || !secondNum.value) {
        alert("Check input number!!!");
    }
    else {
        document.getElementById('result').value = sum;
    }
}