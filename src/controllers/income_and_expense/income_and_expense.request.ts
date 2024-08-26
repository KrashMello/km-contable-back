import { validationsOptions } from "elumian/core/request";

const IncomeAndExpensesDataOptions: validationsOptions = {
  dateEntry: ["date", "required"],
  description: ["alphaNumeric", "required"],
  amount: ["numeric", "required"],
  accountId: ["numeric", "required"],
  typeId: ["numeric", "required"],
};

export const IncomeAndExpensesDataRequest = {
  options: IncomeAndExpensesDataOptions,
};
