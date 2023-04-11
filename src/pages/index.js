// УЧЕЛ ЗАМЕЧАНИЯ РЕВЬЮЕРА, СДЕЛАЛ КОД БОЛЕЕ ЧИТАЕМЫМ !!!
'use strict'
const styles = import("../pages/index.css");
const images = import("../utils/images.js");
const initialCards = import("../utils/tests.js");
import constants from "../utils/constants.js";
import pageLoaded from "../utils/utils.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithDeletions from "../components/PopupWithDeletions.js";
styles; images;
const testCards = initialCards.then(data => { return data.default });
const api = new Api(constants.configuration);
const userInfo = new UserInfo({ avatar: constants.selectors.profileAvatarImage, name: constants.selectors.profileName, about: constants.selectors.profileActivity });
const createCardElement = (item) => { const cardElement = new Card(item, callbacks, template, cardConstants, userInfo.getUserId()); return cardElement.getCard(); };
const cardsSection = new Section({ container: constants.selectors.elementsContainer, render: item => { cardsSection.appendItem(createCardElement(item)) } });
const avatarFormValidation = new FormValidator(constants.objectValidation, constants.selectors.changeAvatarContainerForm);
const profileFormValidation = new FormValidator(constants.objectValidation, constants.selectors.profileEditContainerForm);
const cardFormValidation = new FormValidator(constants.objectValidation, constants.selectors.cardAddContainerForm);
const submitPatchAvatar = (data) => { popupFormAvatar.showSendStatus(false); api.patchAvatar(data.userAvatar).then(url => { userInfo.setUserInfo(url) }).then(() => { popupFormAvatar.close(); }).catch(error => { api.responseError(error); }).finally(() => { popupFormAvatar.showSendStatus(true); }); }
const submitPatchData = (data) => { popupFormProfile.showSendStatus(false); api.patchData({ name: data.userName, about: data.userAbout }).then(user => { userInfo.setUserInfo(user); }).then(() => { popupFormProfile.close() }).catch(error => { api.responseError(error); }).finally(() => { popupFormProfile.showSendStatus(true) }); }
const submitPostCard = (data) => { popupFormPlace.showSendStatus(false); api.postCard({ name: data.cardTitle, link: data.cardImage }).then(card => { cardsSection.prependItem(createCardElement(card)); }).then(() => { popupFormPlace.reset(); popupFormPlace.close(); }).catch(error => { api.responseError(error); }).finally(() => { popupFormPlace.showSendStatus(true); }); }
const deleteElement = (card, cardId) => { popupDelete.showDeleteStatus(false); api.deleteCard(cardId).then(() => { card.removeCard(); popupDelete.close(); }).finally(() => { popupDelete.showDeleteStatus(true); }); }
const likeCard = (card, id, method) => { api.likeState({ id, method }).then(data => { card.changeLikeState(data.likes); }).catch(error => { api.responseError(error) }); };
api.getDataAndCards().then(([data, cards]) => { userInfo.setUserInfo(data); cardsSection.renderItems(cards); }).catch(error => { api.responseError(error) }).finally(window.onload = () => { setTimeout(() => { pageLoaded() }, 1000); });
const popupConstants = { $input: constants.classes.formInput, $submit: constants.classes.formSubmit, $form: constants.classes.form, $close: constants.classes.close, $opened: constants.states.popupOpened };
const popupFormAvatar = new PopupWithForms({ container: constants.classes.popupAvatar, handler: submitPatchAvatar, constants: popupConstants });
const popupFormProfile = new PopupWithForms({ container: constants.classes.popupData, handler: submitPatchData, constants: popupConstants });
const popupFormPlace = new PopupWithForms({ container: constants.classes.popupCard, handler: submitPostCard, constants: popupConstants });
const popupDelete = new PopupWithDeletions({ container: constants.classes.popupDelete, button: constants.selectors.cardRemoveContainerButton, handler: deleteElement, constants: popupConstants });
const popupImage = new PopupWithImages({ container: constants.classes.popupImage, name: constants.selectors.placeName, image: constants.selectors.placeImage, owner: constants.selectors.ownerName, constants: popupConstants });
const callbacks = { deleteCallback: (card, id) => { popupDelete.open(card, id) }, cardCallback: (name, link, owner) => { popupImage.open(name, link, owner) }, likeCallback: (card, id, method) => { likeCard(card, id, method) } };
const template = constants.selectors.cardTemplate;
const cardConstants = { $item: constants.classes.item, $element: constants.classes.element, $placeName: constants.classes.placeName, $placeImage: constants.classes.placeImage, $delete: constants.classes.delete, $like: constants.classes.like, $likeActive: constants.states.likeActive, $likeCounter: constants.classes.likeCounter, remove: constants.configuration.methods.remove, add: constants.configuration.methods.add };
[avatarFormValidation, profileFormValidation, cardFormValidation].forEach(item => item.enableValidation());
[popupFormAvatar, popupFormProfile, popupFormPlace].forEach(item => item.setEventListeners());
constants.selectors.profileAvatarWrapper.addEventListener("click", () => { const user = userInfo.getUserInfo(); constants.selectors.changeAvatarInput.value = user.avatar; popupFormAvatar.showSendStatus(true); avatarFormValidation.changeButtonState(); popupFormAvatar.open(); });
constants.selectors.profileEditButton.addEventListener("click", () => { const user = userInfo.getUserInfo(); constants.selectors.profileEditNameInput.value = user.name; constants.selectors.profileEditActivityInput.value = user.about; popupFormProfile.showSendStatus(true); profileFormValidation.changeButtonState(); popupFormProfile.open(); });
constants.selectors.cardAddButton.addEventListener("click", () => { popupFormPlace.showSendStatus(true); cardFormValidation.changeButtonState(); popupFormPlace.open(); });