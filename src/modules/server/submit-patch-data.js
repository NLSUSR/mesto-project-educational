import popupFormProfile from "../popups/popup-form-profile.js";
import api from "./api/api.js";
import userData from "../info/user-data.js";

// обработка данных профиля
const submitPatchData = (data) => {
  popupFormProfile.returnSendStatus();
  api
    .patchData({ name: data.userName, about: data.userAbout })
    .then((user) => {
      userData.setUserInfo(user);
    })
    .then(() => {
      popupFormProfile.close();
    })
    .catch((error) => {
      api.responseError(error);
    })
    .finally(() => {
      popupFormProfile.showSendStatus();
    });
};

export default submitPatchData;
