// зависимости
import constants from "./constants.js";

// прелоадер страницы
const pageLoaded = () => {
  constants.selectors.preloader.classList.remove(constants.states.preloaderActive)
};

export default pageLoaded;
