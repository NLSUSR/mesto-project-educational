import constants from "../../utils/constants.js";
import userData from "../info/user-data.js";
import popupFormProfile from "../popups/popup-form-profile.js";
import profileFormValidation from "../validation/profile-form-validation.js";

// слушатель открытия модалки редактирования профиля
constants.selectors.profileEditButton.addEventListener("click", () => {
  const user = userData.getUserInfo();
  constants.selectors.profileEditNameInput.value = user.name;
  constants.selectors.profileEditActivityInput.value = user.about;

  popupFormProfile.returnSendStatus();
  popupFormProfile.open();
  profileFormValidation.changeButtonState();
});
