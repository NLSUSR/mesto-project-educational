const favicon = document.querySelector("#favicon");
const cardTemplate = document.querySelector('#cardTemplate').content;
const elementsList = document.querySelector('#elementsList');
const elementsItem = cardTemplate.querySelector(".elements__item");
const profileId = document.querySelector("#profileId");
const profileName = document.querySelector("#profileName");
const profileActivity = document.querySelector("#profileActivity");
const editProfileNameInput = document.querySelector("#editProfileNameInput");
const editProfileActivityInput = document.querySelector("#editProfileActivityInput");
const editProfileSection = document.querySelector("#editProfileSection");
const changeAvatarSection = document.querySelector("#changeAvatarSection");
const profileAvatarImage = document.querySelector("#profileAvatarImage");
const changeAvatarInput = document.querySelector("#changeAvatarInput");
const profileAvatarWrapper = document.querySelector("#profileAvatarWrapper");
const changeAvatarSectionForm = document.forms.changeAvatarSectionForm;
const editProfileButton = document.querySelector("#editProfileButton");
const editProfileSectionForm = document.forms.editProfileSectionForm;
const addCardTitleInput = document.querySelector("#addCardTitleInput");
const addCardImageLinkInput = document.querySelector("#addCardImageLinkInput");
const addCardSection = document.querySelector("#addCardSection");
const addCardButton = document.querySelector("#addCardButton");
const addCardSectionForm = document.forms.addCardSectionForm;
const removeCardSection = document.querySelector("#removeCardSection");
const removeCardSectionButton = document.querySelector("#removeCardSectionButton");
const openImageSection = document.querySelector("#openImageSection");
const openedImage = document.querySelector("#openedImage");
const placeName = document.querySelector("#placeName");
const closeButtons = document.querySelectorAll(".popup__close");
const preloader = document.querySelector('#preloader');
const location = document.querySelector("#location")
const author = document.querySelector("#author")
const authorId = document.querySelector("#authorId")
const openImageContainer = document.querySelector("#openImageContainer");
const saveChangeAvatarButton = document.querySelector("#saveChangeAvatarButton");
const saveEditProfileButton = document.querySelector("#saveEditProfileButton");
const saveAddCardButton = document.querySelector("#saveAddCardButton");
const pageLoaded = "DOMContentLoaded";

const objectValidation = {
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__form-fieldset",
  inputSelector: ".popup__form-input",
  inputErrorClass: "popup__form-input_error",
  errorMessageElement: ".popup__error-message-element",
  errorActiveElement: "popup__error-message-element_active",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled"
};

const cohort = "plus-cohort-18";
const requestUrl = `https://nomoreparties.co/v1/${cohort}`;
const token = "dbbb73d9-482c-4ca9-b5e0-9835c4b5cfcc";

const link = {
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

export {
  requestUrl,
  token,
  link,
  cfg,
  favicon,
  elementsList,
  elementsItem,
  profileName,
  editProfileNameInput,
  profileActivity,
  editProfileActivityInput,
  editProfileSection,
  changeAvatarSection,
  profileAvatarImage,
  changeAvatarInput,
  profileAvatarWrapper,
  changeAvatarSectionForm,
  editProfileButton,
  editProfileSectionForm,
  addCardTitleInput,
  addCardImageLinkInput,
  addCardSection,
  addCardButton,
  addCardSectionForm,
  removeCardSection,
  removeCardSectionButton,
  openImageSection,
  openedImage,
  placeName,
  closeButtons,
  preloader,
  objectValidation,
  profileId,
  location,
  author,
  authorId,
  openImageContainer,
  pageLoaded,
  saveChangeAvatarButton,
  saveEditProfileButton,
  saveAddCardButton
};