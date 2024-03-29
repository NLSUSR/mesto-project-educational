"use strict";

const Popup = class {
  #$popup;
  #$close;
  #constants;

  constructor($selector, constants) {
    this.#constants = constants;
    this.#$popup = document.querySelector($selector);
    this.#$close = this.#$popup.querySelector(this.#constants.$close);
  }

  #buttonClose = (event) => {
    event.target.closest(this.#constants.$close) ? this.close() : null;
  };

  #overlayClose = (event) => {
    event.target === event.currentTarget ? this.close() : null;
  };

  #keyClose = (event) => {
    event.key === "Escape" ? this.close() : null;
  };

  // слушатели
  #handleButtonClose = (event) => {
    this.#buttonClose(event);
  };

  #handleOverlayClose = (event) => {
    this.#overlayClose(event);
  };

  #handleEscClose = (event) => {
    this.#keyClose(event);
  };

  // унифицированая функция открытия попапа
  open() {
    // добавление слушателя закрытия на клик по крестику
    this.#$close.addEventListener("click", this.#handleButtonClose);

    // добавление слушателя закрытия на клик по оверлею
    this.#$popup.addEventListener("click", this.#handleOverlayClose);

    // добавление слушателя закрытия на Escape
    document.addEventListener("keydown", this.#handleEscClose);

    // добавление сиэсэс класса открытого попапа
    this.#$popup.classList.add(this.#constants.$opened);
  }

  // унифицированая функция закрытия попапа
  close() {
    // удаление слушателя закрытия на клик по крестику
    this.#$close.removeEventListener("click", this.#handleButtonClose);

    // удаление слушателя закрытия на клик по оверлею
    this.#$popup.removeEventListener("click", this.#handleOverlayClose);

    // удаление слушателя закрытия на Escape
    document.removeEventListener("keydown", this.#handleEscClose);

    // удаление сиэсэс класса открытого попапа
    this.#$popup.classList.remove(this.#constants.$opened);
  }
};

export default Popup;
