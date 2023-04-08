import Popup from "./Popup.js";

const PopupWithForms = class extends Popup {

  #$popup;
  #submiter;
  #$container;
  #constants;
  #$submit
  #$inputList;

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
  showSendStatus = boolean => {

    if (boolean) {
      if (this.#$container === ".popup-card") { this.#$submit.textContent = "Создать" } else { this.#$submit.textContent = "Сохранить" };
    } else {
      if (this.#$container === ".popup-card") { this.#$submit.textContent = "Создание..." } else { this.#$submit.textContent = "Сохрание..." };
    }


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
