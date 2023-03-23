const FormValidator = class {
  constructor(object, form) {

    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._inputErrorClass = object.inputErrorClass;
    this._errorMessageElement = object.errorMessageElement;
    this._errorActiveElement = object.errorActiveElement;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;

    this._formElement = form;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  };

  _showInputError(inputElement, errorMessage) {

    const errorElement = this._formElement.querySelector(`#${inputElement.name}`);

    errorElement.classList.add(this._errorActiveElement);
    errorElement.textContent = errorMessage;

    inputElement.classList.add(this._inputErrorClass);

  };

  _hideInputError(inputElement) {

    const errorElement = this._formElement.querySelector(`#${inputElement.name}`);

    errorElement.classList.remove(this._errorActiveElement);
    errorElement.textContent = "";

    inputElement.classList.remove(this._inputErrorClass);

  };

  _checkInputValidity(inputElement) {

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    };

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };

  };

  _hasInvalidInput() {

    return this._inputList.some(inputElement => {

      return !inputElement.validity.valid;

    });

  };

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "");
    }

  };

  _setEventListeners() {

    this._inputList.forEach(inputElement => {

      inputElement.addEventListener('input', () => {

        this._checkInputValidity(inputElement);
        this._toggleButtonState();

      });
    });

  };

  enableValidation() {

    this._setEventListeners();

  };

  changeButtonState() {

    this._inputList.forEach(inputElement => { this._hideInputError(inputElement) });
    this._toggleButtonState();

  };
};

export default FormValidator;
