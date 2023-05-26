"use strict";

import api from "./api/api.js";

// обработка лайка
const likeCard = (card, id, method) => {
  api
    .likeState({ id, method })
    .then((data) => {
      card.changeLikeState(data.likes);
    })
    .catch((error) => {
      api.responseError(error);
    });
};

export default likeCard;
