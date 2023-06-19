"use strict";

import constants from "../../utils/constants.js";
import newUserInfo from "../info/instance-new-user-info.js";
import newPopupWithFormsProfile from "../popups/instance-new-popup-with-forms-profile.js";
import newFormValidatorProfile from "../validation/instance-new-form-validator-profile.js";

// слушатель открытия модалки редактирования профиля
constants.selectors.profileEditButton.addEventListener("click", () => {
  const user = newUserInfo.getUserInfo();
  constants.selectors.profileEditNameInput.value = user.name;
  constants.selectors.profileEditActivityInput.value = user.about;

  newPopupWithFormsProfile.returnSendStatus();
  newPopupWithFormsProfile.open();
  newFormValidatorProfile.changeButtonState();
});
