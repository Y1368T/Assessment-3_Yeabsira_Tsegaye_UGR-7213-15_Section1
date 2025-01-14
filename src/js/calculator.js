const display = document.getElementById('display');
const numButtons = Array.from(document.getElementsByClassName('btn'));
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
    display.value = currentInput || previousInput || '';
}

numButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.dataset.value;

        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else {
            currentInput += value;
        }
        updateDisplay();
    });
});

function calculate() {
    let result = '';
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) {
        alert('Invalid input');
        return;
    }

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    operator = '';
}

equals.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

clear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
});
