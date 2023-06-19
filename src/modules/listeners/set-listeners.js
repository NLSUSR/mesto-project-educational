"use strict";

import newPopupWithFormsAvatar from "../popups/instance-new-popup-with-forms-avatar";
import newPopupWithFormsProfile from "../popups/instance-new-popup-with-forms-profile.js";
import newPopupWithFormsPlace from "../popups/instance-new-popup-with-forms-place.js";

[
  newPopupWithFormsAvatar,
  newPopupWithFormsProfile,
  newPopupWithFormsPlace,
].forEach((item) => item.setEventListeners());
