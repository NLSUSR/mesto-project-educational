"use strict";

import Section from "./class-section.js";
import constants from "../../utils/constants.js";
import newCard from "../card/instance-new-card.js";

// создание экземпляра класса добавления карточки
const newSection = new Section({
  container: constants.selectors.elementsContainer,
  render: (item) => {
    newSection.appendItem(newCard(item));
  },
});

export default newSection;
