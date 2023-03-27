const FormValidator = class {
  constructor(object, form) {

    // this._formSelector = object.formSelector;
    this._$inputSelector = object.inputSelector;
    this._$inputErrorClass = object.inputErrorClass;
    // this._$errorMessageElement = object.errorMessageElement;
    this._$errorActiveElement = object.errorActiveElement;
    this._$submitButtonSelector = object.submitButtonSelector;
    this._$inactiveButtonClass = object.inactiveButtonClass;

    this._$formElement = form;
    this._$inputList = Array.from(this._$formElement.querySelectorAll(this._$inputSelector));
    this._$buttonElement = this._$formElement.querySelector(this._$submitButtonSelector);

  };

  _showInputError(inputElement, errorMessage) {

    const errorElement = this._$formElement.querySelector(`#${inputElement.name}`);

    errorElement.classList.add(this._$errorActiveElement);
    errorElement.textContent = errorMessage;

    inputElement.classList.add(this._$inputErrorClass);

  };

  _hideInputError(inputElement) {

    const errorElement = this._$formElement.querySelector(`#${inputElement.name}`);

    errorElement.classList.remove(this._$errorActiveElement);
    errorElement.textContent = "";

    inputElement.classList.remove(this._$inputErrorClass);

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

    return this._$inputList.some(inputElement => {

      return !inputElement.validity.valid;

    });

  };

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._$buttonElement.classList.add(this._$inactiveButtonClass);
      this._$buttonElement.setAttribute("disabled", "");
    } else {
      this._$buttonElement.classList.remove(this._$inactiveButtonClass);
      this._$buttonElement.removeAttribute("disabled", "");
    }

  };

  _setEventListeners() {

    this._$inputList.forEach(inputElement => {

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

    this._$inputList.forEach(inputElement => { this._hideInputError(inputElement) });
    this._toggleButtonState();

  };
};

export default FormValidator;
