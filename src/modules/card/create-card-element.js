"use strict";

import Card from "./card.js";
import callbacks from "./callbacks.js";
import template from "./template.js";
import cardConstants from "./card-constants.js";
import userInfo from "../info/user-data.js";

const createCardElement = (item) => {
  const cardElement = new Card(
    item,
    callbacks,
    template,
    cardConstants,
    userInfo.getUserId()
  );
  return cardElement.getCard();
};

export default createCardElement;
