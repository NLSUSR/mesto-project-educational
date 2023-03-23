const UserInfo = class {
  constructor(object) {

    this._avatarNode = object.avatar;
    this._nameNode = object.name;
    this._aboutNode = object.about;

  };

  setUserInfo = data => {

    this._avatarNode.src = data.avatar;
    this._nameNode.textContent = data.name;
    this._aboutNode.textContent = data.about;

    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;

    this._id = data._id;

  };

  getUserInfo = () => {

    return {

      name: this._name,
      about: this._about,
      avatar: this._avatar

    };

  };

  getUserId = () => {

    return this._id;

  };

};

export default UserInfo;

