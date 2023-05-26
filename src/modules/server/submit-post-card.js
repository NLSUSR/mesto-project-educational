"use strict";

import popupFormPlace from "../popups/popup-form-place.js";
import api from "./api/api.js";
import cardRender from "../card/card-render.js";
import createCardElement from "../card/create-card-element.js";

// обработка добавления карточки
const submitPostCard = (data) => {
  popupFormPlace.returnSendStatus();
  api
    .postCard({ name: data.cardTitle, link: data.cardImage })
    .then((card) => {
      cardRender.prependItem(createCardElement(card));
    })
    .then(() => {
      popupFormPlace.reset();
      popupFormPlace.close();
    })
    .catch((error) => {
      api.responseError(error);
    })
    .finally(() => {
      popupFormPlace.showSendStatus();
    });
};

export default submitPostCard;
