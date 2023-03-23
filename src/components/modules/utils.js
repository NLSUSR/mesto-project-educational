// зависимости
import { renderCard } from "./card.js";
import { preloader, profileName, profileActivity, profileId, profileAvatarImage } from "./constants.js";

const setFavicon = (favicon, image) => {
  favicon.setAttribute("href", `${image.find(object => object.name === "favicon").image.href}`);
  favicon.setAttribute("type", "image/x-icon");
};

// функция перебора массива загружаемых с сервера карточек
const arrayIteration = (array) => {
  array.reverse();
  array.forEach((element) => {
    renderCard(
      element.name,
      element.link,
      element.likes,
      element._id,
      element.owner.name,
      element.owner._id
    );
  });
};

// функция открытия попапа
const openPopup = (popup) => { popup.classList.add("popup_opened") };

// функция закрытия попапа
const closePopup = (popup) => { popup.classList.remove("popup_opened") };

// установка полученых с сервера данных на страницу
const setProfileData = (data) => {
  profileAvatarImage.src = data.avatar;
  profileName.textContent = data.name;
  profileActivity.textContent = data.about;
  profileName.title = data.name;
  profileActivity.title = data.about;
  profileId.textContent = data._id;
};

// прелоадер страницы
const pageLoader = (boolean) => {
  if (boolean) {
    (preloader.style.visibility = 'visible') && (preloader.style.opacity = '1') && (openPopup(preloader))
  } else {
    (preloader.style.visibility = 'hidden') && (preloader.style.opacity = '0') && (closePopup(preloader))
  }
};

// статус отправки
const showSendStatus = (boolean) => {
  document.querySelectorAll(".popup__form-submit").forEach(
    element => {
      if (boolean) {
        element.textContent = element.dataset.statusDefault;
      } else {
        element.textContent = element.dataset.statusSaving;
      }
    }
  );
};

// универсальный обработчик закрытия модалок
const сlosureHandler = (elements) => {
  elements.forEach((close) => {
    const popup = close.closest('.popup');

    // закрытие на Escape 
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { closePopup(popup) };
    });

    // закрытие на клик по оверлею
    popup.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) { closePopup(popup) };
      event.currentTarget.setAttribute("title", "Закрыть модальное окно на оверлей");
    });

    // закрытие на крестик
    close.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) { closePopup(popup) };
      event.currentTarget.setAttribute("title", "Закрыть модальное окно на крестик");
    });
  });
};



export { openPopup, closePopup, сlosureHandler, arrayIteration, pageLoader, setProfileData, setFavicon, showSendStatus }