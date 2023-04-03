import constants from "../utils/constants.js";

const Popup = class {

  #$popup;
  #$close;
  #$submit;
  #buttonClose;
  #overlayClose;
  #keyClose;

  constructor(selector) {

    this.#$popup = selector;
    this.#$close = this.#$popup.querySelector(constants.classes.close);
    this.#$submit = this.#$popup.querySelector(constants.classes.formSubmit);

    this.#buttonClose = event => { if (event.target.closest(constants.classes.close)) { this.close() } };
    this.#overlayClose = event => { if (event.target === event.currentTarget) { this.close() } };
    this.#keyClose = event => { if (event.key === "Escape") { this.close() } };

  };

  // показываем статус отправки
  showSendStatus = boolean => {

    boolean
      ? this.#$submit.textContent = this.#$submit.dataset.statusDefault
      : this.#$submit.textContent = this.#$submit.dataset.statusSaving;

  };

  #closePopupHandler = event => {
    event.stopImmediatePropagation();

    this.#buttonClose(event);
    this.#overlayClose(event);
    this.#keyClose(event);

  };

  // унифицированая функция открытия попапа
  open() {

    // добавление слушателя закрытия на клик по крестику
    this.#$close.addEventListener("click", this.#closePopupHandler);

    // добавление слушателя закрытия на клик по оверлею
    this.#$popup.addEventListener("click", this.#closePopupHandler);

    // добавление слушателя закрытия на Escape
    document.addEventListener("keydown", this.#closePopupHandler);

    // добавление сиэсэс класса открытого попапа
    this.#$popup.classList.add(constants.states.popupOpened);

  };

  // унифицированая функция закрытия попапа
  close() {

    // удаление слушателя закрытия на клик по крестику
    this.#$close.removeEventListener("click", this.#closePopupHandler);

    // удаление слушателя закрытия на клик по оверлею
    this.#$popup.removeEventListener("click", this.#closePopupHandler);

    // удаление слушателя закрытия на Escape
    document.removeEventListener("keydown", this.#closePopupHandler);

    // удаление сиэсэс класса открытого попапа
    this.#$popup.classList.remove(constants.states.popupOpened);

  };

};

export default Popup;