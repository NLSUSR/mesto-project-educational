// строгий режим
'use strict'

// зависимости
const styles = import("../pages/index.css");
const images = import("../utils/images.js");

import constants from "../utils/constants.js";
import pageLoader from "../utils/utils.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithDeletions from "../components/PopupWithDeletions.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/tests.js"; // для тестов


// импорт каскадной таблицы стилей
styles;

// импорт картинок
images; // зачем они ? хз!

// вызов прелоадера
document.addEventListener(constants.pageLoaded, pageLoader(true));

// создание экземпляра класса для Application Programming Interface
const api = new Api(constants.configuration);

// валидация
const validation = { 

  // создание экземпляра класса для валидации формы смены аватара
  avatarFormValidation: new FormValidator(
    constants.objectValidation,
    constants.selectors.changeAvatarContainerForm
  ),

  // создание экземпляра класса для валидации формы редактирования профиля
  profileFormValidation: new FormValidator(
    constants.objectValidation,
    constants.selectors.profileEditContainerForm
  ),

  // создание экземпляра класса для валидации формы добавления карточки
  cardFormValidation: new FormValidator(
    constants.objectValidation,
    constants.selectors.cardAddContainerForm
  )

};

validation.avatarFormValidation.enableValidation();
validation.profileFormValidation.enableValidation();
validation.cardFormValidation.enableValidation();

// данные пользователя
const userInfo = new UserInfo({
    avatar: constants.selectors.profileAvatarImage,
    name: constants.selectors.profileName,
    about: constants.selectors.profileActivity,
  });

// создание экземпляра класса добавления карточки
const cardsSection = (function () {

  const add = {
    container: constants.selectors.elementsContainer,
    render: item => { cardsSection.appendItem(createCardElement(item)) }
  };
  const cardsSection = new Section(add);

  return cardsSection;

}());

// обработка аватара
const submitPatchAvatar = ([link]) => {

  api.patchAvatar(link).then(url => {

    userInfo.setUserInfo(url)
    popups.popupFormAvatar.close();

  }).catch(error => api.responseError(error)).finally(() => {

    popups.popupFormAvatar.showSendStatus(false);

  });
};

// обработка данных профиля
const submitPatchData = ([name, about]) => {

  const user = { name, about };

  api.patchData(user).then(user => {

    userInfo.setUserInfo(user);
    popups.popupFormProfile.close();

  }).catch(error => api.responseError(error)).finally(() => {

    popups.popupFormProfile.showSendStatus(false);

  });
};

// обработка добавления карточки
const submitPostCard = ([name, link]) => {

  const card = { name, link };

  api.postCard(card).then(card => {

    cardsSection.prependItem(createCardElement(card));
    popups.popupFormPlace.reset();
    popups.popupFormPlace.close();

  }).catch(error => api.responseError(error)).finally(() => {

    popups.popupFormPlace.showSendStatus(false);

  });
};

// обработка удаления карточки
const deleteElement = (card, cardId) => {

  api.deleteCard(cardId).then(() => {

    card.removeCard();
    popups.popupDelete.close();

  }).catch(error => api.responseError(error)).finally(() => {

    popups.popupDelete.showSendStatus(false);

  });

};

// обработка лайка
const likeCard = (card, id, method) => {

  const data = { id, method };

  api.likeState(data).then(data => {

    card.changeLikeState(data.likes);

  }).catch(error => api.responseError(error))

};

// попапы
const popups = (function () {

  // создание экземпляра класса для формы смены аватара
  const avatar = {

    container: constants.selectors.changeAvatarContainer,
    handler: submitPatchAvatar

  };

  const popupFormAvatar = new PopupWithForms(avatar);
  popupFormAvatar.setEventListeners();

  // создание экземпляра класса для формы редактирования профиля
  const profile = {

    container: constants.selectors.profileEditContainer,
    handler: submitPatchData

  };

  const popupFormProfile = new PopupWithForms(profile);
  popupFormProfile.setEventListeners();

  // создание экземпляра класса для формы добавления места
  const place = {

    container: constants.selectors.cardAddContainer,
    handler: submitPostCard

  };

  const popupFormPlace = new PopupWithForms(place);
  popupFormPlace.setEventListeners();

  // создание экземпляра класса для удаления карточки
  const deleting = {

    container: constants.selectors.cardRemoveContainer,
    button: constants.selectors.cardRemoveContainerButton,
    handler: deleteElement

  };

  const popupDelete = new PopupWithDeletions(deleting);

  // создание экземпляра класса для просмотра карточки
  const image = {

    container: constants.selectors.imageOpeningContainer,
    name: constants.selectors.placeName,
    image: constants.selectors.placeImage,
    owner: constants.selectors.ownerName

  };

  const popupImage = new PopupWithImages(image);

  return { popupFormAvatar, popupFormProfile, popupFormPlace, popupDelete, popupImage };

}());

// создание экземлпяра карточки
const createCardElement = (function () {

  const template = constants.selectors.cardTemplate;

  const callbacks = {
    deleteCallback: (card, id) => { popups.popupDelete.open(card, id) },
    cardCallback: (name, link, owner) => { popups.popupImage.open(name, link, owner) },
    likeCallback: (card, id, method) => { likeCard(card, id, method) }
  };

  const createCardElement = item => {

    const cardElement = new Card(item, callbacks, template, userInfo.getUserId());

    return cardElement.getCard();

  };

  return createCardElement;

}());

// получение информации профиля с сервера
api.getDataAndCards().then(([data, cards]) => {

  //передаем данные методу класса информации профиля
  userInfo.setUserInfo(data);

  // функция перебора массива загружаемых с сервера карточек
  cardsSection.renderItems(cards);

}).catch(error => api.responseError(error)).finally(window.onload = () => { setTimeout(() => { pageLoader(false) }, 500) });

// обработка слушателей кнопок
(function () {
  const avatar = {
    button: constants.selectors.profileAvatarWrapper,
    popup: popups.popupFormAvatar,
    validation: validation.avatarFormValidation,
    link: constants.selectors.changeAvatarInput
  };

  const profile = {
    button: constants.selectors.profileEditButton,
    popup: popups.popupFormProfile,
    validation: validation.profileFormValidation,
    data: {
      name: constants.selectors.profileEditNameInput,
      about: constants.selectors.profileEditActivityInput
    }
  };

  const add = {
    button: constants.selectors.cardAddButton,
    popup: popups.popupFormPlace,
    validation: validation.cardFormValidation
  };

  const submiting = (button, popup, validation) => {

    button.addEventListener("click", () => {

      const user = userInfo.getUserInfo();

      avatar.link.value = user.avatar;
      profile.data.name.value = user.name;
      profile.data.about.value = user.about;

      validation.changeButtonState();
      popup.showSendStatus(true);
      popup.open();

    });

  };

  [avatar, profile, add].forEach(item => {

    submiting(item.button, item.popup, item.validation);

  });

}());