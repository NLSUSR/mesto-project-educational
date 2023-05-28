"use strict";

import PopupWithForms from "./extends-popup-with-forms.js";
import constants from "../../utils/constants.js";
import submitPatchData from "../server/submit-patch-data.js";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для формы редактирования профиля
const newPopupWithFormsProfile = new PopupWithForms({
  container: constants.classes.popupData,
  handler: submitPatchData,
  constants: popupConstants,
});

export default newPopupWithFormsProfile;
