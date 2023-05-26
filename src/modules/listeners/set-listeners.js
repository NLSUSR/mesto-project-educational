import popupFormAvatar from "../popups/popup-form-avatar.js";
import popupFormProfile from "../popups/popup-form-profile.js";
import popupFormPlace from "../popups/popup-form-place.js";

[popupFormAvatar, popupFormProfile, popupFormPlace].forEach((item) =>
  item.setEventListeners()
);
