const Card = class {
  constructor(item, callbacks, object, userId) {

    this._cardLikes = item.likes;
    this._cardId = item._id;
    this._cardName = item.name;
    this._cardLink = item.link;
    this._cardOwner = item.owner._id;
    this._cardCreatedAt = item.createdAt;


    this._myCard = item.owner._id === userId;
    this._noLikes = this._cardLikes === undefined;
    this._myLike = item.likes.some(like => { return like._id === userId });

    this._removeTrash = () => { if (!this._myCard) { this._elementTrash.remove() } };
    this._setLikeBase = () => { if (this._noLikes) { return this._cardLikes = [] } };
    this._nonsense = () => { this._myLike = !this._myLike; };

    this._deleteCallback = callbacks.deleteCallback;
    this._cardCallback = callbacks.cardCallback;
    this._likeCallback = callbacks.likeCallback;

    this._template = object.template;
    this._container = object.container;
    this._userId = userId;

    this._elementsItem = ".elements__item";
    this._element = ".element";
    this._elementPlaceName = ".element__place-name";
    this._elementPlaceImage = ".element__place-image";
    this._elementDelete = ".element__delete";
    this._elementLike = ".element__like";
    this._elementLikeCounter = ".element__like-counter";

    this._likeActive = "element__like_active";

  };

  _getElement = () => {

    const cardTemplate = this._template.content;
    const elementsItem = cardTemplate.querySelector(this._elementsItem);
    const cardNode = elementsItem.cloneNode(true);

    return cardNode;

  };

  _setEventListeners = () => {

    this._elementTrash.addEventListener("click", () => { this._deleteCallback(this, this._cardId) });
    this._elementImage.addEventListener("click", () => { this._cardCallback(this._cardName, this._cardLink) });
    this._elementLike.addEventListener("click", () => { this._checkLike() });

  };

  _setLikeState = () => {

    this._myLike
      ? this._elementLike.classList.add(this._likeActive)
      : this._elementLike.classList.remove(this._likeActive);

    this._elementLikeCounter.textContent = this._cardLikes.length;

  };

  _createCard = () => {

    this._cardNode = this._getElement();
    this._cardContainer = this._cardNode.querySelector(this._element);
    this._elementName = this._cardNode.querySelector(this._elementPlaceName);
    this._elementImage = this._cardNode.querySelector(this._elementPlaceImage);
    this._elementTrash = this._cardNode.querySelector(this._elementDelete);
    this._elementLike = this._cardNode.querySelector(this._elementLike);
    this._elementLikeCounter = this._cardNode.querySelector(this._elementLikeCounter);

    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;

    this._elementName.textContent = this._cardName;
    this._elementName.title = this._cardName;

    this._cardNode.dataset.cardId = this._cardId;
    this._cardNode.dataset.cardOwner = this._cardOwner;

    this._cardContainer.dataset.createdAt = this._cardCreatedAt;

    let names = this._cardLikes.map(like => like.name);
    const namesString = names.join(", ");

    this._cardLikes.length === 0
      ? this._elementLike.title = ""
      : this._elementLike.title = `${"Эту карточку лайкнул(и): " + namesString}`;

    this._removeTrash();
    this._setLikeBase();

    this._setLikeState();
    this._setEventListeners();

    return this._cardNode;

  };

  _checkLike = () => {

    let method = null;

    this._myLike
      ? method = "DELETE"
      : method = "PUT";

    this._likeCallback(this, this._cardId, method);

  };

  changeLikeState = likes => {

    this._cardLikes = likes;
    this._nonsense();
    this._setLikeState();

  };

  removeCard = () => {

    this._cardNode.remove();

  };

  getCard = () => {

    return this._createCard();

  };

};

export default Card;