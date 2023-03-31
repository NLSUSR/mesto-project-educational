import constants from "../utils/constants";

const Card = class {
  constructor(item, callbacks, template, userId) {

    this._cardLikes = item.likes;
    this._cardId = item._id;
    this._cardName = item.name;
    this._cardLink = item.link;
    this._cardOwnerId = item.owner._id;
    this._cardOwnerName = item.owner.name;
    this._cardCreatedAt = item.createdAt;

    this._deleteCallback = callbacks.deleteCallback;
    this._cardCallback = callbacks.cardCallback;
    this._likeCallback = callbacks.likeCallback;

    this._$template = template;
    this._userId = userId;

    this._myCard = item.owner._id === userId;
    this._noLikes = this._cardLikes === undefined;
    this._myLike = item.likes.some(like => { return like._id === userId });

    this._removeTrash = () => { if (!this._myCard) { this._$elementTrash.remove() } };
    this._setLikeBase = () => { if (this._noLikes) { return this._cardLikes = [] } };
    this._nonsense = () => { this._myLike = !this._myLike; };
    
  };

  _getElement = () => {

    const cardTemplate = this._$template.content;
    const elementsItem = cardTemplate.querySelector(constants.classes.item);
    const cardNode = elementsItem.cloneNode(true);

    return cardNode;

  };

  _setEventListeners = () => {

    this._$elementTrash.addEventListener("click", () => { this._deleteCallback(this, this._cardId) });
    this._$elementImage.addEventListener("click", () => { this._cardCallback(this._cardName, this._cardLink, this._cardOwnerName) });
    this._$elementLike.addEventListener("click", () => { this._checkLike() });

  };

  _setLikeState = () => {

    this._myLike
      ? this._$elementLike.classList.add(constants.states.likeActive)
      : this._$elementLike.classList.remove(constants.states.likeActive);

    this._$elementLikeCounter.textContent = this._cardLikes.length;

  };

  _createCard = () => {

    this._$cardNode = this._getElement();
    this._$cardContainer = this._$cardNode.querySelector(constants.classes.element);
    this._$elementName = this._$cardNode.querySelector(constants.classes.placeName);
    this._$elementImage = this._$cardNode.querySelector(constants.classes.placeImage);
    this._$elementTrash = this._$cardNode.querySelector(constants.classes.delete);
    this._$elementLike = this._$cardNode.querySelector(constants.classes.like);
    this._$elementLikeCounter = this._$cardNode.querySelector(constants.classes.likeCounter);

    this._$elementImage.src = this._cardLink;
    this._$elementImage.alt = this._cardName;
    this._$elementImage.setAttribute("loading", "lazy");

    this._$elementName.textContent = this._cardName;
    this._$elementName.title = this._cardName;

    this._$cardNode.dataset.cardId = this._cardId;
    this._$cardNode.dataset.cardOwner = this._cardOwnerId;

    this._$cardContainer.dataset.createdAt = this._cardCreatedAt;

    let names = this._cardLikes.map(like => like.name);
    const namesString = names.join(", ");

    this._cardLikes.length === 0
      ? this._$elementLike.title = ""
      : this._$elementLike.title = `${"Эту карточку лайкнул(и): " + namesString}`;

    this._removeTrash();
    this._setLikeBase();

    this._setLikeState();
    this._setEventListeners();

    return this._$cardNode;

  };

  _checkLike = () => {

    let method = null;

    this._myLike
      ? method = constants.configuration.methods.remove
      : method = constants.configuration.methods.add;

    this._likeCallback(this, this._cardId, method);

  };

  changeLikeState = likes => {

    this._cardLikes = likes;
    this._nonsense();
    this._setLikeState();

  };

  removeCard = () => {

    this._$cardNode.remove();

  };

  getCard = () => {

    return this._createCard();

  };

};

export default Card;