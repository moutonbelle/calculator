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

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", e => {
        if (newNumber === true) display.textContent = "";
        display.textContent += e.target.textContent;
        newNumber = false;
    })
});

document.querySelectorAll("#operators button").forEach(button => {
    if (button.id === "equals") {
        button.addEventListener("click", e => {
            b = display.textContent;
            display.textContent = operate (a, b, operator);
        });
    }
    else {
        button.addEventListener("click", e => {
            a = display.textContent;
            operator = e.target.textContent;
            newNumber = true;
        });
    }
});

/*

Just pushed operator
next number push clears number and starts entering new number

*/