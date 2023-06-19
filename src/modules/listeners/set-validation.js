"use strict";

import newFormValidatorAvatar from "../validation/instance-new-form-validator-avatar.js";
import newFormValidatorProfile from "../validation/instance-new-form-validator-profile.js";
import newFormValidatorCard from "../validation/instance-new-form-validator-card.js";

[
  newFormValidatorAvatar,
  newFormValidatorProfile,
  newFormValidatorCard,
].forEach((item) => item.enableValidation());
