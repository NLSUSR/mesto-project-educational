// const cohort = "plus-cohort-18"; // данные прошлой моей когорты
// const token = "dbbb73d9-482c-4ca9-b5e0-9835c4b5cfcc";

const cohort = "plus-cohort-20";
const token = "b920c8ce-3925-48c5-9ff8-5e542e04acb8";

const configuration = {

  resource: `https://nomoreparties.co/v1/${cohort}`,
  endpoints: { main: "/users/me/", avatar: "/users/me/avatar/", cards: "/cards/", likes: "/cards/likes/" },
  methods: { remove: "DELETE", change: "PATCH", send: "POST", request: "GET", add: "PUT" },
  headers: { authorization: token, "content-type": "application/json" }

};

const objectValidation = {

  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  inputErrorClass: "popup__form-input_error",
  errorMessageElement: ".popup__error-message-element",
  errorActiveElement: "popup__error-message-element_active",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled"

};

const pageLoaded = "DOMContentLoaded";

const selectors = {

  profileEditContainerForm: document.forms.profileEditContainerForm,
  changeAvatarContainerForm: document.forms.changeAvatarContainerForm,
  cardAddContainerForm: document.forms.cardAddContainerForm,

  preloader: document.querySelector("#preloader"),

  cardTemplate: document.querySelector("#cardTemplate"),
  elementsContainer: document.querySelector("#elementsContainer"),

  profileEditButton: document.querySelector("#profileEditButton"),
  profileEditNameInput: document.querySelector("#profileEditNameInput"),
  profileEditActivityInput: document.querySelector("#profileEditActivityInput"),

  profileName: document.querySelector("#profileName"),
  profileActivity: document.querySelector("#profileActivity"),

  profileAvatarWrapper: document.querySelector("#profileAvatarWrapper"),
  changeAvatarInput: document.querySelector("#changeAvatarInput"),
  profileAvatarImage: document.querySelector("#profileAvatarImage"),

  cardAddButton: document.querySelector("#cardAddButton"),
  cardAddTitleInput: document.querySelector("#cardAddTitleInput"),
  cardAddImageLinkInput: document.querySelector("#cardAddImageLinkInput"),

  cardRemoveContainer: document.querySelector("#cardRemoveContainer"),
  cardRemoveContainerButton: document.querySelector("#cardRemoveContainerButton"),

  imageOpeningWrapper: document.querySelector("#imageOpeningWrapper"),
  placeImage: document.querySelector("#placeImage"),
  placeName: document.querySelector("#placeName"),
  ownerName: document.querySelector("#ownerName")

};

const classes = {
  formInput: ".popup__form-input",
  form: ".popup__form",
  close: ".popup__close",
  formSubmit: ".popup__form-submit",
  element: ".element",
  item: ".elements__item",
  placeName: ".element__place-name",
  placeImage: ".element__place-image",
  delete: ".element__delete",
  like: ".element__like",
  likeCounter: ".element__like-counter",
  popupAvatar:".popup-avatar",
  popupData:".popup-data",
  popupCard:".popup-card",
  popupDelete:".popup-delete",
  popupImage:".popup-image"
};

const states = {
  preloaderActive: "popup__preloader_active",
  popupOpened: "popup_opened",
  likeActive: "element__like_active",
};

const constants = { configuration, objectValidation, pageLoaded, selectors, classes, states };

export default constants;

