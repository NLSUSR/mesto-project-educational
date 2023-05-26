"use strict";

import FormValidator from "./form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы редактирования профиля
const profileFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.profileEditContainerForm
);

export default profileFormValidation;
