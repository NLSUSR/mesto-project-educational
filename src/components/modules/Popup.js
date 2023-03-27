const Popup = class {
  constructor(selector) {

    this._$popup = selector;
    this._$close = this._$popup.querySelector(".popup__close");
    this._$submit = this._$popup.querySelector(".popup__form-submit");

    this._buttonClose = event => { if (event.target.closest(".popup__close")) { this.close() } };
    this._overlayClose = event => { if (event.target === event.currentTarget) { this.close() } };
    this._keyClose = event => { if (event.key === "Escape") { this.close() } };

  };

  // показываем статус отправки
  showSendStatus = boolean => {

    boolean
      ? this._$submit.textContent = this._$submit.dataset.statusDefault
      : this._$submit.textContent = this._$submit.dataset.statusSaving

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
    this._$close.addEventListener("click", this._$closePopupHandler);

    // добавление слушателя закрытия на клик по оверлею
    this._$popup.addEventListener("click", this._$closePopupHandler);

    // добавление слушателя закрытия на Escape
    document.addEventListener("keydown", this._$closePopupHandler);

    // добавление сиэсэс класса открытого попапа
    this._$popup.classList.add("popup_opened");

  };

  // унифицированая функция закрытия попапа
  close() {

    // удаление слушателя закрытия на клик по крестику
    this._$close.removeEventListener("click", this._$closePopupHandler);

    // удаление слушателя закрытия на клик по оверлею
    this._$popup.removeEventListener("click", this._$closePopupHandler);

    // удаление слушателя закрытия на Escape
    document.removeEventListener("keydown", this._$closePopupHandler);

    // удаление сиэсэс класса открытого попапа
    this._$popup.classList.remove("popup_opened");

  };

};

export default Popup;