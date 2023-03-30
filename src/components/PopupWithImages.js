import Popup from './Popup.js';

const PopupWithImages = class extends Popup {
  constructor(object) {

    super(object.container);

    this._placeName = object.name;
    this._placeImage = object.image;
    this._ownerName = object.owner;

  };

  open = (name, link, owner) => {

    this._placeName.textContent = name;
    this._placeImage.alt = name;
    this._placeImage.src = link;
    this._ownerName.textContent = owner;

    super.open();

  };
}

export default PopupWithImages;
