import { validationsOptions } from "elumian/core/request";

const TransactionDataOptions: validationsOptions = {
  dateEntry: ["date", "required"],
  description: ["alphaNumeric", "required"],
  amount: ["numeric", "required"],
  categoryId: ["numeric", "required"],
};

export const TransactionDataRequest = {
  options: TransactionDataOptions,
};
