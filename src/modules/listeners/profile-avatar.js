"use strict";

import constants from "../../utils/constants.js";
import userData from "../info/user-data.js";
import popupFormAvatar from "../popups/popup-form-avatar.js";
import avatarFormValidation from "../validation/avatar-form-validation.js";

// слушатель открытия модалки редактирования аватара
constants.selectors.profileAvatarWrapper.addEventListener("click", () => {
  const user = userData.getUserInfo();
  constants.selectors.changeAvatarInput.value = user.avatar;

  popupFormAvatar.returnSendStatus();
  popupFormAvatar.open();
  avatarFormValidation.changeButtonState();
});
