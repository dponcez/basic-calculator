export class Calculator {
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

  powerOff() {
    this.previousValue = "";
    this.currentValue = "";
    this.operand = "";

    this.updateDisplay();
  }

  log(value) {
    this.console = console.log(value);
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
      this.console(
        `An error occurred while trying to parse the result: ${error}`
      );
    }

    this.updateDisplay();
  }

  memoryClear() {
    this.memory = 0;
  }

  addMemory(value) {
    const type =
      typeof value === "number"
        ? (this.memory += parseFloat(value))
        : this.console("The value must be a number");

    this.previousValue = +this.memory.toString();

    this.updateDisplay();
    return type;
  }

  subMemory(value) {
    const type =
      typeof value === "number"
        ? (this.memory -= parseFloat(value))
        : this.console("The value must be a number");

    this.previousValue = +this.memory.toString();

    this.updateDisplay();
    return type;
  }

  memoryRecall() {
    this.previousValue = +this.memory.toString();
    this.currentValue = +this.memory.toString();

    this.updateDisplay();
  }

  getMemory() {
    return this.memory;
  }
}