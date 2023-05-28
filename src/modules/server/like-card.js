"use strict";

import newAPI from "../api/instance-new-api.js";

// обработка лайка
const likeCard = (card, id, method) => {
  newAPI
    .likeState({ id, method })
    .then((data) => {
      card.changeLikeState(data.likes);
    })
    .catch((error) => {
      newAPI.responseError(error);
    });
};

export default likeCard;
