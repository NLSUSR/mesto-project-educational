import Popup from './Popup.js';

const PopupWithImages = class extends Popup {

  #$placeName;
  #$placeImage;
  #$ownerName;

  constructor(object) {

    super(object.container);

    this.#$placeName = object.name;
    this.#$placeImage = object.image;
    this.#$ownerName = object.owner;

  };

  open = (name, link, owner) => {

    this.#$placeName.textContent = name;
    this.#$placeImage.alt = name;
    this.#$placeImage.src = link;
    this.#$ownerName.textContent = owner;

    super.open();

  };
}

export default PopupWithImages;
