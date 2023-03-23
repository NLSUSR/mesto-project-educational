import Popup from './Popup.js';

const PopupWithImages = class extends Popup {
  constructor(object) {

    super(object.container);

    this._placeName = object.name;
    this._placeImage = object.image;

  };

  open = (name, link) => {

    this._placeName.textContent = name;
    this._placeImage.alt = name;
    this._placeImage.src = link;

    super.open();

  };
}

export default PopupWithImages;
