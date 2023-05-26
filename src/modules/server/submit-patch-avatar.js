"use strict";

import api from "../server/api/api.js";
import userData from "../info/user-data.js";
import popupFormAvatar from "../popups/popup-form-avatar.js";

// обработка аватара
const submitPatchAvatar = (data) => {
  popupFormAvatar.returnSendStatus();

  api
    .patchAvatar(data.userAvatar)
    .then((url) => {
      userData.setUserInfo(url);
    })
    .then(() => {
      popupFormAvatar.close();
    })
    .catch((error) => {
      api.responseError(error);
    })
    .finally(() => {
      popupFormAvatar.showSendStatus();
    });
};

export default submitPatchAvatar;
