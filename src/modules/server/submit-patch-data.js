"use strict";

import newPopupWithFormsProfile from "../popups/instance-new-popup-with-forms-profile.js";
import newAPI from "../api/instance-new-api.js";
import newUserInfo from "../info/instance-new-user-info.js";

// обработка данных профиля
const submitPatchData = (data) => {
  newPopupWithFormsProfile.returnSendStatus();
  newAPI
    .patchData({ name: data.userName, about: data.userAbout })
    .then((user) => {
      newUserInfo.setUserInfo(user);
    })
    .then(() => {
      newPopupWithFormsProfile.close();
    })
    .catch((error) => {
      newAPI.responseError(error);
    })
    .finally(() => {
      newPopupWithFormsProfile.showSendStatus();
    });
};

export default submitPatchData;
