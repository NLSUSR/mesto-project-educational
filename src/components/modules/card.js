// зависимости
import {
  elementsContainer,
  elementsItem,
  cardRemoveContainer,
  mtd,
} from "./constants.js";

import { openPopup, showSendStatus } from "./modal.js";

// удаление карточки
let cardToBeRemoving = null;
const openPopupDelete = event => {
  const card = event.target.closest(".elements__item");
  showSendStatus(true);
  openPopup(cardRemoveContainer);

  return cardToBeRemoving = card;
};

// проверка лайка на активность
let likeMethod = null;
const checkLike = card => {
  if (card.querySelector(".element__like").classList.contains("element__like_active")) {
    likeMethod = mtd.remove;
  } else {
    likeMethod = mtd.add;
  };

  return likeMethod
};
// удаление карточки из объектной модели документа
const removeCard = cardNode => cardNode.remove();

const changeLikeState = (card, likes) => {
  const likeButton = card.querySelector(".element__like");
  likeButton.querySelector(".element__like-counter").textContent = likes;
  likeButton.classList.toggle("element__like_active");
};

const createCard = (card, id, likeCard, viewCard) => {
  const userId = id;
  const cardLikes = card.likes;
  const cardId = card._id;
  const cardName = card.name;
  const cardLink = card.link;
  const cardOwnerId = card.owner._id;
  const cardCreatedAt = card.createdAt; // если это есть значит надо использовать

  const cardNode = elementsItem.cloneNode(true);
  const cardContainer = cardNode.querySelector(".element");
  const cardTitle = cardNode.querySelector(".element__place-name");
  const elementImage = cardNode.querySelector(".element__place-image");
  const elementLike = cardNode.querySelector(".element__like");
  const elementLikeCounter = cardNode.querySelector(".element__like-counter");
  const elementTrash = cardNode.querySelector(".element__delete");

  if (cardLikes === undefined) {  cardLikes = [] };
  if (cardOwnerId !== userId) { elementTrash.remove() };
  if (cardLikes.some(like => { like._id === userId })) { elementLike.classList.add("element__like_active") };

  cardTitle.textContent = cardName;
  cardTitle.title = cardName;

  elementImage.alt = cardName;
  elementImage.src = cardLink;

  cardNode.dataset.cardId = cardId;
  cardContainer.dataset.createdAt = cardCreatedAt;
  elementLikeCounter.textContent = cardLikes.length;

  elementTrash.addEventListener("click", openPopupDelete);
  elementImage.addEventListener("click", () => { viewCard(card, userId) });
  elementLike.addEventListener("click", () => { likeCard(cardNode) });

  let names = cardLikes.map(like => like.name);
  const namesString = names.join(", ");
  (cardLikes.length === 0)
    ? (elementLike.title = "")
    : (elementLike.title = `${"Эту карточку лайкнул(и): " + namesString}`);

  return cardNode;
};

// функция визуализации карточки
const renderCard = (card, id, likeCard, viewCard) => { elementsContainer.prepend(createCard(card, id, likeCard, viewCard)) };

export { createCard, renderCard, removeCard, checkLike, changeLikeState, cardToBeRemoving, likeMethod };
