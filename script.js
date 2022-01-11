let currentOperator = null;
let displayValue = '';
let operand1 = '';
let operand2 = '';

const currentDisplay = document.querySelector('.current');
const secondaryDisplay = document.querySelector('.second');

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const decimalButton = document.getElementById('decimalBtn');
const equalsButton = document.getElementById('equalsBtn');


const clear = () => {
    secondaryDisplay.textContent = ' ';
    currentDisplay.textContent = '0';
}

const add = (num1, num2) => {
    return num1 + num2
}

const subtract = (num1, num2) => {
    return num1 - num2
}

const divide = (num1, num2) => {
    return num1 / num2
}

const multiply = (num1, num2) => {
    return num1 * num2
}

const operate = (operator, num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1, num2)
        case '/':
            return divide(num1, num2)
        case '*':
            return multiply(num1, num2)
        default:
            null
    }
}

const appendNumber = (number) => {
    if (currentDisplay.textContent == 0) {
        currentDisplay.textContent = '';
    }
    currentDisplay.textContent += number;
}

const appendDecimal = () => {
    if (currentDisplay.textContent.includes('.')) {
        return
    }
    currentDisplay.textContent += '.';
    
}

const setOperator = (operator) => {
    if (currentOperator !== null) evaluate();
    currentOperator = operator;
    operand1 = currentDisplay.textContent;
    secondaryDisplay.textContent = `${operand1} ${currentOperator}`;
    currentDisplay.textContent = 0;

}

const deleteNumber = () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    if (currentDisplay.textContent == '') {
        currentDisplay.textContent = 0;
    }
}

const evaluate = () => {
    if (currentOperator === null) return
    if (currentOperator === '/' && currentDisplay.textContent === '0') {
        alert("Error: Cannot divide by 0!");
        return
    }
    operand2 = currentDisplay.textContent;
    currentDisplay.textContent = (operate(currentOperator, operand1, operand2));
    secondaryDisplay.textContent = `${operand1} ${currentOperator} ${operand2} =`;
}

const keyboardEventHandler = (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') setOperator(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

window.addEventListener('keydown', keyboardEventHandler);
decimalButton.addEventListener('click', appendDecimal);
deleteButton.addEventListener('click', deleteNumber);
clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);

