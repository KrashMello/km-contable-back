import { validationsOptions } from "elumian/core/request";

const accountDataOptions: validationsOptions = {
  name: ["alphaNumericSimbols", "required"],
  account_type: ["alphaNumeric", "required"],
  currency: ["alphaNumeric", "required"],
};

export const accountDataRequest = {
  options: accountDataOptions,
};
