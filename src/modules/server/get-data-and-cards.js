import api from "../server/api/api.js";
import userData from "../info/user-data.js";
import cardRender from "../card/card-render.js";
import constants from "../../utils/constants.js";

// получение информации профиля с сервера
api
  .getDataAndCards()
  .then(([data, cards]) => {
    //передаем данные методу класса информации профиля
    userData.setUserInfo(data);
    // функция перебора массива загружаемых с сервера карточек
    cardRender.renderItems(cards);
  })
  .catch((error) => {
    api.responseError(error);
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
