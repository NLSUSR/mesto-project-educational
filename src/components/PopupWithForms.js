import constants from "../utils/constants.js";
import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {

  #$popup;
  #submiter;
  #$inputList;

  constructor(object) {

    super(object.container);
    this.#$popup = object.container;
    this.#submiter = object.handler;

    this.#$inputList = this.#$popup.querySelectorAll(constants.classes.formInput);

  };

  showSendStatus(boolean) {

    super.showSendStatus(boolean);

  };

  #getInputValues = () => {

    let data = [];
    Array.from(this.#$inputList).forEach(item => { data.push(item.value) });
    return data;
    
  };

  setEventListeners = () => {

    this.#$popup.addEventListener('submit', event => {

      event.preventDefault();

      this.#submiter(this.#getInputValues());

    });

  };

  close = () => {

    super.close();

  };

  reset = () => {

    this.#$popup.querySelector(constants.classes.form).reset();

  };
}

export default PopupWithForms;
