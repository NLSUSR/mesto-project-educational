const FormValidator = class {
  constructor(object, form) {

    // this._formSelector = object.formSelector;
    this._$inputSelector = object.inputSelector;
    this._$inputErrorClass = object.inputErrorClass;
    // this._$errorMessageElement = object.errorMessageElement;
    this._$errorActiveElement = object.errorActiveElement;
    this._$submitButtonSelector = object.submitButtonSelector;
    this._$inactiveButtonClass = object.inactiveButtonClass;

<<<<<<< HEAD
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
=======
    this._$formElement = form;
    this._$inputList = Array.from(this._$formElement.querySelectorAll(this._$inputSelector));
    this._$buttonElement = this._$formElement.querySelector(this._$submitButtonSelector);
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

  };

  _showInputError = (input, errorMessage) => {

<<<<<<< HEAD
    const errorElement = this._form.querySelector(`#${input.name}`);
=======
    const errorElement = this._$formElement.querySelector(`#${inputElement.name}`);
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

    errorElement.classList.add(this._$errorActiveElement);
    errorElement.textContent = errorMessage;

<<<<<<< HEAD
    input.classList.add(this._inputErrorClass);
=======
    inputElement.classList.add(this._$inputErrorClass);
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

  };

  _hideInputError = input => {

<<<<<<< HEAD
    const errorElement = this._form.querySelector(`#${input.name}`);
=======
    const errorElement = this._$formElement.querySelector(`#${inputElement.name}`);
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

    errorElement.classList.remove(this._$errorActiveElement);
    errorElement.textContent = "";

<<<<<<< HEAD
    input.classList.remove(this._inputErrorClass);
=======
    inputElement.classList.remove(this._$inputErrorClass);
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

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

<<<<<<< HEAD
    return inputList.some(input => { return !input.validity.valid });
=======
    return this._$inputList.some(inputElement => {

      return !inputElement.validity.valid;

    });
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

  };

  _toggleButtonState = (inputList, button) => {

<<<<<<< HEAD
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
=======
    if (this._hasInvalidInput()) {
      this._$buttonElement.classList.add(this._$inactiveButtonClass);
      this._$buttonElement.setAttribute("disabled", "");
    } else {
      this._$buttonElement.classList.remove(this._$inactiveButtonClass);
      this._$buttonElement.removeAttribute("disabled", "");
    }
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

  };

  _setEventListeners = () => {

<<<<<<< HEAD
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
=======
    this._$inputList.forEach(inputElement => {
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5

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

<<<<<<< HEAD
=======
  changeButtonState() {

    this._$inputList.forEach(inputElement => { this._hideInputError(inputElement) });
    this._toggleButtonState();

  };
>>>>>>> 24c361315294310997b31c34dea3f5ec99f510b5
};

export default FormValidator;
