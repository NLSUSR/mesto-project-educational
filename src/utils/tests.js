"use strict";

import API from "../modules/api/class-api.js";
import configuration from "../modules/api/configuration.js";
const api = new API(configuration);

const string = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const size = () => {
  const maxmin = (max, min) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  };
  const sizes = [maxmin(1920, 1080), maxmin(1280, 720)];
  const random = Math.floor(Math.random() * sizes.length);
  return sizes[random];
};

const cards = (length) => {
  return Array.from({ length }, () => {
    return {
      name: `${string(15)}`,
      link: `https://placekitten.com/g/${size()}/${size()}`,
    };
  });
};

const initialCards = cards(30);

let counter = 0;
const count = () => {
  console.clear();
  counter++;
  const includes = [2, 3, 4, 22, 23, 24].includes(counter);
  if (!includes) {
    console.log(`Функция вызвана ${counter} раз`);
  } else {
    console.log(`Функция вызвана ${counter} раза`);
  }

  if (counter === initialCards.length) {
    console.log("Все готово! Обновите страницу.");
  }
};

const tests = {
  test1: document.querySelector(".test1"),
  test2: document.querySelector(".test2"),
  test3: document.querySelector(".test3"),
};

// Тест - прогоняет массив картинок в загрузку
tests.test1.title = "Залить массив тестовых карточек";
tests.test1.addEventListener("click", () => {
  initialCards.forEach((item, index) => {
    setTimeout(() => {
      api.postCard({ name: item.name, link: item.link });
      count();
    }, (index + 1) * 300);
  });
});

// Тест на удаление последствий предыдущего теста
tests.test2.title = "Удалить все свои карточки";
tests.test2.addEventListener("click", () => {
  api.getDataAndCards().then(([data, cards]) => {
    cards.forEach((item, index) => {
      setTimeout(() => {
        item.owner._id === data._id ? api.deleteCard(item._id) : null;
        count();
      }, (index + 1) * 100);
    });
  });
});

// Тест лайков
tests.test3.title = "Протестировать лайки";
tests.test3.addEventListener("click", () => {
  api.getDataAndCards().then(([data, cards]) => {
    cards.forEach((item, index) => {
      setTimeout(() => {
        let method = null;

        item.likes.some((like) => {
          return like._id === data._id;
        })
          ? (method = "DELETE")
          : (method = "PUT");

        api.likeState({ id: item._id, method: method });

        count();
      }, (index + 1) * 100);
    });
  });
});

export default initialCards;
