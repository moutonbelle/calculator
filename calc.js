function operate (a, b, operator) {
    switch (operator) {
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    }
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
            readyFor = "operator";
            readyForNewNumber = true;   
            break;
    }
}


//     if (aSet === false) {
//         a = display.textContent;
//         aSet = true;
//         operator = e.target.textContent;
//         readyForNewNumber = true;
//     }
//     else {
//         b = display.textContent;
//         bSet = true;
//         result = operate(Number(a), Number(b), operator);
//         display.textContent = result;
//         a = result;
//         operator = e.target.textContent;
//         readyForNewNumber = true;        
//     }
// }

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", pressNumber);
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") button.addEventListener("click", pressEquals);
    else button.addEventListener("click", pressOperator);
});

/*

STATES

-- Beginning
-- Entering a
    -- first number clears and adds number
    -- subsequent numbers add number
    -- operator sets operator and switches state to entering operator
    -- equals does nothing
    -- clear clears
-- Entering operator
    -- first number clears result and sets state to entering b and sets operator
    -- operator changes operator and does nothing else
    -- equals does nothing
-- Entering b
    -- operator calculates result and displays it, sets a to result, sets state to entering operator
    -- numbers add number
    -- equals calculates result and displays it, sets a to result, sets state to entering a

*/