"use strict";

import Popup from "./class-popup.js";

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
  }

  // показываем статус отправки
  showSendStatus = () => {
    this.#$submit.textContent === "Сохранить"
      ? (this.#$submit.textContent = "Сохранение...")
      : null;

    this.#$submit.textContent === "Создать"
      ? (this.#$submit.textContent = "Создание...")
      : null;
  };

  returnSendStatus = () => {
    this.#$submit.textContent === "Сохранение..."
      ? (this.#$submit.textContent = "Сохранить")
      : null;

    this.#$submit.textContent === "Создание..."
      ? (this.#$submit.textContent = "Создать")
      : null;
  };

  #getInputValues = () => {
    let data = {};

    Array.from(this.#$inputList).forEach((item) => {
      data[item.name] = item.value;
    });

    return data;
  };

  setEventListeners = () => {
    this.#$popup.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#submiter(this.#getInputValues());
    });
  };

  reset = () => {
    this.#$popup.querySelector(this.#constants.$form).reset();
  };
};

export default PopupWithForms;
