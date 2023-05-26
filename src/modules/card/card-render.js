"use strict";

import Section from "./section.js";
import constants from "../../utils/constants.js";
import createCardElement from "./create-card-element.js";

// создание экземпляра класса добавления карточки
const cardRender = new Section({
  container: constants.selectors.elementsContainer,
  render: (item) => {
    cardRender.appendItem(createCardElement(item));
  },
});

export default cardRender;
