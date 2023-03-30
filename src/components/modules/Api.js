const Api = class {
  constructor(configuration) {

    this._configuration = configuration;
    this._resource = this._configuration.resource;
    this._main = this._configuration.endpoint.main;
    this._cards = this._configuration.endpoint.cards;
    this._avatar = this._configuration.endpoint.avatar;
    this._likes = this._configuration.endpoint.likes;
    this._request = this._configuration.method.request;
    this._change = this._configuration.method.change;
    this._send = this._configuration.method.send;
    this._remove = this._configuration.method.remove;
    this._headers = this._configuration.headers;

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

  _sendRequest = async (endpoint, method, data) => {

    const request = { resource: `${this._resource + endpoint} `, headers: this._headers };
    const response = await fetch(request.resource, { method: method, headers: request.headers, body: JSON.stringify(data) });

    return await this._checkResponse(response);

  };

  // замена аватара
  patchAvatar = resource => {

    const request = { endpoint: this._avatar, method: this._change, body: { avatar: resource } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // заменяем данные имя/деятельность
  patchData = main => {

    const request = { endpoint: this._main, method: this._change, body: { name: main.name, about: main.about } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // выкладываем на сервер новую карточку
  postCard = card => {

    const request = { endpoint: this._cards, method: this._send, body: { name: card.name, link: card.link } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // удаляем карточку
  deleteCard = cardId => {

    const request = { endpoint: `${this._cards + cardId} `, method: this._remove };

    return this._sendRequest(request.endpoint, request.method);

  };

  // меняем состояние лайка
  likeState = data => {

    const request = { endpoint: `${this._likes + data.id} `, method: data.method };

    return this._sendRequest(request.endpoint, request.method);

  };
};

export default Api;