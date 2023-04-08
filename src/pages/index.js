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
  render: item => { cardsSection.appendItem(createCardInstance.cardElement(item)) },
});

const server = {
  // обработка аватара
  submitPatchAvatar: (data) => {
    popups.popupFormAvatar.showSendStatus(false);
    api.patchAvatar(data.userAvatar).then(url => {
      userInfo.setUserInfo(url)
    }).then(() => {
      popups.popupFormAvatar.close();
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormAvatar.showSendStatus(true);
    });
  },
  // обработка данных профиля
  submitPatchData: (data) => {
    popups.popupFormProfile.showSendStatus(false);
    api.patchData({ name: data.userName, about: data.userAbout }).then(user => {
      userInfo.setUserInfo(user);
    }).then(() => {
      popups.popupFormProfile.close()
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormProfile.showSendStatus(true)
    });
  },
  // обработка добавления карточки
  submitPostCard: (data) => {
    popups.popupFormPlace.showSendStatus(false);
    api.postCard({ name: data.cardTitle, link: data.cardImage }).then(card => {
      cardsSection.prependItem(createCardInstance.cardElement(card));
    }).then(() => {
      popups.popupFormPlace.reset();
      popups.popupFormPlace.close();
    }).catch(error => {
      api.responseError(error);
    }).finally(() => {
      popups.popupFormPlace.showSendStatus(true);
    });
  },
  // обработка удаления карточки
  deleteElement: (card, cardId) => {
    popups.popupDelete.showDeleteStatus(false);
    api.deleteCard(cardId).then(() => {
      card.removeCard();
      popups.popupDelete.close();
    }).finally(() => {
      popups.popupDelete.showDeleteStatus(true);
    });
  },
  // обработка лайка
  likeCard: (card, id, method) => {
    api.likeState({ id, method }).then(data => {
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

const variables = {
  $input: constants.classes.formInput,
  $submit: constants.classes.formSubmit,
  $form: constants.classes.form,
  $close: constants.classes.close,
  $opened: constants.states.popupOpened
}

// попапы
const popups = {
  // создание экземпляра класса для формы смены аватара
  popupFormAvatar: new PopupWithForms({
    container: constants.classes.popupAvatar,
    handler: server.submitPatchAvatar,
    constants: variables
  }),
  // создание экземпляра класса для формы редактирования профиля
  popupFormProfile: new PopupWithForms({
    container: constants.classes.popupData,
    handler: server.submitPatchData,
    constants: variables
  }),
  // создание экземпляра класса для формы добавления места
  popupFormPlace: new PopupWithForms({
    container: constants.classes.popupCard,
    handler: server.submitPostCard,
    constants: variables
  }),
  // создание экземпляра класса для удаления карточки
  popupDelete: new PopupWithDeletions({
    container: constants.classes.popupDelete,
    button: constants.selectors.cardRemoveContainerButton,
    handler: server.deleteElement,
    constants: variables
  }),
  // создание экземпляра класса для просмотра карточки
  popupImage: new PopupWithImages({
    container: constants.classes.popupImage,
    name: constants.selectors.placeName,
    image: constants.selectors.placeImage,
    owner: constants.selectors.ownerName,
    constants: variables
  }),
};

// создание экземлпяра карточки
const createCardInstance = {
  callbacks: {
    deleteCallback: (card, id) => { popups.popupDelete.open(card, id) },
    cardCallback: (name, link, owner) => { popups.popupImage.open(name, link, owner) },
    likeCallback: (card, id, method) => { server.likeCard(card, id, method) }
  },
  template: constants.selectors.cardTemplate,
  constants: {
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
  },
  cardElement: item => {
    const cardElement = new Card(item, createCardInstance.callbacks, createCardInstance.template, createCardInstance.constants, userInfo.getUserId());
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
