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

function num (newNum) {
    switch (readyFor) {
        case "operator":
            readyFor = "b";
        case "a":
        case "b":
            if (readyForNewNumber === true) display.textContent = "";
            display.textContent += newNum;
            readyForNewNumber = false;
            break;
    } 
}

function point () {
    switch (readyFor) {
        case "operator":
            readyFor = "b";
        case "a":
        case "b":
            if (readyForNewNumber === true) display.textContent = "";
            if (!hasPoint) {
                display.textContent += (display.textContent === "") ? "0." : ".";
                hasPoint = true;
            }
            readyForNewNumber = false;
            break;
    }    
}

function equals () {
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

function setOperator (newOperator) {
    switch (readyFor) {
        case "a":
            a = display.textContent;
            operator = newOperator;
            readyFor = "operator";
            newNumber();
            break;
        case "operator":
            operator = newOperator;
            newNumber();
            break;
        case "b":
            b = display.textContent;
            result = operate(Number(a), Number(b), operator);
            display.textContent = result;
            a = result;     
            operator = newOperator;
            readyFor = "operator";
            newNumber();   
            break;
    }
}

function clear () {
    display.textContent = 0;
    a = null;
    b = null;
    operator = null;
    result = null;
    newNumber();
    readyFor = "a";
    hasPoint = false;
}

function backspace () {
    switch (readyFor) {
        case "a":
        case "b":
            if (display.textContent[display.textContent.length-1] === ".") hasPoint = false;
            if (display.textContent.length > 0) display.textContent = display.textContent.slice(0, -1);
            if (display.textContent === "") {
                display.textContent = 0;
                newNumber();
            }
            break;
        case "operator":
            break;
    }
}

function pressKey (e) {
    switch (e.key) {
        case "Backspace": backspace(); break;
        case "c": clear(); break;

        case "=": 
        case "Enter": equals(); break;
        
        case "-": setOperator("-"); break;
        case "+": setOperator("+"); break;
        case "/": setOperator("/"); break;
        case "*": setOperator("*"); break;

        case "0": num(0); break;
        case "1": num(1); break;
        case "2": num(2); break;
        case "3": num(3); break;
        case "4": num(4); break;
        case "5": num(5); break;
        case "6": num(6); break;
        case "7": num(7); break;
        case "8": num(8); break;
        case "9": num(9); break;
    }
}

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "point") point();
        else num(Number(e.target.textContent));
    });
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") button.addEventListener("click", equals);
    else button.addEventListener("click", e => setOperator(e.target.textContent));
});

document.querySelector("#clear").addEventListener("click", clear);

document.querySelector("#backspace").addEventListener("click", backspace);

window.addEventListener("keydown", pressKey);