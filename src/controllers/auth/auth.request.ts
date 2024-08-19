import { validationsOptions } from "elumian/core/request";

const loginDataOptions: validationsOptions = {
  username: ["alphaNumeric", "required"],
  password: ["alphaNumericSimbols", "required"],
};

export const loginDataRequest = {
  options: loginDataOptions,
};
