import { validationsOptions } from "elumian/core/request";

const accountDataOptions: validationsOptions = {
  name: ["alphaNumericSimbols", "required"],
  accountType: ["numeric", "required"],
  currencyType: ["numeric", "required"],
};

export const accountDataRequest = {
  options: accountDataOptions,
};
