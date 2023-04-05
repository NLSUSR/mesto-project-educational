import constants from "../utils/constants.js";
import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {

  #$popup;
  #$submit
  #submiter;
  #$inputList;

  constructor(object) {

    super(object.container);
    this.#$popup = object.container;
    this.#submiter = object.handler;

    this.#$inputList = this.#$popup.querySelectorAll(constants.classes.formInput);
    this.#$submit = this.#$popup.querySelector(constants.classes.formSubmit);
  };

  // показываем статус отправки
  showSendStatus = boolean => {

    boolean
      ? this.#$submit.textContent = this.#$submit.dataset.statusDefault
      : this.#$submit.textContent = this.#$submit.dataset.statusSaving;

  };

  #getInputValues = () => {

    let data = {};

    Array.from(this.#$inputList).forEach(item => { data[item.name] = item.value });

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
