"use strict";

import avatarFormValidation from "../validation/avatar-form-validation.js";
import profileFormValidation from "../validation/profile-form-validation.js";
import cardFormValidation from "../validation/card-form-validation.js";

[avatarFormValidation, profileFormValidation, cardFormValidation].forEach(
  (item) => item.enableValidation()
);
