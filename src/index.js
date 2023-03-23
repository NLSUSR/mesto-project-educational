// зависимости
import * as styles from "./index.css";

import {
  pageLoader
} from "./components/modules/utils.js";

import {
  enableValidation,
  changeButtonState
} from "./components/modules/validate.js";

import {
  closePopup,
  openPopup,
  showSendStatus
} from "./components/modules/modal.js";

import {
  removeCard,
  renderCard,
  changeLikeState,
  cardToBeRemoving,
  checkLike,
  likeMethod,
} from "./components/modules/card.js";

import {
  responseError,
  likeState,
  deleteCard,
  getDataAndCards,
  patchAvatar,
  postCard,
  patchData,
} from "./components/modules/api.js";

import {
  profileAvatarWrapper,
  changeAvatarContainer,
  profileEditButton,
  profileEditContainer,
  changeAvatarContainerForm,
  cardAddButton,
  cardAddContainer,
  cardAddContainerForm,
  profileEditContainerForm,
  changeAvatarInput,
  profileEditNameInput,
  profileEditActivityInput,
  cardAddTitleInput,
  cardAddImageLinkInput,
  pageLoaded,
  profileAvatarImage,
  profileName,
  profileActivity,
  cardRemoveContainerButton,
  cardRemoveContainer,
  placeImage,
  placeName,
  imageOpeningContainer
} from "./components/modules/constants.js";

// импорт каскадной таблицы стилей
styles;

// вызов прелоадера
document.addEventListener(pageLoaded, pageLoader(true));

// вызов функции валидации
enableValidation();

// просмотр карточки
const viewCard = card => {
  imageOpeningContainer.classList.add("image-viewer")

  placeName.textContent = card.name;
  placeImage.src = card.link;
  placeImage.alt = card.name;

  openPopup(imageOpeningContainer);
};

// обработка лайка
const likeCard = card => {
  checkLike(card);
  const cardId = card.dataset.cardId;
  const method = likeMethod;
  const data = { cardId, method };
  likeState(data).then(data => {
    changeLikeState(card, data.likes.length)
  }).catch(error => responseError(error))
};

// обработка аватара
const submitPatchAvatar = event => {
  event.preventDefault();

  showSendStatus(true);

  const url = `${changeAvatarInput.value}`;

  patchAvatar(url).then(data => {
    profileAvatarImage.src = data.avatar;
    closePopup(changeAvatarContainer);
  }).catch(error => responseError(error)).finally(() => {
    showSendStatus(false)
  });
};

// обработка данных профиля
const submitPatchData = event => {
  event.preventDefault();

  showSendStatus(true);

  const data = { name: `${profileEditNameInput.value}`, about: `${profileEditActivityInput.value}` };

  patchData(data).then(data => {
    profileName.textContent = data.name;
    profileActivity.textContent = data.about;
    closePopup(profileEditContainer);
  }).catch(error => responseError(error)).finally(() => {
    showSendStatus(false)
  });
};

// обработка добавления карточки
const submitPostCard = event => {
  event.preventDefault();

  showSendStatus(true);

  const card = { name: `${cardAddTitleInput.value}`, link: `${cardAddImageLinkInput.value}` }

  postCard(card).then(card => {
    renderCard(card, userId, likeCard, viewCard)
    closePopup(cardAddContainer);
    cardAddContainerForm.reset();
  }).catch(error => responseError(error)).finally(() => {
    showSendStatus(false)
  });
};

// обработка удаления карточки
cardRemoveContainerButton.addEventListener("click", () => {
  const card = cardToBeRemoving;

  deleteCard(card.dataset.cardId).then(() => {
    removeCard(card);
    closePopup(cardRemoveContainer);
  }).catch(error => responseError(error)).finally(() => {
    showSendStatus(false)
  });
});

// получение информации профиля с сервера
let userId = null;
getDataAndCards().then(([data, cards]) => {
  profileAvatarImage.src = data.avatar;
  changeAvatarInput.value = data.avatar;

  profileName.textContent = data.name;
  profileEditNameInput.value = data.name;

  profileActivity.textContent = data.about;
  profileEditActivityInput.value = data.about;

  userId = data._id;

  // переварачиваем массив задом на перед
  cards.reverse();

  // функция перебора массива загружаемых с сервера карточек
  cards.forEach(card => { renderCard(card, userId, likeCard, viewCard) });// рендер карточек с сервера

}).catch(error => responseError(error)).finally(setTimeout(() => { pageLoader(false) }, 500));

// слушатель открытия модалки редактирования аватара
profileAvatarWrapper.addEventListener("click", () => {
  showSendStatus(true);
  openPopup(changeAvatarContainer);
  changeButtonState(changeAvatarContainer);
});

// слушатель открытия модалки редактирования профиля
profileEditButton.addEventListener("click", () => {
  showSendStatus(true);
  openPopup(profileEditContainer);
  changeButtonState(profileEditContainer);
});

// слушатель кнопки открытия модалки добавления карточки
cardAddButton.addEventListener("click", () => {
  showSendStatus(true);
  openPopup(cardAddContainer);
  changeButtonState(cardAddContainer);
});

// слушатель сабмита формы редактирования аватара
changeAvatarContainerForm.addEventListener("submit", submitPatchAvatar);

// слушатель сабмита формы редактирования профиля
profileEditContainerForm.addEventListener("submit", submitPatchData);

// слушатель сабмита формы добавления карточки
cardAddContainerForm.addEventListener("submit", submitPostCard);
