import PopupWithDeletions from "../popups/popup-with-deletions.js";
import constants from "../../utils/constants.js";
import deleteElement from "../server/delete-element.js";
import popupConstants from "./popup-constants.js";

// создание экземпляра класса для удаления карточки
const popupDelete = new PopupWithDeletions({
  container: constants.classes.popupDelete,
  button: constants.selectors.cardRemoveContainerButton,
  handler: deleteElement,
  constants: popupConstants,
});

export default popupDelete;
