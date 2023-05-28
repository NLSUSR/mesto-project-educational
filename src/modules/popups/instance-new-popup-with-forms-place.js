"use strict";

import PopupWithForms from "./extends-popup-with-forms.js";
import constants from "../../utils/constants.js";
import submitPostCard from "../server/submit-post-card.js";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для формы добавления места
const newPopupWithFormsPlace = new PopupWithForms({
  container: constants.classes.popupCard,
  handler: submitPostCard,
  constants: popupConstants,
});

export default newPopupWithFormsPlace;
