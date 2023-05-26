"use strict";

import PopupWithImages from "../popups/popup-with-images.js";
import constants from "../../utils/constants.js";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для просмотра карточки
const popupImage = new PopupWithImages({
  container: constants.classes.popupImage,
  name: constants.selectors.placeName,
  image: constants.selectors.placeImage,
  owner: constants.selectors.ownerName,
  constants: popupConstants,
});

export default popupImage;
