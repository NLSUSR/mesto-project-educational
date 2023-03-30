const cohort = "plus-cohort-20"; // plus-cohort-18
const token = "b920c8ce-3925-48c5-9ff8-5e542e04acb8"; // dbbb73d9-482c-4ca9-b5e0-9835c4b5cfcc

const cfg = {

  url: `https://nomoreparties.co/v1/${cohort}`,
  ept: { me: "/users/me/", avatar: "/users/me/avatar/", cards: "/cards/", likes: "/cards/likes/" },
  mtd: { remove: "DELETE", change: "PATCH", send: "POST", request: "GET", add: "PUT" },
  hdr: { authorization: token, "content-type": "application/json" }

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
  closeButtons: document.querySelectorAll(".popup__close"),

  cardTemplate: document.querySelector("#cardTemplate"),
  elementsContainer: document.querySelector("#elementsContainer"),

  profileEditButton: document.querySelector("#profileEditButton"),
  profileEditContainer: document.querySelector("#profileEditContainer"),
  profileEditNameInput: document.querySelector("#profileEditNameInput"),
  profileEditActivityInput: document.querySelector("#profileEditActivityInput"),

  profileName: document.querySelector("#profileName"),
  profileActivity: document.querySelector("#profileActivity"),

  profileAvatarWrapper: document.querySelector("#profileAvatarWrapper"),
  changeAvatarContainer: document.querySelector("#changeAvatarContainer"),
  changeAvatarInput: document.querySelector("#changeAvatarInput"),
  profileAvatarImage: document.querySelector("#profileAvatarImage"),

  cardAddButton: document.querySelector("#cardAddButton"),
  cardAddContainer: document.querySelector("#cardAddContainer"),
  cardAddTitleInput: document.querySelector("#cardAddTitleInput"),
  cardAddImageLinkInput: document.querySelector("#cardAddImageLinkInput"),

  cardRemoveContainer: document.querySelector("#cardRemoveContainer"),
  cardRemoveContainerButton: document.querySelector("#cardRemoveContainerButton"),

  imageOpeningContainer: document.querySelector("#imageOpeningContainer"),
  imageOpeningWrapper: document.querySelector("#imageOpeningWrapper"),

  placeImage: document.querySelector("#placeImage"),
  placeName: document.querySelector("#placeName"),
  ownerName: document.querySelector("#ownerName")

};

const constants = { cfg, objectValidation, pageLoaded, selectors };

export default constants;

