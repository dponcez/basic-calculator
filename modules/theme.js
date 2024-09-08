import { selector } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";

const themeButton = selector('[data-toggle]');
const container = selector('.container');

export const handleDarkMode = () => {  
  eventHandler(themeButton, 'click', () => {
    
    container.classList.toggle('dark');
    themeButton.classList.toggle('active');

    const storage = (key, value) => localStorage.setItem(key, value);
    
    container.classList.contains('dark') ?
      storage('theme', 'true') :
      storage('theme', 'false');
  });

  const darkMode = (key, value) => {
    const localTheme = localStorage.getItem(key);

    if(localTheme === value){
      container.classList.add('dark');
      themeButton.classList.add('active');
    }else{
      container.classList.remove('dark');
      themeButton.classList.remove('active')
    }
  }

  darkMode('theme', 'true')

}