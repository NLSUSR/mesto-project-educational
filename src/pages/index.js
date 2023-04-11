// строгий режим
'use strict'

// зависимости
const styles = import("../pages/index.css"); // динамические импорты
const images = import("../utils/images.js");
const initialCards = import("../utils/tests.js");

import constants from "../utils/constants.js"; // статические импорты
import pageLoaded from "../utils/utils.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithDeletions from "../components/PopupWithDeletions.js";

// импорт каскадной таблицы стилей
styles; // тут вопросов нет

// импорт картинок
images; // зачем мы это делали ? хз!

const testCards = initialCards.then(data => { return data.default }); // для тестов

// создание экземпляра класса для Application Programming Interface
const api = new Api(constants.configuration);

// данные пользователя
const userInfo = new UserInfo({
  avatar: constants.selectors.profileAvatarImage,
  name: constants.selectors.profileName,
  about: constants.selectors.profileActivity,
});

// создание экземпляра класса добавления карточки
const cardsSection = new Section({
  container: constants.selectors.elementsContainer,
  render: item => { cardsSection.appendItem(createCardElement(item)) },
});

// валидация
// создание экземпляра класса для валидации формы смены аватара
const avatarFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.changeAvatarContainerForm
);

// создание экземпляра класса для валидации формы редактирования профиля
const profileFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.profileEditContainerForm
);

// создание экземпляра класса для валидации формы добавления карточки
const cardFormValidation = new FormValidator(
  constants.objectValidation,
  constants.selectors.cardAddContainerForm
);

// сервер
// обработка аватара
const submitPatchAvatar = (data) => {
  popupFormAvatar.returnSendStatus();
  api.patchAvatar(data.userAvatar).then(url => {
    userInfo.setUserInfo(url)
  }).then(() => {
    popupFormAvatar.close();
  }).catch(error => {
    api.responseError(error);
  }).finally(() => {
    popupFormAvatar.showSendStatus();
  });
};

// обработка данных профиля
const submitPatchData = (data) => {
  popupFormProfile.returnSendStatus();
  api.patchData({ name: data.userName, about: data.userAbout }).then(user => {
    userInfo.setUserInfo(user);
  }).then(() => {
    popupFormProfile.close()
  }).catch(error => {
    api.responseError(error);
  }).finally(() => {
    popupFormProfile.showSendStatus();
  });
};

// обработка добавления карточки
const submitPostCard = (data) => {
  popupFormPlace.returnSendStatus();
  api.postCard({ name: data.cardTitle, link: data.cardImage }).then(card => {
    cardsSection.prependItem(createCardElement(card));
  }).then(() => {
    popupFormPlace.reset();
    popupFormPlace.close();
  }).catch(error => {
    api.responseError(error);
  }).finally(() => {
    popupFormPlace.showSendStatus();
  });
};

// обработка удаления карточки
const deleteElement = (card, cardId) => {
  popupDelete.showDeleteStatus(false);
  api.deleteCard(cardId).then(() => {
    card.removeCard();
    popupDelete.close();
  }).finally(() => {
    popupDelete.showDeleteStatus(true);
  });
};

// обработка лайка
const likeCard = (card, id, method) => {
  api.likeState({ id, method }).then(data => {
    card.changeLikeState(data.likes);
  }).catch(error => {
    api.responseError(error)
  });
};

// получение информации профиля с сервера
api.getDataAndCards().then(([data, cards]) => {
  //передаем данные методу класса информации профиля
  userInfo.setUserInfo(data);
  // функция перебора массива загружаемых с сервера карточек
  cardsSection.renderItems(cards);
}).catch(error => {
  api.responseError(error)
}).finally(window.onload = () => {
  setTimeout(() => { pageLoaded() }, 1000);
});

// попапы
const popupConstants = {
  $input: constants.classes.formInput,
  $submit: constants.classes.formSubmit,
  $form: constants.classes.form,
  $close: constants.classes.close,
  $opened: constants.states.popupOpened
};

// создание экземпляра класса для формы смены аватара
const popupFormAvatar = new PopupWithForms({
  container: constants.classes.popupAvatar,
  handler: submitPatchAvatar,
  constants: popupConstants
});

// создание экземпляра класса для формы редактирования профиля
const popupFormProfile = new PopupWithForms({
  container: constants.classes.popupData,
  handler: submitPatchData,
  constants: popupConstants
});

// создание экземпляра класса для формы добавления места
const popupFormPlace = new PopupWithForms({
  container: constants.classes.popupCard,
  handler: submitPostCard,
  constants: popupConstants
});

// создание экземпляра класса для удаления карточки
const popupDelete = new PopupWithDeletions({
  container: constants.classes.popupDelete,
  button: constants.selectors.cardRemoveContainerButton,
  handler: deleteElement,
  constants: popupConstants
});

// создание экземпляра класса для просмотра карточки
const popupImage = new PopupWithImages({
  container: constants.classes.popupImage,
  name: constants.selectors.placeName,
  image: constants.selectors.placeImage,
  owner: constants.selectors.ownerName,
  constants: popupConstants
});

// создание экземпляра карточки
const callbacks = {
  deleteCallback: (card, id) => { popupDelete.open(card, id) },
  cardCallback: (name, link, owner) => { popupImage.open(name, link, owner) },
  likeCallback: (card, id, method) => { likeCard(card, id, method) }
};

const template = constants.selectors.cardTemplate;

const cardConstants = {
  $item: constants.classes.item,
  $element: constants.classes.element,
  $placeName: constants.classes.placeName,
  $placeImage: constants.classes.placeImage,
  $delete: constants.classes.delete,
  $like: constants.classes.like,
  $likeActive: constants.states.likeActive,
  $likeCounter: constants.classes.likeCounter,
  remove: constants.configuration.methods.remove,
  add: constants.configuration.methods.add
};

const createCardElement = item => {
  const cardElement = new Card(item, callbacks, template, cardConstants, userInfo.getUserId());
  return cardElement.getCard();
};

// обработка слушателей кнопок
// слушатель открытия модалки редактирования аватара
constants.selectors.profileAvatarWrapper.addEventListener("click", () => {

  const user = userInfo.getUserInfo();
  constants.selectors.changeAvatarInput.value = user.avatar;

  popupFormAvatar.returnSendStatus();
  popupFormAvatar.open();
  avatarFormValidation.changeButtonState();

});

// слушатель открытия модалки редактирования профиля
constants.selectors.profileEditButton.addEventListener("click", () => {

  const user = userInfo.getUserInfo();
  constants.selectors.profileEditNameInput.value = user.name;
  constants.selectors.profileEditActivityInput.value = user.about;

  popupFormProfile.returnSendStatus();
  popupFormProfile.open();
  profileFormValidation.changeButtonState();

});

// слушатель кнопки открытия модалки добавления карточки
constants.selectors.cardAddButton.addEventListener("click", () => {

  popupFormPlace.returnSendStatus();
  popupFormPlace.open();
  cardFormValidation.changeButtonState();

});

[
  avatarFormValidation,
  profileFormValidation,
  cardFormValidation,
].forEach(item => item.enableValidation());

[
  popupFormAvatar,
  popupFormProfile,
  popupFormPlace,
].forEach(item => item.setEventListeners());
