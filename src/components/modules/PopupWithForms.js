import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {
  constructor(object) {

    super(object.container);
    this._popup = object.container;
    this._submiter = object.handler;
    this._getInputValues = this._getInputValues.bind(this);

    this._inputList = this._popup.querySelectorAll(".popup__form-input");

  };

  showSendStatus(boolean) {

    super.showSendStatus(boolean);

  };

  _getInputValues = () => {

    const data = [];

    Array.from(this._inputList).forEach(item => { data.push(item.value) });

    return data;
  };

  setEventListeners = () => {

    // super.setEventListeners();

    this._popup.addEventListener('submit', event => {

      event.preventDefault();

      this._submiter(this._getInputValues());

    });
  };

  close = () => {

    super.close();

  };

  reset = () => {

    this._popup.querySelector(".popup__form").reset();

  };
}

export default PopupWithForms;
