const FormValidator = class {
  constructor(object, form) {

    // this._formSelector = object.formSelector;
    this._$inputSelector = object.inputSelector;
    this._$inputErrorClass = object.inputErrorClass;
    // this._$errorMessageElement = object.errorMessageElement;
    this._$errorActiveElement = object.errorActiveElement;
    this._$submitButtonSelector = object.submitButtonSelector;
    this._$inactiveButtonClass = object.inactiveButtonClass;

    this._$form = form;
    this._$input = Array.from(this._$form.querySelectorAll(this._$inputSelector));
    this._$button = this._$form.querySelector(this._$submitButtonSelector);

  };

  _showInputError(input, errorMessage) {

    const errorElement = this._$form.querySelector(`#${input.name}`);

    errorElement.classList.add(this._$errorActiveElement);
    errorElement.textContent = errorMessage;

    input.classList.add(this._$inputErrorClass);

  };

  _hideInputError(input) {

    const errorElement = this._$form.querySelector(`#${input.name}`);

    errorElement.classList.remove(this._$errorActiveElement);
    errorElement.textContent = "";

    input.classList.remove(this._$inputErrorClass);

  };

  _checkInputValidity(input) {

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

  _hasInvalidInput() {

    return this._$input.some(input => {

      return !input.validity.valid;

    });

  };

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._$button.setAttribute("disabled", "");
    } else {
      this._$button.removeAttribute("disabled", "");
    };

    if (this._$button.hasAttribute("disabled")) {
      this._$button.classList.add(this._$inactiveButtonClass);
    } else {
      this._$button.classList.remove(this._$inactiveButtonClass);
    };

  };

  _setEventListeners() {

    this._$input.forEach(input => {

      input.addEventListener('input', () => {

        this._checkInputValidity(input);
        this._toggleButtonState();

      });
    });

  };

  enableValidation() {

    this._setEventListeners();

  };

  changeButtonState() {

    this._$input.forEach(input => { this._hideInputError(input) });
    this._toggleButtonState();

  };

};

export default FormValidator;
