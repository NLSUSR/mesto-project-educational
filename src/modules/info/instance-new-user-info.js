"use strict";

import UserInfo from "./class-user-info.js";
import constants from "../../utils/constants.js";

// данные пользователя
const newUserInfo = new UserInfo({
  avatar: constants.selectors.profileAvatarImage,
  name: constants.selectors.profileName,
  about: constants.selectors.profileActivity,
});

export default newUserInfo;
