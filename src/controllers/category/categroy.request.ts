import { validationsOptions } from "elumian/core/request";

const CategoryDataOptions: validationsOptions = {
  name: ["alphaNumeric", "required"],
  accountId: ["numeric"],
  transactionTypeId: ["numeric", "required"],
  currencyId: ["numeric"],
};

export const CategoryDataRequest = {
  options: CategoryDataOptions,
};
