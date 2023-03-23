import { objectValidation } from "./constants";

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.add(objectValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectValidation.errorActiveElement);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.remove(objectValidation.inputErrorClass);
  errorElement.classList.remove(objectValidation.errorActiveElement);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectValidation.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(objectValidation.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");

  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(objectValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectValidation.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(objectValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};


const changeButtonState = (popup) => {
  const inputList = Array.from(popup.querySelectorAll(objectValidation.inputSelector));
  const buttonElement = popup.querySelector(objectValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, changeButtonState }
