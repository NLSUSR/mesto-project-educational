"use strict";

const FormValidator = class {
  #$inputSelector;
  #$inputErrorClass;
  #$errorActiveElement;
  #$submitButtonSelector;
  #$inactiveButtonClass;
  #$form;
  #$input;
  #$button;

  constructor(object, form) {
    this.#$inputSelector = object.inputSelector;
    this.#$inputErrorClass = object.inputErrorClass;
    this.#$errorActiveElement = object.errorActiveElement;
    this.#$submitButtonSelector = object.submitButtonSelector;
    this.#$inactiveButtonClass = object.inactiveButtonClass;

    this.#$form = form;
    this.#$input = Array.from(
      this.#$form.querySelectorAll(this.#$inputSelector)
    );
    this.#$button = this.#$form.querySelector(this.#$submitButtonSelector);
  }

  #showInputError(input, errorMessage) {
    const errorElement = this.#$form.querySelector(`#${input.name}`);

    errorElement.classList.add(this.#$errorActiveElement);
    errorElement.textContent = errorMessage;

    input.classList.add(this.#$inputErrorClass);
  }

  #hideInputError(input) {
    const errorElement = this.#$form.querySelector(`#${input.name}`);

    errorElement.classList.remove(this.#$errorActiveElement);
    errorElement.textContent = "";

    input.classList.remove(this.#$inputErrorClass);
  }

  #checkInputValidity(input) {
    input.validity.patternMismatch
      ? input.setCustomValidity(input.dataset.errorMessage)
      : input.setCustomValidity("");

    !input.validity.valid
      ? this.#showInputError(input, input.validationMessage)
      : this.#hideInputError(input);
  }

  #hasInvalidInput() {
    return this.#$input.some((input) => {
      return !input.validity.valid;
    });
  }

  #toggleButtonState() {
    this.#hasInvalidInput()
      ? (this.#$button.disabled = true)
      : (this.#$button.disabled = false);

    this.#$button.hasAttribute("disabled")
      ? this.#$button.classList.add(this.#$inactiveButtonClass)
      : this.#$button.classList.remove(this.#$inactiveButtonClass);
  }

  #setEventListeners() {
    this.#$input.forEach((input) => {
      input.addEventListener("input", () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.#setEventListeners();
  }

  changeButtonState() {
    this.#$input.forEach((input) => {
      this.#hideInputError(input);
    });
    this.#toggleButtonState();
  }
};

export default FormValidator;
