// зависимости
import { cfg, mtd, endpoint } from "./constants.js";

// проверяем ответ сервера
const checkResponse = (response) => {
  if (response.ok) { return Promise.resolve(response.json()) } // ответ гуд подгружаем джейсон
  else { return Promise.reject("Ошибка: "`${response.status}`) }; // ответ не гуд отклоняем промис выдаем код ошибки
};

// обрабатываем ошибку
const responseError = error => {
  console.error(error);
};

// получаем данные и карточки с сервера
const getDataAndCards = () => {
  return Promise.all([
    fetch(`${cfg.url + endpoint.me}`, { method: mtd.request, headers: cfg.headers }),
    fetch(`${cfg.url + endpoint.cards}`, { method: mtd.request, headers: cfg.headers })
  ]).then(array => Promise.all(array.map(response => checkResponse(response))));
};

const sendRequest = async (endpoint, method, data) => {
  const response = await fetch(`${cfg.url + endpoint}`, {
    method: method,
    headers: cfg.headers,
    body: JSON.stringify(data)
  });
  return await checkResponse(response);
}

// замена аватара
const patchAvatar = url => {
  return sendRequest(endpoint.avatar, mtd.change, { avatar: url });
};

// заменяем данные имя/деятельность
const patchData = user => {
  return sendRequest(endpoint.me, mtd.change, { name: user.name, about: user.about });
};

// выкладываем на сервер новую карточку
const postCard = card => {
  return sendRequest(endpoint.cards, mtd.send, { name: card.name, link: card.link });
};

// удаляем карточку
const deleteCard = cardId => {
  return sendRequest(`${endpoint.cards + cardId}`, mtd.remove);
};

// меняем состояние лайка
const likeState = data => {
  return sendRequest(`${endpoint.likes + data.cardId}`, data.method);
};

export { checkResponse, responseError, getDataAndCards, patchAvatar, patchData, postCard, deleteCard, likeState };
