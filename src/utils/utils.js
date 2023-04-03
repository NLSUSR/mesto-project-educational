// зависимости
import constants from "./constants.js";

// прелоадер страницы
const pageLoader = () => {
  constants.selectors.preloader.classList.remove(constants.states.preloaderActive)
};

export default pageLoader;
