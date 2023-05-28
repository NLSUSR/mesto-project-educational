"use strict";

import newAPI from "../api/instance-new-api.js";
import newUserInfo from "../info/instance-new-user-info.js";
import newPopupFithFormsAvatar from "../popups/instance-new-popup-with-forms-avatar.js";

// обработка аватара
const submitPatchAvatar = (data) => {
  newPopupFithFormsAvatar.returnSendStatus();

  newAPI
    .patchAvatar(data.userAvatar)
    .then((url) => {
      newUserInfo.setUserInfo(url);
    })
    .then(() => {
      newPopupFithFormsAvatar.close();
    })
    .catch((error) => {
      newAPI.responseError(error);
    })
    .finally(() => {
      newPopupFithFormsAvatar.showSendStatus();
    });
};

export default submitPatchAvatar;
