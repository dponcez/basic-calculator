import { Calculator } from "./calculator.js";
import { selector } from "./custom_functions.js";
import { selectorAll } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { debounce } from "./debounce.js";

export const initApp = () => {
  // html references
  const htmlRefs = {
    displayFirstValue: selector("[data-prev-value]"),
    displaySecondValue: selector("[data-current-value]"),
    clearBtn: selector("[data-cleaner]"),
    deleteBtn: selector("[data-delete]"),
    powerBtn: selector("[data-power]"),
    equalBtn: selector("[data-equal]"),
    memoryKeys: selectorAll("[data-memory-key]"),
    numberKeys: selectorAll("[data-number]"),
    operatorKeys: selectorAll("[data-operator]"),
  };

  const {
    displayFirstValue,
    displaySecondValue,
    clearBtn,
    deleteBtn,
    powerBtn,
    equalBtn,
    memoryKeys,
    numberKeys,
    operatorKeys,
  } = htmlRefs;

  const calculator = new Calculator(displayFirstValue, displaySecondValue);

  calculator.powerOff();

  eventHandler(powerBtn, "click", () => {
    if (powerBtn.classList.contains("power--on")) {
      powerBtn.classList.remove("power--on");

      calculator.powerOff();
    } else {
      powerBtn.classList.add("power--on");

      const calculator = new Calculator(displayFirstValue, displaySecondValue);

      eventHandler(clearBtn, "click", debounce(() => {
        calculator.clearDisplay();
      }), 300, false);

      eventHandler(deleteBtn, "click", debounce(() => {
        calculator.deleteElement();
      }), 100, false);

      numberKeys.forEach((number) => {
        eventHandler(number, "click", () => {
          const context = number.innerText;
          calculator.appendNumber(context);
        });
      });

      operatorKeys.forEach((operator) => {
        eventHandler(operator, "click", () => {
          const context = operator.innerText;
          calculator.operation(context);
        });
      });

      eventHandler(equalBtn, "click", debounce(() => {
        calculator.calculate();
      }), 500, false);

      const handleMemoryClear = () => {
        calculator.memoryClear();
      };

      const handleAddMemory = (value) => {
        const context = parseFloat(value.innerText);
        calculator.addMemory(context);
        calculator.log(`Memory: ${calculator.getMemory()}`);
      };

      const handleSubMemory = (value) => {
        const context = parseFloat(value.innerText);
        calculator.subMemory(context);
        calculator.log(`Memory: ${calculator.getMemory()}`);
      };

      const handleMemoryRecall = () => {
        calculator.memoryRecall();
        calculator.log(`Memory: ${calculator.getMemory()}`);
      };

      memoryKeys.forEach((key) => {
        const prefix = key.dataset.memoryKey;

        switch (prefix) {
          case "memory-clear":
            eventHandler(key, "click", handleMemoryClear);
            break;
          case "add-memory":
            eventHandler(key, "click", () =>
              handleAddMemory(displayFirstValue)
            );
            break;
          case "sub-memory":
            eventHandler(key, "click", () =>
              handleSubMemory(displayFirstValue)
            );
            break;
          case "recall-memory":
            eventHandler(key, "click", handleMemoryRecall);
          default:
            break;
        }
      });
    }
  });
};