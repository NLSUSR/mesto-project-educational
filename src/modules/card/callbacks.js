"use strict";

import newPopupWithDeletions from "../popups/instance-new-popup-with-deletions.js";
import newPopupWithImages from "../popups/instance-new-popup-with-images.js";
import likeCard from "../server/like-card.js";

const callbacks = {
  deleteCallback: (card, id) => {
    newPopupWithDeletions.open(card, id);
  },
  cardCallback: (name, link, owner) => {
    newPopupWithImages.open(name, link, owner);
  },
  likeCallback: (card, id, method) => {
    likeCard(card, id, method);
  },
};

export default callbacks;
