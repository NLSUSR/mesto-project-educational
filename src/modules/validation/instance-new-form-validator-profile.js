"use strict";

import FormValidator from "./class-form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы редактирования профиля
const newFormValidatorProfile = new FormValidator(
  constants.objectValidation,
  constants.selectors.profileEditContainerForm
);

export default newFormValidatorProfile;
