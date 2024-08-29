import { initApp } from "../modules/index.js";
import { handleDarkMode } from "../modules/theme.js";

handleDarkMode();
document.addEventListener("DOMContentLoaded", initApp)