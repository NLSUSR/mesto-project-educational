const Api = class {
  constructor(object) {

    this._resource = object.resource;
    this._main = object.endpoints.main;
    this._cards = object.endpoints.cards;
    this._avatar = object.endpoints.avatar;
    this._likes = object.endpoints.likes;
    this._request = object.methods.request;
    this._change = object.methods.change;
    this._send = object.methods.send;
    this._remove = object.methods.remove;
    this._headers = object.headers;

  };

  // проверяем ответ сервера
  _checkResponse = response => {

    if (response.ok) {
      return Promise.resolve(response.json())
    } else {
      return Promise.reject("Ошибка: "`${response.status}`)
    };

  };

  // обрабатываем ошибку
  responseError = error => { console.error(error) };

  // получаем данные и карточки с сервера
  getDataAndCards = async () => {

    const request = {

      main: { resource: `${this._resource + this._main}` },
      cards: { resource: `${this._resource + this._cards} ` },
      method: this._request,
      headers: this._headers

    };

    const array = await Promise.all(

      [
        fetch(request.main.resource, { method: request.method, headers: request.headers }),
        fetch(request.cards.resource, { method: request.method, headers: request.headers })
      ]

    );

    return await Promise.all(array.map(response => this._checkResponse(response)));

  };

  _sendRequest = async (endpoints, method, data) => {

    const request = { resource: `${this._resource + endpoints} `, headers: this._headers };
    const response = await fetch(request.resource, { method: method, headers: request.headers, body: JSON.stringify(data) });

    return await this._checkResponse(response);

  };

  // замена аватара
  patchAvatar = resource => {

    const request = { endpoints: this._avatar, method: this._change, body: { avatar: resource } };

    return this._sendRequest(request.endpoints, request.method, request.body);

  };

  // заменяем данные имя/деятельность
  patchData = main => {

    const request = { endpoints: this._main, method: this._change, body: { name: main.name, about: main.about } };

    return this._sendRequest(request.endpoints, request.method, request.body);

  };

  // выкладываем на сервер новую карточку
  postCard = card => {

    const request = { endpoints: this._cards, method: this._send, body: { name: card.name, link: card.link } };

    return this._sendRequest(request.endpoints, request.method, request.body);

  };

  // удаляем карточку
  deleteCard = cardId => {

    const request = { endpoints: `${this._cards + cardId} `, method: this._remove };

    return this._sendRequest(request.endpoints, request.method);

  };

  // меняем состояние лайка
  likeState = data => {

    const request = { endpoints: `${this._likes + data.id} `, method: data.method };

    return this._sendRequest(request.endpoints, request.method);

  };
};

export default Api;