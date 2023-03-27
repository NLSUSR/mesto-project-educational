const FormValidator = class {
  constructor(object, form) {

    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._inputErrorClass = object.inputErrorClass;
    this._errorMessageElement = object.errorMessageElement;
    this._errorActiveElement = object.errorActiveElement;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;

    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);

  };

  _showInputError = (input, errorMessage) => {

    const errorElement = this._form.querySelector(`#${input.name}`);

    errorElement.classList.add(this._errorActiveElement);
    errorElement.textContent = errorMessage;

    input.classList.add(this._inputErrorClass);

  };

  _hideInputError = input => {

    const errorElement = this._form.querySelector(`#${input.name}`);

    errorElement.classList.remove(this._errorActiveElement);
    errorElement.textContent = "";

    input.classList.remove(this._inputErrorClass);

  };

  _checkInputValidity = input => {

    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    };

    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };

  };

  _hasInvalidInput = inputList => {

    return inputList.some(input => { return !input.validity.valid });

  };

  _toggleButtonState = (inputList, button) => {

    if (this._hasInvalidInput(inputList)) {
      button.setAttribute("disabled", "");
    } else {
      button.removeAttribute("disabled", "");
    };

    if (button.hasAttribute("disabled")) {
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.classList.remove(this._inactiveButtonClass);
    };

  };

  _setEventListeners = () => {

    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {

      input.addEventListener('input', () => {

        this._checkInputValidity(input);
        this._toggleButtonState(inputList, button);

      });

    });

  };

  changeButtonState = () => {

    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, button);

  };

  enableValidation = () => {

    this._setEventListeners();

  };

};

export default FormValidator;
