const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentValue = '';

const operators = ['+', '-', '×', '÷'];

function handleInput(value) {
  const lastChar = currentValue.slice(-1);

  if (value === 'C') {
    currentValue = '';
    display.textContent = '0';
    return;
  }

  if (value === '=' && currentValue === '') {
    return;
  }

  if (value === '=') {
    try {
      const expression = currentValue
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      const result = eval(expression);

      currentValue = result.toString();
      display.textContent = currentValue;
    } catch {
      display.textContent = 'Errore';
      currentValue = '';
    }
    return;
  }

  if (
    operators.includes(value) &&
    operators.includes(lastChar)
  ) {
    return;
  }

  currentValue += value;
  display.textContent = currentValue;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.textContent);
  });
});

document.addEventListener('keydown', event => {
  const key = event.key;

  if (key >= '0' && key <= '9') handleInput(key);
  if (key === '+') handleInput('+');
  if (key === '-') handleInput('-');
  if (key === '*') handleInput('×');
  if (key === '/') handleInput('÷');
  if (key === 'Enter') handleInput('=');
  if (key === 'Backspace') handleInput('C');
});
