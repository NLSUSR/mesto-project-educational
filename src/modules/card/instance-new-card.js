"use strict";

import Card from "./class-card.js";
import callbacks from "./callbacks.js";
import template from "./template.js";
import cardConstants from "./card-constants.js";
import newUserInfo from "../info/instance-new-user-info.js";

const newCard = (item) => {
  const newCard = new Card(
    item,
    callbacks,
    template,
    cardConstants,
    newUserInfo.getUserId()
  );
  return newCard.getCard();
};

export default newCard;
