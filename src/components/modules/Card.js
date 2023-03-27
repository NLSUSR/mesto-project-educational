const Card = class {
  constructor(item, callbacks, template, userId) {

    this._cardLikes = item.likes;
    this._cardId = item._id;
    this._cardName = item.name;
    this._cardLink = item.link;
    this._cardOwner = item.owner._id;
    this._cardCreatedAt = item.createdAt;


    this._myCard = item.owner._id === userId;
    this._noLikes = this._cardLikes === undefined;
    this._myLike = item.likes.some(like => { return like._id === userId });

    this._removeTrash = () => { if (!this._myCard) { this._$elementTrash.remove() } };
    this._setLikeBase = () => { if (this._noLikes) { return this._cardLikes = [] } };
    this._nonsense = () => { this._myLike = !this._myLike; };

    this._deleteCallback = callbacks.deleteCallback;
    this._cardCallback = callbacks.cardCallback;
    this._likeCallback = callbacks.likeCallback;

    this._$template = template;
    this._userId = userId;

    this._$elementsItem = ".elements__item";
    this._$element = ".element";
    this._$elementPlaceName = ".element__place-name";
    this._$elementPlaceImage = ".element__place-image";
    this._$elementDelete = ".element__delete";
    this._$elementLike = ".element__like";
    this._$elementLikeCounter = ".element__like-counter";

    this._likeActive = "element__like_active";

  };

  _getElement = () => {

    const cardTemplate = this._$template.content;
    const elementsItem = cardTemplate.querySelector(this._$elementsItem);
    const cardNode = elementsItem.cloneNode(true);

    return cardNode;

  };

  _setEventListeners = () => {

    this._$elementTrash.addEventListener("click", () => { this._deleteCallback(this, this._cardId) });
    this._$elementImage.addEventListener("click", () => { this._cardCallback(this._cardName, this._cardLink) });
    this._$elementLike.addEventListener("click", () => { this._checkLike() });

  };

  _setLikeState = () => {

    this._myLike
      ? this._$elementLike.classList.add(this._likeActive)
      : this._$elementLike.classList.remove(this._likeActive);

    this._$elementLikeCounter.textContent = this._cardLikes.length;

  };

  _createCard = () => {

    this._$cardNode = this._getElement();
    this._$cardContainer = this._$cardNode.querySelector(this._$element);
    this._$elementName = this._$cardNode.querySelector(this._$elementPlaceName);
    this._$elementImage = this._$cardNode.querySelector(this._$elementPlaceImage);
    this._$elementTrash = this._$cardNode.querySelector(this._$elementDelete);
    this._$elementLike = this._$cardNode.querySelector(this._$elementLike);
    this._$elementLikeCounter = this._$cardNode.querySelector(this._$elementLikeCounter);

    this._$elementImage.src = this._cardLink;
    this._$elementImage.alt = this._cardName;

    this._$elementName.textContent = this._cardName;
    this._$elementName.title = this._cardName;

    this._$cardNode.dataset.cardId = this._cardId;
    this._$cardNode.dataset.cardOwner = this._cardOwner;

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

    this._$cardNode.remove();

  };

  getCard = () => {

    return this._createCard();

  };

};

export default Card;