// зависимости
import constants from "./constants.js";

// прелоадер страницы
const pageLoader = (boolean) => {

  boolean
    ? constants.selectors.preloader.classList.add("popup__preloader_active")
    && constants.selectors.preloader.open()
    : constants.selectors.preloader.classList.remove("popup__preloader_active")
    && constants.selectors.preloader.close()
    
};

export default pageLoader;
