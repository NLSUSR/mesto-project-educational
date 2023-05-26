import PopupWithForms from "../popups/popup-with-forms.js";
import constants from "../../utils/constants.js";
import submitPatchData from "../server/submit-patch-data";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для формы редактирования профиля
const popupFormProfile = new PopupWithForms({
  container: constants.classes.popupData,
  handler: submitPatchData,
  constants: popupConstants,
});

export default popupFormProfile;
