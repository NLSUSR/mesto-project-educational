"use strict";

import newPopupWithFormsPlace from "../popups/instance-new-popup-with-forms-place.js";
import newAPI from "../api/instance-new-api.js";
import newSection from "../section/instance-new-section.js";
import newCard from "../card/instance-new-card.js";

// обработка добавления карточки
const submitPostCard = (data) => {
  newPopupWithFormsPlace.returnSendStatus();
  newAPI
    .postCard({ name: data.cardTitle, link: data.cardImage })
    .then((card) => {
      newSection.prependItem(newCard(card));
    })
    .then(() => {
      newPopupWithFormsPlace.reset();
      newPopupWithFormsPlace.close();
    })
    .catch((error) => {
      newAPI.responseError(error);
    })
    .finally(() => {
      newPopupWithFormsPlace.showSendStatus();
    });
};

export default submitPostCard;
