import FormValidator from "./form-validator.js";
import constants from "../../utils/constants.js";

// создание экземпляра класса для валидации формы смены аватара
const avatarFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.changeAvatarContainerForm
);

export default avatarFormValidation;
