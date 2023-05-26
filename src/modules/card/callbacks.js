"use strict";

import popupDelete from "../popups/popup-delete.js";
import popupImage from "../popups/popup-image.js";
import likeCard from "../server/like-card.js";

const callbacks = {
  deleteCallback: (card, id) => {
    popupDelete.open(card, id);
  },
  cardCallback: (name, link, owner) => {
    popupImage.open(name, link, owner);
  },
  likeCallback: (card, id, method) => {
    likeCard(card, id, method);
  },
};

export default callbacks;
