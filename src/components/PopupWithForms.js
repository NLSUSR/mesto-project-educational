import constants from "../utils/constants.js";
import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {
  constructor(object) {

    super(object.container);
    this._$popup = object.container;
    this._submiter = object.handler;

    this._$inputList = this._$popup.querySelectorAll(constants.classes.formInput);

  };

  showSendStatus(boolean) {

    super.showSendStatus(boolean);

  };

  _getInputValues = () => {

    const data = [];

    Array.from(this._$inputList).forEach(item => { data.push(item.value) });

    return data;
  };

  setEventListeners = () => {

    this._$popup.addEventListener('submit', event => {

      event.preventDefault();

      this._submiter(this._getInputValues());

    });

  };

  close = () => {

    super.close();

  };

  reset = () => {

    this._$popup.querySelector(constants.classes.form).reset();

  };
}

export default PopupWithForms;
