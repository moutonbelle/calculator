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

const display = document.querySelector("#display p");

function pressNumber (e) {    
    switch (readyFor) {
        case "operator":
            readyFor = "b";
        case "a":
        case "b":
            if (readyForNewNumber === true) display.textContent = "";
            display.textContent += e.target.textContent;
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
            readyForNewNumber = true;
    }
}

function pressOperator (e) {
    switch (readyFor) {
        case "a":
            a = display.textContent;
            operator = e.target.textContent;
            readyFor = "operator";
            readyForNewNumber = true;
            break;
        case "operator":
            operator = e.target.textContent;
            readyForNewNumber = true;
            break;
        case "b":
            b = display.textContent;
            result = operate(Number(a), Number(b), operator);
            display.textContent = result;
            a = result;     
            operator = e.target.textContent;
            readyFor = "operator";
            readyForNewNumber = true;   
            break;
    }
}

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", pressNumber);
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") button.addEventListener("click", pressEquals);
    else button.addEventListener("click", pressOperator);
});