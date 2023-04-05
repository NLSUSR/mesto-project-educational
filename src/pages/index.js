// строгий режим
'use strict'

// зависимости
const styles = import("../pages/index.css"); // динамические импорты
const images = import("../utils/images.js");

import constants from "../utils/constants.js"; // статические импорты
import pageLoaded from "../utils/utils.js";
import initialCards from "../utils/tests.js";
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

initialCards; // для тестов

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
  render: item => {
    cardsSection.appendItem(create.cardElement(item))
  }
});

const server = {
  // обработка аватара
  submitPatchAvatar: ([link]) => {
    popups.popupFormProfile.showSendStatus(false);
    api.patchAvatar(link).then(url => {
      userInfo.setUserInfo(url)
      popups.popupFormAvatar.close();
    }).catch(error => {
      api.responseError(error)
    }).finally(() => {
      popups.popupFormAvatar.showSendStatus(true);
    });
  },
  // обработка данных профиля
  submitPatchData: ([name, about]) => {
    const user = { name, about };
    popups.popupFormProfile.showSendStatus(false);
    api.patchData(user).then(user => {
      userInfo.setUserInfo(user);
      popups.popupFormProfile.close();
    }).catch(error => {
      api.responseError(error)
    }).finally(() => {
      popups.popupFormProfile.showSendStatus(true);
    });
  },
  // обработка добавления карточки
  submitPostCard: ([name, link]) => {
    const card = { name, link };
    popups.popupFormPlace.showSendStatus(false);
    api.postCard(card).then(card => {
      cardsSection.prependItem(create.cardElement(card));
      popups.popupFormPlace.reset();
      popups.popupFormPlace.close();
    }).catch(error => {
      api.responseError(error)
    }).finally(() => {
      popups.popupFormPlace.showSendStatus(true);
    });
  },
  // обработка удаления карточки
  deleteElement: (card, cardId) => {
    popups.popupFormProfile.showSendStatus(false);
    api.deleteCard(cardId).then(() => {
      card.removeCard();
      popups.popupDelete.close();
    }).catch(error => {
      api.responseError(error)
    }).finally(() => {
      popups.popupDelete.showSendStatus(true);
    });
  },
  // обработка лайка
  likeCard: (card, id, method) => {
    const data = { id, method };
    api.likeState(data).then(data => {
      card.changeLikeState(data.likes);
    }).catch(error => {
      api.responseError(error)
    })
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
    setTimeout(() => {
      pageLoaded()
    }, 1000)
  })
};

// попапы
const popups = {
  // создание экземпляра класса для формы смены аватара
  popupFormAvatar: new PopupWithForms({
    container: constants.selectors.changeAvatarContainer,
    handler: server.submitPatchAvatar
  }),
  // создание экземпляра класса для формы редактирования профиля
  popupFormProfile: new PopupWithForms({
    container: constants.selectors.profileEditContainer,
    handler: server.submitPatchData
  }),
  // создание экземпляра класса для формы добавления места
  popupFormPlace: new PopupWithForms({
    container: constants.selectors.cardAddContainer,
    handler: server.submitPostCard
  }),
  // создание экземпляра класса для удаления карточки
  popupDelete: new PopupWithDeletions({
    container: constants.selectors.cardRemoveContainer,
    button: constants.selectors.cardRemoveContainerButton,
    handler: server.deleteElement
  }),
  // создание экземпляра класса для просмотра карточки
  popupImage: new PopupWithImages({
    container: constants.selectors.imageOpeningContainer,
    name: constants.selectors.placeName,
    image: constants.selectors.placeImage,
    owner: constants.selectors.ownerName
  })
};

// создание экземлпяра карточки
const create = {
  callbacks: {
    deleteCallback: (card, id) => { popups.popupDelete.open(card, id) },
    cardCallback: (name, link, owner) => { popups.popupImage.open(name, link, owner) },
    likeCallback: (card, id, method) => { server.likeCard(card, id, method) }
  },
  template: constants.selectors.cardTemplate,
  cardElement: item => {
    const cardElement = new Card(item, create.callbacks, create.template, userInfo.getUserId());
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

{ // люблю обертки готов все обернуть :D
  {
    validation.avatarFormValidation.enableValidation();
    validation.profileFormValidation.enableValidation();
    validation.cardFormValidation.enableValidation();
  };
  {
    popups.popupFormAvatar.setEventListeners();
    popups.popupFormProfile.setEventListeners();
    popups.popupFormPlace.setEventListeners();
  };
  {
    [submits.avatar, submits.profile, submits.add].forEach(item => {
      submits.submiting(item.button, item.popup, item.validation);
    });
  };
};
