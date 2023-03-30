import Popup from "./Popup.js";

const PopupWithDeletions = class extends Popup {
  constructor(object) {

    super(object.container);
    this._button = object.button;
    this._remover = object.handler;

  };

  showSendStatus(boolean) {

    super.showSendStatus(boolean);

  };

  open = (card, cardId) => {

    super.open();
    this.showSendStatus(true);
    this._card = card;
    this._cardId = cardId;
    this._button.addEventListener('click', this._delete);

  };

  _delete = () => {

    this._remover(this._card, this._cardId);

  };

  close = () => {

    super.close();
    this._button.removeEventListener('click', this._delete);

  };
};

export default PopupWithDeletions;
