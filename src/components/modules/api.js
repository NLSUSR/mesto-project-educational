import { cfg, link } from "./constants.js";

const getResponse = () => {
  return Promise.all([getCards, getData, patchAvatar, patchData, postCard, deleteCard, conditionLike])
};

const checkResponse = (response) => {
  if (response.ok) { return Promise.resolve(response.json()) } else { return Promise.reject("Ошибка: "`${response.status}`) };
};

const responseError = (error) => {
  console.error(error);
  // alert(error);
};

const getData = () => {
  return fetch(`${cfg.url + link.me}`, {
    method: "GET",
    headers: cfg.headers
  })
};

const getCards = () => {
  return fetch(`${cfg.url + link.cards}`, {
    method: "GET", headers: cfg.headers
  })
};

const patchAvatar = (url) => {
  return fetch(`${cfg.url + link.avatar}`, {
    method: "PATCH",
    headers: cfg.headers,
    body: JSON.stringify({ avatar: url })
  })
};

const patchData = (user) => {
  return fetch(`${cfg.url + link.me}`, {
    method: "PATCH",
    headers: cfg.headers,
    body: JSON.stringify({ name: user.name, about: user.about })
  })
};

const postCard = (card) => {
  return fetch(`${cfg.url + link.cards}`, {
    method: "POST",
    headers: cfg.headers,
    body: JSON.stringify({ name: card.name, link: card.link })
  })
};

const deleteCard = (cardId) => {
  return fetch(`${cfg.url + link.cards + cardId}`, {
    method: "DELETE",
    headers: cfg.headers
  })
};

const conditionLike = (cardId, variable) => {
  return fetch(`${cfg.url + link.likes + cardId}`, {
    method: variable,
    headers: cfg.headers
  })
};

export { checkResponse, responseError, getCards, getData, patchAvatar, patchData, postCard, deleteCard, conditionLike, getResponse };