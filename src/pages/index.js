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

const testCards =  initialCards.then(data => { return data.default }); // для тестов

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

// данные пользователя
const userInfo = new UserInfo({
  avatar: constants.selectors.profileAvatarImage,
  name: constants.selectors.profileName,
  about: constants.selectors.profileActivity,
});

// создание экземпляра класса добавления карточки
const cardsSection = new Section({
  container: constants.selectors.elementsContainer,
  render: item => { cardsSection.appendItem(createOneCard.cardElement(item)) },
});

const server = {
  // обработка аватара
  submitPatchAvatar: (data) => {
    popups.popupFormAvatar.showSendStatus(false);
    api.patchAvatar(data.userAvatar).then(url => {
      userInfo.setUserInfo(url)
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormAvatar.showSendStatus(true);
      popups.popupFormAvatar.close();
    });
  },
  // обработка данных профиля
  submitPatchData: (data) => {
    popups.popupFormProfile.showSendStatus(false);
    api.patchData({ name: data.userName, about: data.userAbout }).then(user => {
      userInfo.setUserInfo(user);
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormProfile.showSendStatus(true)
      popups.popupFormProfile.close()
    });
  },
  // обработка добавления карточки
  submitPostCard: (data) => {
    popups.popupFormPlace.showSendStatus(false);
    api.postCard({ name: data.cardTitle, link: data.cardImage }).then(card => {
      cardsSection.prependItem(createOneCard.cardElement(card));
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormPlace.showSendStatus(true);
        popups.popupFormPlace.reset();
        popups.popupFormPlace.close();
    });
  },
  // обработка удаления карточки
  deleteElement: (card, cardId) => {
    popups.popupDelete.showDeleteStatus(false);
    api.deleteCard(cardId).then(() => {
      card.removeCard();
    }).finally(() => {
      popups.popupDelete.showDeleteStatus(true);
      popups.popupDelete.close()ж
    });
  },
  // обработка лайка
  likeCard: (card, id, method) => {
    const data = { id, method };
    api.likeState(data).then(data => {
      card.changeLikeState(data.likes);
    }).catch(error => {
      api.responseError(error)
    });
  },
  // получение информации профиля с сервера
  getAll: api.getDataAndCards().then(([data, cards]) => {
    //передаем данные методу класса информации профиля
    userInfo.setUserInfo(data);
    // функция перебора массива загружаемых с сервера карточек
    cardsSection.renderItems(cards);
  }).catch(error => {
    api.responseError(error)
  }).finally(window.onload = () => {
    setTimeout(() => { pageLoaded() }, 1000);
  }),
};

// попапы
const popups = {
  // создание экземпляра класса для формы смены аватара
  popupFormAvatar: new PopupWithForms({
    container: constants.classes.popupAvatar,
    handler: server.submitPatchAvatar
  }),
  // создание экземпляра класса для формы редактирования профиля
  popupFormProfile: new PopupWithForms({
    container: constants.classes.popupData,
    handler: server.submitPatchData
  }),
  // создание экземпляра класса для формы добавления места
  popupFormPlace: new PopupWithForms({
    container: constants.classes.popupCard,
    handler: server.submitPostCard
  }),
  // создание экземпляра класса для удаления карточки
  popupDelete: new PopupWithDeletions({
    container: constants.classes.popupDelete,
    button: constants.selectors.cardRemoveContainerButton,
    handler: server.deleteElement
  }),
  // создание экземпляра класса для просмотра карточки
  popupImage: new PopupWithImages({
    container: constants.classes.popupImage,
    name: constants.selectors.placeName,
    image: constants.selectors.placeImage,
    owner: constants.selectors.ownerName
  }),
};

// создание экземлпяра карточки
const createOneCard = {
  callbacks: {
    deleteCallback: (card, id) => { popups.popupDelete.open(card, id) },
    cardCallback: (name, link, owner) => { popups.popupImage.open(name, link, owner) },
    likeCallback: (card, id, method) => { server.likeCard(card, id, method) }
  },
  template: constants.selectors.cardTemplate,
  cardElement: item => {
    const cardElement = new Card(item, createOneCard.callbacks, createOneCard.template, userInfo.getUserId());
    return cardElement.getCard();
  }
};

// обработка слушателей кнопок
const submits = {
  avatar: {
    button: constants.selectors.profileAvatarWrapper,
    popup: popups.popupFormAvatar,
    validation: validation.avatarFormValidation,
    link: constants.selectors.changeAvatarInput
  },
  profile: {
    button: constants.selectors.profileEditButton,
    popup: popups.popupFormProfile,
    validation: validation.profileFormValidation,
    data: {
      name: constants.selectors.profileEditNameInput,
      about: constants.selectors.profileEditActivityInput
    }
  },
  add: {
    button: constants.selectors.cardAddButton,
    popup: popups.popupFormPlace,
    validation: validation.cardFormValidation
  },
  submiting: (button, popup, validation) => {
    button.addEventListener("click", () => {
      const user = userInfo.getUserInfo();
      submits.avatar.link.value = user.avatar;
      submits.profile.data.name.value = user.name;
      submits.profile.data.about.value = user.about;
      validation.changeButtonState();
      popup.showSendStatus(true);
      popup.open();
    });
  }
};

{
  [
    validation.avatarFormValidation,
    validation.profileFormValidation,
    validation.cardFormValidation,
  ].forEach(item => item.enableValidation());
  [
    popups.popupFormAvatar,
    popups.popupFormProfile,
    popups.popupFormPlace,
  ].forEach(item => item.setEventListeners());
  [
    submits.avatar,
    submits.profile,
    submits.add,
  ].forEach(item => { submits.submiting(item.button, item.popup, item.validation) });
};
