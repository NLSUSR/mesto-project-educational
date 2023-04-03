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

  showSendStatus(boolean) {

    super.showSendStatus(boolean);

  };

 open = (card, cardId) => {

    super.open();
    this.showSendStatus(true);
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