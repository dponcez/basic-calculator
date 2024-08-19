class Calculator {
  constructor(first_value, second_value){
    this.first_value = first_value;
    this.second_value = second_value;

    this.clearDisplay()
  }

  clearDisplay(){
    this.previousValue = 0;
    this.currentValue = 0;
    this.operand = '';

    this.updateDisplay()
  }

  deleteElement(){
    if(this.currentValue === 0) return;
    this.currentValue = +this.currentValue.toString().slice(0, -1);

    this.updateDisplay()
  }

  appendNumber(number){
    if(number === '.' && this.second_value.textContent.contains('.')) return;

    this.currentValue = this.currentValue === 0 ?
      this.currentValue = number :
      this.currentValue.toString() + number;

    this.updateDisplay();
  }

  operation(operand){
    if(this.operand){
      this.calculate()
    }

    this.operand = operand;
    this.previousValue = +this.currentValue === 0 ?
      this.previousValue : 
      this.currentValue;
    this.currentValue = 0;

    this.updateDisplay();
  }

  calculate(){
    try {
      switch(this.operand){
        case '+':
          this.previousValue = +this.previousValue + +this.currentValue;
          break;
        case '-':
          this.previousValue = +this.previousValue - +this.currentValue
          break;
        case '*':
          this.previousValue = +this.previousValue * +this.currentValue;
          break;
        case '/':
          this.previousValue = +this.previousValue / +this.currentValue;
          break
      }

      this.operand = '';
      this.currentValue = 0;
      
    } catch (error) {
      console.log(error)
    }

    this.updateDisplay()
  }

  updateDisplay(){
    this.first_value.textContent = this.previousValue + this.operand;
    this.second_value.textContent = this.currentValue;
  }
}

const initApp = () => {
  // tesing
  const log = (value) => console.log(value);
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

  
  eventHandler(powerBtn, 'click', () => {
    if(powerBtn.classList.contains('power--on')){
      powerBtn.classList.remove('power--on')
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
          const context = number.textContent;
          calculator.appendNumber(context)
        })
      })

      operatorKeys.forEach(operator => {
        eventHandler(operator, 'click', () => {
          const context = operator.textContent;
          calculator.operation(context);
        })
      });

      eventHandler(equalBtn, 'click', () => {
        calculator.calculate()
      })
    }
  })

}

document.addEventListener('DOMContentLoaded', initApp)