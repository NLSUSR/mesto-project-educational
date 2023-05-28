"use strict";

import constants from "../../utils/constants.js";
import newPopupWithFormsPlace from "../popups/instance-new-popup-with-forms-place.js";
import newPopupWithFormsCard from "../validation/instance-new-form-validator-card.js";

// слушатель кнопки открытия модалки добавления карточки
constants.selectors.cardAddButton.addEventListener("click", () => {
  newPopupWithFormsPlace.returnSendStatus();
  newPopupWithFormsPlace.open();
  newPopupWithFormsCard.changeButtonState();
});
