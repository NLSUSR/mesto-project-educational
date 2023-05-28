"use strict";

import FormValidator from "./class-form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы добавления карточки
const newFormValidatorCard = new FormValidator(
  constants.objectValidation,
  constants.selectors.cardAddContainerForm
);

export default newFormValidatorCard;
