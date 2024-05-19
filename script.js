// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyDiv = document.getElementById('history');
    let currentInput = '';
    let history = [];
  
    function updateDisplay(value) {
      display.value = value;
    }
  
    function NumberDig(digit) {
      currentInput += digit;
      updateDisplay(currentInput);
    }
  
    function appendOperator(operator) {
      if (currentInput === '' && operator !== '-') return;
      if (isNaN(currentInput[currentInput.length - 1])) {
        currentInput = currentInput.slice(0, -1);
      }
      currentInput += operator;
      updateDisplay(currentInput);
    }
  
    function calculate() {
      try {
        const result = eval(currentInput);
        updateDisplay(result);
        history.push(`${currentInput} = ${result}`);
        updateHistory();
        currentInput = '';
      } catch (e) {
        updateDisplay('Error');
        currentInput = '';
      }
    }
  
    function clearInput() {
      currentInput = '';
      updateDisplay('');
    }
  
    function removeLastDigit() {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    }
  
    function updateHistory() {
      historyDiv.innerHTML = '';
      history.forEach(entry => {
        const p = document.createElement('p');
        p.textContent = entry;
        historyDiv.appendChild(p);
      });
    }
  
    // Exposing functions to global scope
    window.NumberDig = NumberDig;
    window.appendOperator = appendOperator;
    window.calculate = calculate;
    window.clearInput = clearInput;
    window.removeLastDigit = removeLastDigit;
  });
  