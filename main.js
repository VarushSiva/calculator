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

window.addEventListener('keydown', handleKeyPress)

numbers.forEach(number => number.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
}));

function handleNumber(num) {
    if (currentValue.length < 7) {
        currentValue += num;
    }
    currentScreen.textContent = currentValue;
}

operator.forEach(op => op.addEventListener("click", (e) => {
    if (currentValue !== "") {
        handleOperator(e.target.textContent);
    }
}))

function handleOperator(op) {
    if (previousValue === "") {
        operation = op;
        previousValue = currentValue;
        prevScreen.textContent = `${previousValue} ${operation}`;
    } else if (currentValue === "") {
        operation = op;
        previousValue = "0";
        prevScreen.textContent = `${previousValue} ${operation}`;
    } else {
        calculate();
        operation = op;
        prevScreen.textContent = `${previousValue} ${operation}`;
    }
    currentValue = "";
    currentScreen.textContent = currentValue;
}

clear.addEventListener("click", allClear)

function allClear() {
    previousValue = "";
    operation = "";
    currentValue = "";
    prevScreen.textContent = previousValue;
    currentScreen.textContent = currentValue;
}

del.addEventListener("click", handleDelete)

function handleDelete() {
    if (currentValue.length > 0) {
        currentValue = currentValue.slice(0,-1)
    }
    currentScreen.textContent = currentValue;
}

evaluate.addEventListener("click", () => {
    evaluation();
})

function evaluation() {
    if (currentValue !== "" && previousValue !== "") {
        calculate();
        currentScreen.textContent = previousValue;
        previousValue = "";
        prevScreen.textContent = "";
    }
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if (operation === "+") {
        previousValue = add(previousValue, currentValue);
    } else if (operation === "-") {
        previousValue = subtract(previousValue, currentValue);
    } else if (operation === "x") {
        previousValue = multiply(previousValue, currentValue);
    } else if (operation === "÷") {
        if (previousValue === 0 || currentValue === 0) {
            previousValue = "Error!"
            return previousValue;
        }
        previousValue = divide(previousValue, currentValue);
    } else if (operation === "%") {
        previousValue = modulo(previousValue, currentValue);
    }

    previousValue = roundNumber(previousValue).toString();

    if (previousValue.length < 14) {
        return previousValue;
    } else {
        previousValue =  previousValue.slice(0,14) + "...";
        return previousValue;
    }
}

decimal.addEventListener("click", addDecimal)

function addDecimal() {
    if (currentValue.length === 0) {
        currentValue += "0."
    }
    if(currentValue.indexOf(".") === -1) {
        currentValue += ".";
    }
    currentScreen.textContent = currentValue;
}

function roundNumber(num) {
    return Math.round(num*1000)/1000;
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <=9) {
        handleNumber(e.key);
    }
    if ((e.key  === "Enter" || e.key === "=") && (currentValue !== "" && previousValue !== "")) {
        evaluation();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
    if (e.key === "Escape") {
        allClear();
    }
}

