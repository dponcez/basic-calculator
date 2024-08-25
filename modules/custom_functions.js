// selectors
export const selector = (element) => document.querySelector(element);
export const selectorAll = (element) => document.querySelectorAll(element);
// event
export const eventHandler = ($, event, callback) =>
  $.addEventListener(event, callback);
