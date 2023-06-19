"use strict";

import FormValidator from "./class-form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы смены аватара
const newFormValidatorAvatar = new FormValidator(
  constants.objectValidation,
  constants.selectors.changeAvatarContainerForm
);

export default newFormValidatorAvatar;
