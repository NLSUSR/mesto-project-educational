import constants from "../../utils/constants.js";
import popupFormPlace from "../popups/popup-form-place.js";
import cardFormValidation from "../validation/card-form-validation.js";

// слушатель кнопки открытия модалки добавления карточки
constants.selectors.cardAddButton.addEventListener("click", () => {
  popupFormPlace.returnSendStatus();
  popupFormPlace.open();
  cardFormValidation.changeButtonState();
});
