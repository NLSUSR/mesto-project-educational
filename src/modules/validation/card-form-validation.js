"use strict";

import FormValidator from "./form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы добавления карточки
const cardFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.cardAddContainerForm
);

export default cardFormValidation;
