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
const display = document.querySelector("#display p");

document.querySelectorAll("#number-pad button").forEach(button => {
    button.addEventListener("click", e => {
        display.textContent += e.target.textContent;
    })
})

