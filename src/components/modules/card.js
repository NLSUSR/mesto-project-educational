// зависимости
import { conditionLike } from "./api.js";
import { removeCard } from "./modal.js";
import { openCard } from "./modal.js";
import { elementsList, elementsItem, profileName, profileId } from "./constants.js";

// функция лайка
const likeCard = (card, likes) => {
  const likeButton = card.querySelector(".element__like");
  const cardId = card.dataset.cardId;
  likeButton.dataset.likeCounter = likes.length;

  let names = likes.map(like => like.name);
  const namesString = names.join(", ");
  (likes.length === 0) ? (likeButton.title = "") : (likeButton.title = `${"Эту карточку лайкнул(и): " + namesString}`);

  if (names.includes(`${profileName.textContent}`)) { likeButton.classList.add("element__like_active") };

  likeButton.addEventListener("mousedown", (event) => {
    event.target.closest(".element__like").classList.toggle("element__like_active");

    const likeCheck = event.target.closest(".element__like").classList.contains("element__like_active");
    let method = null;

    likeCheck ? (method = "PUT") && (likeButton.dataset.likeCounter++) : (method = "DELETE") && (likeButton.dataset.likeCounter--);

    conditionLike(cardId, method)
  });
};

// функция визуализации карточки
const renderCard = (name, link, likes, _id, ownerName, ownerId) => {
  const card = elementsItem.cloneNode(true);
  const title = card.querySelector(".element__place-name");
  const image = card.querySelector(".element__place-image");

  if (likes === undefined) { likes = [] };

  card.dataset.likes = likes.length;
  card.dataset.cardId = _id;
  card.dataset.ownerName = ownerName;
  card.dataset.ownerId = ownerId;
  title.textContent = name;
  title.title = name;
  image.alt = name;
  image.src = link;



  elementsList.prepend(card);

  removeCard(card, ownerId); // вызов функции удаления
  openCard(card, name, link) // вызов функции просмотра
  likeCard(card, likes) // вызов функции лайка
};

export { likeCard, renderCard }