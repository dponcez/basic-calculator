const initApp = () => {
  const log = (value) => console.log(value);
  const selector = (element) => document.querySelector(element);
  const selectorAll = (element) => document.querySelectorAll(element);
  const eventHandler = ($, event, callback) => $.addEventListener(event, callback);

  const htmlRefs = {
    equalBtn: selector('[data-equal]'),
    previousValue: selector("[data-prev-value]"),
    currentValue: selector("[data-current-value]"),
    clearBtn: selector("[data-cleaner]"),
    decimal: selector("[data-decimal]"),
    numberBtns: selectorAll("[data-number]"),
    operatorBtns: selectorAll("[data-operator]"),
    memoryKeyBtns: selectorAll("[data-memory-key]"),
  };

  const {
    equalBtn,
    previousValue,
    currentValue,
    clearBtn,
    decimal,
    numberBtns,
    operatorBtns,
    memoryKeyBtns
  } = htmlRefs;
  let operation;

  const appendNumber = (number) => {
    currentValue.innerText === '0' ?
      currentValue.innerText = number :
      currentValue.innerText += number;
  }

  const chooseOperation = (operand) => {
    if(currentValue.innerText === '0') return;
    computeOperation(operand);

    operation = operand;
    currentValue.innerText += operand;
    previousValue.innerText = currentValue.innerText;
    currentValue.innerText = '0'
  }

  const computeOperation = () => {
    let result;
    const displayCurrentValue = parseFloat(currentValue.innerText);
    const displayPreviousValue = parseFloat(previousValue.innerText);

    if(isNaN(displayCurrentValue) || isNaN(displayPreviousValue)) return;

    try {
      switch(operation) {
        case '+':
          result = displayPreviousValue + displayCurrentValue;
          break;
        case '-':
          result = displayPreviousValue - displayCurrentValue;
          break;
        case '*':
          result = displayPreviousValue * displayCurrentValue;
          break;
        case '/':
          result = displayPreviousValue / displayCurrentValue;
          break;
        default:
          return;
      }

    } catch (error) {
      log(`An error occured when we tried to parse the result: ${error}`)
    }

    currentValue.innerText = result;
  }

  numberBtns.forEach(operand => {
    eventHandler(operand, 'click', () => {
      const context = operand.innerText;
      if(currentValue.innerText === 'Error!'){
        currentValue.innerText = context;
        return
      }
      appendNumber(context)
    })
  });

  operatorBtns.forEach(operand => {
    eventHandler(operand, 'click', () => {
      const context = operand.innerText;
      chooseOperation(context);
    })
  });

  eventHandler(clearBtn, 'click', () => {
    currentValue.innerText = '0';
    previousValue.innerText = '0'
  });

  eventHandler(equalBtn, 'click', () => {
    if(currentValue.innerText === '0'){
      currentValue.innerText = 'Error!';
      return;
    }else {
      try {
        const compute = computeOperation();
        const operation = new Function(compute);
        const result = operation();
        previousValue.innerText = '';

        return result;
      } catch (error) {
        log(`There is an output error: ${error}`)
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', initApp);