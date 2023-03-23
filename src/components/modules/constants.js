const favicon = document.querySelector("#favicon");
const preloader = document.querySelector('#preloader');
const pageLoaded = "DOMContentLoaded";
const closeButtons = document.querySelectorAll(".popup__close");

const cardTemplate = document.querySelector('#cardTemplate').content;
const elementsContainer = document.querySelector('#elementsContainer');
const elementsItem = cardTemplate.querySelector(".elements__item");

const profileEditButton = document.querySelector("#profileEditButton");
const profileEditContainer = document.querySelector("#profileEditContainer");
const profileEditContainerForm = document.forms.profileEditContainerForm;
const profileEditNameInput = document.querySelector("#profileEditNameInput");
const profileEditActivityInput = document.querySelector("#profileEditActivityInput");
const profileName = document.querySelector("#profileName");
const profileActivity = document.querySelector("#profileActivity");

const profileAvatarWrapper = document.querySelector("#profileAvatarWrapper");
const changeAvatarContainer = document.querySelector("#changeAvatarContainer");
const changeAvatarContainerForm = document.forms.changeAvatarContainerForm;
const changeAvatarInput = document.querySelector("#changeAvatarInput");
const profileAvatarImage = document.querySelector("#profileAvatarImage");

const cardAddButton = document.querySelector("#cardAddButton");
const cardAddContainer = document.querySelector("#cardAddContainer");
const cardAddContainerForm = document.forms.cardAddContainerForm;
const cardAddTitleInput = document.querySelector("#cardAddTitleInput");
const cardAddImageLinkInput = document.querySelector("#cardAddImageLinkInput");

const cardRemoveContainer = document.querySelector("#cardRemoveContainer");
const cardRemoveContainerButton = document.querySelector("#cardRemoveContainerButton");

const imageOpeningContainer = document.querySelector("#imageOpeningContainer");
const imageOpeningWrapper = document.querySelector("#imageOpeningWrapper");
const placeImage = document.querySelector("#placeImage");
const placeName = document.querySelector("#placeName");

const objectValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  inputErrorClass: "popup__form-input_error",
  errorMessageElement: ".popup__error-message-element",
  errorActiveElement: "popup__error-message-element_active",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled"
};

const cohort = "plus-cohort-20"; //plus-cohort-18
const requestUrl = `https://nomoreparties.co/v1/${cohort}`;
const token = "b920c8ce-3925-48c5-9ff8-5e542e04acb8"; // dbbb73d9-482c-4ca9-b5e0-9835c4b5cfcc

const endpoint = {
  me: "/users/me/",
  avatar: "/users/me/avatar/",
  cards: "/cards/",
  likes: "/cards/likes/",
};

const cfg = {
  url: requestUrl,
  headers: {
    authorization: token,
    "content-type": "application/json"
  }
};

const mtd = {
  remove: "DELETE",
  change: "PATCH",
  send: "POST",
  request: "GET",
  add: "PUT"
}

export {
  mtd,
  requestUrl,
  token,
  endpoint,
  cfg,
  favicon,
  elementsContainer,
  elementsItem,
  profileName,
  profileEditNameInput,
  profileActivity,
  profileEditActivityInput,
  profileEditContainer,
  changeAvatarContainer,
  profileAvatarImage,
  changeAvatarInput,
  profileAvatarWrapper,
  changeAvatarContainerForm,
  profileEditButton,
  profileEditContainerForm,
  cardAddButton,
  cardAddTitleInput,
  cardAddImageLinkInput,
  cardAddContainer,
  cardAddContainerForm,
  cardRemoveContainer,
  cardRemoveContainerButton,
  imageOpeningContainer,
  placeImage,
  placeName,
  closeButtons,
  preloader,
  objectValidation,
  imageOpeningWrapper,
  pageLoaded
};
