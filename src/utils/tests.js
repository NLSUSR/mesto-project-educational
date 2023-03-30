import constants from "./constants.js";
import Api from "./Api.js";
const api = new Api(constants.configuration);

export const initialCards = [
  {
    name: 'Картинка 1',
    link: 'https://picsum.photos/1920/1081'
  },
  {
    name: 'Картинка 2',
    link: 'https://picsum.photos/1920/1082'
  },
  {
    name: 'Картинка 3',
    link: 'https://picsum.photos/1920/1083'
  },
  {
    name: 'Картинка 4',
    link: 'https://picsum.photos/1920/1084'
  },
  {
    name: 'Картинка 5',
    link: 'https://picsum.photos/1920/1085'
  },
  {
    name: 'Картинка 6',
    link: 'https://picsum.photos/1920/1086'
  },
  {
    name: 'Картинка 7',
    link: 'https://picsum.photos/1920/1087'
  },
  {
    name: 'Картинка 8',
    link: 'https://picsum.photos/1920/1088'
  },
  {
    name: 'Картинка 9',
    link: 'https://picsum.photos/1920/1089'
  },
  {
    name: 'Картинка 10',
    link: 'https://picsum.photos/1920/1090'
  },
  {
    name: 'Картинка 11',
    link: 'https://picsum.photos/1921/1080'
  },
  {
    name: 'Картинка 12',
    link: 'https://picsum.photos/1922/1080'
  },
  {
    name: 'Картинка 13',
    link: 'https://picsum.photos/1923/1080'
  },
  {
    name: 'Картинка 14',
    link: 'https://picsum.photos/1924/1080'
  },
  {
    name: 'Картинка 15',
    link: 'https://picsum.photos/1925/1080'
  },
  {
    name: 'Картинка 16',
    link: 'https://picsum.photos/1926/1080'
  },
  {
    name: 'Картинка 17',
    link: 'https://picsum.photos/1927/1080'
  },
  {
    name: 'Картинка 18',
    link: 'https://picsum.photos/1928/1080'
  },
  {
    name: 'Картинка 19',
    link: 'https://picsum.photos/1929/1080'
  },
  {
    name: 'Картинка 20',
    link: 'https://picsum.photos/1930/1080'
  },
  {
    name: 'Картинка 21',
    link: 'https://picsum.photos/1921/1081'
  },
  {
    name: 'Картинка 22',
    link: 'https://picsum.photos/1922/1082'
  },
  {
    name: 'Картинка 23',
    link: 'https://picsum.photos/1923/1083'
  },
  {
    name: 'Картинка 24',
    link: 'https://picsum.photos/1924/1084'
  },
  {
    name: 'Картинка 25',
    link: 'https://picsum.photos/1925/1085'
  },
  {
    name: 'Картинка 26',
    link: 'https://picsum.photos/1926/1086'
  },
  {
    name: 'Картинка 27',
    link: 'https://picsum.photos/1927/1087'
  },
  {
    name: 'Картинка 28',
    link: 'https://picsum.photos/1928/1088'
  },
  {
    name: 'Картинка 29',
    link: 'https://picsum.photos/1929/1089'
  },
  {
    name: 'Картинка 30',
    link: 'https://picsum.photos/1930/1090'
  }
].reverse();

let counter = 0;
const count = () => {
  console.clear()
  counter++;
  const includes = [2, 3, 4, 22, 23, 24].includes(counter)
  if (!includes) {
    console.log(`Функция вызвана ${counter} раз`)
  } else {
    console.log(`Функция вызвана ${counter} раза`)
  };

  if (counter === 30) { console.log("Все готово! Обновите страницу.") };
};

// Тест - прогоняет массив из 30 картинок
document.querySelector(".test1").addEventListener("click", () => {
  initialCards.forEach((item, index) => {
    setTimeout(() => {
      api.postCard({ name: item.name, link: item.link });
      count();
    }, (index + 1) * 1000);
  });
});

// Тест на удаление последствий предыдущего теста
document.querySelector(".test2").addEventListener("click", () => {
  api.getDataAndCards().then(([data, cards]) => {
    cards.forEach((item, index) => {
      setTimeout(() => {
        if (item.owner._id === data._id) { api.deleteCard(item._id) };
        count();
      }, (index + 1) * 100);
    });
  });
});
