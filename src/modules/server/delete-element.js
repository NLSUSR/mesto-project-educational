"use strict";

import newPopupWithDeletions from "../popups/instance-new-popup-with-deletions.js";
import newAPI from "../api/instance-new-api.js";

// обработка удаления карточки
const deleteElement = (card, cardId) => {
  newPopupWithDeletions.showDeleteStatus(false);
  newAPI
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
      newPopupWithDeletions.close();
    })
    .finally(() => {
      newPopupWithDeletions.showDeleteStatus(true);
    });
};

export default deleteElement;
