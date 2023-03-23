import * as styles from "./index.css";
import { images } from "./components/arrays/imagesArray.js";
import { enableValidation } from "./components/modules/validate.js";

import {
  changeAvatar,
  editProfile,
  addLocation
} from "./components/modules/modal.js";

import {
  favicon,
  closeButtons,
  objectValidation,
  profileAvatarWrapper,
  changeAvatarSection,
  editProfileButton,
  editProfileSection,
  changeAvatarSectionForm,
  addCardButton,
  addCardSection,
  addCardSectionForm,
  editProfileSectionForm,
  changeAvatarInput,
  editProfileNameInput,
  editProfileActivityInput,
  addCardTitleInput,
  addCardImageLinkInput,
  pageLoaded
} from "./components/modules/constants.js";

import {
  getCards,
  getData,
  patchAvatar,
  patchData,
  checkResponse,
  responseError,
  postCard,
  getResponse
} from "./components/modules/api.js";

import {
  сlosureHandler,
  pageLoader,
  openPopup,
  setFavicon,
  setProfileData,
  arrayIteration,
  showSendStatus
} from "./components/modules/utils.js";

// импорт каскадной таблицы стилей
styles;

// установка фавикона
setFavicon(favicon, images);

// вызов прелоадера
document.addEventListener(pageLoaded, () => { pageLoader(true) });

// инициализация обработчика закрытия модалок
сlosureHandler(closeButtons);

// вызов функции валидации и передача параметров объектом
enableValidation(objectValidation);

// слушатель открытия модалки редактирования аватара
profileAvatarWrapper.addEventListener("click", (event) => {
  event.preventDefault();
  showSendStatus(true);
  openPopup(changeAvatarSection);
});

// слушатель открытия модалки редактирования профиля
editProfileButton.addEventListener("click", (event) => {
  event.preventDefault();
  showSendStatus(true);

  openPopup(editProfileSection);
});

// слушатель кнопки открытия модалки добавления карточки
addCardButton.addEventListener("click", (event) => {
  event.preventDefault();
  showSendStatus(true);
  openPopup(addCardSection);
});


// слушатель сабмита формы редактирования аватара // avatar https://clck.ru/33DSrZ  dedsec https://clck.ru/33DSq5
changeAvatarSectionForm.addEventListener("submit", () => {
  changeAvatar(changeAvatarInput.value);
  patchAvatar(changeAvatarInput.value)
    .then(response => checkResponse(response))
    .catch(error => { responseError(error) })
    .finally(showSendStatus(false));
});

// слушатель сабмита формы редактирования профиля
editProfileSectionForm.addEventListener("submit", () => {
  editProfile({ name: editProfileNameInput.value, about: editProfileActivityInput.value });
  patchData({ name: editProfileNameInput.value, about: editProfileActivityInput.value })
    .then(response => checkResponse(response))
    .catch(error => { responseError(error) })
    .finally(showSendStatus(false));
});

// слушатель сабмита формы добавления карточки
addCardSectionForm.addEventListener("submit", (event) => {
  addLocation({ name: `${addCardTitleInput.value}`, link: `${addCardImageLinkInput.value}` });
  postCard({ name: `${addCardTitleInput.value}`, link: `${addCardImageLinkInput.value}` })
    .then(response => checkResponse(response))
    .catch(error => { responseError(error) })
    .finally(showSendStatus(false));
  event.target.reset();
});

// получение информации профиля с сервера
getData()
  .then(response => { return checkResponse(response) })
  .then(data => { setProfileData(data) })
  .catch(error => { responseError(error) });
// рендер карточек с сервера
getCards()
  .then(response => { return checkResponse(response) })
  .then(cards => { arrayIteration(cards) })
  .catch(error => { responseError(error) });
// общий промис
getResponse()
  .catch(error => { responseError(error) })
  .finally(setTimeout(() => { pageLoader(false) }, 500));