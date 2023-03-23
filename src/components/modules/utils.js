// зависимости
import { preloader } from "./constants.js";
import { closePopup, openPopup } from "./modal.js";

// прелоадер страницы
const pageLoader = (boolean) => {
  if (boolean) {
    (preloader.classList.add("popup__preloader_active")) && (openPopup(preloader))
  } else {
    (preloader.classList.remove("popup__preloader_active")) && (closePopup(preloader))
  };
};

export { pageLoader };
