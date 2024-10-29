const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('.buttons input[type="button"]');

let currentInput = '';
let firstOperand = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'AC') {
            currentInput = '';
            firstOperand = null;
            operator = null;
            updateDisplay('');
            return;
        }

        if (value === 'DE') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
            return;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (firstOperand !== null && operator !== null) {
                    firstOperand = calculate(firstOperand, operator, parseFloat(currentInput));
                } else {
                    firstOperand = parseFloat(currentInput);
                }
            }
            operator = value;
            currentInput = '';
            return;
        }

        if (value === '=') {
            if (operator !== null && currentInput !== '') {
                currentInput = calculate(firstOperand, operator, parseFloat(currentInput)).toString();
                operator = null;
                firstOperand = null;
                updateDisplay(currentInput);
            }
            return;
        }

        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateDisplay(currentInput);
    });
});

function updateDisplay(value) {
    display.value = value || '0';
}

function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'Error';
        default:
            return b;
    }
}
