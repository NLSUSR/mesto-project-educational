"use strict";

const UserInfo = class {
  #$avatarNode;
  #$nameNode;
  #$aboutNode;
  #name;
  #about;
  #avatar;
  #id;

  constructor(object) {
    this.#$avatarNode = object.avatar;
    this.#$nameNode = object.name;
    this.#$aboutNode = object.about;
  }

  setUserInfo = (data) => {
    this.#$avatarNode.src = data.avatar;
    this.#$nameNode.textContent = data.name;
    this.#$aboutNode.textContent = data.about;

    this.#name = data.name;
    this.#about = data.about;
    this.#avatar = data.avatar;

    this.#id = data._id;
  };

  getUserInfo = () => {
    return {
      name: this.#name,
      about: this.#about,
      avatar: this.#avatar,
    };
  };

  getUserId = () => {
    return this.#id;
  };
};

export default UserInfo;
