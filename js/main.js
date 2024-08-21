class Calculator {
  constructor(first_value, second_value) {
    this.first_value = first_value;
    this.second_value = second_value;
    this.memory = 0;

    this.clearDisplay();
  }

  clearDisplay() {
    this.previousValue = 0;
    this.currentValue = 0;
    this.operand = "";

    this.updateDisplay();
  }

  updateDisplay() {
    this.first_value.innerHTML = this.previousValue + this.operand;
    this.second_value.innerHTML = this.currentValue;
  }

  powerOff(){
    this.previousValue = "";
    this.currentValue = "";
    this.operand = ""

    this.updateDisplay();
  }

  log(value){
    this.console = console.log(value)
  }

  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) return;

    this.currentValue =
      this.currentValue === 0 ? number : this.currentValue.toString() + number;

    this.updateDisplay();
  }

  deleteElement() {
    if (this.currentValue === 0) return;
    this.currentValue = +this.currentValue.toString().slice(0, -1);

    this.updateDisplay();
  }

  operation(operand) {
    if (this.operand) {
      this.calculate();
    }

    this.operand = operand;
    this.previousValue =
      +this.currentValue === 0 ? this.previousValue : this.currentValue;
    this.currentValue = 0;

    this.updateDisplay();
  }

  calculate() {
    const previous = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    
    if (isNaN(previous) || isNaN(current)) return;

    try {
      switch (this.operand) {
        case "+":
          this.previousValue = +this.previousValue + +this.currentValue;
          break;
        case "-":
          this.previousValue = +this.previousValue - +this.currentValue;
          break;
        case "*":
          this.previousValue = +this.previousValue * +this.currentValue;
          break;
        case "/":
          this.previousValue = +this.previousValue / +this.currentValue;
          break;
      }

      this.operand = "";
      this.currentValue = 0;

    } catch (error) {
      this.console(`An error occurred while trying to parse the result: ${error}`);
    }

    this.updateDisplay();
  }

  memoryClear(){
    this.memory = 0;
  }

  addMemory(value){
    const type = (typeof value === 'number') ? 
      this.memory += parseFloat(value) :
      this.console('The value must be a number')

    this.previousValue = +this.memory.toString();

    this.updateDisplay();
    return type
  }

  subMemory(value){
    const type = (typeof value === 'number') ? 
      this.memory -= parseFloat(value) :
      this.console('The value must be a number')
    
    this.previousValue = +this.memory.toString();

    this.updateDisplay();
    return type
  }

  memoryRecall(){
    this.previousValue = +this.memory.toString();
    this.currentValue = +this.memory.toString();

    this.updateDisplay()
  }

  getMemory(){
    return this.memory
  }
}

const initApp = () => {
  // selectors
  const selector = (element) => document.querySelector(element);
  const selectorAll = (element) => document.querySelectorAll(element);
  // event
  const eventHandler = ($, event, callback) => $.addEventListener(event, callback);

  // html references
  const htmlRefs = {
    displayFirstValue: selector('[data-prev-value]'),
    displaySecondValue: selector('[data-current-value]'),
    clearBtn: selector('[data-cleaner]'),
    deleteBtn: selector('[data-delete]'),
    powerBtn: selector('[data-power]'),
    equalBtn: selector('[data-equal]'),
    memoryKeys: selectorAll('[data-memory-key]'),
    numberKeys: selectorAll('[data-number]'),
    operatorKeys: selectorAll('[data-operator]')
  }

  const {
    displayFirstValue,
    displaySecondValue,
    clearBtn,
    deleteBtn,
    powerBtn,
    equalBtn,
    memoryKeys,
    numberKeys,
    operatorKeys
  } = htmlRefs;

  const calculator = new Calculator(displayFirstValue, displaySecondValue);

  calculator.powerOff()
  
  eventHandler(powerBtn, 'click', () => {
    if(powerBtn.classList.contains('power--on')){
      powerBtn.classList.remove('power--on');

      calculator.powerOff();

    }else{
      powerBtn.classList.add('power--on');

      const calculator = new Calculator(displayFirstValue, displaySecondValue);
    
      eventHandler(clearBtn, 'click', () => {
        calculator.clearDisplay();
      })

      eventHandler(deleteBtn, 'click', () => {
        calculator.deleteElement()
      });

      numberKeys.forEach(number => {
        eventHandler(number, 'click', () => {
          const context = number.innerText;
          calculator.appendNumber(context)
        })
      })

      operatorKeys.forEach(operator => {
        eventHandler(operator, 'click', () => {
          const context = operator.innerText;
          calculator.operation(context);
        })
      });

      eventHandler(equalBtn, 'click', () => {
        calculator.calculate()
      });

      const handleMemoryClear = () => {
        calculator.memoryClear()
      }

      const handleAddMemory = (value) => {
        const context = parseFloat(value.innerText);
        calculator.addMemory(context);
        calculator.log(`Memory: ${calculator.getMemory()}`)
      }

      const handleSubMemory = (value) => {
        const context = parseFloat(value.innerText);
        calculator.subMemory(context);
        calculator.log(`Memory: ${calculator.getMemory()}`)
      }

      const handleMemoryRecall = () => {
        calculator.memoryRecall();
        calculator.log(`Memory: ${calculator.getMemory()}`)
      }

      memoryKeys.forEach(key => {
        const prefix = key.dataset.memoryKey;

        switch (prefix) {
          case 'memory-clear':
            eventHandler(key, 'click', handleMemoryClear)
            break;
          case 'add-memory':
            eventHandler(key, 'click', () => handleAddMemory(displayFirstValue))
            break;
          case 'sub-memory':
            eventHandler(key, 'click', () => handleSubMemory(displayFirstValue));
            break;
          case 'recall-memory':
            eventHandler(key, 'click', handleMemoryRecall)
          default:
            break;
        }
      })
    }
  })

}

document.addEventListener('DOMContentLoaded', initApp)