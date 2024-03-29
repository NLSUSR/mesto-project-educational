"use strict";

const API = class {
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
  #head;
  #getMain;
  #getCards;

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
    this.#head = { method: this.#request, headers: this.#headers };
    this.#getMain = fetch(`${this.#resource + this.#main}`, this.#head);
    this.#getCards = fetch(`${this.#resource + this.#cards}`, this.#head);
  }

  #resolve = async (response) => {
    return await Promise.resolve(response.json());
  };

  #reject = async (response) => {
    return await Promise.reject("Ошибка: "`${response.status}`);
  };

  #check = async (response) => {
    return (await response.ok)
      ? this.#resolve(response)
      : this.#reject(response);
  };

  #getHeadlines = (method, data) => {
    return {
      method: method,
      headers: this.#headers,
      body: JSON.stringify(data),
    };
  };

  #getEndpoints = (endpoints) => `${this.#resource + endpoints}`;

  #getRequest = async (endpoints, method, data) => {
    return await fetch(
      this.#getEndpoints(endpoints),
      this.#getHeadlines(method, data)
    );
  };

  #checkReceiving = async (endpoints, method, data) => {
    return await this.#checkResponse(
      await this.#getRequest(endpoints, method, data)
    );
  };

  #promiseMap = async (array) => {
    return await Promise.all(
      array.map((response) => this.#checkResponse(response))
    );
  };

  // проверяем ответ сервера
  #checkResponse = async (response) => {
    return await this.#check(response);
  };

  // универсальная функция отправки запросов
  #sendRequest = async (endpoints, method, data) => {
    return await this.#checkReceiving(endpoints, method, data);
  };

  // обрабатываем ошибку
  responseError = (error) => console.error(error);

  // получаем данные и карточки с сервера
  getDataAndCards = async () => {
    return await this.#promiseMap(
      await Promise.all([this.#getMain, this.#getCards])
    );
  };

  // замена аватара
  patchAvatar = async (resource) => {
    return await this.#sendRequest(this.#avatar, this.#change, {
      avatar: resource,
    });
  };

  // заменяем данные имя/деятельность
  patchData = async (main) => {
    return await this.#sendRequest(this.#main, this.#change, {
      name: main.name,
      about: main.about,
    });
  };

  // выкладываем на сервер новую карточку
  postCard = async (card) => {
    return await this.#sendRequest(this.#cards, this.#send, {
      name: card.name,
      link: card.link,
    });
  };

  // удаляем карточку
  deleteCard = async (cardId) => {
    return await this.#sendRequest(`${this.#cards + cardId} `, this.#remove);
  };

  // меняем состояние лайка
  likeState = async (data) => {
    return await this.#sendRequest(`${this.#likes + data.id} `, data.method);
  };
};

export default API;
