const Popup = class {
  constructor(selector) {

    this._popup = selector;
    this._close = this._popup.querySelector(".popup__close");
    this._submit = this._popup.querySelector(".popup__form-submit");

    this._buttonClose = event => { if (event.target.closest(".popup__close")) { this.close() } };
    this._overlayClose = event => { if (event.target === event.currentTarget) { this.close() } };
    this._keyClose = event => { if (event.key === "Escape") { this.close() } };

  };

  // показываем статус отправки
  showSendStatus = boolean => {

    boolean
      ? this._submit.textContent = this._submit.dataset.statusDefault
      : this._submit.textContent = this._submit.dataset.statusSaving

  };

  _closePopupHandler = event => {
    event.stopImmediatePropagation();

    this._buttonClose(event);
    this._overlayClose(event);
    this._keyClose(event);

  };

  // унифицированая функция открытия попапа
  open() {

    // добавление слушателя закрытия на клик по крестику
    this._close.addEventListener("click", this._closePopupHandler);

    // добавление слушателя закрытия на клик по оверлею
    this._popup.addEventListener("click", this._closePopupHandler);

    // добавление слушателя закрытия на Escape
    document.addEventListener("keydown", this._closePopupHandler);

    // добавление сиэсэс класса открытого попапа
    this._popup.classList.add("popup_opened");

  };

  // унифицированая функция закрытия попапа
  close() {

    // удаление слушателя закрытия на клик по крестику
    this._close.removeEventListener("click", this._closePopupHandler);

    // удаление слушателя закрытия на клик по оверлею
    this._popup.removeEventListener("click", this._closePopupHandler);

    // удаление слушателя закрытия на Escape
    document.removeEventListener("keydown", this._closePopupHandler);

    // удаление сиэсэс класса открытого попапа
    this._popup.classList.remove("popup_opened");

  };

};

export default Popup;