document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const historyDiv = document.getElementById("history");
  let currentInput = "";
  let history = [];
  let isDefaultTheme = true;

  function updateDisplay(value) {
    display.value = value;
  }

  function typeNumber(digit) {
    currentInput += digit;
    updateDisplay(currentInput);
  }

  function appendOperator(operator) {
    if (currentInput === "" && operator !== "-") return;
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
      currentInput = "";
    } catch (e) {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  function clearInput() {
    currentInput = "";
    updateDisplay("");
  }

  function removeLastDigit() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  }

  function updateHistory() {
    historyDiv.innerHTML = "";
    history.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = entry;
      historyDiv.appendChild(p);
    });
  }

  function switchTheme() {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    if (isDefaultTheme) {
      themeStylesheet.href = 'theme-dark.css';
    } else {
      themeStylesheet.href = 'index.css';
    }
    isDefaultTheme = !isDefaultTheme;
  }

  window.switchTheme = switchTheme;
  window.typeNumber = typeNumber;
  window.appendOperator = appendOperator;
  window.calculate = calculate;
  window.clearInput = clearInput;
  window.removeLastDigit = removeLastDigit;
});
