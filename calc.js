function operate (a, b, operator) {
    let result;
    switch (operator) {
        case "+": result = a+b; break;
        case "-": result = a-b; break;
        case "*": result = a*b; break;
        case "/": result = a/b; break;
    }
    return Math.round(result * 10 ** 5) / 10 ** 5;
}

// Data
let a = null;
let b = null;
let operator = null;
let result = null;

// Calculator state
let readyForNewNumber = true;
let readyFor = "a";
let hasPoint = false;

const display = document.querySelector("#display p");

function newNumber () {
    readyForNewNumber = true;
    hasPoint = false;
}

function pressNumber (e) {    
    switch (readyFor) {
        case "operator":
            readyFor = "b";
        case "a":
        case "b":
            if (readyForNewNumber === true) display.textContent = "";
            if (e.target.id === "point" && !hasPoint) {
                display.textContent += (display.textContent === "") ? "0" + e.target.textContent : e.target.textContent;
                hasPoint = true;
            }
            if (e.target.id !== "point") display.textContent += e.target.textContent;
            readyForNewNumber = false;
            break;
    }
}

function pressEquals (e) {
    switch (readyFor) {
        case "a":
            if (operator && b) {
                result = operate (Number(a), Number(b), operator);
                display.textContent = result;
                a = result;
            }
            break;
        case "operator":
            readyFor = "a";
            break;
        case "b":
            b = display.textContent;
            result = operate(Number(a), Number(b), operator);
            display.textContent = result;
            a = result;
            readyFor = "a";
            newNumber();
    }
}

function pressOperator (e) {
    switch (readyFor) {
        case "a":
            a = display.textContent;
            operator = e.target.textContent;
            readyFor = "operator";
            newNumber();
            break;
        case "operator":
            operator = e.target.textContent;
            newNumber();
            break;
        case "b":
            b = display.textContent;
            result = operate(Number(a), Number(b), operator);
            display.textContent = result;
            a = result;     
            operator = e.target.textContent;
            readyFor = "operator";
            newNumber();   
            break;
    }
}

function pressClear () {
    display.textContent = 0;
    a = null;
    b = null;
    operator = null;
    result = null;
    newNumber();
    readyFor = "a";
    hasPoint = false;
}

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", pressNumber);
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") button.addEventListener("click", pressEquals);
    else button.addEventListener("click", pressOperator);
});

document.querySelector("#clear").addEventListener("click", pressClear);