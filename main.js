function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

let previousValue = "";
let operation = "";
let currentValue = "";

let clear = document.querySelector(".AC");
let del = document.querySelector(".DE");
let decimal = document.querySelector(".decimal");
let evaluate = document.querySelector(".eval");
let operator = document.querySelectorAll(".operator");
let numbers = document.querySelectorAll(".number")
let prevScreen = document.querySelector(".prev");
let currentScreen = document.querySelector(".current")

numbers.forEach(number => number.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentValue;
}));

function handleNumber(num) {
    if (currentValue.length < 7) {
        currentValue += num;
    }
}

operator.forEach(op => op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
    prevScreen.textContent = `${previousValue} ${operation}`;
    currentScreen.textContent = currentValue;
}))

function handleOperator(op) {
    operation = op;
    previousValue = currentValue;
    currentValue = "";
}

