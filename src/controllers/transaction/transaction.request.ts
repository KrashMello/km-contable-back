import { validationsOptions } from "elumian/core/request";

const TransactionDataOptions: validationsOptions = {
  dateEntry: ["date", "required"],
  description: ["alphaNumeric", "required"],
  amount: ["numeric", "required"],
  categoryId: ["numeric", "required"],
  categoryDebitId: ["numeric"],
};

export const TransactionDataRequest = {
  options: TransactionDataOptions,
};
