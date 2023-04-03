const Api = class {

  #resource;
  #main;
  #cards;
  #avatar;
  #likes;
  #request;
  #change;
  #send;
  #remove;
  #headers;
  #resolve;
  #reject;
  #head;
  #getMain;
  #getCards;
  #getEndpoints;
  #getHeadlines;
  #getRequest;
  #check;
  #checkReceiving;
  #promiseMap;

  constructor(object) {

    this.#resource = object.resource;
    this.#main = object.endpoints.main;
    this.#cards = object.endpoints.cards;
    this.#avatar = object.endpoints.avatar;
    this.#likes = object.endpoints.likes;
    this.#request = object.methods.request;
    this.#change = object.methods.change;
    this.#send = object.methods.send;
    this.#remove = object.methods.remove;
    this.#headers = object.headers;
    this.#resolve = async response => await Promise.resolve(response.json());
    this.#reject = async response => await Promise.reject("Ошибка: "`${response.status}`);
    this.#check = response => { if (response.ok) { return this.#resolve(response) } else { return this.#reject(response) } };
    this.#getHeadlines = (method, data) => { return { method: method, headers: this.#headers, body: JSON.stringify(data) } };
    this.#getEndpoints = endpoints => `${this.#resource + endpoints}`;
    this.#getRequest = async (endpoints, method, data) => await fetch(this.#getEndpoints(endpoints), this.#getHeadlines(method, data));
    this.#checkReceiving = async (endpoints, method, data) => await this.#checkResponse(await this.#getRequest(endpoints, method, data));
    this.#head = { method: this.#request, headers: this.#headers };
    this.#getMain = fetch(`${this.#resource + this.#main}`, this.#head);
    this.#getCards = fetch(`${this.#resource + this.#cards}`, this.#head);
    this.#promiseMap = async array => await Promise.all(array.map(response => this.#checkResponse(response)));

  };

  // проверяем ответ сервера
  #checkResponse = async response => { return await this.#check(response) };

  // универсальная функция отправки запросов
  #sendRequest = async (endpoints, method, data) => { return await this.#checkReceiving(endpoints, method, data) };

  // обрабатываем ошибку
  responseError = error => console.error(error);

  // получаем данные и карточки с сервера
  getDataAndCards = async () => { return await this.#promiseMap(await Promise.all([this.#getMain, this.#getCards])); };

  // замена аватара
  patchAvatar = resource => { return this.#sendRequest(this.#avatar, this.#change, { avatar: resource }) };

  // заменяем данные имя/деятельность
  patchData = main => { return this.#sendRequest(this.#main, this.#change, { name: main.name, about: main.about }) };

  // выкладываем на сервер новую карточку
  postCard = card => { return this.#sendRequest(this.#cards, this.#send, { name: card.name, link: card.link }) };

  // удаляем карточку
  deleteCard = cardId => { return this.#sendRequest(`${this.#cards + cardId} `, this.#remove) };

  // меняем состояние лайка
  likeState = data => { return this.#sendRequest(`${this.#likes + data.id} `, data.method) };
  
};

export default Api;