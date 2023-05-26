import PopupWithForms from "./popup-with-forms.js";
import constants from "../../utils/constants.js";
import submitPatchAvatar from "../server/submit-patch-avatar.js";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для формы смены аватара
const popupFormAvatar = new PopupWithForms({
  container: constants.classes.popupAvatar,
  handler: submitPatchAvatar,
  constants: popupConstants,
});

export default popupFormAvatar;
