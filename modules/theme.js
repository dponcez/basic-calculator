import { selector } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";

const switchThemeButton = selector('[data-switch]');
const container = selector('.container');

export const handleDarkMode = () => {
  eventHandler(switchThemeButton, 'click', (event) => {
    const suffix = event.target;
    const dark = '../assets/images/small-dark-switch.png';
    const light = '../assets/images/small-light-switch.png';

    if(suffix.classList.contains('dark')){
      suffix.classList.remove('dark');
      container.setAttribute('id', 'dark')
      suffix.src= `${dark}`;
    }else{
      suffix.classList.add('dark');
      container.setAttribute('id', 'light')
      suffix.src= `${light}`;
    }
  })
}