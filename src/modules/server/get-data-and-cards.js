"use strict";

import newAPI from "../api/instance-new-api.js";
import newUserInfo from "../info/instance-new-user-info.js";
import newSection from "../section/instance-new-section.js";
import constants from "../../utils/constants.js";

// получение информации профиля с сервера
newAPI
  .getDataAndCards()
  .then(([data, cards]) => {
    //передаем данные методу класса информации профиля
    newUserInfo.setUserInfo(data);
    // функция перебора массива загружаемых с сервера карточек
    newSection.renderItems(cards);
  })
  .catch((error) => {
    newAPI.responseError(error);
  })
  .finally(
    (window.onload = () => {
      setTimeout(() => {
        constants.selectors.preloader.classList.remove(
          constants.states.preloaderActive
        );
      }, 1000);
    })
  );
