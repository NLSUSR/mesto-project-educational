const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorActiveElement);
};

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorActiveElement);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  };
};

const errorMessages = (inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else { inputElement.setCustomValidity("") };

  return inputElement.validity
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
      errorMessages(inputElement);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(object.fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, object);
    });
  });
};

export { enableValidation }