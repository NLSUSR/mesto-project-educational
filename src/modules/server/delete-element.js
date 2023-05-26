"use strict";

import popupDelete from "../popups/popup-delete.js";
import api from "../server/api/api.js";

// обработка удаления карточки
const deleteElement = (card, cardId) => {
  popupDelete.showDeleteStatus(false);
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
      popupDelete.close();
    })
    .finally(() => {
      popupDelete.showDeleteStatus(true);
    });
};

export default deleteElement;
