function operate (a, b, operator) {
    switch (operator) {
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    }
}

let a = null;
let b = null;
let operator = null;
let newNumber = true;
const display = document.querySelector("#display p");

function pressNumber (e) {
    if (newNumber === true) display.textContent = "";
    display.textContent += e.target.textContent;
    newNumber = false;
}

function pressEquals (e) {
    b = display.textContent;
    display.textContent = operate(Number(a), Number(b), operator);
    newNumber = true;
}

function pressOperator (e) {
    a = display.textContent;
    operator = e.target.textContent;
    newNumber = true;
}

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", pressNumber);
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") button.addEventListener("click", pressEquals);
    else button.addEventListener("click", pressOperator);
});

/*

Hit operator
-- if b === null
    take a, start entering b
   else
    calculate, take a, start entering b

*/