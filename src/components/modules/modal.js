const closePopupHandler = event => {
  event.stopImmediatePropagation();

  const popup = event.target.closest(".popup");
  const popupOpened = document.querySelector(".popup_opened")

  if (event.target.closest(".popup__close")) { closePopup(popup) };
  if (event.target === event.currentTarget) { closePopup(popup) };
  if (event.key === "Escape") { closePopup(popupOpened) };
};

// унифицированая функция открытия попапа
const openPopup = (popup) => {
  // добавление слушателя закрытия на клик по крестику
  const close = popup.querySelector(".popup__close");
  close.addEventListener("click", closePopupHandler);
  // добавление слушателя закрытия на клик по оверлею
  popup.addEventListener("click", closePopupHandler);
  // добавление слушателя закрытия на Escape
  document.addEventListener("keydown", closePopupHandler);

  popup.classList.add("popup_opened");
};

// унифицированая функция закрытия попапа
const closePopup = (popup) => {
  // удаление слушателя закрытия на клик по крестику
  const close = popup.querySelector(".popup__close");
  close.removeEventListener("click", closePopupHandler);
  // удаление слушателя закрытия на клик по оверлею
  popup.removeEventListener("click", closePopupHandler);
  // удаление слушателя закрытия на Escape
  document.removeEventListener("keydown", closePopupHandler);

  popup.classList.remove("popup_opened");
};

// показываем статус отправки
const showSendStatus = (boolean) => {
  document.querySelectorAll(".popup__form-submit").forEach(
    element => {
      if (boolean) {
        element.textContent = element.dataset.statusDefault;
      } else {
        element.textContent = element.dataset.statusSaving;
      };
    }
  );
};

export { openPopup, closePopup, showSendStatus };
