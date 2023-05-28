"use strict";

import constants from "../../utils/constants.js";
import newUserInfo from "../info/instance-new-user-info.js";
import newPopupWithFormsAvatar from "../popups/instance-new-popup-with-forms-avatar.js";
import newFormValidatorAvatar from "../validation/instance-new-form-validator-avatar.js";

// слушатель открытия модалки редактирования аватара
constants.selectors.profileAvatarWrapper.addEventListener("click", () => {
  const user = newUserInfo.getUserInfo();
  constants.selectors.changeAvatarInput.value = user.avatar;

  newPopupWithFormsAvatar.returnSendStatus();
  newPopupWithFormsAvatar.open();
  newFormValidatorAvatar.changeButtonState();
});
