import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {

  #$popup;
  #submiter;
  #$container;
  #constants;
  #$inputList;
  #$submit;

  constructor(object) {

    super(object.container, object.constants);

    this.#$container = object.container;
    this.#$popup = document.querySelector(this.#$container);
    this.#submiter = object.handler;
    this.#constants = object.constants;

    this.#$inputList = this.#$popup.querySelectorAll(this.#constants.$input);
    this.#$submit = this.#$popup.querySelector(this.#constants.$submit);

  };

  // показываем статус отправки
  showSendStatus = () => {

    if (this.#$submit.textContent === "Сохранить") { return this.#$submit.textContent = "Сохранение..." };
    if (this.#$submit.textContent === "Создать") { return this.#$submit.textContent = "Создание..." };

  };

  returnSendStatus = () => {

    if (this.#$submit.textContent === "Сохранение...") { return this.#$submit.textContent = "Сохранить" };
    if (this.#$submit.textContent === "Создание...") { return this.#$submit.textContent = "Создать" };

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

  reset = () => {

    this.#$popup.querySelector(this.#constants.$form).reset();

  };

}

export default PopupWithForms;
