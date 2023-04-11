const Card = class {

  #cardLikes;
  #cardId;
  #cardName;
  #cardLink;
  #cardOwnerId;
  #cardOwnerName;
  #cardCreatedAt;
  #deleteCallback;
  #cardCallback;
  #likeCallback;
  #myCard;
  #noLikes;
  #myLike;
  #removeTrash;
  #setLikeBase;
  #nonsense;
  #$template;
  #constants
  #$cardNode
  #$cardContainer
  #$elementName
  #$elementImage
  #$elementTrash
  #$elementLike
  #$elementLikeCounter

  constructor(item, callbacks, template, constants, userId) {

    this.#cardLikes = item.likes;
    this.#cardId = item._id;
    this.#cardName = item.name;
    this.#cardLink = item.link;
    this.#cardOwnerId = item.owner._id;
    this.#cardOwnerName = item.owner.name;
    this.#cardCreatedAt = item.createdAt;

    this.#deleteCallback = callbacks.deleteCallback;
    this.#cardCallback = callbacks.cardCallback;
    this.#likeCallback = callbacks.likeCallback;

    this.#$template = template;
    this.#constants = constants;

    this.#myCard = item.owner._id === userId;
    this.#noLikes = this.#cardLikes === undefined;
    this.#myLike = item.likes.some(like => { return like._id === userId });

    this.#removeTrash = () => { if (!this.#myCard) { this.#$elementTrash.remove() } };
    this.#setLikeBase = () => { if (this.#noLikes) { return this.#cardLikes = [] } };
    this.#nonsense = () => { this.#myLike = !this.#myLike; };

  };

  #getElement = () => {

    const cardTemplate = this.#$template.content;
    const elementsItem = cardTemplate.querySelector(this.#constants.$item);
    const cardNode = elementsItem.cloneNode(true);

    return cardNode;

  };

  #setEventListeners = () => {

    this.#$elementTrash.addEventListener("click", () => { this.#deleteCallback(this, this.#cardId) });
    this.#$elementImage.addEventListener("click", () => { this.#cardCallback(this.#cardName, this.#cardLink, this.#cardOwnerName) });
    this.#$elementLike.addEventListener("click", () => { this.#checkLike() });

  };

  #setLikeState = () => {

    this.#myLike
      ? this.#$elementLike.classList.add(this.#constants.$likeActive)
      : this.#$elementLike.classList.remove(this.#constants.$likeActive);

    this.#$elementLikeCounter.textContent = this.#cardLikes.length;

  };

  #createCard = () => {

    this.#$cardNode = this.#getElement();
    this.#$cardContainer = this.#$cardNode.querySelector(this.#constants.$element);
    this.#$elementName = this.#$cardNode.querySelector(this.#constants.$placeName);
    this.#$elementImage = this.#$cardNode.querySelector(this.#constants.$placeImage);
    this.#$elementTrash = this.#$cardNode.querySelector(this.#constants.$delete);
    this.#$elementLike = this.#$cardNode.querySelector(this.#constants.$like);
    this.#$elementLikeCounter = this.#$cardNode.querySelector(this.#constants.$likeCounter);

    this.#$elementImage.src = this.#cardLink;
    this.#$elementImage.alt = this.#cardName;

    this.#$elementImage.setAttribute("decoding", "async");
    this.#$elementImage.setAttribute("loading", "lazy");

    this.#$elementName.textContent = this.#cardName;
    this.#$elementName.title = this.#cardName;

    this.#$cardNode.dataset.cardId = this.#cardId;
    this.#$cardNode.dataset.cardOwner = this.#cardOwnerId;

    this.#$cardContainer.dataset.createdAt = this.#cardCreatedAt;

    let names = this.#cardLikes.map(like => like.name);
    const namesString = names.join(", ");

    this.#cardLikes.length === 0
      ? this.#$elementLike.title = ""
      : this.#$elementLike.title = `${"Эту карточку лайкнул(и): " + namesString}`;

    this.#removeTrash();
    this.#setLikeBase();

    this.#setLikeState();
    this.#setEventListeners();

    return this.#$cardNode;

  };

  #checkLike = () => {

    let method = null;

    this.#myLike
      ? method = this.#constants.remove
      : method = this.#constants.add;

    this.#likeCallback(this, this.#cardId, method);

  };

  changeLikeState = likes => {

    this.#cardLikes = likes;
    this.#nonsense();
    this.#setLikeState();

  };

  removeCard = () => {

    this.#$cardNode.remove();

  };

  getCard = () => {

    return this.#createCard();

  };

};

export default Card;