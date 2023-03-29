import constants from "../utils/constants.js";
import Api from "./Api";
const api = new Api(constants.cfg);

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

// Тест - прогоняет массив из 30 картинок
// initialCards.forEach((item, index) => {
//   setTimeout(() => {
//     let i; console.log(i);
//     api.postCard({ name: item.name, link: item.link });
//   }, (index + 1) * 1000);
// });

// Тест на удаление последствий предыдущего теста
// api.getDataAndCards().then(([data, cards]) => {
//   cards.forEach((item, index) => {
//     setTimeout(() => {
//       let i;console.log(i);
//       if (item.owner._id === "28497debba4d03be6d0ac41e") { api.deleteCard(item._id);};
//     }, (index + 1) * 100);
//   });
//
// });
