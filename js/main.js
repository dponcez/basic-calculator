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
    numberKeys: selectorAll("[data-number]"),
    operatorKeys: selectorAll("[data-operator]"),
    memoryKeys: selectorAll("[data-memory-key]"),
  };

  const {
    equalBtn,
    previousValue,
    currentValue,
    clearBtn,
    decimal,
    numberKeys,
    operatorKeys,
    memoryKeys
  } = htmlRefs;
  
  let operation;
  let memory = 0;

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

  const handleMemoryClear = () => {
    memory = 0;
    currentValue.innerText = '0';
    previousValue.innerText = '0'
  }

  const handleAddMemory = (value) => {
    memory += parseFloat(value.innerText);
    currentValue.innerText = memory.toString();
    log(currentValue)
  }

  const handleSubMemory = (value) => {
    memory -= parseFloat(value.innerText);
    currentValue.innerText = memory.toString();
  }

  const handleMemoryRecall = () => {
    currentValue.innerText = memory.toString();
    previousValue.innerText = memory.toString()
  }

  const handleClickNumbers = (operand) => {
    const context = operand.innerText;

    if(currentValue.innerText === 'Error!'){
      currentValue.innerText = context;
      return;
    }

    appendNumber(context)
  }

  const handleOperators = (operand) => {
    const context = operand.innerText;
    chooseOperation(context);
  }

  const handleDecimalPoint = () => {
    const context = decimal.innerText;
    appendNumber(context);
  }

  const handleClearDisplay = () => {
    memory = 0;
    currentValue.innerText = '0';
    previousValue.innerText = '0'
  }

  const handleSetEqual = () => {
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
  }

  numberKeys.forEach(operand => {
    eventHandler(operand, 'click', () => handleClickNumbers(operand))
  });

  operatorKeys.forEach(operand => {
    eventHandler(operand, 'click', () => handleOperators(operand))
  });

  memoryKeys.forEach(key => {
    const suffix = key.dataset.memoryKey;

    if(suffix === 'memory-clear'){
      eventHandler(key, 'click', handleMemoryClear);
    } 

    if(suffix === 'add-memory'){ 
      eventHandler(key, 'click', () => handleAddMemory(currentValue));
    }

    if(suffix === 'sub-memory'){
      eventHandler(key, 'click', () => handleSubMemory(currentValue));
    }

    if(suffix === 'recall-memory'){
      eventHandler(key, 'click', handleMemoryRecall);
    } 
  })

  eventHandler(decimal, 'click', handleDecimalPoint)
  eventHandler(clearBtn, 'click', handleClearDisplay);
  eventHandler(equalBtn, 'click', handleSetEqual)
}

document.addEventListener('DOMContentLoaded', initApp);