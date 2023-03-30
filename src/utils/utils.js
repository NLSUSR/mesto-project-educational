// зависимости
import constants from "./constants.js";

// прелоадер страницы
const pageLoader = (boolean) => {

  boolean
    ? constants.selectors.preloader.classList.add(constants.states.preloaderActive)
    && constants.selectors.preloader.open()
    : constants.selectors.preloader.classList.remove(constants.states.preloaderActive)
    && constants.selectors.preloader.close()

};

export default pageLoader;
