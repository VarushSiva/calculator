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

function modulo(a,b) {
    return a % b;
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
    if (currentValue !== "") {
        handleOperator(e.target.textContent);
        prevScreen.textContent = `${previousValue} ${operation}`;
        currentScreen.textContent = currentValue;
    }
}))

function handleOperator(op) {
    operation = op;
    previousValue = currentValue;
    currentValue = "";
}

clear.addEventListener("click", () => {
    previousValue = "";
    operation = "";
    currentValue = "";
    prevScreen.textContent = previousValue;
    currentScreen.textContent = currentValue;
})

del.addEventListener("click", () => {
    if (currentValue.length > 0) {
        currentValue = currentValue.slice(0,-1)
    }
    currentScreen.textContent = currentValue;
})

evaluate.addEventListener("click", () => {
    if (currentValue !== "" && previousValue !== "") {
        calculate();
        if (currentValue.length < 14) {
            currentScreen.textContent = currentValue;
        } else {
            currentScreen.textContent = currentValue.slice(0,14) + "...";
        }
    }
})

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if (operation === "+") {
        currentValue = add(previousValue, currentValue);
    } else if (operation === "-") {
        currentValue = subtract(previousValue, currentValue);
    } else if (operation === "x") {
        currentValue = multiply(previousValue, currentValue);
    } else if (operation === "÷") {
        currentValue = divide(previousValue, currentValue);
    } else if (operation === "%") {
        currentValue = modulo(previousValue, currentValue);
    }

    currentValue = roundNumber(currentValue).toString();
    previousValue = "";
    prevScreen.textContent = "";
    currentScreen.textContent = currentValue;
}

decimal.addEventListener("click", () => {
    if (currentValue.length === 0) {
        currentValue += "0."
    }
    if(currentValue.indexOf(".") === -1) {
        currentValue += ".";
    }
    currentScreen.textContent = currentValue;
})

function roundNumber(num) {
    return Math.round(num*1000)/1000;
}
