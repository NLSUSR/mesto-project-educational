import constants from "../utils/constants.js";

const Popup = class {

  #$popup;
  #$close;
  #buttonClose;
  #overlayClose;
  #keyClose;

  constructor(element) {

    this.#$popup = element;
    this.#$close = this.#$popup.querySelector(constants.classes.close);
    this.#buttonClose = event => { if (event.target.closest(constants.classes.close)) { this.close() } };
    this.#overlayClose = event => { if (event.target === event.currentTarget) { this.close() } };
    this.#keyClose = event => { if (event.key === "Escape") { this.close() } };

  };

  #handleButtonClose = event => { this.#buttonClose(event) };

  #handleOverlayClose = event => { this.#overlayClose(event) };

  #handleEscClose = event => { this.#keyClose(event) };

  // унифицированая функция открытия попапа
  open() {

    // добавление слушателя закрытия на клик по крестику
    this.#$close.addEventListener("click", this.#handleButtonClose);

    // добавление слушателя закрытия на клик по оверлею
    this.#$popup.addEventListener("click", this.#handleOverlayClose);

    // добавление слушателя закрытия на Escape
    document.addEventListener("keydown", this.#handleEscClose);

    // добавление сиэсэс класса открытого попапа
    this.#$popup.classList.add(constants.states.popupOpened);

  };

  // унифицированая функция закрытия попапа
  close() {

    // удаление слушателя закрытия на клик по крестику
    this.#$close.removeEventListener("click", this.#handleButtonClose);

    // удаление слушателя закрытия на клик по оверлею
    this.#$popup.removeEventListener("click", this.#handleOverlayClose);

    // удаление слушателя закрытия на Escape
    document.removeEventListener("keydown", this.#handleEscClose);

    // удаление сиэсэс класса открытого попапа
    this.#$popup.classList.remove(constants.states.popupOpened);

  };

};

export default Popup;