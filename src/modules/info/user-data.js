import UserInfo from "../info/user-info.js";
import constants from "../../utils/constants.js";

// данные пользователя
const userData = new UserInfo({
  avatar: constants.selectors.profileAvatarImage,
  name: constants.selectors.profileName,
  about: constants.selectors.profileActivity,
});

export default userData;
