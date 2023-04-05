import Popup from "./Popup.js";

const PopupWithDeletions = class extends Popup {

  #button;
  #remover;
  #card;
  #cardId;

  constructor(object) {

    super(object.container);
    this.#button = object.button;
    this.#remover = object.handler;

  };

  #delete = () => {

    this.#remover(this.#card, this.#cardId);

  };

  // показываем статус удаления
  showDeleteStatus = boolean => {

    boolean
      ? this.#button.textContent = this.#button.dataset.statusDefault
      : this.#button.textContent = this.#button.dataset.statusSaving;

  };

  open = (card, cardId) => {

    super.open();
    this.showDeleteStatus(true);
    this.#card = card;
    this.#cardId = cardId;
    this.#button.addEventListener('click', this.#delete);

  };

  close = () => {

    super.close();
    this.#button.removeEventListener('click', this.#delete);

  };
};

export default PopupWithDeletions;