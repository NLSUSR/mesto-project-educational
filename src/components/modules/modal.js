// зависимости
import { closePopup, openPopup, showSendStatus } from "./utils.js";
import { renderCard } from "./card.js";

import {
  deleteCard
} from "./api.js";

import {
  profileName,
  profileActivity,
  editProfileSection,
  changeAvatarSection,
  profileAvatarImage,
  addCardSection,
  removeCardSection,
  openImageSection,
  openedImage,
  openImageContainer,
  location,
  author,
  authorId,
  removeCardSectionButton,
  addCardTitleInput,
  addCardImageLinkInput,
  changeAvatarInput,
  editProfileNameInput,
  editProfileActivityInput,
  profileId
} from "./constants.js";

// смена фотографии профиля
const changeAvatar = (url) => {
  profileAvatarImage.src = url;
  changeAvatarInput.setAttribute("value", `${url}`);
  closePopup(changeAvatarSection);
};

// редактирование профиля
const editProfile = (user) => {
  profileName.textContent = user.name;
  profileActivity.textContent = user.about;

  editProfileNameInput.setAttribute("value", `${user.name}`);
  editProfileActivityInput.setAttribute("value", `${user.about}`);

  profileName.setAttribute("title", `${user.name}`);
  profileActivity.setAttribute("title", `${user.about}`);

  closePopup(editProfileSection);
};

// добавление карточки
const addLocation = () => {
  renderCard(addCardTitleInput.value, addCardImageLinkInput.value);
  closePopup(addCardSection);
};

// удаление карточки
const removeCard = (card, ownerId) => {
  const trash = card.querySelector(".element__delete");
  if (card.dataset.ownerId !== profileId.textContent) { trash.remove() };

  trash.addEventListener("click", (event) => {
    event.preventDefault();
    showSendStatus(true);
    openPopup(removeCardSection);
    deletionConfirmation(card);
  });
};

// подтверждение удаления карточки
const deletionConfirmation = (card) => {
  const cardId = card.dataset.cardId;
  removeCardSectionButton.addEventListener("click", (event) => {
    event.preventDefault();
    closePopup(removeCardSection);
    card.remove();
    deleteCard(cardId).finally(showSendStatus(false));
  });
};

// просмотр карточки
const openCard = (card, text, link) => {
  const image = card.querySelector(".element__place-image");
  image.addEventListener("click", (event) => {
    const ownerName = event.target.closest(".elements__item").dataset.ownerName;
    const ownerId = event.target.closest(".elements__item").dataset.ownerId;
    openImageContainer.style = "background-color: transparent;";
    openedImage.src = link;
    openedImage.alt = `${" Название: " + text + " Автор: " + ownerName + " ID Автора: " + ownerId}`;
    location.textContent = `${"Название: " + text}`
    author.textContent = `${"Автор: " + ownerName}`;
    authorId.textContent = `${"ID Автора: " + ownerId}`;
    openPopup(openImageSection);
  });
};

export { changeAvatar, editProfile, addLocation, removeCard, openCard };