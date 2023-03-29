const Api = class {
  constructor(configurations) {

    this._configurations = configurations;
    this._url = this._configurations.url;
    this._me = this._configurations.ept.me;
    this._cards = this._configurations.ept.cards;
    this._avatar = this._configurations.ept.avatar;
    this._likes = this._configurations.ept.likes;
    this._request = this._configurations.mtd.request;
    this._change = this._configurations.mtd.change;
    this._send = this._configurations.mtd.send;
    this._remove = this._configurations.mtd.remove;
    this._headers = this._configurations.hdr;

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

      me: { url: `${this._url + this._me}` },
      cards: { url: `${this._url + this._cards} ` },
      mtd: this._request,
      hdr: this._hdr

    };

    const array = await Promise.all(

      [
        fetch(request.me.url, { method: request.mtd, headers: request.hdr }),
        fetch(request.cards.url, { method: request.mtd, headers: request.hdr })
      ]

    );

    return await Promise.all(array.map(response => this._checkResponse(response)));

  };

  _sendRequest = async (ept, mtd, data) => {

    const request = { url: `${this._url + ept} `, hdr: this._hdr };
    const response = await fetch(request.url, { method: mtd, headers: request.hdr, body: JSON.stringify(data) });

    return await this._checkResponse(response);

  };

  // замена аватара
  patchAvatar = url => {

    const request = { endpoint: this._avatar, method: this._change, body: { avatar: url } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // заменяем данные имя/деятельность
  patchData = me => {

    const request = { endpoint: this._me, method: this._change, body: { name: me.name, about: me.about } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // выкладываем на сервер новую карточку
  postCard = card => {

    const request = { endpoint: this._cards, method: this._send, body: { name: card.name, link: card.link } };

    return this._sendRequest(request.endpoint, request.method, request.body);

  };

  // удаляем карточку
  deleteCard = id => {

    const request = { endpoint: `${this._cards + id} `, method: this._remove };

    return this._sendRequest(request.endpoint, request.method);

  };

  // меняем состояние лайка
  likeState = data => {

    const request = { endpoint: `${this._likes + data.id} `, method: data.method };

    return this._sendRequest(request.endpoint, request.method);

  };
};

export default Api;